import React,{useState} from 'react';
import classes from './NavBar.module.css';
import Notification from '../Notifications/Notifications';
const NavBar = props => {
    const [showCalendar,setShowCalendar] = useState(false);
    const showCalendarHandler = ()=>{
        setShowCalendar(!showCalendar)
    }
    return (
        <div className={classes.NavBar}>
            <div className={classes.Container}>
                <h3>Dashboard</h3>
                <div onClick={showCalendarHandler}>Notifications</div>
            </div>
            {showCalendar ? <Notification/> : null}
        </div>
    )
};
export default NavBar;