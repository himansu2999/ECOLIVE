import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './ManageApp.module.css';
import NavIcon from '../../components/UI/NavIcon/NavIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faClipboard, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Switch, Route } from 'react-router-dom';
import BookAppointment from '../BookAppointment/BookAppointment';
import Appointments from './Appointments';
class ManageApp extends Component {
    render() {
        return (
            <Aux>
                <div className={classes.Container}>
                    <div className={classes.Top}>
                        <div className={classes.Search}>
                            <input placeholder="Search" className={classes.Input} />
                            <FontAwesomeIcon style={{ marginTop: '5px', marginLeft: '5px' }} icon={faSearch} />
                        </div>
                        <div className={classes.Navigators}>
                            <NavIcon name="New" path="/BookAppointment" icon={faPlus} />
                        </div>
                    </div>
                     <Switch>
                         <Route path="/ManageApp/Appointments" component={Appointments} />
                         <Route path="/ManageApp" component={Appointments} />
                         <Route path="/ManageApp/New" component={BookAppointment} />
                         
                     </Switch>
                </div>
            </Aux>
        )
    }
};
export default ManageApp;