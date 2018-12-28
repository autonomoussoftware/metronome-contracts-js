'use strict'

// autonomoussoftware/metronome#35a6cd3
const mainnet = {
  auctions: '0x9d9BcDd249E439AAaB545F59a33812E39A8e3072',
  autonomousConverter: '0x686e5ac50D9236A9b7406791256e47feDDB26AbA',
  metToken: '0xa3d58c4E56fedCae3a7c43A725aeE9A71F0ece4e',
  tokenPorter: '0xd75a3e27ce57bb7738d3b0c47b88f76f423eb056',
  validator: '0xa5474b3ee0f86f75528b525c37440d61665f93c4'
}

// autonomoussoftware/metronome#80364c4
const ropsten = {
  auctions: '0x767182C6ef62398993099e5542Ab43c2456A8abA',
  autonomousConverter: '0x638E84db864AA345266e1AEE13873b860aFe82e7',
  metToken: '0xF3e9a687Fdf24112745D4d7dEe150BA87A07ecc3',
  tokenPorter: '0x19E29d101eC989bbED7BDe22e5A54434A2b46139',
  validator: '0x96B30f499BE315F00Afc56176082e98215717EF5'
}

const addresses = {
  1: mainnet,
  3: ropsten,
  main: mainnet,
  mainnet,
  ropsten
}

module.exports = addresses
