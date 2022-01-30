import React from 'react';
import classes from './Buttonb.module.css';
const Buttonb =(props)=>{
    const buttonClasses = [classes.Button,classes[props.btnType]];
    return(
    <button 
        onClick={props.clicked}
        disabled={props.disabled}
        className={buttonClasses.join(' ')}
        style={props.style}>
               {props.children}
    </button>
    )
};
export default Buttonb;