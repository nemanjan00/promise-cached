const cache = require("../../src/cache");

describe("cache", function() {
	it("It fails, when wront protocol for cache is configured", function(done) {
		cache("justsomebullchitprotocol://").then(() => {
			done("Accepted invalid protocol");
		}).catch(() => {
			done();
		});
	});

	require("./storage")("Memory", cache("memory://"));
	require("./storage")("Redis", cache("redis://127.0.0.1:6379"));
});
