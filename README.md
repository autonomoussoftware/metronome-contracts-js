<h1 align="center">
  <img src="./logo.png" alt="Metronome Contracts JS" width="50%">
</h1>

🔌  [Web3](https://github.com/ethereum/web3.js) Contracts for [Metronome Token](http://metronome.io) ready to be used.

[![Code Style](https://img.shields.io/badge/code%20style-bloq-0063a6.svg)](https://github.com/bloq/eslint-config-bloq)

## Install
```batch
$ npm i -S metronome-contracts
```

## Usage
```js
const Web3 = require('web3')
const Metronome = require('metronome-contracts')

const web3 = new Web3('ws://localhost:8545')
const metronome = new Metronome(web3)

console.log(metronome.metToken.options)
console.log(metronome.auctions.options)
console.log(metronome.autonomousConverter.options)
```

## Contracts API
  - [`metToken`](https://github.com/autonomoussoftware/documentation/blob/master/owners_manual/owners_manual.md#token-api)
  - [`auctions`](https://github.com/autonomoussoftware/documentation/blob/master/owners_manual/owners_manual.md#auction-api)
  - [`autonomousConverter`](https://github.com/autonomoussoftware/documentation/blob/master/owners_manual/owners_manual.md#autonomous-converter-contract-api)

## LICENSE

[MIT License](https://github.com/MetronomeToken/metronome-api/blob/develop/LICENSE).
