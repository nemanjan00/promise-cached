const wrapper = require("../../src/wrapper");

module.exports = (sufix, promise) => {
	describe("promisify" + sufix, function() {
		it("It should pass resolved value", function(done) {
			wrapper("test1", () => "value")().then(value => {
				if(value == "value") {
					done();
				} else {
					done(new Error("Returned wrong value"));
				}
			}).catch(() => {
				done(new Error("Function rejected"));
			}, {cacheEngine: promise});
		});

		it("It should pass rejected value", function(done) {
			wrapper("test2", () => Promise.reject("value"))().then(() => {
				done(new Error("Function resolved"));
			}).catch(value => {
				if(value == "value") {
					done();
				} else {
					done(new Error("Returned wrong value"));
				}
			}, {cacheEngine: promise});
		});

		it("It should cache response", function(done) {
			const slowFunction = (message) => {
				return new Promise((resolve) => {
					setTimeout(() => {
						resolve(message);
					}, 1000);
				});
			};

			const fasterFunction = wrapper("test3", slowFunction, {cacheEngine: promise});

			Promise.race([
				(() => {
					return new Promise(resolve => {
						fasterFunction("value").then(value => {
							if(value == "value") {
								fasterFunction("value").then(value => {
									if(value == "value") {
										resolve("valid");
									} else {
										done(new Error("Returned wrong value"));
									}
								}).catch(() => {
									done(new Error("Function rejected"));
								});
							} else {
								done(new Error("Returned wrong value"));
							}
						}).catch(() => {
							done(new Error("Function rejected"));
						});
					});
				})(),
				(() => {
					return new Promise((resolve) => {
						setTimeout(() => {
							resolve("invalid");
						}, 2000);
					});
				})()
			]).then(result => {
				if(result == "valid") {
					done();
					return;
				}

				done(new Error("Did not use cache"));
			});
		});
	});
};

