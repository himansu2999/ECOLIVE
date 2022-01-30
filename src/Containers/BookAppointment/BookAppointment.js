import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import RequestApplication from '../../components/Forms/ApplicationForm/RequestApplicationForm';
import { withRouter } from 'react-router-dom';
import { authUserContext, withAuthentication } from '../../components/Session'
import { withFirebase } from '../../components/Firebase';
class BookAppointment extends Component {
    componentDidMount(){
        this.props.firebase.auth.onAuthStateChanged(
            authUser => {
              authUser
                ? console.log(this.props.firebase.auth.currentUser.uid)
                : console.log(null);
            },
          );
    }
    render() {
        return (
            <Aux>
                <div>
                    <RequestApplication back={this.props.back} Uid={this.props.firebase.auth.currentUser.uid} firebase={this.props.firebase}/>
                </div>
            </Aux>
        )
    }
};
export default withRouter(withFirebase(withAuthentication(BookAppointment)));