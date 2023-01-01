import React, { useState } from 'react'
import {provider,contractAddress,Abi} from "../Contact/contact"
import { ethers } from 'ethers'

function Usersdata() {
  const {ethereum} = window
  const [toggle,settoggle]=useState(false)
  const[showCount,setShowCount]=useState([])
  const contract = new ethers.Contract(contractAddress,Abi,provider)
  const values = async(useraddress) => 
  {
    setShowCount([])
  try {
        const totalshows = await contract.showUserData(useraddress)
        totalshows.forEach(showarray => {
          setShowCount(oldvalue=>[showarray,...oldvalue])
        })
             
  } catch (error) {
    alert(error.message)
  }
}
 async  function walletConnection()
{   
    try {
        await ethereum.request({method: "wallet_requestPermissions", params: [{eth_accounts: {}}]})
        const accounts = await ethereum.request({method: "eth_requestAccounts"})
        const userAddress= accounts[0]
        return (userAddress)
    } catch (error) {
        console.log(error.message)
    }
}
const wrapper = async()=>
{
  if (ethereum !== undefined ) {
    const address= await walletConnection()
    await values(address)
    settoggle(true)
  } else {
    alert("please install metamask!")
  }
}
const indvidualShow= showCount.map((show) =>{
  const[name,totalTicket,purchasedOn,EventOn] = show
  const purchasedDate = new Date(Number(purchasedOn)*1000) 
  const eventDate= new Date(Number(EventOn))
  return(
  
    <div>
      <p>Event :{name.toString()}</p>
      <p>Ticket :{totalTicket.toString()}</p>
      <p>Purchased On : {purchasedDate.toDateString()}</p>
      <p>Event On :{eventDate.toDateString()}</p>
    </div>
   )
})
  return (
    <div >
        <button onClick={wrapper} className="wallet-btn"> Connect Wallet</button>
         <div className='info-card'>{ toggle && <div>{showCount.length === 0 ? <p>No ticket found</p>  : <div className='ticket-info'>{indvidualShow}</div>}</div>}</div>
    </div>
  )
}

export default Usersdata