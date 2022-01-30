import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import SideDrawer from '../SideDrawer/SideDrawer';
import classes from './Admin.module.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import { faPlus, faUserMd, faCreditCard, faUserCircle, faDesktop, faList } from '@fortawesome/free-solid-svg-icons';
import Appointments from '../Appointments/Appointments';
import Patients from './Patients/Patients';
import Doctors from './Doctors/Doctors';
import Addrole from './Add/Add.js';

class Admin extends Component {
    componentDidMount(){
        this.props.history.push(this.props.match.url + "/Appointments/Requests")
    }
    render() {
        return (
            <Aux>
                <div className={classes.Admin}>
                    <SideDrawer
                        patha={"/Dashboard/Appointments"} icona={faDesktop} linka={"Appointments"}
                        pathb={"/Dashboard/Doctors"} iconb={faUserMd} linkb={"Doctors"}
                        pathc={"/Dashboard/Patients"} iconc={faUserCircle} linkc={"Patients"}
                        pathd={"/Dashboard/Payments"} icond={faCreditCard} linkd={"Payments"}
                        pathe={"/Dashboard/ContentManagement"} icone={faList} linke={"Content"}
                        pathf={"/Dashboard/ADD"} iconf={faPlus} linkf={"Add"}
                        signOut={this.props.signOut} />
                    <div className={classes.Main}>
                        <Switch>
                            <Route path="/Dashboard/Appointments" component={Appointments} />
                            <Route path="/Dashboard/Patients" component={Patients} />
                            <Route path="/Dashboard/Doctors" component={Doctors} />
                            <Route path="/Dashboard/ADD" component={Addrole} />
                        </Switch>
                    </div>
                </div>
            </Aux >
        )
    }
};
export default withRouter(Admin);