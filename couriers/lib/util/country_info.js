(function () {
	'use strict';

	var CountryLookup = require('country-data').lookup;

	function CountryInfo() {

	}

	CountryInfo.getCountryInfo = function (country_name) {

		//get the iso data
		var country_info = CountryLookup.countries({name: country_name });

		if (country_info.length > 0) {
			return country_info[0];
		} else {
			return null;
		}
	};

	CountryInfo.getCountryInfoByAlpha2 = function (alpha2) {

		//get the iso data
		var country_info = CountryLookup.countries({alpha2: alpha2 });

		if (country_info.length > 0) {
			return country_info[0];
		} else {
			return null;
		}
	};

	CountryInfo.getCountryInfoByCity = function(city_name, callback) {

	};

	module.exports = CountryInfo;

})();