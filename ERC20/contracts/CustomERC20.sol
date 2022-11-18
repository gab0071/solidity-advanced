// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import './ERC20.sol';

contract customERC20 is ERC20 {
    address public owner;

    // Constructor del Smart Contract
    constructor(string memory _name, string memory _symbol)
        ERC20(_name, _symbol)
    {
        owner = msg.sender;
    }

    // modifier
    modifier onlyOwner() {
        require(
            msg.sender == owner,
            'No tienes permisos para ejecutar la funcion'
        );
        _;
    }

    // Creacion de nuevos Tokens
    function crearTokens() public {
        _mint(msg.sender, 1000);
    }

    // Destruir Tokens
    function destruirTokens(address _account, uint256 _amount)
        public
        onlyOwner
    {
        _burn(_account, _amount);
    }
}
