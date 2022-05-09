import { ethers } from "ethers";
import abi from "../contract/abi.json"
import { alertMsg, CONTRACT_ADDRESS, NET, TOKEN_PRICE} from "../globals/dom.globals";

const provider = new ethers.providers.Web3Provider(window.ethereum)
const contract = new ethers.Contract( CONTRACT_ADDRESS , abi , provider )



export const mintTokens = async(address, amount) => {


    // console.log(provider.getNetwork())

    //const provider = new ethers.providers.Web3Provider(window.ethereum)
    //const add = await provider.send('eth_requestAccounts', [])
    const signer = provider.getSigner()
    const signerAddress = await signer.getAddress()

    // console.log(provider, signer, signerAddress)

    // const signer = await provider.getSigner()
    // const mntContract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider)

    let currentSupply = await contract.totalSupply()
    // console.log(currentSupply.toString())   
    

    if (amount && amount > 0)
    {           
        const options = {value: ethers.utils.parseEther(TOKEN_PRICE)}
        const txRes = await contract.connect(signer).Mint(amount, options)

        alertMsg.classList.remove('hidden')  
        await txRes.wait()
        currentSupply = await contract.totalSupply()
        console.log(currentSupply.toString())
        alertMsg.querySelector('p').classList.remove('shadow-blue-800/50', 'bg-blue-400')
        alertMsg.querySelector('p').classList.add('shadow-green-800/50', 'bg-green-400')
        alertMsg.querySelector('p').innerText = 'Transaction Success'
        setTimeout(() => {
            alertMsg.classList.add('hidden')
            alertMsg.querySelector('p').classList.remove('shadow-green-800/50', 'bg-green-400')
            alertMsg.querySelector('p').classList.add('shadow-blue-800/50', 'bg-blue-400')
            alertMsg.querySelector('p').innerText = 'Processing Transaction...'
        }, 2500)
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
    const net = await provider.getNetwork()

    if (net.name != NET)
    {
        alertMsg.querySelector('p').classList.remove('w-2/12')
        alertMsg.querySelector('p').classList.add('w-4/12')
        alertMsg.classList.remove('hidden')
        alertMsg.querySelector('p').classList.remove('shadow-blue-800/50', 'bg-blue-400')
        alertMsg.querySelector('p').classList.add('shadow-red-800/50', 'bg-red-400')
        alertMsg.querySelector('p').innerText = 'please connect to rinkeby testnet and reload page'
    }
    else
    {
        return ethers.utils.formatEther(await provider.getBalance(address))
    } 

    
},

getAccounts = async () => {
    return await window.ethereum.request({method : 'eth_requestAccounts'})
}