'use strict'

const Metronome = require('../src')
const addresses = require('../src/addresses')

const Web3 = require('web3')
const web3 = new Web3()

const chain = 'ropsten'

describe('MetronomeJS', function () {
  test('initializes metronome instance and get all the contracts defined', function () {
    const metronome = new Metronome(web3, chain)

    expect(metronome.chain).toBe(chain)
    expect(metronome.addresses).toEqual(addresses[chain])

    expect(metronome.metToken).toBeDefined()
    expect(metronome.auctions).toBeDefined()
    expect(metronome.autonomousConverter).toBeDefined()
  })

  test('initializes metronome instance and get the contracts with the correct addresses', function () {
    const metronome = new Metronome(web3, chain)

    expect(metronome.metToken.options.address.toLowerCase()).toBe(addresses[chain].metToken)
    expect(metronome.auctions.options.address.toLowerCase()).toBe(addresses[chain].auctions)
    expect(metronome.autonomousConverter.options.address.toLowerCase()).toBe(addresses[chain].autonomousConverter)
  })

  test('initializes metronome instance with default chain value', function () {
    const metronome = new Metronome(web3)

    expect(metronome.metToken).toBeDefined()
    expect(metronome.auctions).toBeDefined()
    expect(metronome.autonomousConverter).toBeDefined()
  })

  test('initializes metronome instance with an invalid chain and throws error', function () {
    try {
      new Metronome(web3, 'test') // eslint-disable-line no-new
    } catch (err) {
      expect(err.message).toBe(`Invalid 'chain' parameter`)
    }
  })

  test('initializes metronome instance and get valid contract methods', function () {
    const metronome = new Metronome(web3, chain)

    expect(typeof metronome.metToken.methods.transfer).toBe('function')
    expect(typeof metronome.auctions.methods.heartbeat).toBe('function')
    expect(typeof metronome.autonomousConverter.methods.convertEthToMet).toBe('function')
  })

  test('address static property returns correct values', function () {
    expect(Metronome.addresses).toEqual(addresses)
  })
})
