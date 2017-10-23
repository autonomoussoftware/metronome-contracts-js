const MetronomeContract = require('../contracts/interface/metronome.sol.js')
const buildInterface = require('./buildInterface')

const buildClient = context => {
  const metronome = MetronomeContract.at(context.config.addr)
  metronome.setProvider(context.provider)

  return buildInterface()
}

module.exports = buildClient
