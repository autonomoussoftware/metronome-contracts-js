const metronome = require('../contracts/interface/metronome.sol.js')

const buildClient = context => {
  console.log(metronome)
  return {
    // more info of this interface https://github.com/trufflesuite/truffle-contract
    metronome,
    getBalance: buildGetBalance(context),
    getGasPrice: buildGetGasPrice(context)
  }
}

const buildGetBalance = context => addr =>
  context.web3.eth.getBalance(addr || context.config.account.addr)

const buildGetGasPrice = context => () =>
  context.web3.eth.getGasPrice()

module.exports = buildClient
