'use strict'

const MetronomeContracts = require('../src')
const addresses = require('../src/addresses')

const Web3 = require('web3')
const web3 = new Web3()

const ROPSTEN = 'ropsten'
const MAIN = 'mainnet'

describe('metronome-contracts', function () {
  test('initializes metronome instance and get all the contracts defined', function () {
    const metronome = new MetronomeContracts(web3, ROPSTEN)

    expect(metronome.chain).toBe(ROPSTEN)
    expect(metronome.addresses).toEqual(addresses[ROPSTEN])

    expect(metronome.metToken).toBeDefined()
    expect(metronome.auctions).toBeDefined()
    expect(metronome.autonomousConverter).toBeDefined()
  })

  test('initializes metronome instance and get the contracts with the correct addresses for ropsten net', function () {
    const metronome = new MetronomeContracts(web3, ROPSTEN)

    expect(metronome.metToken.options.address.toLowerCase()).toBe(addresses[ROPSTEN].metToken.toLowerCase())
    expect(metronome.auctions.options.address.toLowerCase()).toBe(addresses[ROPSTEN].auctions.toLowerCase())
    expect(metronome.autonomousConverter.options.address.toLowerCase()).toBe(addresses[ROPSTEN].autonomousConverter.toLowerCase())
  })

  test('initializes metronome instance and get the contracts with the correct addresses for main net', function () {
    const metronome = new MetronomeContracts(web3)

    expect(metronome.metToken.options.address.toLowerCase()).toBe(addresses[MAIN].metToken.toLowerCase())
    expect(metronome.auctions.options.address.toLowerCase()).toBe(addresses[MAIN].auctions.toLowerCase())
    expect(metronome.autonomousConverter.options.address.toLowerCase()).toBe(addresses[MAIN].autonomousConverter.toLowerCase())
  })

  test('initializes metronome instance with default chain value', function () {
    const metronome = new MetronomeContracts(web3)

    expect(metronome.metToken).toBeDefined()
    expect(metronome.auctions).toBeDefined()
    expect(metronome.autonomousConverter).toBeDefined()
  })

  test('initializes metronome instance with an invalid chain and throws error', function () {
    try {
      new MetronomeContracts(web3, 'fakenet') // eslint-disable-line no-new
    } catch (err) {
      expect(err.message).toBe(`Invalid 'chain' parameter`)
    }
  })

  test('initializes metronome instance and get valid contract methods', function () {
    const metronome = new MetronomeContracts(web3, ROPSTEN)

    expect(typeof metronome.metToken.methods.transfer).toBe('function')
    expect(typeof metronome.auctions.methods.heartbeat).toBe('function')
    expect(typeof metronome.autonomousConverter.methods.convertEthToMet).toBe('function')
  })

  test('address static property returns correct values', function () {
    expect(MetronomeContracts.addresses).toEqual(addresses)
  })
})
