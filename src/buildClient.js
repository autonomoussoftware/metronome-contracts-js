const contract = require('truffle-contract')

const MetronomeContract = require('../build/Metronome.json')
const ReserveTokenContract = require('../build/ReserveToken.json')
const SmartTokenContract = require('../build/SmartToken.json')
const AuxContract = require('../build/Aux.json')
const PairContract = require('../build/Pair.json')

const buildInterface = require('./buildInterface')

const buildClient = context => {
  // const metronome = MetronomeContract.at(context.config.addr)

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
    metronome.deployed(),
    smartContract.deployed(),
    aux.deployed(),
    reservetoken.deployed(),
    pair.deployed()
  ]).then(([metronome, smartContract, aux, reservetoken, pair]) =>
    buildInterface({
      context,
      metronome,
      smartContract,
      aux,
      reservetoken,
      pair
    })
  )
}

module.exports = buildClient
