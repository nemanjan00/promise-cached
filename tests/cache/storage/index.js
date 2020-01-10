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
			engine.then(implementation => {
				if(implementation.store === undefined) {
					done("There is no store function");
					return;
				}

				implementation.store("name", "value").then(() => {
					done();
				}).catch((error) => {
					done(error);
				});
			});
		});

		it("Returns stored kev-value pairs", function(done) {
			engine.then(implementation => {
				if(implementation.store === undefined) {
					done("There is no store function");
					return;
				}

				implementation.store("name", "value").then(() => {
					if(implementation.get === undefined) {
						done("There is no get function");
						return;
					}

					implementation.get("name").then((value) => {
						if(value == "value") {
							done();
						} else {
							done("Wrong value returned");
						}
					}).catch((error) => {
						done(error);
					});
				}).catch((error) => {
					done(error);
				});
			});
		});

		it("Stored key-value pairs expire", function(done) {
			done();
		});
	});
};

