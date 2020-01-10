const promisify = require("../../src/promisify");

describe("promisify", function() {
	it("It converts normal function response to promise", function(done) {
		promisify((() => "value")()).then(value => {
			if(value == "value") {
				done();
			} else {
				done(new Error("Returned wrong value"));
			}
		}).catch(() => {
			done(new Error("Function rejected"));
		});
	});

	it("It passes promise back", function(done) {
		promisify((() => Promise.resolve("value"))()).then(value => {
			if(value == "value") {
				done();
			} else {
				done(new Error("Returned wrong value"));
			}
		}).catch(() => {
			done(new Error("Function rejected"));
		});
	});

	it("It passes rejetion back", function(done) {
		promisify((() => Promise.reject("value"))()).catch(value => {
			if(value == "value") {
				done();
			} else {
				done(new Error("Returned wrong value"));
			}
		}).catch(() => {
			done(new Error("Function rejected"));
		});
	});
});

