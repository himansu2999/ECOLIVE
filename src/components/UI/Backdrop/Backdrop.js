import React from 'react';
import classes from './Backdrop.module.css'
const backdrop =(props)=>{
    return(
        props.show ? <div onClick={props.clicked} className={classes.Backdrop} style={{backgroundColor:props.Bcolor}}></div> :null
    )
};
export default backdrop;