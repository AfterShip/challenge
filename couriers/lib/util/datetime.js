(function () {
	'use strict';

	var moment = require('moment');


	function Datetime() {

	}

	/**
	 * format date string to following formats:
	 *
	 * 'YYYY-MM-DDTHH:mm:ssZ'
	 * 'YYYY-MM-DDTHH:mm:ss'
	 * 'YYYY-MM-DDTHH:mm'
	 * 'YYYY-MM-DD'
	 * 'HH:mm:ss'
	 * 'HH:mm'
	 * null
	 *
	 * @param val {string} - input datetime string
	 * @param format {string} - Accepted token: YY, YYYY, M, MM, MMM, MMMM, D, DD, H, HH, m, mm, s, ss, Z, ZZ
	 * @returns {string} - formatted date string
	 */
	Datetime.formatString = function (val, format) {
		if (!val) {
			return null;
		}

		var format_tokens = {
			year: false,
			month: false,
			day: false,
			hour: false,
			minute: false,
			second: false,
			timezone: false
		};

		var date = moment.utc(val, format);

		if (!date.isValid()) {
			return null;
		}

		if (format.match(/(YY|YYYY)/)) {
			format_tokens.year = true;
		}

		if (format.match(/[M]{1,4}/)) {
			format_tokens.month = true;
		}

		if (format.match(/[D]{1,2}/)) {
			format_tokens.day = true;
		}

		if (format.match(/[h]{1,2}/i)) {
			format_tokens.hour = true;
		}

		if (format.match(/[m]{1,2}/)) {
			format_tokens.minute = true;
		}

		if (format.match(/[s]{1,2}/)) {
			format_tokens.second = true;
		}

		if (format.match(/[Z]{1,2}/)) {
			format_tokens.timezone = true;

			//apply the specific timezone back to momentjs object so that when output with format YYYY-MM-DD HH:mm:ss Z
			//it will return the timezone of user input rather than system timezone

			//e.g. input '2014/06/25 18:00:00 +06:00', 'YYYY/MM/DD HH:mm:ss Z'
			//when running moment.utc(date, format).format('YYYY-MM-DDTHH:mm:ssZ')
			//if you run under hong kong timezone system
			//it will always return 2014-06-25T20:00:00+08:00 (timezone is correctly set but never return with timezone setup by user)
			//therefore need to run this line in order to let it return 2014-06-25T18:00:00+06:00

			date.zone(date._tzm);
		}

		var output_date_format = '';
		var output_time_format = '';
		var output_timezone_format = '';

		//year dont come informed and month does
		if(!format_tokens.year &&format_tokens.month ){
			var date_now = moment.utc();
			if(date_now.month() === date.month){
				if(date_now.date >= date.date ){
					date.year(date_now.year());
				}else{
					date.year(date_now.year()-1);
				}
			}else if(date_now.month() < date.month()){
				date.year(date_now.year()-1);

			}else{
				date.year(date_now.year());
			}
			format_tokens.year = true;
		}

		if (format_tokens.year && format_tokens.month && format_tokens.day) {
			output_date_format = 'YYYY-MM-DD';
		}

		if (format_tokens.hour && format_tokens.minute) {
			output_time_format = 'HH:mm';
		}

		if (format_tokens.second && output_time_format !== '') {
			output_time_format += ':ss';
		}

		if (output_date_format !== '' && output_time_format !== '' && format_tokens.timezone) {
			output_timezone_format = 'Z';
		}

		var merged_format = [];
		if (output_date_format !== '') {
			merged_format.push(output_date_format);
		}
		if (output_time_format !== '') {
			merged_format.push(output_time_format);
		}

		merged_format = merged_format.join('T');

		merged_format += output_timezone_format;

		return date.format(merged_format);
	};

	module.exports = Datetime;

})();
