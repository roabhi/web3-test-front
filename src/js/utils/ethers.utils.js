import { ethers } from 'ethers'
import { addListener } from 'process'
import abi from '../contract/abi.json'
import {
  alertMsg,
  CONTRACT_ADDRESS,
  NET,
  sendBtn,
  TOKEN_PRICE,
} from '../globals/dom.globals'

const provider = new ethers.providers.Web3Provider(window.ethereum)
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider)

export const mintTokens = async (address, amount) => {
    const signer = provider.getSigner()
    const signerAddress = await signer.getAddress()
    let currentSupply = await contract.totalSupply()

    if (amount && amount > 0) {
      const options = { value: ethers.utils.parseEther(TOKEN_PRICE) }
      const txRes = await contract.connect(signer).Mint(amount, options)

      sendBtn.classList.add('processing')
      sendBtn.querySelector('span').innerHTML = 'transaction sent'

      await txRes.wait()
      currentSupply = await contract.totalSupply()
      console.log(currentSupply.toString())
      sendBtn.classList.remove('shadow-blue-800/50', 'bg-blue-800')
      sendBtn.classList.add('shadow-emerald-800/50', 'bg-emerald-400')
      sendBtn.querySelector('span').innerHTML = 'Success!'
      sendBtn.classList.remove('processing')
      setTimeout(() => {
        sendBtn.querySelector('span').innerHTML = 'send'
        sendBtn.classList.add('shadow-blue-800/50', 'bg-blue-800')
        sendBtn.classList.remove('shadow-emerald-800/50', 'bg-emerald-400')
      }, 2500)
    }
    return true
  },
  getTokenSupply = async () => {
    return await contract.totalSupply()
  },
  getContractOwner = async (address) => {
    return await contract.owner()
  },
  getBalanceFromAddress = async (address) => {
    const net = await provider.getNetwork()

    if (net.name != NET) {
      alertMsg.classList.remove('hidden')
    } else {
      return ethers.utils.formatEther(await provider.getBalance(address))
    }
  },
  getAccounts = async () => {
    return await window.ethereum.request({ method: 'eth_requestAccounts' })
  }
