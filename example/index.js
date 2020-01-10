const wrapper = require("../");

// This is a very slow function that returns same response, every time, for same params
const sleepAndReturn = (message) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(message);
		}, 1000);
	});
};

// This function acts just like one above, exept it is very fast after the first time
const cachedFunction = wrapper("sleepAndReturn", sleepAndReturn, {
	ttl: 10 * 1000 // Cache lasts for 10 seconds
});

cachedFunction("💪").then(() => {
	console.log("This took 1s");

	cachedFunction("💪").then(() => {
		console.log("This was instant! ");
	});
});
