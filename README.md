<h1 align="center">
  <img src="./logo.png" alt="MetronomeJS" width="50%">
</h1>

🔌 JavaScript Contracts for [Metronome Token](http://metronome.io). This module provides a [web3](https://github.com/ethereum/web3.js) wrap of Metronome contracts ready to use.

## Index

1. [Requirements](#requirements)
1. [Dev Setup](#dev-setup)
1. [Prod Setup](#prod-setup)
1. [Usage](#usage)
1. [Contracts](#interface)
1. [License](#license)

## Requirements
- [Node.js](https://nodejs.org/en/) / Web Browsers
- [Web3](https://github.com/ethereum/web3.js/)


##  Dev Setup
```bash
# Install dependencies
$ npm i

# Init webpack in dev mode
$ npm run dev

# Start demo application
$ npm run demo
```

## Prod Setup
```bash
# Install dependencies
$ npm i

# Build for production
$ npm run build

# Publish to npm registry
$ npm publish
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