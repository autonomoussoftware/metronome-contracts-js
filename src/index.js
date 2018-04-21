const metTokenAbi = require('./contracts/METToken')
const auctionsAbi = require('./contracts/Auctions')
const autonomousConverterAbi = require('./contracts/AutonomousConverter')

class Metronome {
  constructor (web3) {
    const res = {
      mtntoken: new web3.eth.Contract(metTokenAbi),
      auctions: new web3.eth.Contract(auctionsAbi),
      autonomousConverter: new web3.eth.Contract(autonomousConverterAbi)
    }

    return res
  }
}

module.exports = Metronome
