import React, { Component } from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import classes from './Toolbar.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { authUserContext, withAuthentication } from '../../Session'
import {withRouter} from 'react-router-dom'
import { Button } from 'reactstrap';
class Toolbar extends Component {
    state={
        authUser:null
    }
    componentDidMount(){
        this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                if (authUser) {
                    this.setState({ authUser: authUser })
                    
                }
            })
    }
    signOut = () => {
        this.props.firebase.auth.signOut();
        this.setState({authUser:null});
        this.props.history.push("/");
    }

    render() {
        let auth= <NavigationItem link="/Autherization" >Login/Signp</NavigationItem>
        let dash = null;
        if(this.state.authUser){
            auth = <button className={classes.Login} onClick={this.signOut}>Logout</button>;
            dash = <NavigationItem link="/dashboard" >Dashboard</NavigationItem>
        }
        return (
            <Aux>
                <header className={classes.Toolbar}>
                    <div>
                    <img src={require('./logo192.png')} height={'70px'} width={'150px'}/>
                    </div>
                    <div className={classes.Nav}>
                        <nav>
                            <ul>
                                {dash}
                                <NavigationItem link="/" exact>Home</NavigationItem>
                                <NavigationItem link="/Products" >Products</NavigationItem>
                                <NavigationItem link="/ContactUs" >Contact Us</NavigationItem>
                            </ul>
                        </nav>
                        <div style={{ width: '50px', textAlign: 'center' }}>
                            <FontAwesomeIcon icon={faBell} style={{ fontSize: "22px" }} color="white" />
                        </div>
                        <div className={this.state.authUser?null:classes.Login}>
                            {auth}
                        </div>
                    </div>
                </header>
            </Aux>
        )
    }
}
export default withRouter(withAuthentication(Toolbar));
