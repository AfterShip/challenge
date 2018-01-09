/*
 * Abstract crawler class
 */

(function() {
	'use strict';

	var request = require('request'),
		_ = require('lodash'),
		async = require('async'),
		Utility = require('./utility'),
		GeneralError = require('./models/general_error');

	//config
	var default_config = {
		// slug <-- for debug usage only
		// number_of_token_per_job
		number_of_trackings_per_job: 1
	};

	/**
	 * @constructor
	 */
	function AbstractCourier() {
		this._start_time = process.hrtime();

		if (!this.config) {
			this.config = {};
		}

		if (!_.isString(this.config.slug)) {
			throw new Error('config.slug is undefined.');
		}

		if (!_.isNumber(this.config.number_of_token_per_job)) {
			throw new Error('config.number_of_token_per_job is undefined.');
		}

		this.config = _.merge(this.config, default_config);
	}

	/**
	 * Get Slug
	 * @returns {string} slug
	 */
	AbstractCourier.prototype.getSlug = function() {
		return this.config.slug;
	};

	/**
	 * Get Number of Trackings Per Job
	 * @returns {number}
	 */
	AbstractCourier.prototype.getNumberOfTrackingsPerJob = function() {
		return this.config.number_of_trackings_per_job;
	};

	/**
	 * Get Number of Token Per Job
	 * @returns {number}
	 */
	AbstractCourier.prototype.getNumberOfTokenPerJob = function() {
		return this.config.number_of_token_per_job;
	};


	/**
	 * Check if the tracking number is in valid format
	 * @param trackings {Trackings} - input trackings
	 * @param callback return the new trackings
	 */
	AbstractCourier.prototype.validateTrackings = function(trackings, callback) {
		console.log(Utility.Timer.micro() + ': ' + this.config.slug + ' validate trackings');
		callback(null, trackings);
	};

	/**
	 * Pre Process on each trackings
	 * @param trackings {Trackings} - input trackings
	 * @param callback return the new trackings
	 */
	AbstractCourier.prototype.preProcess = function(trackings, callback) {
		console.log(Utility.Timer.micro() + ': ' + this.config.slug + ' pre process');
		/*
		 var _this = this;
		 trackings.forEach(function(tracking) {
		 tracking.setSlug(_this.config.slug);
		 });
		 */
		callback(null, trackings);
	};

	/**
	 * Create a request
	 * @param trackings {Trackings} - input trackings
	 * @param callback {function(string, Object)} - return error and option hash for Request module
	 */
	AbstractCourier.prototype.createRequest = function(trackings, callback) {
		console.log(Utility.Timer.micro() + ': ' + this.config.slug + ' create request');
		callback(null, null);
	};

	/**
	 * Make a request
	 * @param params
	 * @param callback return an error, response, body
	 */
	AbstractCourier.prototype.makeRequest = function(params, callback) {
		console.log(Utility.Timer.micro() + ': ' + this.config.slug + ' request');
		if (!params) {
			throw new Error('makeRequest params is undefined.');
		} else {
			request(params, function(err, response, body) {
				if (err) {
					callback(new GeneralError(1), response, body);
				} else {
					if (response.statusCode === 200) {
						callback(null, response, body);
					} else {
						callback(new GeneralError(response.statusCode, response.message), response, body);
					}
				}
			});
		}
	};

	/**
	 * Convert the result to object, separate the result for several trackings
	 * @param trackings {Trackings} - input trackings
	 * @param response_body {string} - response
	 * @param callback {function()} callback return the new trackings, Format: {trackingNumber_1:result_1, trackingNumber_2:result_2 ......... }
	 */
	AbstractCourier.prototype.beforeParse = function(trackings, response_body, callback) {
		console.log(Utility.Timer.micro() + ': ' + this.config.slug + ' before parse');
		console.log(trackings);
		console.log(response_body);
		console.log(callback);
		throw new Error('before parse method not implemented');
	};

	/**
	 * Check the DNA, if it is unchanged, generate an error
	 * @param trackings {Trackings} - input trackings
	 * @param results
	 * @param callback return the new trackings
	 */
	AbstractCourier.prototype.checkDna = function(trackings, results, callback) {
		console.log(Utility.Timer.micro() + ': ' + this.config.slug + ' check dna');
		for (var i = 0; i < trackings.length; i++) {
			if (trackings[i].getError()) {
				continue;
			}

			var result = results[trackings[i].getTrackingNumber()];

			if (result) {
				try {
					var json_string = JSON.stringify(result);
					if (json_string) {
						// return false if dna is not changed else new DNA value
						var new_dna = trackings[i].isDnaChanged(json_string);
						if (new_dna) {
							trackings[i].setDna(new_dna);
						} else {
							// DNA is not changed
							trackings[i].setError(new GeneralError(802));
						}
					}
				} catch (e) {
					trackings[i].setError(new GeneralError(807));
				}
			} else {
				trackings[i].setError(new GeneralError(801));
			}
		}

		callback(null, trackings);
	};

	/**
	 * Parse the data, and insert it into trackings
	 * @param trackings {Trackings} - input trackings
	 * @param results {Object} - resutls from couriers
	 * @param callback {function(string, trackings)} - callback with new trackings
	 */
	AbstractCourier.prototype.parse = function(trackings, results, callback) {
		console.log(Utility.Timer.micro() + ': ' + this.config.slug + ' parse');
		console.log(trackings);
		console.log(results);
		console.log(callback);
		throw new Error('parse method not implemented');
	};


	AbstractCourier.prototype.getStartTime = function(){
		return this._start_time;
	};

	/**
	 * Get Trackings
	 * @param trackings {Trackings} - input trackings
	 * @param final_callback
	 */
	AbstractCourier.prototype.getTrackings = function(trackings, final_callback) {
		console.log(Utility.Timer.micro() + ': ' + this.config.slug + ' crawling');
		var _this = this;
		async.waterfall([
			function(callback) {
				_this.preProcess(trackings, function(err, trackings) {
					if (err) {
						callback(err, trackings);
					} else {
						callback(null);
					}
				});
			},
			function(callback) {
				// check if the tracking number is in valid format
				_this.validateTrackings(trackings, function(err, trackings) {
					if (err) {
						callback(err, trackings);
					} else {
						// save back the result
						callback(null);
					}
				});
			},
			function(callback) {
				if (_this.browser) {
					_this.browser(trackings, function(err, body) {
						if (err) {
							callback(err, trackings);
						} else {
							callback(null, body);
						}
					});
				} else {
					async.waterfall([
						function(callback_inner) {
							// create the request params
							_this.createRequest(trackings, function(err, params) {
								if (err) {
									callback_inner(err, trackings);
								} else {
									callback_inner(null, params);
								}
							});
						},
						function(params, callback_inner) {
							// make a request
							_this.makeRequest(params, function(err, response, body) {
								if (err) {
									callback_inner(err, trackings);
								} else {
									callback_inner(null, body);
								}
							});
						}
					], function(err, result) {
						//result or trackings
						callback(err, result);
					});
				}
			},
			function(response_body, callback) {
				// convert the result, separate the result for several trackings
				_this.beforeParse(trackings, Utility.CleanUp.cleanUpString(response_body), function(err, results) {
					if (err) {
						console.log('error in cleanup');
						callback(err, trackings);
					} else {
						// the results is NOT a tracking Class
						callback(null, results);
					}
				});
			},
			function(results, callback) {
				//console.log(JSON.stringify(results, null, 4));
				// check the dna, if dna is changed, assign new dna to tracking, otherwise, generate error
				_this.checkDna(trackings, results, function(err, trackings) {
					if (err) {
						callback(err, trackings);
					} else {
						callback(null, results);
					}
				});
			},
			function(results, callback) {
				_this.parse(trackings, results, function(err, trackings) {
					if (err) {
						callback(err, trackings);
					} else {
						callback(null, trackings);
					}
				});
			}
		], function(err, trackings) {
				console.log(Utility.Timer.micro() + ': ' + _this.config.slug + ' finish');
				var diff = process.hrtime(_this.getStartTime());
				console.log('getTrackings took %d seconds', (diff[0] * 1e9 + diff[1]) / 1000 / 1000 / 1000);
				/*
				if (err) {
					console.log('err: ' + err);
				}
				*/
				final_callback(err, trackings);
			}
		);
	};

	module.exports = AbstractCourier;

})();
