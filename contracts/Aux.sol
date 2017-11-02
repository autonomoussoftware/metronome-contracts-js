pragma solidity >=0.4.11;

//uncomment once we have it
import "./Owned.sol";

contract IPair {
    function depositFromAux() payable {}
}


contract Aux is Owned {
    address pair;
    address auction;

    function init(address _pair, address _auction) 
    public onlyOwner {
        pair = _pair;
        auction = _auction;
    }

    function closeAuction() public {
        require(msg.sender == auction);
        uint val = this.balance / 100;
        IPair(pair).call.value(val)();
    }

    function () public payable {
        require(msg.sender == auction); 
    }
}


