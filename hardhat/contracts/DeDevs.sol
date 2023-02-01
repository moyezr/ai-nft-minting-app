//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IWhitelist.sold";
contract CryptoDevs is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    Counters.Counter private _tokenIds;

    bool public _paused;

    uint256 public maxTokenIds = 20;



    IWhitelist whitelist;

    modifier onlyWhenNotPaused {
        require(!_paused, "Contract currently Paused");
        _;
    }

    constructor(address whitelistContract) ERC721("De Devs", "DD") {

        whitelist = IWhitelist(whitelistContract);

    }

    function whitelistMint(string memory tokenURI) public payable onlyWhenNotPaused {
        require(whitelist.whitelistAddresses(msg.sender), " You are not whitelisted")
        require(msg.value >= 0.01 ether, "Ether sent is not correct");
        
        _tokenIds.increment();

        uint newTokenId = _tokenIds.current()

        _setTokenURI(newTokenId, tokenURI);
        _safeMint(msg.sender, newTokenId);
    }

    function publicMint(string memory tokenURI) public payable onlyWhenNotPaused {
        require(msg.value >= 0.2 ether, "Ether sent is not correct");
        _tokenIds.increment();

        uint newTokenId = _tokenIds.current()
        _setTokenURI(newTokenId, tokenURI);
        _safeMint(msg.sender, newTokenId)
    }


    function setPaused(bool val) public onlyOwner {
        _paused = val;
    }

    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value : amount}('');
        require(sent, "Failed to sent Ether");
    }


          // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

}