import React, {useState} from 'react';
import {ethers} from 'ethers'
import {contractAddress,Abi } from '../Contact/contact';
function Buytickets() {
    const [buyingValues,setBuyingValues] = useState({
      name:"",
      totalTicket: 0,
      price:0
    })
    const {ethereum}=window

    const buyticket = async(e)=>
    {
      e.preventDefault()
      if (ethereum !== undefined) {
        try {
          await ethereum.request({method: "wallet_requestPermissions", params: [{eth_accounts: {}}]});
          await ethereum.request({method: "eth_requestAccounts"})
          const newsigner = new ethers.providers.Web3Provider(ethereum).getSigner();
          const datasend= new ethers.Contract(contractAddress,Abi,newsigner);
          const price= ethers.utils.parseEther(`${buyingValues.price}`)
          await datasend.buyTickets(buyingValues.name,buyingValues.totalTicket,{
            value: price
          })
        } catch (error) {
          alert(error.message)
        }
      }
      else
      {
        alert("Install metamask to BuyTickets!")
      }
    }
    function handleChange(e)
    {
       const {name,value}= e.target
       setBuyingValues((oldvalues)=>{
        return{
          ...oldvalues,
          [name]:value
        }
       })
    }
  return (
    <div className='form-div'>        
    <form onSubmit={buyticket} className="form">
      <label htmlFor="event-name">Event Name</label>
      <input 
      className='in-item'
      type="text" 
      id="name"
      name='name'
      value={buyingValues.name}
      onChange={handleChange}
      />
      <label htmlFor="totalTicket">Total Ticket</label>
      <input 
      className='in-item'
      type="number" 
      id="totalTicket"
      onWheel={(e)=>e.target.blur()}
      name="totalTicket"
      value={buyingValues.totalTicket}
      onChange={handleChange}
      />
      <label htmlFor="price">Amount</label>
      <input 
      className='in-item'
      type="number" 
      id="price"
      name='price'
      onWheel={(e)=>e.target.blur()}
      value={buyingValues.price}
      onChange={handleChange}
      />
      <button className='sub-btn' style= {{cursor:'pointer'}} >Buy Tickets</button>
    </form>
    </div>
  )
}

export default Buytickets