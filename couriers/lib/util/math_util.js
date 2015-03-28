(function () {
	'use strict';

	function MathUtil() {

	}

	/**
	 * return random integer between input range
	 * @param min {number} - min
	 * @param max {number} - max
	 * @returns {number} random integer between min and max
	 */
	MathUtil.randomInteger = function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	MathUtil.getSample = function(array) {
		return array[MathUtil.randomInteger(0, array.length - 1)];
	};

	module.exports = MathUtil;

})();