import Web3 from "web3";
import abi from "../contract/abi.json"
import { addressBalance, CONTRACT_ADDRESS, TOKEN_PRICE } from "../globals/dom.globals";

const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/9187e875d2104604b97f1a00fe8783b7"))
const contract = new web3.eth.Contract(abi,CONTRACT_ADDRESS)

export const mintTokens = async(address, amount) => {
    
    if (amount && amount > 0)
    {
        const price = web3.utils.toWei(TOKEN_PRICE),
            quantity = web3.utils.toBN(String(amount))

        // const res = await contract.methods.Mint(quantity).send({from: address})

        const contractAbi = eth.contract(abi)
        const myContract = contractAbi.at(CONTRACT_ADDRESS)
        const getData = myContract.Mint.getData(price, quantity)

        const res = await web3.eth.sendTransaction({to:CONTRACT_ADDRESS, from:address, data:getData});
    }
    
    
},

getContractOwner = async (address) =>{
    
    const res = await contract.methods.owner().call({from: address})
    console.log(res)
},


getBalanceFromAddress = (address) => {    

    web3.eth.getBalance(address, function(err, result) {
        if (err) {
            console.log(err)
        } else {
            //console.log(web3.utils.fromWei(result, "ether") + " ETH")
            addressBalance.innerText = web3.utils.fromWei(result, "ether") + " ETH"
        }
    })
}