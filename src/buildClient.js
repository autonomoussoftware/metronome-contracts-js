const MetronomeContract = require('../contracts/interface/metronome.sol.js')
const ContractReceiverContract = require('../contracts/interface/contractreceiver.sol.js')
const TokenContract = require('../contracts/interface/token.sol.js')
const ReserveTokenContract = require('../contracts/interface/reservetoken.sol.js')
const ERC223Contract = require('../contracts/interface/erc223.sol.js')
// const PairContract = require('../contracts/interface/pair.sol.js')

const buildInterface = require('./buildInterface')

const buildClient = context => {
  const metronome = MetronomeContract.at(context.config.addr)
  const contactReciever = ContractReceiverContract.at(context.config.addr)
  const token = TokenContract.at(context.config.addr)
  const reservetoken = ReserveTokenContract.at(context.config.addr)
  const erc223 = ERC223Contract.at(context.config.addr)
  // const pair = PairContract.at(context.config.addr)

  metronome.setProvider(context.provider)
  contactReciever.setProvider(context.provider)
  token.setProvider(context.provider)
  reservetoken.setProvider(context.provider)
  erc223.setProvider(context.provider)
  // pair.setProvider(context.provider)

  return buildInterface({
    context,
    metronome,
    contactReciever,
    token,
    reservetoken,
    erc223,
    pair: {} // dummy
  })
}

module.exports = buildClient
