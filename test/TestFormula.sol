pragma solidity ^0.4.13;

import "truffle/Assert.sol";
import "../contracts/Constants.sol";
import "../contracts/Formula.sol";

contract TestFormula is Constants {

    Formula f = new Formula();

    //example from document MetronomeBancor2.pdf
    function test1() {
        uint fruitSupply = 10000 * DECMULT;
        uint mtnSent = 100 * DECMULT;
        uint mtnSupply = 2000 * DECMULT;
        uint fruit = f.returnForMint(fruitSupply, mtnSent, mtnSupply);

        //assert is reasonably close, for now
        Assert.isTrue(247 * DECMULT - fruit < DECMULT, "new fruit");
        Assert.isTrue(fruit != 0, "zero fruit");

        uint ethSupply = 1000 * DECMULT;
        uint newFruitSupply = fruitSupply + fruit;

        uint ret = f.returnForRedemption(newFruitSupply, fruit, ethSupply);

        Assert.isTrue(ret - 47*DECMULT < DECMULT, "return");
        Assert.isTrue(ret != 0, "zero return");
    }
}
