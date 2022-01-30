import React from 'react';
import classes from './Button.module.css';
const Button =(props)=>{
    const buttonClasses = [classes.Button,classes[props.btnType]];
    return(
    <button
        onClick={props.clicked}
        disabled={props.disabled}
        className={buttonClasses.join(' ')}>
               {props.children}
    </button>
    )
};
export default Button;