/*
 * Shipment data model
 */

(function() {
	'use strict';

	var Utility = require('../utility');

	/**
	 * accept weight unit
	 * @readonly
	 * @enum {string}
	 */
	var ACCEPT_WEIGHT_UNIT = [
		'kg',
		'lb'
	];

	/**
	 * accept proof of delivery file format
	 * @readonly
	 * @enum {string}
	 */
	var ACCEPT_POD_FILE_FORMAT = [
		'pdf',
		'png'
	];

	/**
	 * @param shipment {Object}
	 * @constructor
	 */
	function Shipment(shipment) {
		shipment = shipment || {};

		/**
		 * Shipment type, free text, such as Express mail, 24 hours mail, etc
		 * @type {string|null}
		 * @private
		 */
		this._type = shipment.type || null;

		/**
		 * number of package for this shipment, numeric
		 * @type {number|null}
		 * @private
		 */
		this._package_count = shipment.package_count || null;

		/**
		 * weight of whole shipment, numeric
		 * @type {number|null}
		 * @private
		 */
		this._weight = shipment.weight || null;

		/**
		 * weight unit of the weight, ONLY accept 'kg' and 'lb'
		 * @type {ACCEPT_WEIGHT_UNIT|null}
		 * @private
		 */
		this._weight_unit = shipment.weight_unit || null;


		/**
		 * insurance value of the shipment, numeric
		 * @type {number|null}
		 * @private
		 */
		this._insured_amount = shipment.insured_amount || null;

		/**
		 * insurance currency of the shipment. Using ISO 4217 currency code
		 * @type {string|null}
		 * @private
		 */
		this._insured_currency = shipment.insured_currency || null;


		/**
		 * reference number from courier
		 * @type {string|null}
		 * @private
		 */
		this._reference_number = shipment.reference_number || null;

		/**
		 * order number from courier
		 * @type {string|null}
		 * @private
		 */
		this._order_number = shipment.order_number || null;

		/**
		 * pickup date, not accurate as timezone is unknown, use moment object for calculating delivery time
		 * @type {Object|null}
		 * @private
		 */
		this._pickup_date = shipment.pickup_date || null;

		/**
		 * delivery date, not accurate as timezone is unknown, use moment object for calculating delivery time
		 * @type {Object|null}
		 * @private
		 */
		this._delivered_date = shipment.delivered_date || null;

		/**
		 * scheduled delivery date string, format is limited
		 * @type {string|null}
		 * @private
		 */
		this._scheduled_delivery_date_string = shipment.scheduled_delivery_date_string || null;

		/**
		 * signed by, provided by courier
		 * @type {string|null}
		 * @private
		 */
		this._signed_by = shipment.signed_by || null;

		/**
		 * only store the extension
		 * proof of delivery, a url to proof of delivery
		 * http://bucket.s3.amazon.com/slug/tracking_number.png
		 * @type {ACCEPT_POD_FILE_FORMAT|null}
		 * @private
		 */
		this._proof_of_delivery = shipment.proof_of_delivery || null;

		/**
		 * next tracking number
		 * @type {string|null}
		 * @private
		 */
		this._next_tracking_number = shipment.next_tracking_number || null;

		/**
		 * next slug
		 * @type {string|null}
		 * @private
		 */
		this._next_slug = shipment.next_slug || null;
	}

	//Accessors

	/**
	 * set type
	 * @param val {string} - input type
	 * @returns {Shipment} - Shipment instance
	 */
	Shipment.prototype.setType = function(val) {
		this._type = Utility.CleanUp.cleanUpString(val);
		return this;
	};

	/**
	 * get type
	 * @returns {string|null} - shipment type
	 */
	Shipment.prototype.getType = function() {
		return this._type;
	};

	/**
	 * set package count
	 * @param val {number} - input package count, must be integer
	 * @returns {Shipment} - Shipment instance
	 */
	Shipment.prototype.setPackageCount = function(val) {
		this._package_count = parseInt(val);
		if (isNaN(this._package_count)) {
			this._package_count = null;
		}
		return this;
	};

	/**
	 * get package count
	 * @returns {number|null} - package count
	 */
	Shipment.prototype.getPackageCount = function() {
		return this._package_count;
	};

	/**
	 * set shipment weight
	 * @param val {number} - input shipment weight
	 * @returns {Shipment} - Shipment instance
	 */
	Shipment.prototype.setWeight = function(val) {
		this._weight = parseFloat(val);
		if (isNaN(this._weight)) {
			this._weight = null;
		}
		return this;
	};

	/**
	 * get shipment weight
	 * @returns {number|null} - shipment weight
	 */
	Shipment.prototype.getWeight = function() {
		return this._weight;
	};

	/**
	 * set shipment weight unit
	 * @param val {ACCEPT_WEIGHT_UNIT} - input weight unit
	 * @returns {Shipment} - Shipment instance
	 */
	Shipment.prototype.setWeightUnit = function(val) {
		this._weight_unit = Utility.CleanUp.cleanUpString(val);
		if (ACCEPT_WEIGHT_UNIT.indexOf(this._weight_unit) === -1) {
			this._weight_unit = null;
		}
		return this;
	};

	/**
	 * get shipment weight unit
	 * @returns {string|null}
	 */
	Shipment.prototype.getWeightUnit = function() {
		return this._weight_unit;
	};

	/**
	 * set insured amount
	 * @param val {number} - input insured amount
	 * @returns {Shipment} - Shipment instance
	 */
	Shipment.prototype.setInsuredAmount = function(val) {
		this._insured_amount = parseFloat(val);
		if (isNaN(this._insured_amount)) {
			this._insured_amount = null;
		}
		return this;
	};

	/**
	 * get insured amount
	 * @returns {number|null} - insured amount
	 */
	Shipment.prototype.getInsuredAmount = function() {
		return this._insured_amount;
	};

	/**
	 * set insured currency
	 * @param val {string} - input currency
	 * @returns {Shipment} - Shipment instance
	 */
	Shipment.prototype.setInsuredCurrency = function(val) {
		// TODO need to handle the ISO 4217 validation
		this._insured_currency = val;
		return this;
	};

	/**
	 * get insured currency
	 * @returns {string|null} - insured currency
	 */
	Shipment.prototype.getInsuredCurrency = function() {
		return this._insured_currency;
	};

	/**
	 * set reference number
	 * @param val {string} - input reference number
	 * @returns {Shipment} - Shipment instance
	 */
	Shipment.prototype.setReferenceNumber = function(val) {
		this._reference_number = Utility.CleanUp.cleanUpString(val);
		return this;
	};

	/**
	 * get reference number
	 * @returns {string|null} - reference number
	 */
	Shipment.prototype.getReferenceNumber = function() {
		return this._reference_number;
	};

	/**
	 * set order number
	 * @param val {string} - input order number
	 * @returns {Shipment} - Shipment instance
	 */
	Shipment.prototype.setOrderNumber = function(val) {
		this._order_number = Utility.CleanUp.cleanUpString(val);
		return this;
	};

	/**
	 * get order number
	 * @returns {string|null} - order number
	 */
	Shipment.prototype.getOrderNumber = function() {
		return this._order_number;
	};

	/**
	 * set pickup date
	 * @param val {Object} - input pickup date, moment object
	 * @returns {Shipment} - Shipment instance
	 */
	Shipment.prototype.setPickupDate = function(val) {
		if (val instanceof Object) {
			this._pickup_date = val;
		} else {
			this._pickup_date = null;
		}
		return this;
	};

	/**
	 * get pickup date
	 * @returns {Object|null} - pickup date object
	 */
	Shipment.prototype.getPickupDate = function() {
		return this._pickup_date;
	};

	/**
	 * set delivered date
	 * @param val {Object} - input delivered date, moment object
	 * @returns {Shipment} - Shipment instance
	 */
	Shipment.prototype.setDeliveredDate = function(val) {
		if (val instanceof Object) {
			this._delivered_date = val;
		} else {
			this._delivered_date = null;
		}
		return this;
	};

	/**
	 * get delivered date
	 * @returns {Object|null} - delivered date object
	 */
	Shipment.prototype.getDeliveredDate = function() {
		return this._delivered_date;
	};

	/**
	 * use class or helper to constrain the input and output format
	 * set scheduled delivery date string
	 * @param val {string} - date string
	 * @param format {string} - date string
	 * @returns {Shipment} - Shipment instance
	 */
	Shipment.prototype.setScheduledDeliveryDateString = function(val, format) {
		this._scheduled_delivery_date_string = Utility.Datetime.formatString(val, format);
		return this;
	};

	/**
	 * get scheduled delivery date string
	 * @returns {string|null}
	 */
	Shipment.prototype.getScheduledDeliveryDateString = function() {
		return this._scheduled_delivery_date_string;
	};

	/**
	 * set signed by
	 * @param val {string} - input signed by
	 * @returns {Shipment} - Shipment instance
	 */
	Shipment.prototype.setSignedBy = function(val) {
		this._signed_by = Utility.CleanUp.cleanUpString(val);
		return this;
	};

	/**
	 * get signed by
	 * @returns {string|null} - signed by
	 */
	Shipment.prototype.getSignedBy = function() {
		return this._signed_by;
	};

	/**
	 * set proof of delivery document, only store the file extension
	 * @param val {ACCEPT_POD_FILE_FORMAT} - input file extension
	 * @returns {Shipment} - Shipment instance
	 */
	Shipment.prototype.setProofOfDelivery = function(val) {
		if (ACCEPT_POD_FILE_FORMAT.indexOf(val) === -1) {
			this._proof_of_delivery = null;
		} else {
			this._proof_of_delivery = val;
		}
		return this;
	};

	/**
	 * get proof of delivery file extension
	 * @returns {string|null}
	 */
	Shipment.prototype.getProofOfDelivery = function() {
		return this._proof_of_delivery;
	};

	/**
	 * set next tracking number
	 * @param val {string} - input next tracking number
	 * @returns {Shipment} - Shipment instance
	 */
	Shipment.prototype.setNextTrackingNumber = function(val) {
		this._next_tracking_number = Utility.CleanUp.cleanUpString(val);
		return this;
	};

	/**
	 * get next tracking number
	 * @returns {string|null} - next tracking number
	 */
	Shipment.prototype.getNextTrackingNumber = function() {
		return this._next_tracking_number;
	};

	/**
	 * set next slug
	 * @param val {string} - input slug
	 * @returns {Shipment} - Shipment instance
	 */
	Shipment.prototype.setNextSlug = function(val) {
		this._next_slug = Utility.CleanUp.cleanUpString(val);
		return this;
	};

	/**
	 * get next slug
	 * @returns {string|null} - next slug
	 */
	Shipment.prototype.getNextSlug = function() {
		return this._next_slug;
	};

	/**
	 * return accept weight unit array
	 * @returns {string[]}
	 */
	Shipment.getAcceptWeightUnit = function() {
		return ACCEPT_WEIGHT_UNIT;
	};

	/**
	 * return accept proof of delivery file format
	 * @returns {string[]}
	 */
	Shipment.getAcceptPodFileFormat = function() {
		return ACCEPT_POD_FILE_FORMAT;
	};

	module.exports = Shipment;

})();