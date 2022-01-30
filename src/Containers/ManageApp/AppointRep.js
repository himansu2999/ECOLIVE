import React, {Component} from 'react';
import classes from './AppointRep.module.css';

class AppointRep extends Component{
    render(){
        return(
            <div className={classes.container}>
            <div className ={classes.subcontainer}>
            <h1 className={classes.head}> Appointment with Dr. Sanjeev Sultania</h1>
            <h2 className={classes.head}>Selected Week's Reccomendation Here</h2> 
            </div>
            <div className ={classes.subcontainer1}>
            <h2 className={classes.head}> List of Reccomendations Here</h2>
            <ul>
            <div className={classes.li}>Week 1 Recommendation</div>
            <div className={classes.li}>Week 2 Recommendation </div>
            <div className={classes.li}>Week 3 Recommendation </div>
            </ul>
            <div><button>Chat with doctor</button></div>
            </div>
            </div>
        )
    }
}
export default AppointRep;