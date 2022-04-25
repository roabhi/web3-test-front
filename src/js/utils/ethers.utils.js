import { ethers } from "ethers";
import abi from "../contract/abi.json"
import { alertMsg, CONTRACT_ADDRESS, NET} from "../globals/dom.globals";

const provider = new ethers.providers.Web3Provider(window.ethereum)
const contract = new ethers.Contract( CONTRACT_ADDRESS , abi , provider )



export const mintTokens = async(address, amount) => {

    //const provider = new ethers.providers.Web3Provider(window.ethereum)
    //const add = await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const signerAddress = await signer.getAddress()

    // console.log(provider, signer, signerAddress)

    // const signer = await provider.getSigner()
    // const mntContract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider)

    let currentSupply = await contract.totalSupply()
    console.log(currentSupply.toString())

    
    

    if (amount && amount > 0)
    {
           
        const txRes = await contract.connect(signer).Mint(amount)
        await txRes.wait()
        currentSupply = await contract.totalSupply()
        console.log(currentSupply.toString())
        alertMsg.classList.remove('hidden')
        setTimeout(() => {
            alertMsg.classList.add('hidden')
        }, 2000)
    }
    return true    
},

getTokenSupply = async () => {
    return await contract.totalSupply()
},

getContractOwner = async (address) =>{
    return await contract.owner()
},


getBalanceFromAddress = async (address) => {  
    return ethers.utils.formatEther(await provider.getBalance(address))
}