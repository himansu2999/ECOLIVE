import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import classes from './Requests.module.css';
import ListItem from '../../../UI/ListItem/ListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import axios from '../../../../axios-ecolive';
import Modal from '../../../UI/Modal/Modal';
import ShowApplication from '../../../UI/ShowApplication/ShowApplication';
import Calendar from '../../../CalendarComponent/Calendar/Index';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../Firebase';
import { withAuthentication } from '../../../Session';
import { getAllByDisplayValue } from '@testing-library/react';
class Requests extends Component {
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
        assignApplication: false,
        selectedRequest: null
    }
    componentDidMount() {
        this._isMounted = true
        axios.get('/requests.json').then(res => {
            let fetchedRequests = [];
            for (let key in res.data) {
                fetchedRequests.push({
                    ...res.data[key],
                    id: key,
                })
            }
            if (this._isMounted) {
                this.setState({ requests: fetchedRequests, loading: false })
            }
        }).catch(err => {
            this.setState({ loading: false })
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    
    showFormHandler = (request) => {
        const reqData = { ...request.requestData }
        const mixData = { ...request.mixedData }
        const firstTableData = { ...request.firstTableData }
        const BtextAreasData = { ...request.BtextAreasData }
        const radioData = { ...request.radiosData }
        const secondTableData = { ...request.secondTableData }
        const textAreasData = { ...request.textAreasData }
        const womenData = { ...request.womenData }
        this.setState(
            {
                reqData: reqData,
                mixData: mixData,
                radioData: radioData,
                firstTableData: firstTableData,
                secondTableData: secondTableData,
                textAreasData: textAreasData,
                BtextAreasData: BtextAreasData,
                womenData: womenData,
                showForm: true
            })
    }
    closeModalHandler = () => {
        this.setState({
            showForm: false,
            assignApplication: false,
            selectedRequest: null
        })
    }
    closeBackdropHandler = () => {
        this.setState({
            showForm: false,
            assignApplication: false,
            selectedRequest: null
        })
    }
    render() {
        let showForm = null
        let filteredRequests = null;
        if (!this.state.loading) {
            filteredRequests = this.state.requests.filter(request => {
                return request.doctorId.toString() !== "not set"
            })
        }
        if (this.state.showForm) {
            showForm = (
                <Modal
                    modalClosed={this.closeBackdropHandler}
                    clicked={this.closeModalHandler}
                    show={this.state.showForm}>
                    <ShowApplication
                        reqData={this.state.reqData}
                        mixData={this.state.mixData}
                        radioData={this.state.radioData}
                        firstTableData={this.state.firstTableData}
                        secondTableData={this.state.secondTableData}
                        textAreasData={this.state.textAreasData}
                        BtextAreasData={this.state.BtextAreasData}
                        womenData={this.state.womenData} />
                </Modal>)
        }
        if (this.state.assignApplication && this.state.selectedRequest) {
            showForm = (
                <Modal
                    modalClosed={this.closeBackdropHandler}
                    clicked={this.closeModalHandler}
                    show={this.state.assignApplication}>
                    <Calendar authUser={this.props.authUser}
                        doctor={"true"}
                        patientId={this.state.selectedRequest.patientId}
                        appointment={this.state.selectedRequest.request}
                        doctorId={this.state.selectedRequest.doctorId}
                        reqId={this.state.selectedRequest.reqId} />
                </Modal>)
        }
        let list = null;
        if (!this.state.loading) {
            list = (
                <Aux>
                    {filteredRequests.map((request, index) => (
                        <div className={classes.ListItem} key={request.id}>
                            <div className={classes.list} onClick={() => this.showFormHandler(request)}>
                                <ListItem
                                    first={request.requestData.name.value}
                                    second={request.requestData.gender.value}
                                    third={request.timeslot}
                                    fourth={request.docName}
                                    fifth={request.date}
                                />
                            </div>
                        </div>))}
                </Aux>
            )
        }
        return (
            <Aux>
                <div className={classes.Container}>
                    <div className={classes.Heading}>
                        <ListItem style= {{color:"blue", fontSize: "16px"}}
                            first={"Patient Name"}
                            second={"Gender"}
                            third={"Time Slot"}
                            fourth={"Doctor name"}
                            fifth={"Appoint. date"}
                        />
                    </div>
                    <div className={classes.MainContent}>
                        {list}
                    </div>
                    {showForm}
                </div>
            </Aux>
        )
    }
};
export default withRouter(withFirebase(withAuthentication(Requests)));