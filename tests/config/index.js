const config = require("../../src/config");
const defaults = require("../../src/defaults");

describe("config", function() {
	defaults.TEST_VALUE = "value";
	process.env.TEST_ENV_VALUE = "value";

	defaults.TEST_PRIORITY_VALUE = "secondary";
	process.env.TEST_PRIORITY_VALUE = "value";

	it("It returns values from defaults", function(done) {
		if(config.get("TEST_VALUE") == "value") {
			done();
		} else {
			done(new Error("Value from defaults was not returned"));
		}
	});

	it("It returns values from env", function(done) {
		if(config.get("TEST_ENV_VALUE") == "value") {
			done();
		} else {
			done(new Error("Value from defaults was not returned"));
		}
	});

	it("It returns values from env rather than defaults", function(done) {
		if(config.get("TEST_PRIORITY_VALUE") == "value") {
			done();
		} else {
			done(new Error("Value from defaults was not returned"));
		}
	});
});

