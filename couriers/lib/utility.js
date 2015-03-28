(function () {
	'use strict';

	var ChangeCase = require('change-case');
	var fs = require('fs');
	var Path = require('path');

	function Utility() {

	}

	var modules_path = __dirname + '/util';
	fs.readdirSync(modules_path).forEach(function(file) {
		var full_path = modules_path + '/' + file;
		if (!fs.statSync(full_path).isDirectory() && file !== '.DS_Store') {
			var filename = Path.basename(full_path);
			var ext = Path.extname(full_path);
			filename = filename.replace(ext, '');
			var class_name = ChangeCase.pascalCase(filename);
			Utility[class_name] = require(full_path);
		}
	});

	module.exports = Utility;

})();