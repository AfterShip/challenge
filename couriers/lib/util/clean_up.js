(function () {
	'use strict';

	var unicodeDragon = require('unicode-dragon');

	function CleanUp() {

	}

	CleanUp.cleanUpString = function(input_val) {

		//convert all numbers to string
		if (typeof input_val === 'number') {
			input_val = input_val.toString();
		}

		//if still not string, then return empty
		if (typeof input_val !== 'string') {
			return '';
		}

		//clean up trailing spaces
		input_val = input_val.trim();

		//clean up invalid encoded character
		//http://stackoverflow.com/questions/12754256/removing-invalid-characters-in-javascript
		input_val = input_val.replace(/\uFFFD/g, '');

		//ensure valid utf8
		input_val = unicodeDragon(input_val);


		return input_val;
	};

	module.exports = CleanUp;
})();


