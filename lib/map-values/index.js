'use strict'

/**
 * Create a new object with the same keys and values mapped using provided fn.
 *
 * This is a simplified version of lodash.mapValues.
 *
 * @param {Object} obj The source object.
 * @param {Function} fn The function to map the object's values.
 * @returns {Object} The mapped object.
 */
function mapValues (obj, fn) {
  return Object.keys(obj).reduce(function (res, key) {
    res[key] = fn(obj[key], key, obj)
    return res
  }, {})
}

module.exports = mapValues
