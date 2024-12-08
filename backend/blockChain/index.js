const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// Load contract ABI and bytecode
const contractPath = path.resolve(__dirname, 'contracts', 'Transaction.json');
const contractJSON = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
const { abi, bytecode } = contractJSON;

// Connect to Ethereum node (use your node URL or local Ganache)
const web3 = new Web3('http://localhost:8545');

// Define the account to deploy the contract
const deployerAccount = 'YOUR_DEPLOYER_ACCOUNT';
const deployerPrivateKey = 'YOUR_PRIVATE_KEY';

async function deployContract() {
    const contract = new web3.eth.Contract(abi);

    const deployment = contract.deploy({
        data: bytecode
    });

    const gasEstimate = await deployment.estimateGas();

    const signedTransaction = await web3.eth.accounts.signTransaction({
        data: deployment.encodeABI(),
        gas: gasEstimate,
        from: deployerAccount
    }, deployerPrivateKey);

    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
    console.log('Contract deployed at address:', receipt.contractAddress);

    return new web3.eth.Contract(abi, receipt.contractAddress);
}

// Initialize the contract instance
let contractInstance;

async function init() {
    contractInstance = await deployContract();
}

init().catch(console.error);

module.exports = {
    web3,
    contractInstance
};
