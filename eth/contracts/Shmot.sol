// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0 <0.9.0;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol';
import './Strings.sol';
/**
 * @title MyNFT
 * @dev Test NFT for hackathon
 */
 
 contract Shmotki is ERC1155PresetMinterPauser {
     
    
    uint256 public constant BODY_WHITE = 0;
    uint256 public constant BODY_BLACK = 1;
    uint256 public constant BODY_PINK = 2; 
    uint256 public constant HAT_WHITE = 3;
    uint256 public constant HAT_BLUE = 4;
    uint256 public constant HAT_RED = 5;
    uint256 public constant HAT_GREEN = 6;
    uint256 public constant HAT_BLACK = 7;
    uint256 public constant EYE_NARROW = 8;
    uint256 public constant EYE_ROUND = 9;
    uint256 public constant EYEBROW_EVIL = 10;
    uint256 public constant MOUTH_SAD = 11;
    uint256 public constant MOUTH_SMILE = 12;
    string private _contract_uri;
    string private _tokmeta_base_uri;
     
    constructor() public ERC1155PresetMinterPauser("ipfs://Qmb28LsvDN3u3A9w3aDgiVRpVjoV65N8Vo2oRsbqjMfbEC/") {
        _contract_uri = "ipfs://QmSaofN5x4smZUgo3MrAwfcFiM25ipTkkmaBQTvntuAvwt";
        _tokmeta_base_uri = "ipfs://Qmb28LsvDN3u3A9w3aDgiVRpVjoV65N8Vo2oRsbqjMfbEC/";
        _mint(msg.sender, BODY_WHITE, 1000, "");
        _mint(msg.sender, BODY_BLACK, 100, "");
        _mint(msg.sender, BODY_PINK, 10, "");
        _mint(msg.sender, HAT_WHITE, 10000, "");
        _mint(msg.sender, HAT_BLUE, 1000, "");
        _mint(msg.sender, HAT_RED, 1000, "");
        _mint(msg.sender, HAT_GREEN, 1000, "");
        _mint(msg.sender, HAT_BLACK, 100, "");
        _mint(msg.sender, EYE_NARROW, 100, "");
        _mint(msg.sender, EYE_ROUND, 10000, "");
        _mint(msg.sender, EYEBROW_EVIL, 100, "");
        _mint(msg.sender, MOUTH_SAD, 1000, "");
        _mint(msg.sender, MOUTH_SMILE, 10000, "");
    }
    
    function contractURI() public view returns (string memory) {
        return _contract_uri;
    }
    /**
   * @dev Returns an URI for a given token ID
   */
  function tokenURIPrefix() public view returns (string memory) {
    return _tokmeta_base_uri;
  }
  
  function uri(uint256 _tokenId)  public view override returns (string memory tokenMetaURI)
  {
      return string(abi.encodePacked(_tokmeta_base_uri, Strings.uint2str(_tokenId), ".json"));
  }
 }
