/*
 * Tracking data model
 */

(function() {
	'use strict';

	var _util = require('util');

	/**
	 * @constructor
	 */
	function Trackings() {
	}

	_util.inherits(Trackings, Array);

	/**
	 * get all the tracking numbers and return as an Array
	 * @returns {Array} - return tracking numbers
	 */
	Trackings.prototype.getTrackingNumbers = function() {
		var tracking_numbers = [];
		for (var i = 0; i < this.length; i++) {
			tracking_numbers.push(this[i].tracking_number);
		}
		return tracking_numbers;
	};

	/**
	 * Generate a tracking with an error
	 *
	 * @param code_error {int} The code of the error
	 * @param message {string} Optional, the message that will be informed in the error. If is not
	 * informed the function will add one for that code
	 * @returns {Trackings} - Trackings instance
	 */
	Trackings.prototype.generateError = function(code_error, message) {
		this.forEach(function(tracking) {
			tracking.generateError(code_error, message);
		});
		return this;
	};

	Trackings.prototype.getElementByTrackingNumber = function(tracking_number) {
		var i;
		for (i = 0; i < this.length; i++) {
			if(this[i].getTrackingNumber() === tracking_number){
				return this[i];
			}
		}
		return null;
	};

	module.exports = Trackings;

})();