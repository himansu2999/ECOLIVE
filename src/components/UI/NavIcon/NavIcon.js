import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import classes from './NavIcon.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
const NavIcon = props => {
    return (
        <Aux>
            <div className={classes.Container}>
                <NavLink className={classes.text}
                    to={props.path}
                    activeClassName={classes.active}>
                    <span>
                        <FontAwesomeIcon icon={props.icon} className={classes.icon} />
                    </span>
                    <span style={{marginLeft:'10px'}}>
                        {props.name}
                    </span>
                </NavLink>
            </div>
        </Aux>
    )
};
export default NavIcon;