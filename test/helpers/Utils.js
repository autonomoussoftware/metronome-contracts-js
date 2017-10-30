const Web3 = require('web3')
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

function increaseTime(seconds) {
    return new Promise(
        function (resolve, reject) {
            web3.currentProvider.sendAsync({
                jsonrpc: "2.0", 
                method: "evm_increaseTime", 
                params: [seconds], 
                id: 0
            }, function(err, result) {
                if (err) {
                    reject(new Error(err));
                } else {
                    resolve(result);
                }
            });
        }
    );
}

function isException(error) {
    let strError = error.toString();
    return strError.includes('invalid opcode') || strError.includes('invalid JUMP');
}

function ensureException(error) {
    assert(isException(error), error.toString());
}

function minutes(n) {
    return n * 60;
}

function hours(n) {
    return n * 3600;
}

function days(n) {
    return n * hours(24);
}

function weeks(n) {
    return n * days(7);
}

function years(n) {
    return n * days(365);
}

module.exports = {
    zeroAddress: '0x0000000000000000000000000000000000000000',
    isException: isException,
    ensureException: ensureException,
    increaseTime: increaseTime
};

/*
//this doesn't work because need promise
function increaseTime(addSeconds) {
    web3.currentProvider.send(
        {
            jsonrpc: "2.0", 
            method: "evm_increaseTime", 
            params: [addSeconds], 
            id: 0
        }
    );
}
*/

