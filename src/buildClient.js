const contract = require('truffle-contract')

const MetronomeContract = require('../build/Contracts/Metronome.json')
const ReserveTokenContract = require('../build/Contracts/ReserveToken.json')
const PairContract = require('../build/Contracts/Pair.json')

const mtninterface = require('./interface')

const buildClient = context => {
  // const metronome = MetronomeContract.at(context.config.addr)
  const config = context.config

  const metronome = contract(MetronomeContract)
  const reservetoken = contract(ReserveTokenContract)
  const pair = contract(PairContract)

  metronome.setProvider(context.provider)
  reservetoken.setProvider(context.provider)
  pair.setProvider(context.provider)

  return Promise.all([
    metronome.at(config.contracts.metronome.addr),
    reservetoken.at(config.contracts.reservetoken.addr),
    pair.at(config.contracts.pair.addr)
  ]).then(([metronome, reservetoken, pair]) =>
    mtninterface.buildInterface({
      context,
      metronome,
      reservetoken,
      pair
    })
  )
}

module.exports = buildClient
