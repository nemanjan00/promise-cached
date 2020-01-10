# promise-cached [![See on Github](https://github.com/themes/tactile/images/octocat-icon.png)](https://github.com/nemanjan00/promise-cached#promise-cached-)

[![Build Status](https://travis-ci.org/nemanjan00/promise-cached.svg?branch=master)](https://travis-ci.org/nemanjan00/promise-cached)

Transparent cache for promise response for Node.js

## Table of contents

<!-- vim-markdown-toc GFM -->

* [Constraints](#constraints)
* [Installation](#installation)
	* [Yarn](#yarn)
	* [NPM](#npm)
* [Usage](#usage)
	* [Basic usage](#basic-usage)
	* [Speeding up existing functions](#speeding-up-existing-functions)
* [Contribution guide](#contribution-guide)
	* [Editorconfig](#editorconfig)
	* [Running tests](#running-tests)
	* [Running linter](#running-linter)
	* [Version numbering](#version-numbering)
* [Authors](#authors)

<!-- vim-markdown-toc -->

## Constraints

Whatever you are caching must be JSON seriazable.

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

## Usage

This library provides wrapper for promise returning functions.

### Basic usage

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
const cachedFunction = wrapper("sleepAndReturn", sleepAndReturn);

cachedFunction("💪").then(() => {
	console.log("This took 1s");

	cachedFunction("💪").then(() => {
		console.log("This was instant! ");
	});
});
```

### Speeding up existing functions

You can for example use this library to cache http responses.

```javascript
const promiseCached = require("promise-cached");

const wrapper = promiseCached({
	ttl: 10 * 1000 // Cache lasts for 10 seconds
});

const axios = require("axios");

const originalGet = axios.get;

axios.get = wrapper(originalGet);
```

## Contribution guide

### Editorconfig

To ensure code styling is maintained the same, on this project, we rely on [editorconfig](https://editorconfig.org/) standard.

You probably can find plugin for your editor (if not included by default) on [official website](https://editorconfig.org/). 

### Running tests

``` bash
yarn test

# or for npm

npm run tests
```

### Running linter

```bash
yarn lint

# or for npm

npm run lint
```

### Version numbering

We are using [semver](https://semver.org/) version numbering standard. 

## Authors

* [nemanjan00](https://github.com/nemanjan00)

