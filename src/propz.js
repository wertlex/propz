/**
 * Created by wert on 07.05.16.
 */


'use strict';

var types = require('./types');


/** Okay, maybe you interested to know why we need this DIY shit right here. This is good question :)
 * There are a lot of libs which allow to get/set value with dot notation path, like that: 'user.name.italian',
 * and they really works except two edge cases:
 * 1. Not all support paths provided as array. This is minor, but still allow to save few bits on conversion.
 * 2. Almost all libs work bad with arrays. They treat arrays as array-like objects.
 *
 * So, I write my own simple lib to get and set values from object.
 */


/** will traverse deep into object while it is possible */
function _get(object, path) {
	var currentValue = object;
    for(var i = 0, len = path.length; i < len; i++) {
        currentValue = currentValue[path[i]];
        if(typeof currentValue === 'undefined') break;
    }

    return currentValue;
}

/**
 * Gets value from object
 * @param object object to take value from. Can be undefined.
 * @param path {Array<String|Number>} array which represents path. Array indexes should be real numbers: 0, 1, 2, etc
 * @returns {*} value at this point or undefined
 *
 * Example:
 *     const obj = {
 *       user: {
 *           name: "John",
 *           friendIds: [ 22, 33]
 *       }
 *     }
 *
 *     const name = get(obj, ['user', 'name']); // return 'John'
 *     const friendId1 = get(obj, ['user', 'friendIds', 1]);  // return 33
 *
 */
function get(object, path, defaultValue) {
    if(typeof object === 'undefined') return defaultValue; // short path in case if object is undefined
    /** will perform some very straight optimizations. Yes, it really does performance boost according to benchmarks */
	var result;
	switch (path.length) {
        case 0: 
            result = object;  // is always defined as we check it before switch
			break;
        case 1: 
            result = object[path[0]];
			break;
        case 2:
			var value0_2 = object[path[0]];
            result = (typeof value0_2 !== 'undefined') ? value0_2[path[1]] : undefined;
			break;
        case 3:
			var value0_3 = object[path[0]];
            result = (typeof value0_3 !== 'undefined' && typeof value0_3[path[1]] !== 'undefined') ? value0_3[path[1]][path[2]] : undefined;
			break;
        default: 
            result = _get(object, path);
    }
	
	/* TODO: Maybe it will be much better to use this in each 'case' statement. But this way is quicker and easier. */
	return (typeof result !== 'undefined') ? result : defaultValue; 
}

/** Will return value which best fits to provided path. For ex. if there is no ['a', 'b'], but there is ['a'],
 *  ['a'] result will returned
 */
function getClosest(object, path){
	var currentValue = object,
        closestValue;
    for(var i = 0, len = path.length; i < len; i++) {
		var nextValue = currentValue[path[i]];
        if(typeof nextValue === 'undefined') break;
        else {
            closestValue = nextValue;
            currentValue = nextValue;
        }
    }
    return closestValue;
}
/**
 * create new container for provided path segment.
 * If path segment is number - empty array will be returned
 * If path segment not a number - empty object will be returned
 * @param pathSegment
 * @returns {*}
 */
function createContainerForPathSegment(pathSegment){
	var isPathSegmentNumber = types.isNumber(pathSegment);
    if(isPathSegmentNumber) return [];
    else                    return {};
}

/**
 * Check if given value fits to provided path segment:
 * if path segment is string - value should be Object
 * if path segment is number - value should be Array
 *
 * @param pathSegment {String|Number}
 * @param value
 * @returns {*|boolean}
 */
function fitsToSegment(pathSegment, value) {
	var isPathSegmentNumber = types.isNumber(pathSegment);
    return (isPathSegmentNumber && types.isArray(value)) || ( !isPathSegmentNumber && types.isJSONObject(value))
}


/**
 * set value in object no matter what
 * @param object object to set value in
 * @param path {Array<String|Number>} path to new value
 * @param value new value
 * @returns {*} object with new value set
 *
 * Example:
 *
 *     const obj1 = {};
 *     set(obj1, ['user', 'name'], 'John');
 *     // obj1 is: {
 *     //   user: { name: 'John'}
 *     // }
 *
 *     const obj2 = {};
 *     set(obj2, ['user', 'friendIds', 0], 11)
 *     // obj2 is : {
 *     //  user: {
 *     //    friendIds: [11]
 *     //  }
 *     // }
 *
 */
function _set(object, path, value) {
	var currentValue = object;
    for(var i = 0, len = path.length; i < len; i++) {
        if(i !== len - 1) {                                                 // if not last element
			var   currentSegment  = path[i],                              // saving few calls.
                    nextSegment     = path[i + 1];                          // saving few calls.
			var nextContainer = currentValue[currentSegment];               // trying to locate container for next step
            if(!fitsToSegment(nextSegment, currentValue[currentSegment])) { // checking if there is a container of given type
                nextContainer = createContainerForPathSegment(nextSegment); // if no container or container of wrong type - creating new one
                currentValue[currentSegment] = nextContainer;               // and saving it as next value
            }
            currentValue = nextContainer;   // going one step deeper
        } else {
            currentValue[path[i]] = value;  // finally setting value
        }
    }
    return object;
}


function set(object, path, value) {
    switch (true) {
        // if this is one-step path and it is fits to provided object - setting value right now
        case path.length === 1 && fitsToSegment(path[0], object):
            object[path[0]] = value;
            return object;
        default:
            return _set(object, path, value);
    }
}

module.exports.get = get;
module.exports.set = set;
module.exports.getClosest = getClosest;
