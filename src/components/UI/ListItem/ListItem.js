import React from 'react';
import classes from './ListItem.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { Link } from 'react-router-dom';
const ListItem = (props) => {
    let input = <input className={classes.text} onChange={props.changed} />
    if (props.input) {
        input = <p>{props.input}</p>
    }
    let outputElement = null;
    switch (props.Detail) {
        case ('patient'):
            outputElement = (
                <Aux>
                    <div className={classes.Patient}>
                        <div className={classes.BodyContainer}>
                            <div className={classes.Image}>{props.Image}</div>
                            <div className={classes.Details}>
                                <div className={classes.Title}>{props.name}</div>
                                <div className={classes.Info}>{props.info}</div>
                            </div>
                        </div>
                        <button onClick={props.clickedCalendar} className={classes.PatientButton}>
                            Calendar
                        </button>
                        <button onClick={props.clickedAddAppointment} className={classes.PatientButton}>
                            Add Appointment
                        </button>
                    </div>
                </Aux>
            )
            break;
        case ('doctor'):
            outputElement = (
                <Aux>
                    <div className={classes.Patient}>
                        <div className={classes.BodyContainer}>
                            <div className={classes.Image}>{props.Image}</div>
                            <div className={classes.Details}>
                                <div className={classes.Title}>{props.name}</div>
                                <div className={classes.Info}>{props.info}</div>
                            </div>
                        </div>
                        <button onClick={props.clickedCalendar} className={classes.PatientButton}>
                            Calendar
                        </button>
                        <button onClick={props.clickedWmf} className={classes.PatientButton}>
                            <Link to="/Dashboard/Wmf">Weekly Monitoring</Link>
                        </button>
                    </div>
                </Aux>
            );
            break;
        case ('b_list'):
                outputElement = (
                    <Aux>
                        <div className={classes.ListItem} style={props.style}>
                            <div className={classes.Item}>{props.first}</div>
                            <div className={classes.Item}>{props.second}</div>
                            <div className={classes.ItemD}>{props.third}</div>
                            <div className={classes.ItemD}>{props.fourth}</div>
                            <div className={classes.ItemD}>{props.fifth}</div>
                        </div>
                    </Aux>
                )
                break;
        case ('Doctor'):
            outputElement = (
                <Aux>
                    <div className={classes.ListItem} style={props.style}>
                        <div className={classes.Item}>{props.first}</div>
                        <div className={classes.Item}>{props.second}</div>
                        <div className={classes.ItemD}>{props.third}</div>
                        <div className={classes.Item}>{<button onClick={props.fifth}>Weekly</button>}</div>
                        <div className={classes.Item}>{<button onClick={props.sixth}>Health Report</button>}</div>
                    </div>
                </Aux>
                
            )
            break;
        default:
            outputElement = (
                <Aux>
                    <div className={classes.ListItem} style={props.style}>
                        <div className={classes.Item} style={props.style}>{props.first}</div>
                        <div className={classes.Item} style={props.style}>{props.second}</div>
                        <div className={classes.ItemD} style={props.style}>{props.third}</div>
                        <div className={classes.ItemD} style={props.style}>{props.fourth}</div>
                        <div className={classes.ItemD} style={props.style}>{props.fifth}</div>
                    </div>
                </Aux>
            )

    }
    return (
        <Aux>
            {outputElement}
        </Aux>
    )
};
export default ListItem;