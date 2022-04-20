import Web3 from "web3";

const getWeb3 = async() => {
    var web3;
    if(window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
        } catch(error) {
            console.log(error);
            return error;
        }
    } else if(window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    } else {
        const provider = new Web3.providers.HttpProvider("http://121.0.0.1:8545");
        web3 = new Web3(provider);
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
    return web3;
}

const initiateContract = async(web3,contractJson) => {
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = contractJson.networks[networkId];
    const instance = new web3.eth.Contract(
        contractJson.abi,
        deployedNetwork && deployedNetwork.address,
    )
    console.log(instance);
    return instance;
}

export {getWeb3, initiateContract};