import React, { Component } from 'react';
import {Navbar,Nav,NavDropdown,Form,Button,FormControl,Image} from 'react-bootstrap';
import './userdash.css';
import './logo192.png';
class Userdash extends React.Component{ 
  render(){
  return (          
        <div>
        <div>     
<Navbar bg="primary" variant="dark">
<Navbar.Brand href="#home" ><text id="title1">User DashBoard</text></Navbar.Brand>
<Nav className="mr-auto">
<div id="title2" >
<Nav.Link href="#home" id="title2" >Products</Nav.Link>
</div>
<div id="title3">
<Nav.Link href="#home" id="title3" >Notifications</Nav.Link> 
</div>
<div id="title3">
  <Nav.Link href="#features" id="title3">Events</Nav.Link>
  </div>
  <div id="basic-nav-dropdown">  
  <NavDropdown title="Appointements" id="basic-nav-dropdown"> 
  <NavDropdown.Item href="#action/3.1" id="title4">Current Appointments</NavDropdown.Item>
    <NavDropdown.Item href="#action/3.2" id="title5">Past Appointements</NavDropdown.Item>
  </NavDropdown>
  </div>
  </Nav>

</Navbar>
</div> 
<div className='mr-auto'>
 <img id="head1" src={require('./logo192.png')}/>
 <h1 id="head1">This is patient's landing page</h1>
</div>
</div>
       );
  }
}
export default Userdash;