/**
 * Created by wert on 07.05.16.
 */

'use strict';

/** Some helpers for friendly type detection */
var Types = {
    isArray: function(smth){
        return Array.isArray(smth);
    },
    isEmptyArray: function(smth){
        return this.isArray(smth) && smth.length === 0;
    },
    isNotEmptyArray: function(smth){
        return Array.isArray(smth) && smth && smth.length && smth.length > 0;
    },
    isDefined: function(smth) {
        return typeof smth !== 'undefined';
    },
    isUndefined: function(smth) {
        return typeof smth === 'undefined';
    },
    isObject: function(smth) {
        return typeof smth === 'object';
    },
    isJSONObject: function (smth) {
        return typeof smth === 'object' && !Array.isArray(smth) && !(smth instanceof Date);
    },
    isEmptyJSONObject: function(smth) {
        // because Object.keys(new Date()).length === 0;
        // we have to do some additional check
        return this.isJSONObject(smth) && Object.keys(smth).length === 0 && JSON.stringify(smth) === JSON.stringify({});
    },
    isFunction: function(smth) {
        return typeof smth === 'function';
    },
    isString: function (smth) {
        return typeof smth === 'string' || smth instanceof String;
    },
    isBoolean: function (smth) {
        return typeof smth === 'boolean';
    },
    isNumber: function (smth) {
        return typeof smth === 'number';
    }
};


module.exports = Types;