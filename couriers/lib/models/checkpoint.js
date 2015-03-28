/*
 * Check point data model
 */

(function() {
	'use strict';

	var Address = require('./address');

	var Utility = require('../utility');

	/**
	 * accept checkpoint tag
	 * @readonly
	 * @enum {string}
	 */
	var ACCEPT_TAG = [
		'Pending',
		'InfoReceived',
		'InTransit',
		'OutForDelivery',
		'AttemptFail',
		'Exception',
		'Delivered',
		'Expired'
	];

	/**
	 * @param checkpoint
	 * @constructor
	 */
	function Checkpoint(checkpoint) {
		checkpoint = checkpoint || {};

		/**
		 * checkpoint message
		 * @type {string|null}
		 * @private
		 */
		this._message = checkpoint.message || null;

		/**
		 * checkpoint tag
		 * @type {ACCEPT_TAG|null}
		 * @private
		 */
		this._tag = checkpoint.tag || null;

		/**
		 * checkpoint datetime, moment object
		 * @type {Object|null}
		 * @private
		 */
		this._checkpoint_time = checkpoint.checkpoint_time || null;

		/**
		 * checkpoint datetime string
		 * @type {string|null}
		 * @private
		 */
		this._checkpoint_time_string = checkpoint.checkpoint_time_string || null;

		/**
		 * checkpoint address
		 * @type {Address|null}
		 * @private
		 */
		this._address = checkpoint.address || new Address();

		/**
		 * identify the batch which created this checkpoint
		 * @type {number}
		 * @private
		 */
		this._batch_no = 0;
	}

	//Accessors

	/**
	 * set message
	 * @param val {string} - input message
	 * @returns {Checkpoint} - Checkpoint instance
	 */
	Checkpoint.prototype.setMessage = function(val) {
		this._message = Utility.CleanUp.cleanUpString(val);
		return this;
	};

	/**
	 * get message
	 * @returns {string|null} - message
	 */
	Checkpoint.prototype.getMessage = function() {
		return this._message;
	};

	/**
	 * set tag
	 * @param val {ACCEPT_TAG} - tag
	 * @returns {Checkpoint} - Checkpoint instance
	 */
	Checkpoint.prototype.setTag = function(val) {
		if (ACCEPT_TAG.indexOf(val) === -1) {
			this._tag = null;
		} else {
			this._tag = val;
		}
		return this;
	};

	/**
	 * get tag
	 * @returns {string|null} - tag
	 */
	Checkpoint.prototype.getTag = function() {
		return this._tag;
	};

	/**
	 * set checkpoint time
	 * @param val {Object} - input checkpoint time, moment object
	 * @returns {Checkpoint} - Checkpoint instance
	 */
	Checkpoint.prototype.setCheckpointTime = function(val) {
		if (val instanceof Object) {
			this._checkpoint_time = val;
		} else {
			this._checkpoint_time = null;
		}
		return this;
	};

	/**
	 * get checkpoint time
	 * @returns {date|null} - Checkpoint time
	 */
	Checkpoint.prototype.getCheckpointTime = function() {
		return this._checkpoint_time;
	};

	/**
	 * set checkpoint time string
	 * @param val {string} - input checkpoint time string
	 * @param format {string} - date string format
	 * @returns {Checkpoint} - Checkpoint instance
	 */
	Checkpoint.prototype.setCheckpointTimeString = function(val, format) {
		this._checkpoint_time_string = Utility.Datetime.formatString(val, format);
		return this;
	};

	/**
	 * get checkpoint time string
	 * @returns {string|null} - checkpoint time string
	 */
	Checkpoint.prototype.getCheckpointTimeString = function() {
		return this._checkpoint_time_string;
	};

	/**
	 * set address
	 * @param val {Address} - input address
	 * @returns {Checkpoint} - Checkpoint instance
	 */
	Checkpoint.prototype.setAddress = function(val) {
		if (val instanceof Address) {
			this._address = val;
		} else {
			this._address = null;
		}
		return this;
	};

	/**
	 * get address
	 * @returns {Address|null} - address
	 */
	Checkpoint.prototype.getAddress = function() {
		return this._address;
	};

	/**
	 * set batch no
	 * @param val {number} - input batch number
	 * @returns {Checkpoint} - Checkpoint instance
	 */
	Checkpoint.prototype.setBatchNo = function(val) {
		this._batch_no = parseInt(val);
		if (isNaN(this._batch_no)) {
			this._batch_no = 0;
		}
		return this;
	};

	/**
	 * get batch no
	 * @returns {number} - batch no
	 */
	Checkpoint.prototype.getBatchNo = function() {
		return this._batch_no;
	};

	/**
	 * get available tags
	 * @returns {string[]}
	 */
	Checkpoint.getAvailableTags = function() {
		return ACCEPT_TAG;
	};

	module.exports = Checkpoint;
})();