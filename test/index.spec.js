'use strict'

const MetronomeContracts = require('../src')

const Web3 = require('web3')
const web3 = new Web3()

const ROPSTEN = 'ropsten'

const contracts = {
  mainnet: {
    Auctions: {
      address: '0x9d9BcDd249E439AAaB545F59a33812E39A8e3072',
      birthblock: 5659894
    },
    AutonomousConverter: {
      address: '0x686e5ac50D9236A9b7406791256e47feDDB26AbA'
    },
    METToken: {
      address: '0xa3d58c4E56fedCae3a7c43A725aeE9A71F0ece4e'
    }
  },
  ropsten: {
    Auctions: {
      address: '0x767182C6ef62398993099e5542Ab43c2456A8abA',
      birthblock: 3399250
    },
    AutonomousConverter: {
      address: '0x638E84db864AA345266e1AEE13873b860aFe82e7'
    },
    METToken: {
      address: '0xF3e9a687Fdf24112745D4d7dEe150BA87A07ecc3'
    }
  }
}

describe('metronome-contracts', function () {
  test('initializes metronome instance with default chain value', function () {
    const metronome = new MetronomeContracts(web3)

    expect(metronome.METToken).toBeDefined()
    expect(metronome.Auctions).toBeDefined()
    expect(metronome.AutonomousConverter).toBeDefined()
  })

  test('initializes metronome instance and get all the contracts defined', function () {
    const metronome = new MetronomeContracts(web3, ROPSTEN)

    expect(metronome.METToken).toBeDefined()
    expect(metronome.Auctions).toBeDefined()
    expect(metronome.AutonomousConverter).toBeDefined()
  })

  test('initializes metronome instance and get the contracts with the correct addresses for ropsten chain', function () {
    const metronome = new MetronomeContracts(web3, ROPSTEN)

    expect(metronome.METToken.options.address.toLowerCase()).toBe(contracts[ROPSTEN].METToken.address.toLowerCase())
    expect(metronome.Auctions.options.address.toLowerCase()).toBe(contracts[ROPSTEN].Auctions.address.toLowerCase())
    expect(metronome.AutonomousConverter.options.address.toLowerCase()).toBe(contracts[ROPSTEN].AutonomousConverter.address.toLowerCase())
  })

  test('initializes metronome instance and get valid contract methods', function () {
    const metronome = new MetronomeContracts(web3, ROPSTEN)

    expect(typeof metronome.METToken.methods.transfer).toBe('function')
    expect(typeof metronome.Auctions.methods.heartbeat).toBe('function')
    expect(typeof metronome.AutonomousConverter.methods.convertEthToMet).toBe('function')
  })

  test('initializes metronome instance with an invalid chain and throws error', function () {
    try {
      new MetronomeContracts(web3, 'fakenet') // eslint-disable-line no-new
    } catch (err) {
      expect(err.message).toBe('Unknown "chain" parameter')
    }
  })

  test('static property has the correct addresses and birthblocks', function () {
    expect(Object.assign({}, MetronomeContracts)).toMatchObject(contracts)
  })
})
