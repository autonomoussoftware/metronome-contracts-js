<h1 align="center">
  <img src="./logo.png" alt="MetronomeJS" width="50%">
</h1>

🔌 JavaScript Contracts for [Metronome Token](http://metronome.io). This module provides a [web3](https://github.com/ethereum/web3.js) wrap of Metronome contracts ready to use.

## Install
```batch
$ npm i -S metronomejs
```

## Usage
```js
const Web3 = require('web3')
const Metronome = require('metronomejs')

const web3 = new Web3('ws://localhost:8545')
const metronome = new Metronome(web3)

console.log(mtn.metToken.options)
console.log(mtn.auctions.options)
console.log(mtn.autonomousConverter.options)
```

## Contracts

    - `METToken`
    - `Auctions`
    - `AutonomousConverter`

## LICENSE

[MIT License](https://github.com/MetronomeToken/metronome-api/blob/develop/LICENSE).