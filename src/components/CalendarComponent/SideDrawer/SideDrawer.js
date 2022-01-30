import React from 'react';
import {Link} from 'react-router-dom';
import classes from './SideDrawer.module.css';
const SideDrawer = props=>{
    return(
        <div className={classes.SideDrawer}>
            <Link to="/Workouts">Workouts</Link>
            <Link to="/Settings">Settings</Link>
            <button onClick={()=>props.signOut()}>Log-out</button>
        </div>
    )
};
export default SideDrawer;