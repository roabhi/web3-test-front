/**
 * REMIX IDE CONTRACT URL -> https://remix.ethereum.org/#optimize=true&runs=200&evmVersion=null&version=soljson-v0.8.4+commit.c7e474f2.js
 */


import 'regenerator-runtime/runtime'
import { getBalanceFromAddress, getContractOwner, mintTokens } from './utils/web3.utils'
import { connectBtn, sendBtn, addressDisplay, addressBalance, amountCounter, contractUi, TESTNET } from './globals/dom.globals'

/**
 * SMART CONTRACT DETAILS 
 */

import abi from './contract/abi.json'
import { CONTRACT_ADDRESS } from './globals/dom.globals'

     

const onAmountChange = (e) => {
    
    let currentVal = amountCounter.value
    
    if (e.target.classList.contains('increase-amount'))
    {
        if (currentVal < 10 )
        {
            currentVal++
            amountCounter.value = currentVal
        }
    }
    else
    {
        if (currentVal > 0)
        {
            currentVal--
            amountCounter.value = currentVal
        }
    }
},


broadcast = (e) => {
    mintTokens(localStorage.getItem(`${TESTNET}`), amountCounter.value)
},

displayData = (address) =>
{
    document.body.classList.add('logged')
    connectBtn.innerText = "disconnect"
    addressDisplay.innerText = '' + address.substr(0,6) + '...' + address.substr(address.length - 3)
    addressDisplay.setAttribute('title', address)
    getBalanceFromAddress(address)
    getContractOwner(address)
    contractUi.classList.remove('hidden')

},

metaLogIn = async() => {
    
    const accounts =  await window.ethereum.request({method : 'eth_requestAccounts'});
    
    if (!document.body.classList.contains('logged'))    {
        
        localStorage.setItem(`${TESTNET}`, accounts[0])
        displayData(accounts[0])
    }
    else 
    {
        document.body.classList.remove('logged')
        connectBtn.innerText = "connect"
        addressDisplay.innerText = 'user address'
        addressDisplay.setAttribute('title', '')
        addressBalance.innerText = "ETH"
        localStorage.removeItem(`${TESTNET}`)
        contractUi.classList.add('hidden')

    }    
    
},

init = (e) => {
    document.removeEventListener('DOMContentLoaded', init, false)

    if (window.ethereum)
    {
        console.log(window.ethereum.isConnected())
        if (localStorage.getItem(`${TESTNET}`) && window.ethereum.isConnected())
        {
            displayData(localStorage.getItem(`${TESTNET}`))
        }
        else
        {
            connectBtn.innerText = "connect"
            // connectBtn.addEventListener('click', metaLogIn, false)
        }

        connectBtn.addEventListener('click', metaLogIn, false)
        sendBtn.addEventListener('click', broadcast, false)
        Array.from(document.querySelectorAll("button[class$='amount']")).map((obj) => {
            obj.addEventListener('click', onAmountChange, false)
        })

        
        
    }
    else 
    {
        connectBtn.innerText = "install metamask"
        connectBtn.classList.remove('bg-emerald-400', 'shadow-lg', 'shadow-emerald-400/50')
        connectBtn.classList.add('bg-red-400')
    }

}



document.addEventListener('DOMContentLoaded', init, false)