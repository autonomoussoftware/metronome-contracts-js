const abis = require('./contracts')

class Metronome {
  constructor (web3) {
    const res = {
      mtntoken: new web3.eth.Contract(abis.MTNToken),
      auctions: new web3.eth.Contract(abis.Auctions),
      autonomousConverter: new web3.eth.Contract(abis.AutonomousConverter)
    }

    return res
  }
}

module.exports = Metronome
