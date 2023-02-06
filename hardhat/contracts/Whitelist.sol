//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Whitelist {
    // stores max number of whitelisted addresses allowed
    uint8 public maxWhitelistedAddresses;

    // numAddressesWhitelisted -> would be used to keep track of how many addresses have been whitelisted
    uint8 public numAddressesWhitelisted;

    //Create a mapping of whitelistedAddresses
    mapping(address => bool) public whitelistedAddresses;

    //Setting the Max number of whitelisted addresses
    // User will put the value at the time of deployment
    constructor(uint8 _maxWhitelistedAddresses) {
        maxWhitelistedAddresses = _maxWhitelistedAddresses;
    }

    /**
     * addAddressToWhitelist - This function adds the address of the sender to the whitelist
     */

    function addAddressToWhitelist() public {
        // check if the user has already been whitelisted
        require(!whitelistedAddresses[msg.sender], "Sender has already been whitelisted");
        // check if the numAddressesWhitelisted < maxWhitelistedAddresses
        require(numAddressesWhitelisted < maxWhitelistedAddresses, "More adresses can't be added, limit reached");
        // Add the address which called the function to the whitelistedAddress array
        whitelistedAddresses[msg.sender] = true;
        // Increase the number of whitelisted addresses
        numAddressesWhitelisted += 1;
    }

    function isWhitelisted(address _sender) public view returns(bool) {
        if(whitelistedAddresses[_sender]) {
            return true;
        } else {
            return false;
        }
    }

}