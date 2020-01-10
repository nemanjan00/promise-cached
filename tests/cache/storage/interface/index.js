const implement = require("implement-js");

const Interface = implement.Interface;

module.exports = Interface("storage")({
	store: implement.type("function"),
	get: implement.type("function"),
	clear: implement.type("function")
}, {
	error:true
});

