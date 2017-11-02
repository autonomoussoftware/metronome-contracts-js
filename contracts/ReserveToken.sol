pragma solidity >=0.4.13;

import "./Token.sol";

contract ReserveToken is Token {
    function transferByPair(address _from, address _to, uint _amount) 
    public returns (bool) {
        require(msg.sender == pair);
        return doTransferFrom(_from, _to, _amount);
    }
}
