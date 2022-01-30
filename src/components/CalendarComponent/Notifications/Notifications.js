import React from 'react';
import classes from './Notifications.module.css';
function Notification(props) {
    return (
        <div className={classes.Notification}>
            <div className={classes.Container}>
                <h3 style={{marginLeft: '20px'}}>Notification</h3>
            </div>
        </div>
    )
};
export default Notification;