import React from 'react';
import moment from 'moment';
import classes from './TimeSlot.module.css';

const dayschedule =(props) => {
    const n= 15;
    const hourSlots= 60/n;
    let timeslots= [];
    for(let i =6; i<22;i++){
        for(let j=0;j<=45;j+=15){
        timeslots.push(<div className={classes.slots} key={`${i} ${j}`}
                onClick={() => props.clicked(`${i%12}:${j} ${i/12<1?"AM":"PM"} -- ${(j+15)<60?(i)%12:(i+1)%12}:${(j+15)%60} ${i/12<1?"AM":"PM"}`)} >
                <h6>{i%12}:{j} {i/12<1?"AM":"PM"}  --  {(j+15)<60?(i)%12:(i+1)%12}:{(j+15)%60} {i/12<1?"AM":"PM"}</h6>
            </div>)
        }
    } 
    console.log(props);
    return(
        <div className={classes.container}>
        <h3 style={{textAlign:"center", color:"blue"}}> Select Time Slot</h3>
        <h5 style={{textAlign:"center", color:"green"}}>Selected Date : {props.day} - {props.actualMonth} - {props.actualYear}</h5>
           {timeslots} 
        </div>
    )
}

export default dayschedule;