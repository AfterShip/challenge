(function() {
	'use strict';

	var parserXML2JSON = require('xml2json');

	function Converter() {

	}


	Converter.xml2Object = function(xml, options) {
		if (!options) {
			options = {
				coerce: false,
				trim: true
			};
		}
		var json = parserXML2JSON.toJson(xml, options);

		// coerce must be FALSE. Otherwise, usps: 9201999996460100108948 will become 9.2019999964601e+21
		return JSON.parse(json);
	};

	module.exports = Converter;

})();
