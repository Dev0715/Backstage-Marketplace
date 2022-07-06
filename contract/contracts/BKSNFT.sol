// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    event Minted(uint256 tokenId, string tokenURI);

    Counters.Counter private _tokenIds;
    mapping(string => bool) public tokenURIExists;

    constructor() ERC721("MyNFT", "NFT") {}

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function mintNFT(address recipient, string memory _tokenURI) public {
        // require(!tokenURIExists[_tokenURI], "This ticket already minted");
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        tokenURIExists[_tokenURI] = true;

        emit Minted(newItemId, _tokenURI);
    }

    function getTokenURIExists(string memory _tokenURI)
        public
        view
        returns (bool)
    {
        return tokenURIExists[_tokenURI];
    }

    function tokensOfOwner(address _owner)
        external
        view
        returns (uint256[] memory)
    {
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokensId = new uint256[](tokenCount);
        for (uint256 i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokensId;
    }

    function transforNFT(address recipient, uint256 _tokenId) external {
        // uint256 price = PRICE;
        // require(msg.value >= price, "Incorrect value");

        _transfer(msg.sender, recipient, _tokenId);
        // payable(msg.sender).transfer(PRICE); // send the ETH to the recipient
    }

    function changeOwner(address newOwner) public onlyOwner {
        transferOwnership(newOwner);
    }
}
