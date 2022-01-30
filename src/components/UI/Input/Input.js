import React from 'react';
import classes from './Input.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Input(props) {
    let inputElement = null;
    const [togPass,setTogPass] =React.useState(false);
    const inputClasses = [classes.InputElement]
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.invalid);
    }
    const togPasshandler =() =>{
        setTogPass(!togPass);
    }
    const textClasses = [classes.textElement]
    switch (props.elementType) {
        case ('input'):
            inputElement = (
                <Aux><input onChange={props.changed}
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value} />
                    <span className={classes.Label}>{props.label}</span>
                </Aux>);
            break;
        case ('number'):
            inputElement = (
                <Aux><input onChange={props.changed}
                    className={inputClasses.join(' ')}
                    style={{ color: 'red' }}
                    {...props.elementConfig}
                    value={props.value} />
                    <span className={classes.Label}>{props.label}</span>
                </Aux>);
            break;
        case ('password'):
            inputElement = (
                <Aux>
                    <input onChange={props.changed}
                        className={inputClasses.join(' ')}
                        style={{ color: 'black' }}
                        {...props.elementConfig}
                        type={togPass?'text':'password'}
                        value={props.value} />
                        {togPass?<FontAwesomeIcon className={classes.faEye} onClick={() => togPasshandler()} icon={faEyeSlash} />:
                        <FontAwesomeIcon className={classes.faEye} onClick={() => togPasshandler()} icon={faEye} />}
                    <span className={classes.Label}>{props.label}</span>
                </Aux>);
            break;
        case ('none'):
            inputElement = (<p></p>);
            break;
        case ('textarea'):
            inputElement = (
                <Aux>
                    <textarea onChange={props.changed}
                        className={textClasses.join(' ')}
                        style={{ color: 'black' }}
                        {...props.elementConfig}
                        value={props.value} />
                    <span className={classes.Labelb}>{props.label}</span>
                </Aux>);
            break;
        default:
            inputElement = (
                <Aux>
                    <input onChange={props.changed}
                        className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value} />
                    <span className={classes.Label}>{props.label}</span>
                </Aux>);
            break;
    }
    return (
        <div className={classes.Input}>
            {inputElement}
        </div>
    );
};
export default Input;