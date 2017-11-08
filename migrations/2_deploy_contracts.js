var Metronome = artifacts.require('./Metronome.sol')
var ReserveToken = artifacts.require('./ReserveToken.sol')
var SmartToken = artifacts.require('./Token.sol')
var Aux = artifacts.require('./Aux.sol')
var Pair = artifacts.require('./Pair.sol')

module.exports = function (deployer, network, accounts) {
  var founder = '0xdeadbeef'

  var met, reserve, smart, aux, pair
  deployer
    .then(function () {
      return Metronome.new()
    })
    .then(function (instance) {
      met = instance
      console.log('Met ready')
      return ReserveToken.new()
    })
    .then(function (instance) {
      reserve = instance
      console.log('ReserveToken ready')
      return SmartToken.new()
    })
    .then(function (instance) {
      smart = instance
      console.log('Smart ready')
      return Aux.new()
    })
    .then(function (instance) {
      aux = instance
      console.log('Pair ready')
      return Pair.new()
    })
    .then(function (instance) {
      pair = instance
      console.log('Reserve ready')
      return ReserveToken.new()
    })
    .then(function (instance) {
      console.log('Met:     ', met.address)
      console.log('Reserve: ', reserve.address)
      console.log('Smart:   ', smart.address)
      console.log('Aux:     ', aux.address)
      console.log('Pair:    ', pair.address)
    })
    .then(function () {
      aux.init(pair.address)
    })
    .then(function () {
      pair.init(reserve.address, smart.address, aux.address)
    })
    .then(function () {
      smart.init(pair.address, pair.address, 1000000)
    })
    .then(function () {
      reserve.init(pair.address, met.address, 1)
    })
    .then(function () {
      met.init(founder, aux.address, 0, reserve.address, 0, 0)
      /* ...uints set to zero use defaults in contract
        address _founder,
        address _aux,
        uint _startTime,
        address _token,
        uint _minimumPrice,
        uint _startingPrice)
        */
    })
}
