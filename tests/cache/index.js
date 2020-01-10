const cache = require("../../src/cache");

describe("cache", function() {
	it("It fails, when wront protocol for cache is configured", function(done) {
		cache("justsomebullchitprotocol://").then(() => {
			done(new Error("Accepted invalid protocol"));
		}).catch(() => {
			done();
		});
	});

	require("./storage")("Memory", cache("memory://", { ttl: 1000 }));
	require("./storage")("Redis", cache("redis://127.0.0.1:6379", { ttl: 1000 }));
});
