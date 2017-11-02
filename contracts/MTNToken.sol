import "./ContractReceiver.sol";
import "./ReserveToken.sol";


contract MTNToken is ReserveToken {
    string public name;
    string public symbol;
    uint8 public decimals;

    //************************************************************
    //ERC223
    //************************************************************

    //ERC23 function
    //not using this for erc20 transfers to reduce risk
    //Also, the idea with erc23 is to throw if recipient doesn't have onTokenReceived
    //so you prevent lost funds
    //If you execute in way that doesn't throw, you undermine this plan
    //but if you do throw, token doesn't work with existing contracts e.g. multisigs
    //so for us, we throw in ERC23 transfer, and support ERC20 separately
    function transfer(address to, uint value, string fallback, bytes data) 
    public returns (bool ok) {
        address from = msg.sender;

	uint destinationCodeLength;
	assembly {
	    destinationCodeLength:= extcodesize(to)
	}

	balanceOf[from] = balanceOf[from].sub(value);
	balanceOf[to] = balanceOf[to].add(value);
	if(destinationCodeLength > 0) {
	    require(ContractReceiver(to).onTokenReceived(from, value, data));
	}
	Transfer(from, to, value);
	return true;
    }

    mapping (address => mapping (address => uint256)) public allowance;

    /**
    * @dev Transfer tokens from one address to another
    * @param _from address The address which you want to send tokens from
    * @param _to address The address which you want to transfer to
    * @param _value uint256 the amout of tokens to be transfered
    */
    function transferFrom(address _from, address _to, uint256 _value) 
    public returns (bool) {
        doTransferFrom(_from, _to, _value);
	var allowed = allowance[_from][msg.sender];
	allowance[_from][msg.sender] = allowed.sub(_value);
	return true;
    }

    /**
    * @dev Approve the passed address to spend the specified amount of tokens on behalf of msg.sender.
    * @param _spender The address which will spend the funds.
    * @param _value The amount of tokens to be spent.
    */
    function approve(address _spender, uint256 _value) 
    public returns (bool) {

	// To change the approve amount you first have to reduce the addresses`
	//  allowance to zero by calling `approve(_spender, 0)` if it is not
	//  already 0 to mitigate the race condition described here:
	//  https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
	require((_value == 0) || (allowance[msg.sender][_spender] == 0));

	allowance[msg.sender][_spender] = _value;
	Approval(msg.sender, _spender, _value);
	return true;
    }

    //these functions are nonstandard but safer, for those interested
    function approveMore(address _spender, uint256 _value)
    public returns (bool) {
	uint previous = allowance[msg.sender][_spender];
	allowance[msg.sender][_spender] = previous.add(_value);
	Approval(msg.sender, _spender, _value);
	return true;
    }

    function approveLess(address _spender, uint256 _value)
    public returns (bool) {
	uint previous = allowance[msg.sender][_spender];
	allowance[msg.sender][_spender] = previous.sub(_value);
	Approval(msg.sender, _spender, _value);
	return true;
    }

    // **********************************************
    // NON-ERC20/23 STUFF
    // **********************************************

    modifier onlyMinter() {
	require(msg.sender == minter);
	_;
    }
    function mint(address a, uint amount) 
    public onlyMinter
    returns (bool) {
	balanceOf[a] = balanceOf[a].add(amount);
	totalSupply = totalSupply.add(amount);
        Transfer(0x0, a, amount);
	return true;
    }

    //for testing purposes
    //We rely on testrpc starting at block zero
    //this way we don't have to read storage in prod
    //TODO: make internal
    uint currtime;
    function currTime() public returns (uint) { 
	if (block.number < 100000) {
	    return currtime;
	} else {
	    return block.timestamp;
	}

    }
    function addTime(uint t) public {
	currtime += t;	
    }
    //end testing section

}
