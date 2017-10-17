const Web3 = require('web3')
const metronome = {}

metronome.test = function () {
  const ETH_NODE_URL = 'http://localhost:8545'
  const web3 = new Web3(new Web3.providers.HttpProvider(ETH_NODE_URL))

  web3.eth.getBalance('0x00bD60E515bD909DEFbFFb64b9F209483a2101eE', (err, res) => {
    console.log(err, res)
  })

  web3.eth.getGasPrice((error, result) => {
    if (error) { throw error }
    console.log(result)
  })
}

module.exports = metronome
