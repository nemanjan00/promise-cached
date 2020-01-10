const crypto = require("crypto");

const cache = require("../cache");
const promisify = require("../promisify");

module.exports = (...args) => {
	const wrapper = {
		_name: undefined,
		_child: undefined,
		_options: undefined,

		_cacheEngine: undefined,

		_initPromise: undefined,

		_init: (name, child, options) => {
			wrapper._name = name;
			wrapper._child = child;
			wrapper._options = options || {};

			if(wrapper._options.cacheEngine !== undefined) {
				wrapper._cacheEngine = wrapper._options.cacheEngine;

				wrapper._initPromise = Promise.resolve(wrapper.calee);
			}

			wrapper._initPromise = new Promise((resolve, reject) => {
				cache(wrapper._options.cacheUrl, wrapper._options).then(cacheEngine => {
					wrapper._cacheEngine = cacheEngine;
					resolve();
				}).catch(reject);
			});

			return wrapper.calee;
		},

		calee: (...args) => {
			const argsHash = wrapper._name + ":" + crypto.createHash("sha256").update(JSON.stringify(args), "utf8").digest("hex");

			return new Promise((resolve, reject) => {
				wrapper._initPromise.then(() => {
					wrapper._cacheEngine.get(argsHash).then((result) => {
						resolve(result);
					}).catch(() => {
						promisify(wrapper._child(...args)).then((result) => {
							wrapper._cacheEngine.store(argsHash, result);

							resolve(result);
						}).catch(reject);
					});
				}).catch(reject);
			});
		}
	};

	return wrapper._init(...args);
};

