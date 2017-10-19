const path = require('path')
const fs = require('fs')

const solc = require('solc')
let contracts = null

const getContracts = context => {
  if (contracts) return contracts

  const files = fs.readdirSync(path.join(__dirname, '/abi'))

  // Its too slow yet, next version will have this directly in code and in bytcode
  const input = files.reduce((i, f) => {
    i[f] = fs.readFileSync(path.join(__dirname, '/abi', f)).toString()
    return i
  }, {})

  const output = solc.compile({ sources: input }, 1)

  contracts = {}
  for (let contractName in output.contracts) {
    const abiDefinition = JSON.parse(output.contracts[contractName].interface)
    contracts[contractName] = new context.web3.eth.Contract(abiDefinition) // save the contract
  }

  return contracts['Metronome.sol:Metronome']
}

module.exports = {
  getContracts
}
