import Web3 from "web3";
import { addressBalance } from "../globals/dom.globals";

const web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/9187e875d2104604b97f1a00fe8783b7"))

export const getBalanceFromAddress = (address) => {
    

    web3.eth.getBalance(address, function(err, result) {
        if (err) {
            console.log(err)
        } else {
            //console.log(web3.utils.fromWei(result, "ether") + " ETH")
            addressBalance.innerText = web3.utils.fromWei(result, "ether") + " ETH"
        }
    })

    

}