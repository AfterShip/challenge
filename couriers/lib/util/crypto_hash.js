(function () {
	'use strict';

	function CryptoHash() {

	}

	CryptoHash.md5 = function(input, is_raw_output) {
		var sha_sum = require('crypto').createHash('md5').update(input);
		if (typeof is_raw_output === 'undefined') {
			return sha_sum.digest('hex');
		} else {
			return sha_sum.digest();
		}
	};

	CryptoHash.sha1 = function(input, is_raw_output) {
		var sha_sum = require('crypto').createHash('sha1').update(input);
		if (typeof is_raw_output === 'undefined') {
			return sha_sum.digest('hex');
		} else {
			return sha_sum.digest();
		}
	};

	module.exports = CryptoHash;
})();


