pragma solidity >=0.4.13;

import "./ContractReceiver.sol";
import "./Owned.sol";
import "./SafeMath.sol";
import "./Token.sol";
 
contract SmartToken is Token {
    using SafeMath for uint256;

    //for smartToken, pair and minter will be the same
    //but this code still works
    function init(address _pair, address _minter, uint _initialSupply) {
        init(_pair, _minter, _initialSupply, MTNDECMULT);
    }

    function destroy(address _a, uint _amount) 
    returns (bool) {
        require(msg.sender == pair);
        balanceOf[_a] = balanceOf[_a].sub(_amount);
        totalSupply = totalSupply.sub(_amount);
        Transfer(_a, 0x0, _amount);        
    }

}

