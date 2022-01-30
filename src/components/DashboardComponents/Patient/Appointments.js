import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './Appointments.module.css';
import ListItem from '../../UI/ListItem/ListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from '../../../axios-ecolive';
import Modal from '../../UI/Modal/Modal';
import Showwmf from '../../UI/Showwmf/Showwmf';
import Weeklyforms from './Weeklyforms/Weeklyforms';
import { withRouter } from 'react-router-dom';
import { authUserContext, withAuthentication } from '../../Session'
import { withFirebase } from '../../Firebase';
import Calendar from '../../CalendarComponent/Calendar/Index'

class Appointments extends Component {
    _isMounted = false;
    state = {
        requests: [],
        loading: true,
        showForm: false,
        reqData: {},
        mixData: {},
        radioData: {},
        firstTableData: {},
        secondTableData: {},
        textAreasData: {},
        BtextAreasData: {},
        womenData: {},
        assignApplication:false,
        selectedRequest:null,
        authUser: null,
        weekly: null
    }
    componentDidMount() {
        this._isMounted = true
        this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                if(authUser){
                    console.log(authUser.uid)
                    axios.get(`/users/${authUser.uid}/activities.json`).then(res => {
                        let fetchedRequests = [];
                        for (let key in res.data) {
                            if((res.data!=="not set"||!res.data)&&(res.data[key].doctorId!=="not set")){
                            fetchedRequests.push({
                                ...res.data[key],
                                id: key
                            })
                        }
                        }
                        if (this._isMounted&&this.state.fetchedRequests!==[]) {
                            
                            this.setState({ requests: fetchedRequests, loading: false, authUser : authUser } )
                        }
                    }).catch(err => {
                        this.setState({ loading: false })
                    })
                }
            })
        
        
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    assignChangeHandler = (event, requestId) => {
        const requestData = 'requestData';
        const assign = 'Assign';
        let updatedRequests = { ...this.state.requests }
        const updatedRequestsElement = {
            ...updatedRequests[requestId],
            [requestData]: { ...updatedRequests[requestId][requestData], [assign]: event.target.value }
        }
        updatedRequests[requestId] = { ...updatedRequestsElement }
        const updatedRequestsArray = Object.values(updatedRequests)
        this.setState({ requests: updatedRequestsArray })
    }
    showFormHandler = (request) => {
        console.log(request.requestData.name.value);
        this.setState(
            {
                weekly : request.weekly,
                showForm : true,
                firstForm : request.firstRecForm
            })
          
    }
    closeModalHandler = () => {
        this.setState({
            showForm: false
        })
    }
    closeBackdropHandler = () => {
        this.setState({
            showForm: false,
        })
    }
    backbuttonhandler = () => {
        this.setState({
            showForm: false,
        })
    }
    render() {
        let showForm = null;
        let list = null;
        let calendar =null;
        if (!this.state.loading) {
            list = (
                <Aux>
                    {this.state.requests.map((request, index) => (
                        <div className={classes.ListItem} key={request.id}>   
                        <div className={classes.list} onClick={() => this.showFormHandler(request)}>
                        <ListItem
                        Detail={'b_list'} 
                        first={request.requestData.name.value}
                        second={request.requestData.name.value}
                        third={request.requestData.gender.value}
                        fourth={request.requestData.dob.value}
                        fifth={request.requestData.dob.value}
                        changed={(event) => this.assignChangeHandler(event, index)} />
                        </div>
                        </div>))}
                </Aux>
            )
            calendar =(<div className={classes.Calendar}>
                <h2 style={{color: 'blue',marginLeft: '10px'}}>Calendar</h2>
                <Calendar authUser={this.state.authUser} patientUid={this.state.authUser.uid} />
        </div>)
        }
        if(this.state.showForm){
            return(
            <Aux>
            <div>
            <FontAwesomeIcon onClick={() => this.backbuttonhandler()} className={classes.iconback} title={'back'} icon={faArrowLeft} color="black" />
            {<Weeklyforms
                weekly={this.state.weekly}
                firstForm={this.state.firstForm}
                 /> }
            </div>
            </Aux>
            )
        }
        else{
        return (
            <Aux>
                <div className={classes.Container}>
                    <div className={classes.Heading}>
                        <ListItem Detail ={"b_list"}
                            first={"Req Id"}
                            second={"Doctor's Name"}
                            third={"Problem"}
                            fourth={"Start Date"}
                            fifth={"End Date"} />
                    </div>
                    <div className={classes.MainContent}>
                        {list}
                    </div>
                </div>
                <div>
                {calendar}
                </div>
            </Aux>
        )
        }
    }
};
export default withRouter(withFirebase(withAuthentication(Appointments)));