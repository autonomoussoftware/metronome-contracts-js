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

    function onTokenReceived(address from, uint256 val, bytes data) 
    returns (bool) {
        return true;
    }
}

contract TestToken {
    Token token;
    Person p1;
    Person p2;
    Person p3;
    address a1;
    address a2;
    address a3;
    function startup() {
        token = new Token();
        p1 = new Person(token); 
        p2 = new Person(token); 
        p3 = new Person(token); 
        a1 = address(p1);
        a2 = address(p2);
        a3 = address(p3);
        token.init(this, this, 0, 0);

        token.mint(a1, 1000);
        token.mint(a2, 1000);
        token.mint(a3, 1000);
    }

    function testSupply() {
        startup();
        Assert.equal(token.totalSupply(), 3000, "total supply");
    }

    function testTransfer() {
        startup();
        p1.transfer(a2, 200);
        Assert.equal(token.balanceOf(a1), 800, "p1 balance");
        Assert.equal(token.balanceOf(a2), 1200, "p2 balance");
    }

    function testTransferAll() {
        startup();
        p1.transfer(a2, 1000);
        Assert.equal(token.balanceOf(a1), 0, "p1 balance");
        Assert.equal(token.balanceOf(a2), 2000, "p2 balance");
        p2.transfer(a1, 2000);
        Assert.equal(token.balanceOf(a1), 2000, "p1 balance 2");
        Assert.equal(token.balanceOf(a2), 0, "p2 balance 2");
    }

    function testTransferFrom() {
        startup();
        p1.approve(a2, 100);
        Assert.equal(token.allowance(a1, a2), 100, "allowance");
        p2.transferFrom(a1, a3, 50);
        Assert.equal(token.balanceOf(a1), 950, "p1 balance");
        Assert.equal(token.balanceOf(a3), 1050, "p3 balance");
        Assert.equal(token.allowance(a1, a2), 50, "new allowance");
    }

    function testTransferFrom2() {
        startup();
        p3.transfer(a1, 1000);
        Assert.equal(token.balanceOf(a3), 0, "p1 balance");
        Assert.equal(token.balanceOf(a1), 2000, "p2 balance");

        p1.approve(a2, 100);
        Assert.equal(token.allowance(a1, a2), 100, "allowance");
        p2.transferFrom(a1, a3, 50);
        Assert.equal(token.balanceOf(a1), 1950, "p1 balance");
        Assert.equal(token.balanceOf(a3), 50, "p3 balance");
        Assert.equal(token.allowance(a1, a2), 50, "new allowance");
    }

/*
    function testBadTransfer() {
        startup();
        uint initialbal = token.balanceOf(a1);
        bool result = p1.transfer(a2, 1001);
        Assert.equal(result, false, "result");
        Assert.equal(initialbal, token.balanceOf(a1), "balance");
    }

    function testBadTransferFrom() {
        startup();
        uint initialbal = token.balanceOf(a1);
        p1.approve(a2, 100);
        Assert.equal(token.allowance(a1, a2), 100, "allowance");
        bool result = p2.transferFrom(a1, a3, 200);
        Assert.equal(result, false, "result");
        Assert.equal(initialbal, token.balanceOf(a1), "balance");
    }
    
    function testBadTransferFrom2() {
        startup();
        uint initialbal = token.balanceOf(a1);
        Assert.equal(token.allowance(a1, a2), 0, "allowance");
        bool result = p2.transferFrom(a1, a3, 200);
        Assert.equal(result, false, "result");
        Assert.equal(initialbal, token.balanceOf(a1), "balance");
    }
*/
}
