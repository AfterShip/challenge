/*
 * Address data model
 */

(function() {
	'use strict';

	var Utility = require('../utility');

	/**
	 * @param address {Object}
	 * @constructor
	 */
	function Address(address){
		address = address || {};

		/**
		 * country iso3
		 * @type {string|null}
		 * @private
		 */
		this._country_iso3 = address.country_iso3 || null;

		/**
		 * state
		 * @type {string|null}
		 * @private
		 */
		this._state = address.state || null;

		/**
		 * city
		 * @type {string|null}
		 * @private
		 */
		this._city = address.city || null;

		/**
		 * zip
		 * @type {string|null}
		 * @private
		 */
		this._zip = address.zip || null;

		/**
		 * street address
		 * @type {string|null}
		 * @private
		 */
		this._street_address = address.street_address || null;

		/**
		 * coordinate
		 * @type {Array}
		 * @private
		 */
		this._coordinates = address.coordinates || [];
	}

	//Accessors

	/**
	 * set country iso3
	 * @param val {string} - input country iso3
	 * @returns {Address} - Address instance
	 */
	Address.prototype.setCountryIso3 = function(val) {
		this._country_iso3 = Utility.CleanUp.cleanUpString(val);
		return this;
	};

	/**
	 * get country iso3
	 * @returns {string|null} - country iso3
	 */
	Address.prototype.getCountryIso3 = function() {
		return this._country_iso3;
	};

	/**
	 * set state
	 * @param val {string} - input state
	 * @returns {Address} - Address instance
	 */
	Address.prototype.setState = function(val) {
		this._state = Utility.CleanUp.cleanUpString(val);
		return this;
	};

	/**
	 * get state
	 * @returns {string|null} - state
	 */
	Address.prototype.getState = function() {
		return this._state;
	};

	/**
	 * set city
	 * @param val {string} - input city
	 * @returns {Address} - Address instance
	 */
	Address.prototype.setCity = function(val) {
		this._city = Utility.CleanUp.cleanUpString(val);
		return this;
	};

	/**
	 * get city
	 * @returns {string|null} - city
	 */
	Address.prototype.getCity = function() {
		return this._city;
	};

	/**
	 * set zip
	 * @param val {string} - input zip
	 * @returns {Address} - Address instance
	 */
	Address.prototype.setZip = function(val) {
		this._zip = Utility.CleanUp.cleanUpString(val);
		return this;
	};

	/**
	 * get zip
	 * @returns {string|null} - zip
	 */
	Address.prototype.getZip = function() {
		return this._zip;
	};

	/**
	 * set street address
	 * @param val {string} - input street address
	 * @returns {Address} - Address instance
	 */
	Address.prototype.setStreetAddress = function(val) {
		this._street_address = Utility.CleanUp.cleanUpString(val);
		return this;
	};

	/**
	 * get street address
	 * @returns {string|null} - street address
	 */
	Address.prototype.getStreetAddress = function() {
		return this._street_address;
	};

	/**
	 * set coordinate
	 * @param val {Array} - input coordinate
	 * @returns {Address} - Address instance
	 */
	Address.prototype.setCoordinates = function(val) {
		if (val instanceof Array) {
			this._coordinates = val;
		} else {
			this._coordinates = [];
		}
		return this;
	};

	/**
	 * get Coordinate
	 * @returns {Array} - coordinate
	 */
	Address.prototype.getCoordinates = function() {
		return this._coordinates;
	};


	module.exports = Address;

})();