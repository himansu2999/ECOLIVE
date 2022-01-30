import React, { Component } from 'react';
import classes from './Bhome.module.css';
import { Switch, Route } from 'react-router-dom';
import BookAppointment from '../BookAppointment/BookAppointment';
import ManageApp from '../ManageApp/ManageApp';
import Autherization from '../Autherization/Autherization';
import Home from './Home';
import Products from '../Products/Products';
import Navbarhome from './Navbarhome';
import Chat from '../H_chat/Chat';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../components/Firebase';
import { authUserContext, withAuthentication } from '../../components/Session';
import Aux from '../../hoc/Auxiliary/Auxiliary';
//import FirebaseAuth from '../FirebaseAuth/FirebaseAuth';

class Bhome extends Component {
    state={
        authorized: true
    }
    render() {
        
        return (
            
            <div className={classes.bhome}>
                <Navbarhome/>
                <div style={{ marginTop: '100px' }}>
                <Switch>
                <Route path="/BookAppointment" component={BookAppointment} />
                <Route path="/Products" component={Products} />
                <Route path="/Chat" component={Chat} />
                <Route path="/" exact component={Home} />
                <Route path="/ManageApp" exact component={ManageApp} />
                <Route path="/Autherization" exact component={Autherization} />
              </Switch>
                </div>
            </div>
            
        )
    }
}

export default withRouter(withFirebase(Bhome));