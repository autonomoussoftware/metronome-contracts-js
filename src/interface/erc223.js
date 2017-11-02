// ERC223
const build = ({ context, reservetoken, log, handleError }) => ({
  /**
    * transfer(address _to, uint _value, string _fallback, bytes _data)
    *
    * @param {_to} address
    * @param {_value} uint amount
    * @param {_fallback} is an string with the name of the function being called.
    * @param {_data} is the encoded parameters for that function.
    *
    * @returns {boolean}
    */
  transfer: data => reservetoken.transfer(data).then(log).catch(handleError),
  /**
    * This is the function that ERC223 tokens are expected to call,
    * when transferring to the contract; it’s the equivalent of the fallback function.
    *
    * onTokenReceived(address _from, uint _value, bytes _data)
    *
    * @returns {boolean}
    */
  onTokenReceived: data =>
    reservetoken.onTokenReceived(data).then(log).catch(handleError)
})

module.exports = { build }
