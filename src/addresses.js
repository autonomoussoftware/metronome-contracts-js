'use strict'

const chains = require('./chains')

const mainnet = {
  // autonomoussoftware/metronome#35a6cd3
  auctions: '0x9d9BcDd249E439AAaB545F59a33812E39A8e3072',
  autonomousConverter: '0x686e5ac50D9236A9b7406791256e47feDDB26AbA',
  metToken: '0xa3d58c4E56fedCae3a7c43A725aeE9A71F0ece4e',
  tokenPorter: '0xd75a3e27ce57bb7738d3b0c47b88f76f423eb056',
  validator: '0xa5474b3ee0f86f75528b525c37440d61665f93c4'
}

const morden = {
  // internal/metronome#368d83c
  auctions: '0xb7f717948ce7b91e234de93f6edaba8d314b8685',
  autonomousConverter: '0x60942c9d3775c4d71ac595f92fab1e0cd1182020',
  metToken: '0x9b9fb9bbcf19b046d02cd6b49207ad2466ec7a6d',
  tokenPorter: '0x75f8c2e7cee21c2de8d5105ed68ece297425c1d3',
  validator: '0x874167a53c019279cbec02fa23cde867db2ae32a'
}

const ropsten = {
  // autonomoussoftware/metronome#80364c4
  auctions: '0x767182C6ef62398993099e5542Ab43c2456A8abA',
  autonomousConverter: '0x638E84db864AA345266e1AEE13873b860aFe82e7',
  metToken: '0xF3e9a687Fdf24112745D4d7dEe150BA87A07ecc3',
  // internal/metronome#81d451a
  tokenPorter: '0x86a6e9cbf616f157e33f4b95fa686eb3e0d80b50',
  validator: '0x73924d3c6dbabf47fffa2d9f9303dc2049aec44a'
}

const addresses = {
  mainnet,
  morden,
  ropsten
}

const allAddresses = Object.keys(chains).reduce(function (all, id) {
  all[id] = addresses[chains[id]]
  return all
}, {})

module.exports = allAddresses
