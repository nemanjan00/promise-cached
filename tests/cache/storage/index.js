const implement = require("implement-js");

const storageInterface = require("./interface");

module.exports = (name, engine) => {
	describe(`${name} cache engine`, function() {
		it("Implements storage interface", function(done) {
			engine.then(implementation => {
				try {
					implement.default(storageInterface)(implementation);

					done();
				} catch(e) {
					done(e);
				}
			});
		});

		it("Stores kev-value pairs", function(done) {
			done();
		});

		it("Returns stored kev-value pairs", function(done) {
			done();
		});

		it("Stored key-value pairs expire", function(done) {
			done();
		});
	});
};

