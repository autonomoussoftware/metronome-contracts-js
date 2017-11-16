const abis = require('./contracts')
var Web3 = require('web3');

const getInstance = provider => {
    var web3 = new Web3(Web3.givenProvider || provider);

    const res = {
        proceeds: new web3.eth.Contract(abis.Proceeds),
        mtntoken: new web3.eth.Contract(abis.MTNToken),
        auctions: new web3.eth.Contract(abis.Auctions),
        smartToken: new web3.eth.Contract(abis.SmartToken),
        autonomousConverter: new web3.eth.Contract(abis.AutonomousConverter)
    }

    return Object.assign({}, res, { web3 })
}

module.export = { getInstance }
