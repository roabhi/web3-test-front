import 'regenerator-runtime/runtime'

import { getBalanceFromAddress } from './utils/web3.utils'
import { connectBtn, addressDisplay, addressBalance, TESTNET } from './globals/dom.globals'


     

const displayData = (address) =>
{
    document.body.classList.add('logged')
    connectBtn.innerText = "disconnect"
    addressDisplay.innerText = '' + address.substr(0,6) + '...' + address.substr(address.length - 3)
    addressDisplay.setAttribute('title', address)
    getBalanceFromAddress(address)
},

metaLogIn = async() => {
    
    const accounts =  await window.ethereum.request({method : 'eth_requestAccounts'});
    
    if (!document.body.classList.contains('logged'))    {
        
        // document.body.classList.add('logged')
        // connectBtn.innerText = "disconnect"
        // addressDisplay.innerText = 'User address is \n' + accounts[0].substr(0,6) + '...' + accounts[0].substr(accounts[0].length - 3)
        // addressDisplay.setAttribute('title', accounts[0])
        localStorage.setItem(`${TESTNET}`, accounts[0])
        displayData(accounts[0])
    }
    else 
    {
        document.body.classList.remove('logged')
        connectBtn.innerText = "connect"
        addressDisplay.innerText = 'user address'
        addressDisplay.setAttribute('title', '')
        addressBalance.innerText = ""

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
        
        
    }
    else 
    {
        connectBtn.innerText = "install metamask"
        connectBtn.classList.remove('bg-emerald-400', 'shadow-lg', 'shadow-emerald-400/50')
        connectBtn.classList.add('bg-red-400')
    }

}



document.addEventListener('DOMContentLoaded', init, false)