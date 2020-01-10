const cache = require("../src/cache");

describe("promise-cached", function() {
	require("./wrapper")("");
	require("./wrapper")(" with passed engine", cache());

	require("./promisify");
	require("./config");

	require("./cache");
});

