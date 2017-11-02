const contract = require('truffle-contract')

const MetronomeContract = require('../build/Contracts/Metronome.json')
const ReserveTokenContract = require('../build/Contracts/ReserveToken.json')
const SmartTokenContract = require('../build/Contracts/SmartToken.json')
const AuxContract = require('../build/Contracts/Aux.json')
const PairContract = require('../build/Contracts/Pair.json')

const buildInterface = require('./buildInterface')

const buildClient = context => {
  // const metronome = MetronomeContract.at(context.config.addr)
  const config = context.config

  const metronome = contract(MetronomeContract)
  const smartContract = contract(SmartTokenContract)
  const aux = contract(AuxContract)
  const reservetoken = contract(ReserveTokenContract)
  const pair = contract(PairContract)

  metronome.setProvider(context.provider)
  smartContract.setProvider(context.provider)
  aux.setProvider(context.provider)
  reservetoken.setProvider(context.provider)
  pair.setProvider(context.provider)

  return Promise.all([
    metronome.at(config.contracts.metronome.addr),
    smartContract.at(config.contracts.smartContract.addr),
    aux.at(config.contracts.aux.addr),
    reservetoken.at(config.contracts.reservetoken.addr),
    pair.at(config.contracts.pair.addr)
  ])
    .then(([metronome, smartContract, aux, reservetoken, pair]) =>
      buildInterface({
        context,
        metronome,
        smartContract,
        aux,
        reservetoken,
        pair
      })
    )
    .catch(err => {
      console.log(err.stack)
      throw err
    })
}

module.exports = buildClient
