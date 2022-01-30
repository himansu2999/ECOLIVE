import React from 'react';
import classes from './InputForm.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
const inputForm = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement]
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.invalid);
    }
    const OptionsArray = [];
    for (let key in props.Options) {
        OptionsArray.push({
            id: key,
            config: props.Options[key]
        })
    }
    const Option = OptionsArray.map(inputElement => (
        <option className={classes.Option}
            key={inputElement.id}
            value={inputElement.config}>{inputElement.config}</option>
    ))
    const RadioArray = [];
    for (let key in props.Radios) {
        RadioArray.push({
            id: key,
            config: props.Radios[key]
        })
    }
    const Radio = RadioArray.map(inputElement => (
        <div key={inputElement.id} className={classes.RadioDiv}
        >
            <label className={classes.Labelc}>
                <input
                className={classes.Radio}
                    type="radio"
                    name={props.name}
                    value={inputElement.config}
                    checked={props.Checked}
                    onChange={props.changed}
                />
                {inputElement.config}
            </label>
        </div>
    ))
    const textClasses = [classes.textElement]
    switch (props.elementType) {
        case ('input'):
            inputElement = (
                <Aux><div className={classes.Container}>
                    <span className={classes.Label}>{props.label}</span>
                    <input onChange={props.changed}
                        className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value} />
                </div>
                </Aux>);
            break;
        case ('number'):
            inputElement = (
                <Aux><div className={classes.Container}>
                    <span className={classes.Label}>{props.label}</span>
                    <input onChange={props.changed}
                        className={inputClasses.join(' ')}
                        style={{ color: 'red' }}
                        {...props.elementConfig}
                        value={props.value} />
                </div>
                </Aux>);
            break;
        case ('textarea'):
            inputElement = (
                <Aux><div className={classes.Containerb}>
                    <span className={classes.Labelb}>{props.label}</span>
                    <textarea onChange={props.changed}
                        className={textClasses.join(' ')}
                        style={{ color: 'black' }}
                        {...props.elementConfig}
                        value={props.value} />
                </div>
                </Aux>);
            break;
        case ('select'):
            inputElement = (
                <Aux><div className={classes.Container}>
                    <span className={classes.Labelb}>{props.label}</span>
                    <select onChange={props.changed}
                        className={classes.Select}
                        {...props.elementConfig}
                        value={props.value}>
                        {Option}
                    </select>
                </div>
                </Aux>);
            break;
        case ('radio'):
            inputElement = (
                <Aux>
                    <p className={classes.Question}>{props.label}</p>
                    <div className={classes.Containerc}>
                        {Radio}
                    </div>
                </Aux>);
            break;

        default:
            inputElement = (
                <Aux><div className={classes.Container}>
                    <span className={classes.Label}>{props.label}</span>
                    <input onChange={props.changed}
                        className={inputClasses.join(' ')}
                        {...props.elementConfig}
                        value={props.value} />
                </div>
                </Aux>);
            break;
    }
    return (
        <div className={classes.Input}>
            {inputElement}
        </div>
    );
};
export default inputForm;