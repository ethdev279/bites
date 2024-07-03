// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

contract Bites {
    uint256 currentBiteId;
    uint256 currentCommentId;

    struct Bite {
        uint256 id;
        string content;
        string imageHash;
        address author;
    }

    struct Comment {
        uint256 id;
        uint256 biteId;
        string content;
        address author;
    }

    mapping(uint256 biteId => Bite bite) public bites;
    mapping(uint256 biteId => mapping(uint256 commentId => Comment comment))
        public biteComments;

    event BiteCreated(
        uint256 indexed id,
        string content,
        string imageHash,
        address indexed author
    );
    event CommentedOnBite(
        uint256 indexed id,
        uint256 indexed biteId,
        string content,
        address indexed author
    );

    function createBite(
        string memory _content,
        string memory _imageHash
    ) public {
        uint256 biteId = currentBiteId;
        bites[biteId] = Bite(biteId, _content, _imageHash, msg.sender);
        currentBiteId++;

        emit BiteCreated(biteId, _content, _imageHash, msg.sender);
    }

    function commentOnBite(uint256 _biteId, string memory _content) public {
        require(bites[_biteId].author != address(0), "Bite does not exist");
        require(bytes(_content).length > 0, "Comment cannot be empty");

        uint256 commentId = currentCommentId;
        biteComments[_biteId][commentId] = Comment(
            commentId,
            _biteId,
            _content,
            msg.sender
        );
        currentCommentId++;
        emit CommentedOnBite(commentId, _biteId, _content, msg.sender);
    }
}
