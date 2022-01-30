import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import SideDrawer from '../SideDrawer/SideDrawer';
import classes from './Doctor.module.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import { faCreditCard, faUserCircle, faAtom, faBell, faIdCardAlt, faWrench } from '@fortawesome/free-solid-svg-icons';
import AppDoctor from './AppDoctor/AppDoctor';
import Payments from './Payments/Payments';
import Addrole from '../Admin/Add/Add.js';
import Doctors from '../Admin/Doctors/Doctors';
import Events from './Events/Events'
import Wmf from '../../Forms/WeeklyMonitoringForm/Wmf';
import H_Chat from '../../../Containers/H_chat/Chat'
class Doctor extends Component {
    componentDidMount(){
        this.props.history.push("/Dashboard/Events")
    }

  render() {
      return (
          <Aux>
              <div className={classes.Doctor}>
                  <SideDrawer  
                      patha={"/Dashboard/Events"} icona={faAtom} linka={"Events"}
                      pathb={"/Dashboard/AppDoctor"} iconb={faUserCircle} linkb={"Appointments"}
                      pathc={"/Dashboard/Payments"} iconc={faCreditCard} linkc={"Payments"}
                      pathd={"/Dashboard/Notifications"} icond={faBell} linkd={"Notifications"}
                      pathe={"/Dashboard/Profile"} icone={faIdCardAlt} linke={"Profile"}
                      pathf={"/Dashboard/Settings"} iconf={faWrench} linkf={"Settings"}/>
                  <div className={classes.Main}>
                      <Switch>
                          <Route path="/Dashboard/Events" component={Events} />
                          <Route path="/Dashboard/AppDoctor" component={AppDoctor} />
                          <Route path="/Dashboard/Doctors" component={Doctors} />
                          <Route path="/Dashboard/Wmf" component={Wmf} />
                          <Route path="/Dashboard/Payments" component={Payments} />
                          <Route path="/Dashboard/H_Chat" component={H_Chat} />
                          <Route path="/Dashboard/ADD" component={Addrole} />
                      </Switch>
                  </div>
              </div>
          </Aux >
      )
  }
};
export default withRouter(Doctor);