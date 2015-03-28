(function () {
	'use strict';

	var moment = require('moment');


	function Timer() {

	}


	Timer.micro = function () {
		return moment().format('YYYY-MM-DD HH:mm:ss SSS');
	};

	module.exports = Timer;

})();
