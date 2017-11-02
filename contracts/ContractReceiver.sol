pragma solidity ^0.4.13;

 /*
 * Contract that is working with ERC223 tokens
 */
 
contract ContractReceiver {
    function onTokenReceived(address _from, uint _value, bytes _data)
    public returns (bool) { }
}
