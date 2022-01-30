import React from 'react';
import Calendar from '../../../CalendarComponent/Calendar/Index';
import {withFirebase} from '../../../Firebase';
import {withRouter} from 'react-router-dom';
const Event = (props) => {
    return <Calendar doctorUid ={props.firebase.auth.currentUser.uid} doctorId={true}/>
}

export default withRouter(withFirebase(Event));