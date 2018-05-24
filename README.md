<h1 align="center">
  <img src="./logo.png" alt="Metronome Contracts JS" width="50%">
</h1>

🔌  [Web3](https://github.com/ethereum/web3.js) Contracts for [Metronome Token](http://metronome.io) ready to be used.

[![Code Style](https://img.shields.io/badge/code%20style-bloq-0063a6.svg)](https://github.com/bloq/eslint-config-bloq)

## Install

```batch
npm i -S metronome-contracts
```

## Usage

```js
const Web3 = require('web3')
const MetronomeContracts = require('metronome-contracts')

const web3 = new Web3('ws://localhost:8545')
const metronomeContracts = new MetronomeContracts(web3, 'mainnet')

console.log(metronomeContracts.metToken.options)
console.log(metronomeContracts.auctions.options)
console.log(metronomeContracts.autonomousConverter.options)
```

## API

### `MetronomeContracts(web3, network)`

Constructor for the Metronome contracts object. It shall receive a `web3` instance and an optional `network` parameter that default to `'mainnet'`. Other supported networks are: `'ropsten'`.

### `metronomeContracts.{contractName}`

The instance of the Metronome contracts will have a property for each contract: `metToken`, `auctions`, `autonomousConverter`. Each contract is an instance of `web3.eth.Contract`.

### `MetronomeContracts.addresses`

This is a convenience object containing the addresses of the contracts for each supported network i.e. `mainnet` and `ropsten`.

## Contracts API

  - [`METToken`](https://github.com/autonomoussoftware/documentation/blob/master/owners_manual/owners_manual.md#token-api)
  - [`Auctions`](https://github.com/autonomoussoftware/documentation/blob/master/owners_manual/owners_manual.md#auction-api)
  - [`Autonomous Converter`](https://github.com/autonomoussoftware/documentation/blob/master/owners_manual/owners_manual.md#autonomous-converter-contract-api)

## License

MIT
