/*
 * General Error data model
 */

(function() {
	'use strict';

	var _util = require('util');

	var ERROR = {
		1: 'Unknown Error',
		404: 'Response code is 404 and maybe the target page changed..',
		801: 'Tracking didn\'t return any result',
		802: 'Tracking didn\'t change, same DNA',
		803: 'Bad format tracking_number',
		804: '',
		805: 'Parsing the response body to object error',
		806: 'Number of trackings and Number of results is different',
		807: 'Error in converting the object to json'
	};

	/**
	 * @param code {number} - code
	 * @param message {string} - message
	 * @constructor
	 */
	function GeneralError(code, message) {
		this.code = code || 1;
		if (!message) {
			if (ERROR[code]) {
				message = ERROR[code];
			}else{
				message = '';
			}
		}
		this.message = message;
	}

	_util.inherits(GeneralError, Error);

	module.exports = GeneralError;

})();
