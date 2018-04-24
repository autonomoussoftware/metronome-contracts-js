# MetronomeJS

> 🔌 JavaScript Contracts for [Metronome Token](http://metronome.io)

This module provides a wrap of [web3]() Metronome contracts objects ready to use.

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