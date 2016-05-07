/**
 * Created by wert on 07.05.16.
 */


'use strict';

const types = require('./types');


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
    let currentValue = object;
    for(let i = 0, len = path.length; i < len; i++) {
        currentValue = currentValue[path[i]];
        if(typeof currentValue === 'undefined') break;
    }

    return currentValue;
}

/**
 * Gets value from object
 * @param object object to take value from
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
function get(object, path) {
    /** will perform some very straight optimizations. Yes, it really does performance boost acording to benchmarks */
    switch (path.length) {
        case 0: return object;
        case 1: return object[path[0]];
        case 2: return (typeof object[path[0]] !== 'undefined') ? object[path[0]][path[1]] : undefined;
        case 3: return (typeof object[path[0]] !== 'undefined' && typeof object[path[0]][path[1]] !== 'undefined') ? object[path[0]][path[1]][path[2]] : undefined;
        default: return _get(object, path);
    }
}

/** Will return value which best fits to provided path. For ex. if there is no ['a', 'b'], but there is ['a'],
 *  ['a'] result will returned
 */
function getClosest(object, path){
    let currentValue = object,
        closestValue;
    for(let i = 0, len = path.length; i < len; i++) {
        let nextValue = currentValue[path[i]];
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
    const isPathSegmentNumber = types.isNumber(pathSegment);
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
    const isPathSegmentNumber = types.isNumber(pathSegment);
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
function set(object, path, value) {
    let currentValue = object;
    for(let i = 0, len = path.length; i < len; i++) {
        if(i !== len - 1) {                                                 // if not last element
            const   currentSegment  = path[i],                              // saving few calls.
                nextSegment     = path[i + 1];                          // saving few calls.
            let nextContainer = currentValue[currentSegment];               // trying to locate container for next step
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


module.exports.get = get;
module.exports.set = set;
module.exports.getClosest = getClosest;
