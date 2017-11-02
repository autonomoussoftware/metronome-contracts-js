pragma solidity >=0.4.13;

import "./Owned.sol";
import "./SafeMath.sol";
import "./Constants.sol";

contract Token is Owned, Constants {
    using SafeMath for uint256;
    mapping(address => uint) public balanceOf;

    uint256 public totalSupply;

    address public pair;
    address public minter;

    //for smartToken, pair and minter will be the same
    //but this code still works
    //for reserveToken the minter is the auction contract
    function init(address _pair, address _minter, uint _initialSupply, uint _decmult) 
    public
    {
        require(minter == 0x0);
        require(pair == 0x0);
        require(_pair != 0x0);
        require(_minter != 0x0);
        pair = _pair;
        minter = _minter;
	totalSupply = _initialSupply * _decmult;
        balanceOf[_pair] = totalSupply;
    }

    event Transfer(address indexed from, address indexed to, uint amount);
    event Transfer(address indexed from, address indexed to, uint amount, bytes data);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    //************************************************************
    //ERC20
    //************************************************************

    //private transferFrom for our own use
    function doTransferFrom(address _from, address _to, uint _value) 
    internal
    returns (bool) {
	//require(_to != pair); //breaks pair.mintFromReserve so can't require this

	require(_to != minter); 
	require(_to != address(this));

	balanceOf[_from] = balanceOf[_from].sub(_value);
	balanceOf[_to] = balanceOf[_to].add(_value);

	Transfer(_from, _to, _value);
	return true;
    }

    //public ERC20
    function transfer(address _to, uint256 _value) public returns (bool) {
	return doTransferFrom(msg.sender, _to, _value);
    }

    function mint(address _a, uint _value) public returns (bool) {
        require(msg.sender == minter);
        totalSupply = totalSupply.add(_value);
	balanceOf[_a] = balanceOf[_a].add(_value);

	Transfer(0x0, _a, _value);
	return true;
    }

    function destroy(address _a, uint _value) public returns (bool) {
        require(msg.sender == pair);
        totalSupply = totalSupply.sub(_value);
        doTransferFrom(_a, 0x0, _value);
    }
}
