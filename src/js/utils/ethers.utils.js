import { ethers } from "ethers";
import abi from "../contract/abi.json"
import { CONTRACT_ADDRESS, INFURA_KEY, NET, PRIVATE_KEY, TOKEN_PRICE } from "../globals/dom.globals";

const provider = new ethers.providers.JsonRpcProvider(`https://${NET}.infura.io/v3/${INFURA_KEY}`)
const contract = new ethers.Contract( CONTRACT_ADDRESS , abi , provider )
const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
const contractWithWallet = contract.connect(wallet)


// async function getCurrentAccount() {
//     const accounts = await window.web3.eth.getAccounts();
//     return accounts[0];
// }

export const  sendTx = async(tran, ethAddress, privateKey, value=0) =>{
    
},




mintTokens = async(address, amount) => {

    
    console.log(address, amount )
    
    
    const my_provider = new ethers.providers.Web3Provider(window.ethereum,"any");
    // // Prompt user for account connections
    await my_provider.send("eth_requestAccounts", []);

    console.log("signer is ", my_provider.getSigner())


    const my_signer = my_provider.getSigner();

    const my_wallet = new ethers.Wallet(PRIVATE_KEY, my_provider)
    const my_contract = new ethers.Contract( CONTRACT_ADDRESS , abi , provider)
    const my_contractWithWallet = my_contract.connect(my_wallet)
    
    if (amount && amount > 0)
    {
           
        const tx = await my_contractWithWallet.Mint(amount)
        await tx.wait()
        console.log(tx)
        
    }
    
    
},

getGas = () => {

    // web3.eth.getGasPrice()
    // .then((result) => {
    //     console.log(web3.utils.fromWei(result, 'ether'))     
    // })
    

    

},

getContractOwner = async (address) =>{
    return await contract.owner()
},


getBalanceFromAddress = async (address) => {    

    return ethers.utils.formatEther(await provider.getBalance(address))
}