import React, { useState }  from 'react';
import {ethers} from 'ethers'
import {contractAddress,Abi } from '../Contact/contact';

function Tickettransfer() {
    const [formData,setFormData]= useState({
      show:"",
      reciever:"",
      ticket:0
    })
    const {ethereum} = window
    const transferTickets = async(e)=>
    {
      if (ethereum !== undefined) {
        
        e.preventDefault()
        try {
          console.log("im here")
          console.log(formData.show)
          console.log(formData.reciever)
          console.log(formData.ticket)
          const recieverAddress= ethers.utils.getAddress(`${formData.reciever}`)
          await ethereum.request({method:'wallet_requestPermissions',params:[{eth_accounts:{}}]})
          await ethereum.request({method: "eth_requestAccounts"})  // i was getting error as: 'args.method' must be a non-empty string. => Due to this:await ethereum.request({message: "eth_requestAccounts"})
          const thisSigner = new ethers.providers.Web3Provider(ethereum).getSigner();
          const contractInsance= new ethers.Contract(contractAddress,Abi,thisSigner);
          const contract_function="transferTickets";
          await contractInsance.functions[contract_function](formData.show,formData.ticket,recieverAddress)
        } catch (error) {
         alert(error)
        }
      } else {
        alert("Install metamask to Transfer Tickets")
      }
    }
    function handleEvent(e)
    { 
      const {name,value} = e.target
      setFormData((olddata)=>{
        return{
          ...olddata,
          [name]: value
        }
      })
    }
  return (
    <div className='form-div'>        
      <form className="form" onSubmit={transferTickets}>
        <label htmlFor="name">Show Name</label>
        <input 
         className='in-item'
         type="text"
         id='name'
         name="show"
         value={formData.show}
         onChange={handleEvent}
         />
        <label htmlFor="addr">Tranfer To</label>
        <input 
         className='in-item'
         type="text"
         id='addr'
         name="reciever"
         value={formData.reciever}
         onChange={handleEvent}
         />
         <label htmlFor="tic">Tickets</label>
         <input 
         className='in-item'
         type="number" 
         id='tic'
         name="ticket"
         onWheel={(e)=>e.target.blur()}
         value={formData.ticket}
         onChange={handleEvent}
         />
        <button className='sub-btn'>Transfer Tickets</button>   
      </form>
      <div className="error-div">
      </div>
    </div>
  )
}

export default Tickettransfer