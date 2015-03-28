/*
 * Abstract crawler class
 */

(function() {
	'use strict';

	var ChangeCase = require('change-case');

	/**
	 * @constructor
	 */
	function Couriers() {

	}

	Couriers.getCourier = function(slug) {
		var Courier = null;
		try {
			Courier = require('./lib/couriers/' + ChangeCase.snakeCase(slug));
			Courier = new Courier();
		} catch (e) {
			console.log('Couriers error: cannot initiate courier');
			console.log(e);
			console.log(e.stack);
		}

		return Courier;
	};

	module.exports = Couriers;

})();