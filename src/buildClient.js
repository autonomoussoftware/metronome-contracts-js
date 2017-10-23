const MetronomeContract = require('../contracts/interface/metronome.sol.js')
// TODO: complete the origin of all interface and use the correct contract
// metronome does not have al the definitions
// const PaidContract = require('../contracts/interface/paid.sol.js')
// const ERC223Contract = require('../contracts/interface/ERC223.sol.js')

const buildInterface = require('./buildInterface')

const buildClient = ({ context, client }) => {
  const metronome = MetronomeContract.at(context.config.addr)
  metronome.setProvider(context.provider)

  return buildInterface({ context, client })
}

module.exports = buildClient
