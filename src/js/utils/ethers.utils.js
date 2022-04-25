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

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // const add = await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const signerAddress = await signer.getAddress()

    console.log(provider, signer, signerAddress)

    // const signer = await provider.getSigner()
    const mntContract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider)

    let currentSupply = await mntContract.totalSupply()
    console.log(currentSupply.toString())

    
    

    if (amount && amount > 0)
    {
           
        const txRes = await mntContract.connect(signer).Mint(amount)
        await txRes.wait()
        currentSupply = await mntContract.totalSupply()
        console.log(currentSupply.toString())
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