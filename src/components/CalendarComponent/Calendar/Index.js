import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import { withAuthentication } from '../../Session';
import CalendarHead from './Calendar-head';
import CalendarBody from './Calendar-body';
import classes from './Calendar.module.css';
import Modal from '../Modal/Modal';
import ActivityList from '../ActivityList/index';
import ApplicationList from '../ApplicationList/ApplicationList';
import SelectDoctor from '../SelectDoctor/SelectDoctor';
import SelectPatient from '../SelectPatient/SelectPatient';
function Calendar(props) {
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMsg, setSnackbarMsg] = React.useState(null);

    const { firebase, authUser } = props;
    const defaultSelectedDay = {
        day: moment().format("D"),
        month: moment().month(),
        year: moment().year(),
        timeslot: '10:00 AM -- 10:15 PM'
    }
    const [Uid, setUid] = useState(false);
    const [patientUid, setPatientUid] = useState(false);
    const [docName,setDocName] = useState(null);
    /*** HOOKS */
    const [dateObject, setdateObject] = useState(moment());
    const [showMonthTable, setShowMonthTable] = useState(false);
    const [selectedDay, setSelected] = useState(defaultSelectedDay);
    const allMonths = moment.months();
    const currentMonth = () => dateObject.format("MMMM");
    const currentYear = () => dateObject.format("YYYY");
    const actualYear = moment().year()

    const setMonth = month => {
        let monthNo = allMonths.indexOf(month);
        let newDateObject = Object.assign({}, dateObject);
        newDateObject = moment(dateObject).set("month", monthNo);
        setdateObject(newDateObject);
        setShowMonthTable(false);
    }
    const setYear = year => {
        let newDateObject = moment(dateObject).set("year", year)
        setdateObject(newDateObject);
    }
    const toggleMonthSelect = () => setShowMonthTable(!showMonthTable);
    /**CALENDAR BODY **/

    const setSelectedDay = (day) => {
        setSelected({
            day:day.Day,
            month: currentMonthNum(),
            year: currentYear(),
            timeslot:day.timeslot
        });
        // Later refresh data
    };
    const currentMonthNum = () => dateObject.month();

    const daysInMonth = () => dateObject.daysInMonth();
    const currentDay = () => dateObject.format("D");

    const actualMonth = () => moment().format("MMMM");
    const firstDayOfMonth = () => moment(dateObject).startOf("month").format("d");
    /*** ADDING AN ACTIVITY */
    const [activities, setActivities] = useState(true);
    const [activitiesAll, setActivitiesAll] = useState(true);
    const [loading, setLoading] = useState([]);
    const [activeDays, setActiveDays] = useState([]);
    const retrieveActiveDays = useCallback(() => {
        if (patientUid || props.patientUid) {
            let ref = firebase.db.ref().child(`users/${patientUid ? patientUid : props.patientUid}/activities`);
            ref.on("value", snapshot => {
                if (snapshot.val().toString() === 'not set') {
                    setActiveDays([]);
                    return;
                }
                let data = snapshot.val();
                const values = Object.values(data);
                // Store all active day/month combinations in array for calendar
                const arr = values.map(obj => {
                    return obj.date
                });
                setActiveDays(arr);
            });
            return;
        }
        if (Uid || props.doctorUid) {
            let ref = firebase.db.ref().child(`doctors/${Uid ? Uid : props.doctorUid}/activities`);
            ref.on("value", snapshot => {
                if (snapshot.val().toString() === 'not set') {
                    setActiveDays([]);
                    if(props.doctorUid){
                        setDocName(props.docName);
                        console.log(props.docName);
                    }
                    return;
                }
                let data = snapshot.val();
                const values = Object.values(data);
                // Store all active day/month combinations in array for calendar
                const arr = values.map(obj => {
                    return obj.date
                });
                setActiveDays(arr);
                if(props.doctorUid){
                    setDocName(props.docName);
                    console.log(props.docName);
                }
            });
            return;
        }
    }, [firebase, patientUid, Uid, props.patientUid, props.doctorUid,props.docName]);
    const retrieveData = useCallback(() => {
        let queryDate = `${selectedDay.day}-${selectedDay.month+1}-${selectedDay.year}`;
        let all = firebase.db.ref().child(`requests`);
        all.orderByChild("doctorId").equalTo("not set").on("value", snapshot => {
            let data = snapshot.val();
            setActivitiesAll(data);
            setLoading(false)
        })
        if (Uid || props.doctorUid) {
            let ref = firebase.db.ref().child(`doctors/${Uid ? Uid : props.doctorUid}/activities`);
            ref.orderByChild("date").equalTo(queryDate).on("value", snapshot => {
                let data = snapshot.val();
                setActivities(data);
            });
            // Update active days
            retrieveActiveDays();
        }
        if ((patientUid && patientUid !== authUser.uid) || props.patientUid) {
            console.log(queryDate)
            let ref = firebase.db.ref().child(`users/${patientUid ? patientUid : props.patientUid}/activities`);
            ref.orderByChild("date").equalTo(queryDate).on("value", snapshot => {
                let data = snapshot.val();
                setActivities(data);
            });
            // Update active days
            retrieveActiveDays();
        }
    }, [firebase, authUser, selectedDay, retrieveActiveDays, Uid, patientUid, props.patientUid, props.doctorUid]);

    useEffect(() => retrieveData(), [selectedDay, retrieveData]);
    /**EDIT AN ACTIVITY */

    const setUidNullHandler = () => {
        setUid(false);
        setPatientUid(false);
        setActiveDays(null);
        setActivities(true);
    }
    selectedDay.year = new Date().getFullYear();
    let queryDate = `${selectedDay.day}-${selectedDay.month+1}-${selectedDay.year}`;
    let timeslot = selectedDay.timeslot
    const handleSubmit = () => {
        
        if ((props.doctorId !=="not set" && queryDate)||(Uid&&queryDate)) {
            firebase.addDoctorToApplication(props.reqId, Uid?Uid:props.doctorId, queryDate, props.patientId,timeslot,docName?docName:props.docName);
            // firebase.removeUnassignedApplication(props.reqId);
            firebase.addApplicationToDoctor(props.reqId, Uid?Uid:props.doctorId, queryDate, props.appointment,timeslot,docName?docName:props.docName);
            setTimeout(() => alert("Appointment assigned"),200);  
        }
        else{
            setTimeout(() => alert("No doctor Choosen"),200);
        }
    }
    return (
        <div className={classes.Calendar} style={{ padding: '10px' }}>
            <div >
                <CalendarHead
                    allMonths={allMonths}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    setMonth={setMonth}
                    setYear={setYear}
                    showMonthTable={showMonthTable}
                    toggleMonthSelect={toggleMonthSelect}
                />
                <CalendarBody
                    firstDayOfMonth={firstDayOfMonth}
                    daysInMonth={daysInMonth}
                    currentDay={currentDay}
                    currentMonth={currentMonth}
                    currentMonthNum={currentMonthNum}
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    actualMonth={actualMonth}
                    weekdays={moment.weekdays()}
                    activeDays={activeDays}
                    currentYear={currentYear}
                    actualYear={actualYear}
                    chooseSlot={props.patientUid||props.doctorId===true?false:true}
                />
            </div>
            {props.assignList ? <div className={classes.ApplicationList}>
                <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ marginLeft: '20px' }}>Appointment List </h3>
                </div>
                <ApplicationList
                    selectedDay={selectedDay}
                    authUser={authUser}
                    Uid={props.doctorUid}
                    firebase={firebase}
                    loading={loading}
                    activities={activitiesAll}
                    setOpenSnackbar={setOpenSnackbar}
                    setSnackbarMsg={setSnackbarMsg}
                />
            </div> : null}
            <div>
                {props.doctor ? <div className={classes.AddActivity}>
                    <h3 style={{ marginLeft: '20px' }}>Select Doctor to Assign</h3>
                    <SelectDoctor
                        authUser={authUser}
                        firebase={firebase}
                        setUid={setUid}
                        docName={docName}
                        setDocName={setDocName}
                    />
                    <button style={{ height: '30px', width: '100%' }} onClick={() => handleSubmit()}>Assign</button>
                </div> : null}
                {props.patient ? <div className={classes.AddActivity}>
                    <h3 style={{ marginLeft: '20px' }}>Select Patient to Assign</h3>
                    <SelectPatient
                        authUser={authUser}
                        firebase={firebase}
                        setUid={setPatientUid}
                        
                    />
                    <button style={{ marginLeft: 'auto', marginRight: 'auto', width: '100px' }} onClick={setUidNullHandler}>Cancel</button>
                </div> : null}
            </div>
            <div className={classes.ActivityList}>
                <h3 style={{ marginLeft: '20px' }}>Appointments on {selectedDay.day}-{selectedDay.month+1 }-{selectedDay.year} {docName?"(Doctor: "+docName+")":null}</h3>
                <ActivityList
                    loading={loading}
                    activities={activities}
                    authUser={props.authUser}
                    docName={docName}
                    Uid={props.patientUid ? props.patientUid : Uid? Uid:props.doctorUid}
                    setOpenSnackbar={setOpenSnackbar}
                    setSnackbarMsg={setSnackbarMsg}
                />
            </div>
            {openSnackbar ? <Modal
                snackbarMsg={snackbarMsg}
            /> : null}
        </div>
    )
};

export default withAuthentication(Calendar);