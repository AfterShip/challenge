(function() {
	'use strict';

	var MathUtil = require('./math_util');

	function Random() {

	}

	/**
	 * get random browser and os
	 * @returns {Array} - random browser and os
	 */
	Random.browserAndOS = function() {
		var rand = MathUtil.randomInteger(0, 100);

		var browser = '';

		if (rand <= 34) {
			browser = 'chrome';
		} else if (rand > 34 && rand <= 62) {
			browser = 'iexplorer';
		} else if (rand > 62 && rand <= 87) {
			browser = 'firefox';
		} else if (rand > 87 && rand <= 94) {
			browser = 'safari';
		} else {
			browser = 'opera';
		}

		var os_list = ['win', 'mac', 'lin'];

		var os_percentage = {
			chrome: [89, 9, 2],
			firefox: [83, 16, 1],
			safari: [4, 96, 0],
			opera: [91, 3, 6],
			iexplorer: [100, 0, 0]
		};

		var os = (rand <= os_percentage[browser][0]) ? os_list[0]
			: (rand <= os_percentage[browser][1] + os_percentage[browser][0]) ? os_list[1]
			: os_list[2];

		return [browser, os];
	};

	/**
	 * ger proc name
	 * @param arch {string} - win, mac or lin
	 * @returns {string} - sample proc name
	 */
	Random.proc = function(arch) {
		var procs = {
			win:['', 'WOW64', 'Win64; x64'],
			mac:['Intel', 'PPC', 'U; Intel', 'U; PPC'],
			lin:['i686', 'x86_64']
		};
		return MathUtil.getSample(procs[arch]);
	};

	/**
	 * generate a random revision
	 * dots = 2 returns .x.y where x & y are between 0 and 9
	 * @param dots
	 * @returns {string}
	 */
	Random.revision = function(dots) {
		var return_val = '';
		for (var x = 0; x < dots; x++) {
			return_val += '.' + MathUtil.randomInteger(0, 9);
		}
		return return_val;
	};

	/**
	 * random software version string
	 * @param software {string} - input software name
	 * @param delim {string=} - delimiter (optional) for returning osx
	 * @returns {string} - version string
	 */
	Random.versionString = function(software, delim) {

		delim = delim || '';

		switch (software) {
			case 'net':
				return [MathUtil.randomInteger(1, 4), MathUtil.randomInteger(0, 9), MathUtil.randomInteger(10000, 99999), MathUtil.randomInteger(0, 9)].join('.');
			case 'nt':
				return MathUtil.randomInteger(5, 6) + '.' + MathUtil.randomInteger(0, 2);
			case 'ie':
				return MathUtil.randomInteger(8, 11) + '.0';
			case 'trident':
				return MathUtil.randomInteger(4, 6) + '.' + MathUtil.randomInteger(0, 1);
			case 'osx':
				return [10, MathUtil.randomInteger(6, 9), MathUtil.randomInteger(0, 9)].join(delim || '.');
			case 'chrome':
				return [MathUtil.randomInteger(34, 38), 0, MathUtil.randomInteger(2000, 2500), 0].join('.');
			case 'presto':
				return '2.12.' + MathUtil.randomInteger(160, 190);
			case 'presto2':
				return MathUtil.randomInteger(10, 12) + '.00';
			default:
				return '';
		}
	};

	/**
	 * random user agent, forked from https://github.com/jmealo/random-ua.js
	 * @returns {string}
	 */
	Random.userAgent = function() {

		var browser = Random.browserAndOS();
		var proc = Random.proc(browser[1]);

		var os_ver = '';
		var safari = '';
		var ver = '';

		switch (browser[0]) {
			case 'firefox':
				//https://developer.mozilla.org/en-US/docs/Gecko_user_agent_string_reference
				var firefox_ver = MathUtil.randomInteger(25, 31) + Random.revision(1);

				var gecko_ver = 'Gecko/20100101 Firefox/' + firefox_ver;

				switch (browser[1]) {
					case 'win':
						os_ver = '(Windows NT ' + Random.versionString('nt') + ((proc) ? '; ' + proc : '');
						break;
					case 'mac':
						os_ver = '(Macintosh; ' + proc + ' Mac OS X ' + Random.versionString('osx');
						break;
					default:
						os_ver = '(X11; Linux ' + proc;
						break;
				}

				return 'Mozilla/5.0 ' + os_ver + '; rv:' + firefox_ver.slice(0, -2) + ') ' + gecko_ver;

			case 'iexplorer':
				return 'Mozilla/5.0 (compatible; MSIE ' + Random.versionString('ie') + '; Windows NT ' + Random.versionString('nt') + '; Trident/' +
					Random.versionString('trident') + ((MathUtil.randomInteger(0, 1) === 1) ? '; .NET CLR ' + Random.versionString('net') : '') + ')';

			case 'opera':
				var presto_ver = ' Presto/' + Random.versionString('presto') + ' Version/' + Random.versionString('presto2') + ')';

				switch (browser[1]) {
					case 'win':
						os_ver = '(Windows NT ' + Random.versionString('nt') + '; U; ' + Random.lang() + presto_ver;
						break;
					case 'lin':
						os_ver = '(X11; Linux ' + proc + '; U; ' + Random.lang() + presto_ver;
						break;
					default:
						os_ver = '(Macintosh; Intel Mac OS X ' + Random.versionString('osx') + ' U; ' + Random.lang() + ' Presto/' +
							Random.versionString('presto') + ' Version/' + Random.versionString('presto2') + ')';
						break;
				}

				return 'Opera/' + MathUtil.randomInteger(9, 12) + '.' + MathUtil.randomInteger(0, 99) + ' ' + os_ver;

			case 'safari':
				safari = MathUtil.randomInteger(531, 536) + '.' + MathUtil.randomInteger(1, 50) + '.' + MathUtil.randomInteger(1, 7);
				ver = MathUtil.randomInteger(4, 5) + '.' + ((MathUtil.randomInteger(0, 1) === 0) ? '0.' + MathUtil.randomInteger(1, 5) : MathUtil.randomInteger(0, 1));

				if (browser[1] === 'mac') {
					os_ver = '(Macintosh; ' + Random.proc('mac') + ' Mac OS X '+ Random.versionString('osx', '_') + ' rv:' + MathUtil.randomInteger(2, 6) + '.0; '+ Random.lang() + ') ';
				} else {
					os_ver = '(Windows; U; Windows NT ' + Random.versionString('nt') + ')';
				}

				return 'Mozilla/5.0 ' + os_ver + ' AppleWebKit/' + safari + ' (KHTML, like Gecko) Version/' + ver + ' Safari/' + safari;

			default:
			case 'chrome':
				safari = MathUtil.randomInteger(531, 536) + '.' + MathUtil.randomInteger(0, 2);
				ver = MathUtil.randomInteger(4, 5) + '.' + (MathUtil.randomInteger(0, 1) === 0) ? '0.' + MathUtil.randomInteger(1, 5) : MathUtil.randomInteger(0, 1);

				switch (browser[1]) {
					case 'mac':
						os_ver = '(Macintosh; ' + Random.proc('mac') + ' Mac OS X ' + Random.versionString('osx', '_') + ') ';
						break;
					case 'win':
						os_ver = '(Windows; U; Windows NT ' + Random.versionString('nt') + ')';
						break;
					default:
						os_ver = '(X11; Linux ' + Random.proc(browser[1]);
						break;
				}

				return 'Mozilla/5.0 ' + os_ver + ' AppleWebKit/' + safari + ' (KHTML, like Gecko) Chrome/' + Random.versionString('chrome') + ' Safari/' + safari;
		}
	};

	/**
	 * get random language code of ISO-639-1
	 * @returns {string} - random language code
	 */
	Random.lang = function() {
		var lang = [
			'ab', 'aa', 'af', 'ak', 'sq', 'am', 'ar', 'an', 'hy', 'as',
			'av', 'ae', 'ay', 'az', 'bm', 'ba', 'eu', 'be', 'bn', 'bh',
			'bi', 'bs', 'br', 'bg', 'my', 'ca', 'ch', 'ce', 'ny', 'zh',
			'cv', 'kw', 'co', 'cr', 'hr', 'cs', 'da', 'dv', 'nl', 'dz',
			'en', 'eo', 'et', 'ee', 'fo', 'fj', 'fi', 'fr', 'ff', 'gl',
			'ka', 'de', 'el', 'gn', 'gu', 'ht', 'ha', 'he', 'hz', 'hi',
			'ho', 'hu', 'ia', 'id', 'ie', 'ga', 'ig', 'ik', 'io', 'is',
			'it', 'iu', 'ja', 'jv', 'kl', 'kn', 'kr', 'ks', 'kk', 'km',
			'ki', 'rw', 'ky', 'kv', 'kg', 'ko', 'ku', 'kj', 'la', 'lb',
			'lg', 'li', 'ln', 'lo', 'lt', 'lu', 'lv', 'gv', 'mk', 'mg',
			'ms', 'ml', 'mt', 'mi', 'mr', 'mh', 'mn', 'na', 'nv', 'nd',
			'ne', 'ng', 'nb', 'nn', 'no', 'ii', 'nr', 'oc', 'oj', 'cu',
			'om', 'or', 'os', 'pa', 'pi', 'fa', 'pl', 'ps', 'pt', 'qu',
			'rm', 'rn', 'ro', 'ru', 'sa', 'sc', 'sd', 'se', 'sm', 'sg',
			'sr', 'gd', 'sn', 'si', 'sk', 'sl', 'so', 'st', 'es', 'su',
			'sw', 'ss', 'sv', 'ta', 'te', 'tg', 'th', 'ti', 'bo', 'tk',
			'tl', 'tn', 'to', 'tr', 'ts', 'tt', 'tw', 'ty', 'ug', 'uk',
			'ur', 'uz', 've', 'vi', 'vo', 'wa', 'cy', 'wo', 'fy', 'xh',
			'yi', 'yo', 'za', 'zu'];

		return MathUtil.getSample(lang);

	};

	module.exports = Random;

})();