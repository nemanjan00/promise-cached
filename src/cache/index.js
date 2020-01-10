const url = require("url");

const config = require("../config");

const memory = require("./memory-cache");
const redis = require("./redis-cache");

const engines = {
	memory,
	redis
};

module.exports = (connectionUrl, options) => {
	const settingsUrl = connectionUrl || config.get("CACHE_URL");

	const settings = url.parse(settingsUrl);

	if(engines[settings.protocol] == undefined) {
		return Promise.reject("Specified cache protocol is not recognised: " + settingsUrl);
	}

	return engines[url.protocol](url, options);
};

