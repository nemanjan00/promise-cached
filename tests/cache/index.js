const cache = require("../../src/cache");

describe("cache", function() {
	it("It fails, when wront protocol for cache is configured", function(done) {
		cache("justsomebullchitprotocol://").then(() => {
			done(new Error("Accepted invalid protocol"));
		}).catch(() => {
			done();
		});
	});

	it("It uses environment variable if no url specified", function(done) {
		cache(undefined).then(() => {
			done();
		}).catch(() => {
			done(new Error("Did not use default URL"));
		});
	});

	require("./storage")("Memory", cache("memory://", { ttl: 1000 }), true);
	require("./storage")("Redis", cache("redis://127.0.0.1:6379", { ttl: 1000 }), true);

	require("./storage")("Memory without ttl", cache("memory://"));
	require("./storage")("Redis without ttl", cache("redis://127.0.0.1:6379"));
});
