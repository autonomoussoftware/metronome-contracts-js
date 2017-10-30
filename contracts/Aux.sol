pragma solidity >=0.4.11;

//uncomment once we have it
import "./Owned.sol";

contract IPair {
    function depositFromAux() payable {}
}


contract Aux is Owned {
    address pair;
    address auction;

    function init(address _pair, address _auction) onlyOwner {
        pair = _pair;
        auction = _auction;
    }

    function closeAuction() {
        require(msg.sender == auction);
        uint val = this.balance / 100;
        IPair(pair).depositFromAux.value(val)();
    }

    function () payable {
        require(msg.sender == auction); 
    }
}

