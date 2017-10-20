const promisify = require('promisify-node')

const solc = require('solc')
const path = require('path')
const fs = promisify('fs')

const ora = require('ora')
const Pudding = require('ether-pudding')

const solLocation = path.join(__dirname, '/contracts/sol')
const scriptsLocation = path.join(__dirname, '/contracts/interface/')

// terminal setup
const spinner = ora('Welcome! Metronome compile tool is loading...').start()

// init
fs
  .readdir(solLocation)
  .then(files => {
    spinner.text = 'reading files... '

    const cl = files.reduce((l, f) => {
      if (path.extname(f) === '.sol') {
        l.push(fs.readFile(path.join(solLocation, f))
          .then(d => ({[f]: d.toString()})))
      }
      return l
    }, [])

    return Promise.all(cl)
  })
  .then(binaries => binaries.reduce((i, f) => Object.assign(i, f), {}))
  .then(abis => {
    const contracts = []
    spinner.text = 'prepered for compile... '
    const output = solc.compile({ sources: abis }, 1)

    // TODO: filter the warnings to display in console
    // if (output.errors.length) {
    //   throw output.errors
    // }

    const normalizeName = n => n.toLowerCase().split(':')[1]

    for (let contractName in output.contracts) {
      spinner.text = `saving ${contractName}...`

      const abi = JSON.parse(output.contracts[contractName].interface)
      const definition = {
        contract_name: normalizeName(contractName),
        abi
      }

      contracts.push(definition)
    }

    return fs.mkdir(scriptsLocation)
      .catch(e => {
        if (e.code !== 'EEXIST') throw e
      })
      .then(() => Pudding.saveAll(contracts, scriptsLocation))
  })
  .then(res => {
    spinner.info(`js interface saved in ${scriptsLocation}`)
    spinner.succeed('javascript interface have been created!')
  })
  .catch(err => {
    spinner.fail('some error ocurred, please see logs for more detail')
    spinner.warn(err)
  })
