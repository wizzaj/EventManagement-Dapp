// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
contract eventManagement
{
    struct Event{
    address payable organiser;
    string name;
    uint date;
    uint price;
    uint totalTicket;
    uint ticketAvailable; 
    }
    struct Userdata{
     string showname;
     uint totalTicket;
     uint purchasedOn;
     uint EventOn;
    }
    mapping(string => Event) public events;
    event valueAdded(string,Event);
    mapping(address => Userdata[]) userTickets;//mapping to count the number of tickets purchased by person per event.
    function createEvent(string memory _name, uint _date, uint _price, uint _totalTicket) external 
    {
        require(_date>block.timestamp,"You can organise event in future");
        require( _totalTicket > 0,"please available tickets");
        events[_name]= Event(payable(msg.sender),_name,_date,_price,_totalTicket,_totalTicket);
        emit valueAdded(_name,events[_name]);
    } 
    modifier verification(string memory _name,uint _quantity)
    {
        require(msg.sender!= events[_name].organiser,"Organiser cannot buy tickets");
        require(events[_name].date!=0,"no such event");
        require(events[_name].date>=block.timestamp,"event closed");
        require(msg.value>=(events[_name].price*_quantity),"please pay sufficent amount");
        require(events[_name].ticketAvailable >= _quantity,"not enough tickets");
        _; 
    }
    function buyTickets(string memory _name,uint  _quantity) public payable verification(_name,_quantity) 
    {
      Event storage _events = events[_name];
     _events.ticketAvailable -= _quantity;
      userTickets[msg.sender].push(Userdata(_name,_quantity,block.timestamp,events[_name].date));
     _events.organiser.transfer(msg.value);
    }
   function transferTickets(string memory _name, uint _quantity , address  _to) public
    {  
       require(msg.sender!= events[_name].organiser,"Organiser cannot transfer");
       require(events[_name].date!=0,"no such event");
       require(events[_name].date>=block.timestamp,"event closed"); 
       require(msg.sender != _to,"you can't send ticket to yourself");
       uint currentindex=0; 
       for(uint i=0;i<userTickets[msg.sender].length;i++)
       {
           if( keccak256(abi.encodePacked(userTickets[msg.sender][i].showname)) == keccak256(abi.encodePacked(_name)))
           {
             currentindex=i;  
           }
       }
       require(userTickets[msg.sender][currentindex].totalTicket >=_quantity,"not have enough tickets");
       userTickets[msg.sender][currentindex].totalTicket-= _quantity;
       uint toIndex=0;// im only using this because i need logic for second if condition
       uint lengths = userTickets[_to].length;
       if(lengths > 0)
       {
         for(uint i=0;i<userTickets[_to].length;i++)
       {
           string memory name =userTickets[_to][i].showname;
           if( keccak256(abi.encodePacked(name)) == keccak256(abi.encodePacked(_name)))
           {
             toIndex = 1;
             userTickets[_to][i].totalTicket += _quantity;
             break;
           }
       }
       }
      if(toIndex == 0)
       {
       userTickets[_to].push(Userdata(_name,_quantity,block.timestamp,events[_name].date));
       }
    }
    function showUserData(address _user)external view returns(Userdata[] memory)
    {        
        require(userTickets[_user].length > 0,"Please enter the address that you have used for buying tickets");
        return userTickets[_user];
    }
    
}