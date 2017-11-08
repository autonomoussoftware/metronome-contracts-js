var Metronome = artifacts.require('Metronome.sol')

contract('Metronome', function (accounts) {
  it('A', function () {
    return Metronome.deployed()
      .then(function (instance) {
        return instance.getName()
      })
      .then(function (name) {
        console.log(name)
      })
  })
})
