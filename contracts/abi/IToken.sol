pragma solidity >=0.4.13;

contract IToken {
    mapping(address => uint) public balanceOf;
    uint256 public totalSupply;
    function transfer(address _to, uint256 _value) returns (bool) {}
    function mint(address a, uint amount) returns (bool) {}
    function destroy(address a, uint amount) returns (bool) {}
}

contract ISmartToken is IToken {
    function destroy(address a, uint amt) returns (bool) {}
}

contract IReserveToken is IToken {
    function transferByPair(address from, address to, uint amount) returns (bool) {}
}

    
    


