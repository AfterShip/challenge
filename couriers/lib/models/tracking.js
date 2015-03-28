/*
 * Tracking data model
 */

(function() {
	'use strict';

	var Address = require('./address');
	var Shipment = require('./shipment');
	var Utility = require('../utility');
	var GeneralError = require('./general_error');

	/**
	 * @param tracking {Object}
	 * @constructor
	 */
	function Tracking(tracking) {
		tracking = tracking || {};

		/**
		 * error of this tracking
		 * @type {GeneralError|null}
		 * @private
		 */
		this._error = null;

		/**
		 * DNA (data digest) of this tracking, used for identifying whether tracking information changed
		 * @type {string|null}
		 * @private
		 */
		this._dna = tracking.dna || null;

		/**
		 * mongo id of this tracking
		 * @type {string|null}
		 * @private
		 */
		this._tracking_id = tracking.tracking_id || null;

		/**
		 * tracking number of this tracking
		 * @type {string|null}
		 * @private
		 */
		this._tracking_number = tracking.tracking_number || null;

		/**
		 * courier slug of this tracking
		 * @type {string|Function}
		 * @private
		 */
		this._slug = tracking.slug || null;

		/**
		 * Origin address of this tracking
		 * @type {Address}
		 * @private
		 */
		this._origin_address = tracking.origin_address || new Address();

		/**
		 * Destination address of this tracking
		 * @type {Address}
		 * @private
		 */
		this._destination_address = tracking.destination_address || new Address();

		/**
		 * Checkpoints of this tracking
		 * @type {Array}
		 * @private
		 */
		this._checkpoints = tracking.checkpoints || [];

		/**
		 * Shipment of this tracking
		 * @type {Shipment}
		 * @private
		 */
		this._shipment = tracking.shipment || new Shipment();
	}

	//Accessors
	/**
	 * set error
	 * @param val {GeneralError} - input error
	 * @returns {Tracking} - Tracking instance
	 */
	Tracking.prototype.setError = function(val) {
		this._error = val;
		return this;
	};

	/**
	 * get error
	 * @returns {GeneralError|null} - error or null
	 */
	Tracking.prototype.getError = function() {
		return this._error;
	};

	/**
	 * set DNA
	 * @param val {string} - input dna
	 * @returns {Tracking} - Tracking instance
	 */
	Tracking.prototype.setDna = function(val) {
		this._dna = Utility.CleanUp.cleanUpString(val);
		return this;
	};

	/**
	 * get DNA
	 * @returns {string|null} - dna or null
	 */
	Tracking.prototype.getDna = function() {
		return this._dna;
	};

	/**
	 * set Tracking id
	 * @param val {string} - input tracking id
	 * @returns {Tracking} - Tracking instance
	 */
	Tracking.prototype.setTrackingId = function(val) {
		this._tracking_id = Utility.CleanUp.cleanUpString(val);
		return this;
	};

	/**
	 * get Tracking id
	 * @returns {string|null} - tracking id or null
	 */
	Tracking.prototype.getTrackingId = function() {
		return this._tracking_id;
	};

	/**
	 * set tracking number
	 * @param val {string} - input tracking number
	 * @returns {Tracking} - Tracking instance
	 */
	Tracking.prototype.setTrackingNumber = function(val) {
		this._tracking_number = Utility.CleanUp.cleanUpString(val);
		return this;
	};

	/**
	 * get tracking number
	 * @returns {string|null} - tracking number or null
	 */
	Tracking.prototype.getTrackingNumber = function() {
		return this._tracking_number;
	};

	/**
	 * set slug
	 * @param val {string} - input slug
	 * @returns {Tracking} - Tracking instance
	 */
	Tracking.prototype.setSlug = function(val) {
		this._slug = Utility.CleanUp.cleanUpString(val);
		return this;
	};

	/**
	 * get slug
	 * @returns {string|null} - slug or null
	 */
	Tracking.prototype.getSlug = function() {
		return this._slug;
	};

	/**
	 * set origin address
	 * @param val {Address} - input address
	 * @returns {Tracking} - Tracking instance
	 */
	Tracking.prototype.setOriginAddress = function(val) {
		if (val instanceof Address) {
			this._origin_address = val;
		} else {
			this._origin_address = null;
		}
		return this;
	};

	/**
	 * get origin address
	 * @returns {Address} - origin address
	 */
	Tracking.prototype.getOriginAddress = function() {
		return this._origin_address;
	};

	/**
	 * set destination address
	 * @param val {Address} - input address
	 * @returns {Tracking} - Tracking instance
	 */
	Tracking.prototype.setDestinationAddress = function(val) {
		if (val instanceof Address) {
			this._destination_address = val;
		} else {
			this._destination_address = null;
		}
		return this;
	};

	/**
	 * get destination address
	 * @returns {Address} - destination address
	 */
	Tracking.prototype.getDestinationAddress = function() {
		return this._destination_address;
	};

	/**
	 * set checkpoints
	 * @param val {Array} - input checkpoints
	 * @returns {Tracking} - Tracking instance
	 */
	Tracking.prototype.setCheckpoints = function(val) {
		if (val instanceof Array) {
			this._checkpoints = val;
		} else {
			this._checkpoints = [];
		}
		return this;
	};

	/**
	 * get checkpoints
	 * @returns {Array} - checkpoints
	 */
	Tracking.prototype.getCheckpoints = function() {
		return this._checkpoints;
	};

	/**
	 * set shipment
	 * @param val {Shipment} - input shipment
	 * @returns {Tracking} - Tracking instance
	 */
	Tracking.prototype.setShipment = function(val) {
		if (val instanceof Shipment) {
			this._shipment = val;
		} else {
			this._shipment = null;
		}
		return this;
	};

	/**
	 * get shipment
	 * @returns {Shipment} - shipment
	 */
	Tracking.prototype.getShipment = function() {
		return this._shipment;
	};


	/**
	 * compare the response with the dna and check if the response changed
	 * @param response {string} - new input response string to be compared
	 * @returns {string|bool} - return new dna if changed, return false if DNA are the same
	 */
	Tracking.prototype.isDnaChanged = function(response) {
		var new_dna = Utility.CryptoHash.sha1(response);
		return (new_dna !== this.getDna()) ? new_dna : false;
	};

	/**
	 * Generate a tracking with an error
	 *
	 * @param code_error {int} The code of the error
	 * @param message {string} Optional, the message that will be informed in the error. If is not
	 * informed the function will add one for that code
	 * @returns {Tracking} - Tracking instance
	 */
	Tracking.prototype.generateError = function(code_error, message) {
		this.setError(new GeneralError(code_error, message));
		return this;
	};

	//todo
	Tracking.prototype.mergeCheckpoints = function(another_tracking) {

		this._dna = this._dna || another_tracking._dna;
		this._tracking_id = this._tracking_id || another_tracking._tracking_id;
		this._tracking_number = this._tracking_number || another_tracking._tracking_number;
		this._slug = this._slug || another_tracking._slug;

		//origin Address
		this._origin_address.country_iso3 = this._origin_address.country_iso3 ||
			another_tracking._origin_address.country_iso3;
		this._origin_address.state = this._origin_address.state ||
			another_tracking._origin_address.country_iso3;
		this._origin_address.city = this._origin_address.city ||
			another_tracking._origin_address.country_iso3;
		this._origin_address.zip = this._origin_address.zip ||
			another_tracking._origin_address.country_iso3;
		this._origin_address.street_address = this._origin_address.street_address ||
			another_tracking._origin_address.country_iso3;
		this._origin_address.coordinates = this._origin_address.coordinates ||
			another_tracking._origin_address.country_iso3;

		//destination Address
		this._destination_address.country_iso3 = this._destination_address.country_iso3 ||
			another_tracking._destination_address.country_iso3;
		this._destination_address.state = this._destination_address.state ||
			another_tracking._destination_address.country_iso3;
		this._destination_address.city = this._destination_address.city ||
			another_tracking._destination_address.country_iso3;
		this._destination_address.zip = this._destination_address.zip ||
			another_tracking._destination_address.country_iso3;
		this._destination_address.street_address = this._destination_address.street_address ||
			another_tracking._destination_address.country_iso3;
		this._destination_address.coordinates = this._destination_address.coordinates ||
			another_tracking._destination_address.country_iso3;

		//shipments
		this._shipment.type = this._shipment.type || another_tracking._shipment.type;
		this._shipment.package_count = this._shipment.package_count || another_tracking._shipment.package_count;

		this._shipment.weight = this._shipment.weight || another_tracking._shipment.weight;
		this._shipment.weight_unit = this._shipment.weight_unit || another_tracking._shipment.weight_unit;

		this._shipment.reference_number = this._shipment.reference_number || another_tracking._shipment.reference_number;
		this._shipment.pickup_date = this._shipment.pickup_date || another_tracking._shipment.pickup_date;
		this._shipment.delivered_date = this._shipment.delivered_date || another_tracking._shipment.delivered_date;
		this._shipment.scheduled_delivery_date_string = this._shipment.scheduled_delivery_date_string || another_tracking._shipment.scheduled_delivery_date_string;

		this._shipment.signed_by = this._shipment.signed_by || another_tracking._shipment.signed_by;
		this._shipment.proof_of_delivery = this._shipment.proof_of_delivery || another_tracking._shipment.proof_of_delivery;

		this._shipment.next_tracking_number = this._shipment.next_tracking_number || another_tracking._shipment.next_tracking_number;
		this._shipment.next_slug = this._shipment.next_slug || another_tracking._shipment.next_slug;


		//finally merge checkpoints by checkpoint_time_string!!
		function sortByKey(array, key) {
			return array.sort(function(a, b) {
				var x = a[key];
				var y = b[key];
				return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			});
		}

		this._checkpoints = sortByKey(this._checkpoints.concat(another_tracking._checkpoints), 'checkpoint_time_string');


	};


	module.exports = Tracking;

})();



