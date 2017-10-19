const contracts = require('../contracts')

const buildClient = context => {
  const contract = contracts.getContracts(context)
  console.log(contracts)
  return {
    contract,
    getBalance: buildGetBalance(context),
    getGasPrice: buildGetGasPrice(context)
  }
}

const buildGetBalance = context => addr =>
  context.web3.eth.getBalance(addr || context.config.account.addr)

const buildGetGasPrice = context => () =>
  context.web3.eth.getGasPrice()

module.exports = buildClient
