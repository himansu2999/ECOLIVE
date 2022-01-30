import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from  './NavigationItem.module.css';
const navigationItem =(props)=>(
    <li className={classes.Link}>
        <NavLink
            to={props.link} exact={props.exact} activeStyle={{color:'#484848'}}>
                {props.children}
        </NavLink>
    </li>
);
export default navigationItem;