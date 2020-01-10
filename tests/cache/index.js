describe("cache", function() {
	require("./storage")("Redis");
	require("./storage")("Memory");
});
