const implement = require("implement-js");

const storageInterface = require("./interface");

module.exports = (name, engine, testExpiration) => {
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
					done(new Error("There is no store function"));
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
					done(new Error("There is no store function"));
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
							done(new Error("Wrong value returned"));
						}
					}).catch((error) => {
						done(error);
					});
				}).catch((error) => {
					done(error);
				});
			});
		});

		if(testExpiration) {
			it("Stored key-value pairs expire", function(done) {
				engine.then(implementation => {
					if(implementation.store === undefined) {
						done(new Error("There is no store function"));
						return;
					}

					implementation.store("name", "value").then(() => {
						if(implementation.get === undefined) {
							done(new Error("There is no get function"));
							return;
						}

						setTimeout(() => {
							implementation.get("name").then(() => {
								done(new Error("Value did not expire"));
							}).catch(() => {
								done();
							});
						}, 1500);
					}).catch((error) => {
						done(error);
					});
				});
			});
		}

		it("Stored key-value pairs can be cleared", function(done) {
			engine.then(implementation => {
				if(implementation.store === undefined) {
					done(new Error("There is no store function"));
					return;
				}

				implementation.store("name", "value").then(() => {
					if(implementation.clear === undefined) {
						done(new Error("There is no clear function"));
						return;
					}

					implementation.clear("name").then(() => {
						if(implementation.get === undefined) {
							done(new Error("There is no get function"));
							return;
						}

						implementation.get("name").then(() => {
							done(new Error("Value was not cleared"));
						}).catch(() => {
							done();
						});
					});
				}).catch((error) => {
					done(error);
				});
			});
		});
	});
};

