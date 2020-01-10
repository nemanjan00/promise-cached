const wrapper = require("../");

// This is a very slow function that returns same response, every time, for same params
const sleepAndReturn = (message) => {
	return new Promise((resolve) => {
		console.log("Doing something long-lasting");

		setTimeout(() => {
			resolve(message);
		}, 1000);
	});
};

const options = {
	ttl: 10 * 1000 // Cache lasts for 10 seconds
};

// This function acts just like one above, exept it is very fast after the first time
const cachedFunction = wrapper("sleepAndReturn", sleepAndReturn, options);

cachedFunction("💪").then(() => {
	console.log("This took 1s");

	cachedFunction("💪").then(() => {
		console.log("This was instant! ");
	});
});
