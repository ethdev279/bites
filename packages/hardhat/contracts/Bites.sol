// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract Bites {
    uint256 currentBiteId;
    uint256 currentCommentId;

    struct Bite {
        uint256 id;
        string content;
        string imageHash;
        uint256 likes;
        uint256 comments;
        address author;
    }

    mapping(uint256 biteId => Bite bite) public bites;

    // all bites
    Bite[] public bitesList;

    event BiteCreated(
        uint256 indexed id,
        string content,
        string imageHash,
        address indexed author
    );

    function createBite(
        string memory _content,
        string memory _imageHash
    ) public {
        uint256 biteId = currentBiteId;
        bites[biteId] = Bite(biteId, _content, _imageHash, 0, 0, msg.sender);
        bitesList.push(bites[biteId]);
        currentBiteId++;

        emit BiteCreated(biteId, _content, _imageHash, msg.sender);
    }

    function getAllBites() external view returns (Bite[] memory) {
        Bite[] memory result = new Bite[](currentBiteId);
        for (uint256 i = 0; i < currentBiteId; i++) {
            result[i] = bites[i];
        }
        return result;
    }
}
