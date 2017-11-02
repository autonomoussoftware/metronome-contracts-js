const autonomusConverter = require('./autonomusConverter')
const erc20 = require('./erc20')
const erc223 = require('./erc223')
const merkles = require('./merkles')
const metronomeapi = require('./metronome')
const subscriptions = require('./subscriptions')

const log = res => {
  // result.tx => transaction hash, string
  // result.logs => array of trigger events (1 item in this case)
  // result.receipt => receipt object
  return res
}

const handleError = err => {
  console.error(err.stack)
  throw err
}

const buildInterface = ({ context, metronome, reservetoken, pair }) =>
  ({
    autonomusConverter: autonomusConverter.build({ context, pair, log, handleError }),
    erc20: erc20.build({ context, reservetoken, log, handleError }),
    erc223: erc223.build({ context, reservetoken, log, handleError }),
    merkles: merkles.build({ context, reservetoken, log, handleError }),
    metronome: metronomeapi.build({ context, metronome, log, handleError }),
    subscriptions: subscriptions.build({ context, reservetoken, log, handleError })
  })

module.exports = { buildInterface }
