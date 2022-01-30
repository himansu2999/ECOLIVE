import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Toolbarb.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
const toolbarb = (props) => (
    <Aux>
        <header className={classes.Toolbarb}>
            <nav>
                <ul>
                    <li><Link to="/Appointment" >Appointment</Link> </li>
                    <li><Link to="/Recommendations" >Recommendations</Link> </li>
                    <li><Link to="/Chat" >Chat</Link> </li>
                    <li><Link to="/FAQ" >FAQ</Link> </li>
                </ul>
            </nav>
        </header>
    </Aux>
);
export default toolbarb;