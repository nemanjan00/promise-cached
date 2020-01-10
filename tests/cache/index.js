const cache = require("../../src/cache");

describe("cache", function() {
	require("./storage")("Memory", cache("memory://"));
	require("./storage")("Redis", cache("redis://127.0.0.1:6379"));
});
