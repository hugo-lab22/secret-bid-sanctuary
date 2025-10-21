// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, eaddress, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract SecretBidSanctuary is SepoliaConfig {
    using FHE for *;
    
    struct Property {
        euint32 propertyId;
        euint32 reservePrice;
        euint32 currentBid;
        euint32 bidCount;
        bool isActive;
        bool isVerified;
        string name;
        string description;
        string imageHash;
        address owner;
        address highestBidder;
        uint256 startTime;
        uint256 endTime;
    }
    
    struct Bid {
        euint32 bidId;
        euint32 amount;
        address bidder;
        uint256 timestamp;
        bool isRevealed;
    }
    
    struct AuctionResult {
        euint32 winningBid;
        address winner;
        bool isSettled;
        uint256 settlementTime;
    }
    
    mapping(uint256 => Property) public properties;
    mapping(uint256 => Bid) public bids;
    mapping(uint256 => AuctionResult) public auctionResults;
    mapping(address => euint32) public bidderReputation;
    mapping(address => euint32) public propertyOwnerReputation;
    
    uint256 public propertyCounter;
    uint256 public bidCounter;
    uint256 public resultCounter;
    
    address public owner;
    address public verifier;
    
    event PropertyListed(uint256 indexed propertyId, address indexed owner, string name);
    event BidPlaced(uint256 indexed bidId, uint256 indexed propertyId, address indexed bidder, uint32 amount);
    event AuctionEnded(uint256 indexed propertyId, address indexed winner, uint32 winningBid);
    event PropertyVerified(uint256 indexed propertyId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function listProperty(
        string memory _name,
        string memory _description,
        string memory _imageHash,
        externalEuint32 _encryptedReservePrice,
        uint256 _duration,
        bytes calldata _inputProof
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Property name cannot be empty");
        require(_duration > 0, "Duration must be positive");
        
        uint256 propertyId = propertyCounter++;
        
        // Convert external encrypted reserve price to internal euint32
        euint32 encryptedReservePrice = FHE.fromExternal(_encryptedReservePrice, _inputProof);
        
        // Set ACL permissions for the encrypted reserve price
        FHE.allowThis(encryptedReservePrice);
        FHE.allow(encryptedReservePrice, msg.sender);
        
        properties[propertyId] = Property({
            propertyId: FHE.asEuint32(uint32(propertyId)),
            reservePrice: encryptedReservePrice,
            currentBid: FHE.asEuint32(0),
            bidCount: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            name: _name,
            description: _description,
            imageHash: _imageHash,
            owner: msg.sender,
            highestBidder: address(0),
            startTime: block.timestamp,
            endTime: block.timestamp + _duration
        });
        
        emit PropertyListed(propertyId, msg.sender, _name);
        return propertyId;
    }
    
    function placeBid(
        uint256 propertyId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(properties[propertyId].owner != address(0), "Property does not exist");
        require(properties[propertyId].isActive, "Property auction is not active");
        require(block.timestamp <= properties[propertyId].endTime, "Auction has ended");
        require(msg.sender != properties[propertyId].owner, "Owner cannot bid on own property");
        
        uint256 bidId = bidCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Set ACL permissions for the encrypted bid amount
        FHE.allowThis(internalAmount);
        FHE.allow(internalAmount, msg.sender);
        
        // Check if bid is higher than current bid (encrypted comparison)
        euint32 currentBid = properties[propertyId].currentBid;
        
        // Set permissions for currentBid before comparison
        FHE.allowThis(currentBid);
        FHE.allow(currentBid, msg.sender);
        
        // Compare encrypted values
        ebool isHigherBid = FHE.gt(internalAmount, currentBid);
        
        // Update current bid if this is higher (encrypted conditional update)
        euint32 newCurrentBid = FHE.select(isHigherBid, internalAmount, currentBid);
        properties[propertyId].currentBid = newCurrentBid;
        
        // Update bid count
        properties[propertyId].bidCount = FHE.add(properties[propertyId].bidCount, FHE.asEuint32(1));
        
        // Update highest bidder (simplified - always update for now)
        // In a real implementation, this would need to be handled differently
        properties[propertyId].highestBidder = msg.sender;
        
        bids[bidId] = Bid({
            bidId: FHE.asEuint32(uint32(bidId)),
            amount: internalAmount,
            bidder: msg.sender,
            timestamp: block.timestamp,
            isRevealed: false
        });
        
        emit BidPlaced(bidId, propertyId, msg.sender, 0); // Amount will be decrypted off-chain
        return bidId;
    }
    
    function endAuction(uint256 propertyId) public {
        require(properties[propertyId].owner == msg.sender, "Only owner can end auction");
        require(properties[propertyId].isActive, "Auction is not active");
        require(block.timestamp > properties[propertyId].endTime, "Auction has not ended yet");
        
        uint256 resultId = resultCounter++;
        
        auctionResults[resultId] = AuctionResult({
            winningBid: properties[propertyId].currentBid,
            winner: properties[propertyId].highestBidder,
            isSettled: false,
            settlementTime: 0
        });
        
        properties[propertyId].isActive = false;
        
        emit AuctionEnded(propertyId, properties[propertyId].highestBidder, 0); // Amount will be decrypted off-chain
    }
    
    function verifyProperty(uint256 propertyId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify properties");
        require(properties[propertyId].owner != address(0), "Property does not exist");
        
        properties[propertyId].isVerified = isVerified;
        emit PropertyVerified(propertyId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is bidder or property owner based on context
        if (bids[bidCounter - 1].bidder == user) {
            bidderReputation[user] = reputation;
        } else {
            propertyOwnerReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getPropertyInfo(uint256 propertyId) public view returns (
        string memory name,
        string memory description,
        string memory imageHash,
        uint8 reservePrice,
        uint8 currentBid,
        uint8 bidCount,
        bool isActive,
        bool isVerified,
        address propertyOwner,
        address highestBidder,
        uint256 startTime,
        uint256 endTime
    ) {
        Property storage property = properties[propertyId];
        return (
            property.name,
            property.description,
            property.imageHash,
            0, // FHE.decrypt(property.reservePrice) - will be decrypted off-chain
            0, // FHE.decrypt(property.currentBid) - will be decrypted off-chain
            0, // FHE.decrypt(property.bidCount) - will be decrypted off-chain
            property.isActive,
            property.isVerified,
            property.owner,
            property.highestBidder,
            property.startTime,
            property.endTime
        );
    }
    
    function getBidInfo(uint256 bidId) public view returns (
        uint8 amount,
        address bidder,
        uint256 timestamp,
        bool isRevealed
    ) {
        Bid storage bid = bids[bidId];
        return (
            0, // FHE.decrypt(bid.amount) - will be decrypted off-chain
            bid.bidder,
            bid.timestamp,
            bid.isRevealed
        );
    }
    
    function getAuctionResultInfo(uint256 resultId) public view returns (
        uint8 winningBid,
        address winner,
        bool isSettled,
        uint256 settlementTime
    ) {
        AuctionResult storage result = auctionResults[resultId];
        return (
            0, // FHE.decrypt(result.winningBid) - will be decrypted off-chain
            result.winner,
            result.isSettled,
            result.settlementTime
        );
    }
    
    function getBidderReputation(address bidder) public view returns (uint8) {
        return 0; // FHE.decrypt(bidderReputation[bidder]) - will be decrypted off-chain
    }
    
    function getPropertyOwnerReputation(address propertyOwner) public view returns (uint8) {
        return 0; // FHE.decrypt(propertyOwnerReputation[propertyOwner]) - will be decrypted off-chain
    }
    
    // Get encrypted property data for decryption
    function getPropertyEncryptedData(uint256 propertyId) public view returns (
        bytes32 reservePrice,
        bytes32 currentBid,
        bytes32 bidCount
    ) {
        Property storage property = properties[propertyId];
        return (
            FHE.toBytes32(property.reservePrice),
            FHE.toBytes32(property.currentBid),
            FHE.toBytes32(property.bidCount)
        );
    }
    
    // Get encrypted bid data for decryption
    function getBidEncryptedData(uint256 bidId) public view returns (
        bytes32 amount
    ) {
        Bid storage bid = bids[bidId];
        return (
            FHE.toBytes32(bid.amount)
        );
    }
    
    // Get encrypted auction result data for decryption
    function getAuctionResultEncryptedData(uint256 resultId) public view returns (
        bytes32 winningBid
    ) {
        AuctionResult storage result = auctionResults[resultId];
        return (
            FHE.toBytes32(result.winningBid)
        );
    }
    
    function settleAuction(uint256 propertyId, uint256 resultId) public {
        require(properties[propertyId].owner == msg.sender, "Only owner can settle auction");
        require(!auctionResults[resultId].isSettled, "Auction already settled");
        require(properties[propertyId].highestBidder != address(0), "No winning bidder");
        
        auctionResults[resultId].isSettled = true;
        auctionResults[resultId].settlementTime = block.timestamp;
        
        // Transfer property ownership
        properties[propertyId].owner = properties[propertyId].highestBidder;
        
        // Transfer funds to previous owner
        // Note: In a real implementation, funds would be transferred based on decrypted amount
        // payable(properties[propertyId].owner).transfer(winningBidAmount);
    }
}
