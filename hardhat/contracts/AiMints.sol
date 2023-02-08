//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Whitelist.sol";
contract AiMints is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;
    //_tokenIds variable has the most recent minted tokenId
    Counters.Counter private _tokenIds;

    bool public _paused;

    mapping(address => uint8) public nftsMinted;

    Whitelist whitelist;

    modifier onlyWhenNotPaused {
        require(!_paused, "Contract currently Paused");
        _;
    }

    constructor(address whitelistContract) ERC721("AI Mints", "AIM") {

        whitelist = Whitelist(whitelistContract);

    }

    function _baseURI() internal view override returns (string memory) {
        return "http://127.0.0.1:3000/api/tokenURI/";
    }


    function whitelistMint(string memory tokenURI) public payable onlyWhenNotPaused {
        require(nftsMinted[msg.sender] < 3, "Max limit reached");
        require(whitelist.isWhitelisted(msg.sender), " You are not whitelisted");
        require(msg.value >= 0.01 ether, "Ether sent is not correct");
        
        _tokenIds.increment();
        uint8 no = nftsMinted[msg.sender];
        no += 1;
        nftsMinted[msg.sender] = no; 

        uint newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
    }

    function publicMint(string memory tokenURI) public payable onlyWhenNotPaused {
        require(nftsMinted[msg.sender] < 3, "Max limit reached");
        require(msg.value >= 0.02 ether, "Ether sent is not correct");
        _tokenIds.increment();
        uint8 no = nftsMinted[msg.sender];
        no += 1;
        nftsMinted[msg.sender] = no; 

        uint newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
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

    function getNumberOfNFTsMinted(address _sender) public view returns(uint8) {
        uint8 no = nftsMinted[_sender];
        return no;
    }

    // returns the latest minted tokenId 
    function latestTokenId() public view returns(uint) {
        uint latestId = _tokenIds.current();
        return latestId;
    }

    function contractURI() public view returns (string memory) {
        return "http:127.0.0.1/api/contractURI/contractURI";
    }


          // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

}