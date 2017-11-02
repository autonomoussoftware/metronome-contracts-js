// Merkles
// These functions aren’t intended for manual use,
// but there’s some thought that they could be the foundation for interesting UI features.
const build = ({ context, reservetoken, log, handleError }) => ({
  /**
    *
    * Sets the merkle root associated with msg.sender
    *
    * @param  {Number} bytes32
    */
  setRoot: data => reservetoken.setRoot(data).then(log).catch(handleError),

  /**
    * Returns true if the two addresses have matching roots.
    *
    * function rootsMatch(address a, address b)
    *
    * @returns  {Bool}
    */
  rootsMatch: data =>
    reservetoken.rootsMatch(data).then(log).catch(handleError)
})

module.exports = { build }
