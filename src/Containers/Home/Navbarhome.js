import React, { Component } from 'react';
import NavigationItem from '../../components/Navigation/NavigationItem/NavigationItem';
import classes from './Navbarhome.module.css';
import {Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import './logo192.png';
class Navbarhome extends Component {
    state = {
        isAuthorized: true
    }
    render() {
      let MApp = <NavigationItem link="/BookAppointment" >Book an Appointment</NavigationItem>
      let authIcon = <div className={classes.Login}> 
                     <NavigationItem link="/Autherization" >Login/Signp</NavigationItem>
                     </div>
      if (this.state.isAuthorized) {
          MApp = <NavigationItem link="/ManageApp" > Appointments</NavigationItem>
          authIcon = <div> <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
          <FontAwesomeIcon icon={faBars} style={{ fontSize: "28px" }} color="white" />
          </Dropdown.Toggle>
        
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Help</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>  </div>;
      }
     

        return (
            <Aux>
                <header className={classes.Toolbar}>
                    <div ><img src= {require('./logo192.png')} height= {80} width ={200} alt ={null}/></div>
                    <div className={classes.Nav}>
                        <nav>
                            <ul>
                                <NavigationItem link="/" exact>Home</NavigationItem>
                                {MApp}
                                <NavigationItem link="/Chat" >Chat</NavigationItem>
                                <NavigationItem link="/Products" >Products</NavigationItem>
                                <NavigationItem link="/Autherization" >Login/Signp</NavigationItem>
                                
                            </ul>
                        </nav>
                        <div style={{ width: '50px', textAlign: 'center' }}>
                            <FontAwesomeIcon icon={faBell} style={{ fontSize: "22px" }} color="white" />
                        </div>
                        
                            {authIcon}
                        
                    </div>
                </header>
            </Aux>
        )
    }
}
export default Navbarhome;
