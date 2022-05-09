/**
 * REMIX IDE CONTRACT URL -> https://remix.ethereum.org/#optimize=true&runs=200&evmVersion=null&version=soljson-v0.8.4+commit.c7e474f2.js
 */


import 'regenerator-runtime/runtime'
import { getBalanceFromAddress, getContractOwner, mintTokens, getTokenSupply, getAccounts } from './utils/ethers.utils'
import { connectBtn, sendBtn, addressDisplay, addressBalance, amountCounter, contractUi, NET, tokenSupply, mintingFee, TOKEN_PRICE } from './globals/dom.globals'
     

const onAmountChange = (e) => {
    
    
    let currentVal = amountCounter.value
    
    if (e.target.classList.contains('increase'))
    {
        if (currentVal < 10 )
            currentVal++
    }
    else
    {
        if (currentVal > 0)        
            currentVal--        
    }

    amountCounter.value = currentVal
},


broadcast = (e) => {
    mintTokens(localStorage.getItem(`${NET}`), amountCounter.value)
    .then(() => {
        getTokenSupply()
        .then((res) => tokenSupply.innerText = `Minted MNTs : ${res.toString()}`)
    })
    .then(() => {
        const accounts = getAccounts()
        .then((accounts) => {
            getBalanceFromAddress(accounts[0])
            .then((res) => addressBalance.innerText = res.substring(0,6) + ' ETH')})
    })

    
}, 

displayData = (address) =>
{
    document.body.classList.add('logged')
    connectBtn.innerText = "disconnect"
    addressDisplay.innerText = '' + address.substr(0,6) + '...' + address.substr(address.length - 3)
    addressDisplay.setAttribute('title', address)
    mintingFee.innerText = TOKEN_PRICE
    getBalanceFromAddress(address)
    .then((res) => addressBalance.innerText = res.substring(0,6) + ' ETH')
    getTokenSupply()
    .then((res) => tokenSupply.innerText = `Minted MNTs : ${res.toString()}`)
    getContractOwner(address)
    .then((res) => console.log('owner is ', res))
    contractUi.classList.remove('hidden')

},

metaLogIn = async() => {
    
    const accounts =  getAccounts().then(() => {
        if (!document.body.classList.contains('logged'))    {
        
            localStorage.setItem(`${NET}`, accounts[0])
            displayData(accounts[0])
        }
        else 
        {
            document.body.classList.remove('logged')
            connectBtn.innerText = "connect"
            addressDisplay.innerText = 'user address'
            addressDisplay.setAttribute('title', '')
            addressBalance.innerText = "ETH"
            tokenSupply.innerText = ''
            localStorage.removeItem(`${NET}`)
            contractUi.classList.add('hidden')
    
        }
    })
    
       
    
},

init = (e) => {
    document.removeEventListener('DOMContentLoaded', init, false)

    if (window.ethereum)
    {
        // console.log(window.ethereum.isConnected())
        if (localStorage.getItem(`${NET}`) && window.ethereum.isConnected())
        {
            displayData(localStorage.getItem(`${NET}`))
        }
        else
        {
            connectBtn.innerText = "connect"
            // connectBtn.addEventListener('click', metaLogIn, false)
        }

        connectBtn.addEventListener('click', metaLogIn, false)
        sendBtn.addEventListener('click', broadcast, false)
        Array.from(document.querySelectorAll("button.amount")).map((obj) => {
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