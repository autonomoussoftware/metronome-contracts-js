pragma solidity >=0.4.13;

contract IToken {
    mapping(address => uint) public balanceOf;
    uint256 public totalSupply;
    function transfer(address _to, uint256 _value) public returns (bool); 
    function mint(address a, uint amount) public returns (bool); 
    function destroy(address a, uint amount) public returns (bool); 
}

contract ISmartToken is IToken {
    function destroy(address a, uint amt) public returns (bool); 
}

contract IReserveToken is IToken {
    function transferByPair(address from, address to, uint amount)
    public returns (bool); 
}

    
    


