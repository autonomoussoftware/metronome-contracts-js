pragma solidity >=0.4.13;

import './Constants.sol';
import './FixedMath.sol';

/*
From the Bancor whitepaper:
R = Reserve Token Balance
S = Smart Token Supply
F = Constant Reserve Ratio

T: Smart tokens received in exchange for reserve tokens E

T = S * ((1 + E/R)**F - 1)

E: Reserve tokens received in exchange for smart tokens T

E = R * (1 - (1 - T/S)**(1/F))

Assuming two assets with CRR=0.5, we can simplify:

T = S * (sqrt(1 + E/R) - 1)

E = R * (1 - (1 - T/S)**2)

Now our math needs are reduced to fixed-point div, mult, sqrt

One more formula gives the current asset price:
Price = balance / (supply * CRR)
(check notes to see what's what here)

*/

contract Formula is FixedMath {

    //TODO: I don't think this price function makes sense as is
    /*
    function price(uint balance, uint supply) returns (uint) {
        return fDiv(balance, supply/2);
    }
    */

    //trade in reserve and you mint new smart tokens
    function returnForMint(
        uint smartTokenSupply,    //S
        uint reserveTokensSent,   //E
        uint reserveTokenBalance) //R
    returns (uint) 
    {
        //T = S * (sqrt(1 + E/R) - 1)

        uint S = smartTokenSupply;
        uint E = reserveTokensSent;
        uint R = reserveTokenBalance;

        //DECMULT is the same as 1, carried to standard decimal places
        //using DECMULT directly to save a bit of gas

        return fMul(S, (fSub(fSqrt(fAdd(DECMULT, fDiv(E, R))),  DECMULT)));
    }

    //redeem smart tokens, get back reserve
    function returnForRedemption(
        uint smartTokenSupply, 
        uint smartTokensSent, 
        uint reserveTokenBalance)
    returns (uint) 
    {
        //E = R * (1 - (1 - T/S)**2)
        
        uint S = smartTokenSupply;
        uint T = smartTokensSent;
        uint R = reserveTokenBalance;
        return fMul(R, (fSub(DECMULT, fSqr(fSub(DECMULT, fDiv(T, S))))));
    }
        
}
