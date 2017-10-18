const buildClient = context => {
  return {
    getBalance: buildGetBalance(context),
    getGasPrice: buildGetGasPrice(context)
  }
}

const buildGetBalance = context => () =>
  context.web3.eth.getBalance(
    context.account || context.web3.account,
    (err, res) => {
      console.log(err, res)
    }
  )

const buildGetGasPrice = context => () =>
  context.web3.eth.getGasPrice((error, result) => {
    if (error) {
      throw error
    }
    console.log(result)
  })

module.exports = buildClient
