import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Link.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const LinkComponent = (props) => {
    return (
        <li className={classes.Container} onClick={props.clicked}>
            <div className={classes.Content}>
                <NavLink className={classes.Link} activeClassName={classes.ContainerActive}
                    to={props.link} exact={props.exact} >
                    <div className={classes.Icon}>
                        <FontAwesomeIcon icon={props.icon} />
                    </div>
                    {props.children}
                </NavLink>
            </div>
        </li>
    )
};
export default LinkComponent;