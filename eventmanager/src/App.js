import React ,{useState} from 'react';
import './App.css';
import AllEvents from './Components/AllEvents';
import Buytickets from './Components/Buytickets';
import Createevent from './Components/Createevent';
import Navbar from './Components/Navbar';
import Tickettransfer from './Components/Tickettransfer';
import Usersdata from './Components/Usersdata';
import collage   from "./images/collage.png"
import{provider,contractAddress,Abi} from "./Contact/contact"
import { ethers } from 'ethers'


function App() {
  const[toggle,settoggle]= useState(true)
  const[click,setClick]=useState(true) // to handle multiple click on contractCall function
  const [eventList,seteventList]= useState([])
  const contract = new ethers.Contract(contractAddress,Abi,provider);
  const settoggleValue=()=>
  {
    settoggle((oldvalue)=> !oldvalue)
  }
  const contractCall =  async() => 
     {  
        setClick(false)
        seteventList([])
        try {
            const loggedShows = contract.filters.valueAdded();
            const results=  await contract.queryFilter(loggedShows,0,'latest')
              const lengths= results.length
              for(let i= 0;i<lengths;i++)
              {
                const event_name= await results[i].args[0]   
                const event_date =  await results[i].args[1].date.toString()   
                const currentTime = new Date()
                const eventTime = new Date(Number(event_date))
                if(currentTime <= eventTime)  
                {
                seteventList(oldlist=> [...oldlist,event_name])
                }
              }
              setClick(true)
        } catch (error) {
           alert(error.message)   
        }
        
    }

const eventlistvalue= eventList.map(list=>{
  return(
      <div className='map-div'>
      <AllEvents showname={list} />
      </div>
  )
})
  return (
    <div className="App">
      { toggle ?
      <div className='Oragniser-page'>
      <div className='container-1'>
      <Navbar/>
      <button className='buy-btn' onClick={ settoggleValue} > Buy tickets </button>
      </div>
      <div className='description'><p>Welcome to Eventify! We are a platform that makes it easy for you to plan and host successful events. 
        Whether you're organizing a business conference, a birthday party, or a charity fundraiser, we have the tools and resources you need to make it happen.
        Also you can buy tickets and transfer purchased ticket to you friends wallet</p>
        <div className='img-div'><img src={collage} alt="collage" /></div>
      </div>
      <div className="eventcreation">
      <h3 className='sec-buy'>Oraganise Event</h3>
      <Createevent/>
      </div>
      <div className="showlist-div">
      <div className="showEvent-map" > <span onClick={click && contractCall} > Live Events</span></div>
      <div className="showlist">{eventlistvalue}</div>
      <span>Click event name for more info</span>
      </div>
      </div>
      :
      <div>
      <div className='container-1'>
      <Navbar/>
      <button className='buy-btn' onClick={settoggleValue}> Organise Event </button>
      </div>
      <div className="info-div">
      <Usersdata/>
      <p>Connect wallet to get info of your purchased tickets</p>
      </div>
      <div className="showlist-div">
      <div className="showEvent-map" > <p onClick={click && contractCall} style={{cursor:'pointer'}} > Live Events</p></div>
      <div className="showlist">{eventlistvalue}</div>
      <span>Click event name for more info</span>
      </div>
      <div className="eventcreation">
       <h3 className='sec-buy'>Don't miss out – get your tickets today</h3>
      <Buytickets/>
      </div>
      <div className="eventcreation">
      <h3 className='sec-transfer'>Transfer Tickets</h3>
      <Tickettransfer/>
      </div>
      </div>
       }
      </div>
  );
}

export default App;
