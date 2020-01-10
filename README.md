# promise-cached

Transparent cache for promise response for Node.js

## Table of contents

<!-- vim-markdown-toc GFM -->

* [Installation](#installation)
	* [Yarn](#yarn)
	* [NPM](#npm)
	* [Usage](#usage)

<!-- vim-markdown-toc -->

## Installation

This package is distributed as package in [npm](https://www.npmjs.com/) repository and can be installed using any node package manager. 

### Yarn

```
yarn add promise-cached
```

### NPM

```bash
npm install promise-cached --save
```

### Usage

```javascript
const promiseCached = require("promise-cached");

const wrapper = promiseCached({
	ttl: 10 * 1000 // Cache lasts for 10 seconds
});

// This is a very slow function that returns same response, every time, for same params
const sleepAndReturn = (message) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(message);
		}, 1000)
	});
}

// This function acts just like one above, exept it is very fast after the first time
const cachedFunction = wrapper(sleepAndReturn);

cachedFunction("💪").then(() => {
	console.log("This took 1s");

	cachedFunction("💪").then(() => {
		console.log("This was instant! ");
	});
});
```

