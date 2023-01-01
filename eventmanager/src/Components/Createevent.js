import React, {useState} from 'react';
import {ethers} from 'ethers'
import {contractAddress,Abi } from '../Contact/contact';



function Createevent() 
{
    const[formInputs,setformInputs]=useState
    ({
      event_name:"",
      date: "",
      Price:0,
      totalTicket:0
    })
    const{ethereum}= window;
    console.log(ethereum)
    const createEvents = async(e)=>
    {
    e.preventDefault()
    if(ethereum !== undefined ) 
    {
          try {
            const timestamp = Date.parse(formInputs.date) // converting date into millisecond
            await ethereum.request({method: "wallet_requestPermissions", params: [{eth_accounts: {}}]})
            await ethereum.request({method: "eth_requestAccounts"})
            const signer = new ethers.providers.Web3Provider(ethereum).getSigner(); 
            const sendContractdata = new ethers.Contract(contractAddress,Abi,signer);
            const price= ethers.utils.parseEther(`${formInputs.Price}`);
            await sendContractdata.createEvent(formInputs.event_name,timestamp,price,formInputs.totalTicket);
            // contract.once('valueAdded',(key)=>{
            //  setShowCard(oldkey=>[key,...oldkey])
            // })
          } catch (error) {
            alert(error.message)
          }
      }
        else
        { 
        alert("please install metamask for organising events")
        }
    
    }

    function handleEvent(event)
    {
      const {name,value}= event.target
      setformInputs(oldvalue =>{
        return{
          ...oldvalue,
          [name]: value
        }
      }) 
    }
 
    
  return (
    <div className='form-div'>
      <form className='form-1'  onSubmit={createEvents}>
      <label htmlFor="name">Event Name</label>
        <input 
        className='in-item'
        id="name"
        name='event_name'
        type="text" 
        value={formInputs.name}
        onChange={handleEvent}
        />
        <label htmlFor="date">Starts On</label>
        <input 
        className='in-item'
        name='date'
        id="date"
        type="date" 
        value={formInputs.date}
        onChange={handleEvent}
        />
        <label htmlFor="price">Price(Eth)</label>
        <input 
        className='in-item'
        name='Price'
        onWheel={(e)=>e.target.blur()}
        id="price"
        type="number" 
        value={formInputs.Price}
        onChange={handleEvent}
        />
        <label htmlFor="ticket">Total Ticket</label>
        <input         
        className='in-item'
        name="totalTicket"
        onWheel={(e)=>e.target.blur()}
        id="ticket"
        type="number" 
        value={formInputs.totalTicket}
        onChange={handleEvent}
        /> 
    <button className="sub-btn-1"> Submit</button>
    </form>
 
    </div>
  )
}

export default Createevent