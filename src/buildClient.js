import web3 from 'web3';

const MetronomeContract = require('../build/Contracts/Metronome.json')
const ReserveTokenContract = require('../build/Contracts/MTNToken.json')
const PairContract = require('../build/Contracts/Pair.json')

const mtninterface = require('./interface')

const buildClient = context => {
  const config = context.config

  const metronome = new web3.eth.Contract(MetronomeContract)
  const reservetoken = new web3.eth.Contract(ReserveTokenContract)
  const pair = new web3.eth.Contract(PairContract)

  metronome.options.address(config.contracts.metronome)
  reservetoken.options.address(config.contracts.reservetoken)
  pair.options.address(config.contracts.pair)

  return mtninterface.buildInterface({
    context,
    metronome,
    reservetoken,
    pair
  })
}

module.exports = buildClient
