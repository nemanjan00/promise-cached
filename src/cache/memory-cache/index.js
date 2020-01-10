module.exports = (...args) => {
	const storage = {
		_options: undefined,

		_storage: {},

		_init: (_url, options) => {
			storage._options = options;

			return Promise.resolve(storage);
		},

		_ttlTimoouts: {},

		store: (name, value) => {
			storage._storage[name] = value;

			if(storage._storage.ttl !== undefined) {
				if(storage._ttlTimoouts[name] !== undefined) {
					clearTimeout(storage._ttlTimoouts[name]);

					delete storage._ttlTimoouts[name];
				}

				storage._ttlTimoouts[name] = setTimeout(() => {
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
		}
	};

	return storage._init(...args);
};

