import React, { Component } from 'react';
import classes from './CurrentApp.module.css';
import Footer from '../../components/Footer/Footer';
class CurrentApp extends Component {
    state = {
        authorized: true
    }
    render() {
        return (
            <div >
                <div className={classes.Home}>
                <h1>Current Appointment Here</h1>
                </div>
                <Footer />
            </div>
        )
    }
}
export default CurrentApp;