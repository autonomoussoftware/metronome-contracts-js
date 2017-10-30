pragma solidity ^0.4.13;

import 'truffle/Assert.sol'; 
import "../contracts/Token.sol";

contract Person {
    Token token;
    function Person(address _token) {
        token = Token(_token);
    }
    function transfer(address to, uint value) returns (bool) {
        return token.transfer(to, value);
    }
    function approve(address spender, uint value) returns (bool) {
        return token.approve(spender, value);
    }
    function approveMore(address spender, uint value) returns (bool) {
        return token.approveMore(spender, value);
    }
    function transferFrom(address from, address to, uint value) 
    returns (bool) {
        return token.transferFrom(from, to, value);
    }
    //function () {}
    function onTokenReceived(address from, uint256 val, bytes data) 
    payable returns (bool) {
        return true;
    }

    //TODO: move to TestReserveToken
    /*
    function setRoot(bytes32 root) {
        token.setRoot(root);
    }

    //Subscriptions
    function subscribe(uint _startTime, uint _payPerWeek, address _recipient) {
        token.subscribe(_startTime, _payPerWeek, _recipient);    
    }
    function cancelSubscription(address _recipient) {
        token.cancelSubscription(_recipient);
    } 
    function subWithdraw(address _from) {
        token.subWithdraw(_from);
    }
    */
    
}

contract TestToken2 {
    Token token;
    Person p1;
    Person p2;
    Person p3;
    address a1;
    address a2;
    address a3;
    function startup() {
        token = new Token();
        token.init(this, this, 0, 0);
        p1 = new Person(token); 
        p2 = new Person(token); 
        p3 = new Person(token); 
        a1 = address(p1);
        a2 = address(p2);
        a3 = address(p3);

        token.mint(a1, 1000);
        token.mint(a2, 1000);
        token.mint(a3, 1000);
    }

    function testApproveMore() {
        startup();
        p1.approve(a2, 100);
        Assert.equal(token.allowance(a1, a2), 100, "allowance");
        p1.approveMore(a2, 150);
        Assert.equal(token.allowance(a1, a2), 250, "allowance");
        p2.transferFrom(a1, a2, 200);
        Assert.equal(token.balanceOf(a1), 800, "p1 balance");
        Assert.equal(token.balanceOf(a2), 1200, "p2 balance");
        Assert.equal(token.allowance(a1, a2), 50, "new allowance");
    }

    //TODO: move to TestReserveToken
    /*
    function testRoot() {
        startup();
        token.setRoot(bytes32(0x123));
        p1.setRoot(bytes32(0x123));
        Assert.isTrue(token.rootsMatch(this, a1), "should match"); 
        token.setRoot(bytes32(0x456));
        Assert.isFalse(token.rootsMatch(this, a1), "should not match");
    }

    //SUBSCRIPTION TESTS
    //function subscribe(uint _startTime, uint _payPerWeek, address _recipient) {
    //function cancelSubscription(address _recipient) {
    //function subWithdraw(address _from) {
    //function getSubscription(address _subscriber, address _subscribedTo) 
    //    returns (uint startTime, uint payPerWeek, uint lastWithdrawTime)
    
    function testSubscribe() {
        startup();
        p1.subscribe(1, 100, a2);
        var (startTime, payPerWeek, lastWithdrawTime) = token.getSubscription(a1, a2);
        Assert.equal(startTime, 1, "start time");
        Assert.equal(payPerWeek, 100, "pay per week");
        Assert.equal(lastWithdrawTime, 0, "lastWithdrawTime");
        uint t = 2 weeks;
        token.addTime(t+1);
        Assert.equal(token.balanceOf(a2), 1000, "p2 start bal");
        p2.subWithdraw(a1);
        Assert.equal(token.balanceOf(a2), 1200, "p2 end bal");
        Assert.equal(token.balanceOf(a1), 800, "p1 end bal");
        p1.cancelSubscription(a2);
    }
    */
}

