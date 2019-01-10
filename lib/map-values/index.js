'use strict'

function mapValues (obj, fn) {
  return Object.keys(obj).reduce(function (res, key) {
    res[key] = fn(obj[key], key)
    return res
  }, {})
}

module.exports = mapValues
