const storageObject = {};

module.exports = (...args) => {
	const storage = {
		_options: undefined,

		_storage: storageObject,

		_init: (_url, options) => {
			storage._options = options || {};

			return Promise.resolve(storage);
		},

		_ttlTimeouts: {},

		store: (name, value) => {
			storage._storage[name] = value;

			if(storage._options.ttl !== undefined) {
				if(storage._ttlTimeouts[name] !== undefined) {
					clearTimeout(storage._ttlTimeouts[name]);

					delete storage._ttlTimeouts[name];
				}

				storage._ttlTimeouts[name] = setTimeout(() => {
					delete storage._storage[name];
				}, storage._options.ttl);
			}

			return Promise.resolve();
		},

		get: (name) => {
			if(storage._storage[name] === undefined) {
				return Promise.reject(`Key ${name} is not set`);
			}

			return Promise.resolve(storage._storage[name]);
		},

		clear: (name) => {
			delete storage._storage[name];

			return Promise.resolve();
		}
	};

	return storage._init(...args);
};

