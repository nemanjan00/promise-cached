const redisCache = require("node-cache-redis");

module.exports = (...args) => {
	const storage = {
		_options: undefined,

		_storage: undefined,

		_init: (url, options) => {
			storage._options = options || {};

			storage._storage = new redisCache({
				redisOptions: {
					url
				}
			});

			return Promise.resolve(storage);
		},

		store: (name, value) => {
			return storage._storage.set(name, value, storage._options.ttl / 1000);
		},

		get: (name) => {
			return new Promise((resolve, reject) => {
				storage._storage.get(name).then((value) => {
					if(value == null) {
						reject("Value not found");
						return;
					}

					resolve(value);
				});
			});
		},

		clear: (name) => {
			return storage._storage.del(name);
		}
	};

	return storage._init(...args);
};

