const metToken = require('./contracts/METToken')
const auctions = require('./contracts/Auctions')
const autonomousConverter = require('./contracts/AutonomousConverter')

const metTokenAddress = '0x8f773ca2366f6d07e3bc06d597324c4ec754fec7'
const auctionsAddress = '0x26f6bea75bc87f6216aeef9c8f9a8621c64e348c'
const autonomousConverterAddress = '0x36d95f7e25498bccb6c9d2eac47896a64ba7d015'

class Metronome {
  constructor (web3) {
    return {
      metToken: new web3.eth.Contract(metToken.abi, metTokenAddress),
      auctions: new web3.eth.Contract(auctions.abi, auctionsAddress),
      autonomousConverter: new web3.eth.Contract(autonomousConverter.abi, autonomousConverterAddress)
    }
  }
}

module.exports = Metronome
