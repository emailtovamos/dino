// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ScoreToken is ERC20 {
    address public gameAdmin;
    mapping(address => uint256) public scores;

    modifier onlyAdmin() {
        require(msg.sender == gameAdmin, "Not admin");
        _;
    }

    constructor() ERC20("ScoreToken", "SCT") {
        gameAdmin = msg.sender;
    }

    function setScore(address player, uint256 score) external onlyAdmin {
        scores[player] = score;
        _mint(player, score * 10);  // Reward player with 10 tokens per score point
    }

    function getScore(address player) external view returns (uint256) {
        return scores[player];
    }
}
