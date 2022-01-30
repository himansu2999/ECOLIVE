import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Admin from '../../components/DashboardComponents/Admin/Admin';
import Patient from '../../components/DashboardComponents/Patient/Patient';
import Doctor from '../../components/DashboardComponents/Doctor/Doctor';
import { withRouter } from 'react-router-dom';
import { authUserContext, withAuthentication } from '../../components/Session';
class Dashboard extends Component {
    state = {
        isPatient: false,
        isDoctor: false,
        isAdmin: false,
    }

    componentDidMount() {
        this.listener = this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                if (authUser) {
                    this.setState({ authUser: authUser })
                    const ref = this.props.firebase.db.ref().child(`roles/${authUser.uid}`);
                    ref.on("value", snapshot => {
                        let data = snapshot.val();
                        let role = data ? data.role : null;
                        this.setState({
                            [role]: true
                        })
                        
                    })
                }
                else {
                    this.setState({ authUser: null });
                }
            },
        );
    }

    componentWillUnmount() {
        this.listener();
    }
    signOut = () => {
        this.props.firebase.auth.signOut();
        this.props.history.push("/");
    }

    render() {
        console.log(this.state)
        return (
            <Aux>
                <authUserContext.Consumer>
                    {authUser => authUser ?
                        <div>
                            {this.state.isAdmin ? (<Admin authUser={authUser} signOut={this.signOut} />) : null}
                            {this.state.isDoctor ? (<Doctor authUser={authUser} signOut={this.signOut} />) : null}
                            {this.state.isPatient ? (<Patient authUser={authUser} signOut={this.signOut} />) : null}
                        </div> : (<p>NoT</p>)}
                </authUserContext.Consumer>
            </Aux>
        )
    }
};
export default withRouter(withAuthentication(Dashboard));