import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './Appointments.module.css';
import NavIcon from '../../UI/NavIcon/NavIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faClipboard, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Switch, Route,withRouter } from 'react-router-dom';
import Requests from './Requests/Requests';
import New from './New/New';
import History from './History/History';
class Appointments extends Component {
    componentDidMount() {
        this.props.history.push("/Dashboard/Appointments/New")
    }
    render() {
        return (
            <Aux>
                <div className={classes.Container}>
                    <div className={classes.Top}>
                        <div className={classes.Navigators}>
                            <NavIcon name="New" path="/Dashboard/Appointments/New" icon={faPlus} />
                            <NavIcon name="Assigned" path="/Dashboard/Appointments/AssignedRequests" icon={faCheck} />
                            <NavIcon name="History" path="/Dashboard/Appointments/History" icon={faClipboard} />
                        </div>
                        <div className={classes.Search}>
                            <input placeholder="Search" className={classes.Input} />
                            <FontAwesomeIcon style={{ marginTop: '5px', marginLeft: '5px' }} icon={faSearch} />
                        </div>
                    </div>
                    <Switch>
                        <Route path="/Dashboard/Appointments/AssignedRequests" component={Requests} />
                        <Route path="/Dashboard/Appointments/New" component={New} />
                        <Route path="/Dashboard/Appointments/History" component={History} />
                    </Switch>
                </div>
            </Aux>
        )
    }
};
export default withRouter(Appointments);