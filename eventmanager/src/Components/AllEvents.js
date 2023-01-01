import React ,{ useState} from 'react'
import{provider,contractAddress,Abi} from "../Contact/contact"
import { ethers } from 'ethers'

function AllEvents(props) {
    const [toggle,settoggle]= useState(false)
    const [showValue,setShowValues] = useState()
    const contract = new ethers.Contract(contractAddress,Abi,provider);
    const showDetail = async()=>
    {
        try {
              var showIndex =0
             const loggedShows= contract.filters.valueAdded()
             const results =  await contract.queryFilter(loggedShows,0,'latest')
             for(let i =0 ;i<results.length;i++)
             {
                if( results[i].args[0] === props.showname)
                {
                    showIndex = i ;
                    break;
                }
             }
            const allValues = await details(results,showIndex)
            setShowValues(allValues)
        } catch (error) {
            alert(error.message)
        }
      }
       
      const details = async(results,showIndex)=>
      {
        const EventName = <h2>Event : {await results[showIndex].args[1].name.toString()}</h2>
        const organiserValue= JSON.stringify(await results[showIndex].args[1].organiser)
         const organiser = <p className='organiser'>Oraganiser Addr: {organiserValue.slice(1,42)}</p>
         const datetimestamp= await results[showIndex].args[1].date.toString()
         const dateValue= new Date(Number(datetimestamp))
        const showDate = <h2>Event On : {dateValue.toDateString()}</h2>
        const priceInWei=await results[showIndex].args[1].price.toString()
        const priceInEth = <h2>Price : {ethers.utils.formatEther(priceInWei)} Eth</h2>
        const totalTickets = <h2>Total Ticket : {await results[showIndex].args[1].totalTicket.toString()}</h2>
        const ticketsAvailable = <h2>Ticket Left: {await results[showIndex].args[1].ticketAvailable.toString()}</h2>
        const allDetails = [EventName,organiser,showDate,priceInEth,totalTickets,ticketsAvailable]
        return allDetails
      }
    const toggleValue = async()=>
    {   
       if(toggle)
        settoggle(oldvalue=>!oldvalue)
        else
        {
         await showDetail()
         settoggle(oldvalue=>!oldvalue)
        }
    }
    
    
  return (
    <div className='showlist-main'>
       <div  onClick={toggleValue} style={{cursor:'pointer'}} className="card-name">{props.showname}</div> 
        {toggle ?
        <div className="card-info">
          {showValue}
        </div>
        :
        ""
        }
    </div>
    )
  
}

export default AllEvents