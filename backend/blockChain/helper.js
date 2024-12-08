const { web3, contractInstance } = require('./index');

async function createTransfer(to, amount) {
    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];

    try {
        const receipt = await contractInstance.methods
            .createTransfer(to, web3.utils.toWei(amount.toString(), 'ether'))
            .send({ from, value: web3.utils.toWei(amount.toString(), 'ether') });

        console.log('Transaction successful:', receipt);
    } catch (error) {
        console.error('Error creating transfer:', error);
    }
}

async function getAllTransfers() {
    try {
        const transfers = await contractInstance.methods.getAllTransfers().call();
        console.log('All Transfers:', transfers);
    } catch (error) {
        console.error('Error fetching transfers:', error);
    }
}

module.exports = {
    createTransfer,
    getAllTransfers
};
