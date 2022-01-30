import React, { Component } from 'react';
import moment from 'moment';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import classes from './AppDoctor.module.css';
import ListItem from '../../../UI/ListItem/ListItem';
import {Link} from 'react-router-dom';
import axios from '../../../../axios-ecolive';
import Modal from '../../../UI/Modal/Modal';
import ShowApplication from '../../../UI/ShowApplication/ShowApplication';
import {withFirebase} from '../../../Firebase';
import Weeklyforms from './Weeklyforms/Weeklyforms';
import HealthForm from '../../../Forms/HealthForm/HealthForm';

class AppDoctor extends Component {
    _isMounted = false;
    state = {
        requests: [],
        loading: true,
        showForm: false,
        weeklyForm: false,
        reqData: {},
        mixData: {},
        mixedTable2Data: {},
        mixedTable3Data: {},
        radioData: {},
        firstTableData: {},
        tableData: {},
        secondTableData: {},
        table2Data: {},
        textAreasData: {},
        BtextAreasData: {},
        womenData: {}
    }
    componentDidMount() {
        this._isMounted = true
        axios.get(`/doctors/${this.props.firebase.auth.currentUser.uid}/activities.json`).then(res => {
            let fetchedRequests = [];
            if(res.data!=="not set"){
            for (let key in res.data) {
                fetchedRequests.push({
                    ...res.data[key],
                    id: key
                })
            }
            
            if (this._isMounted) {
                this.setState({ requests: fetchedRequests, loading: false })
            }
            }
        }).catch(err => {
            this.setState({ loading: false })
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    deleteHandler = (id, index) => {
        const updatedRequests = [...this.state.requests];
        updatedRequests.splice(index, 1)
        if (this._isMounted) {
            this.setState({ requests: updatedRequests })
        }
        axios.delete('/requests/' + id + '.json').catch(err => console.log(err))
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
    sendHandler = (requestId) => {
        const requestData = { ...this.state.requests[requestId].requestData }
        const request = {
            requestData: requestData
        }
        axios.post('/History.json', request).then(res => {
            if (this._isMounted) { this.setState({ loading: false }) }
            alert('DONE')
        }).catch(err => console.log(err))
    }
    showFormHandler = (request) => {
        const reqData = { ...request.requestData }
        const mixData = { ...request.mixedData }
        const mixedTable2Data = { ...request.mixedTable2Data }
        const mixedTable3Data = { ...request.mixedTable3Data }
        const firstTableData = { ...request.firstTableData }
        const tableData = {...request.tableData}
        const table2Data = {...request.table2Data}
        const BtextAreasData = { ...request.BtextAreasData }
        const radioData = { ...request.radiosData }
        const secondTableData = { ...request.secondTableData }
        const textAreasData = { ...request.textAreasData }
        const womenData = { ...request.womenData }
        this.setState(
            {
                reqData: reqData,
                mixData: mixData,
                mixedTable2Data: mixedTable2Data,
                mixedTable3Data: mixedTable3Data,
                radioData: radioData,
                firstTableData: firstTableData,
                tableData: tableData,
                secondTableData: secondTableData,
                table2Data: table2Data,
                textAreasData: textAreasData,
                BtextAreasData: BtextAreasData,
                womenData: womenData,
                showForm: true
            })
    }
    weeklyFormHandler = (weekly,id,patientId,patientName,firstForm) => {
        console.log(firstForm)

        this.setState({
            patientId:patientId,
            requestId: id,
            patientName: patientName,
            weekly: weekly,
            firstForm : firstForm,
            weeklyForm:true
            
        })
    }
    HealthFormHandler = (id,patientId,patientName,patientAge,gender) => {
        const age = moment().year() - parseInt(patientAge.slice(0,4));
        this.setState({
            patientId:patientId,
            requestId: id,
            patientName: patientName,
            patientAge: age,
            gender: gender,
            HealthForm:true
        })
    }
    closeModalHandler = () => {
        this.setState({
            showForm: false,
            weeklyForm: false,
            HealthForm: false
        })
    }
    closeBackdropHandler = () => {
        this.setState({
            showForm: false,
            weeklyForm: false,
            HealthForm: false
        })
    }
    render() {
        let showForm = null
        
        if (this.state.showForm) {
            showForm = (
                <Modal
                    modalClosed={this.closeBackdropHandler}
                    clicked={this.closeModalHandler}
                    show={this.state.showForm}>
                   <ShowApplication
                        reqData={this.state.reqData}
                        mixData={this.state.mixData}
                        mixedTable2Data={this.state.mixedTable2Data}
                        mixedTable3Data={this.state.mixedTable3Data}
                        radioData={this.state.radioData}
                        tableData ={this.state.tableData}
                        table2Data = {this.table2Data}
                        firstTableData={this.state.firstTableData}
                        tableData={this.state.tableData}
                        secondTableData={this.state.secondTableData}
                        table2Data={this.state.table2Data}
                        textAreasData={this.state.textAreasData}
                        BtextAreasData={this.state.BtextAreasData}
                        womenData={this.state.womenData} />
                </Modal>)
        }
        if (this.state.weeklyForm) {
            showForm = (
                <Modal
                    modalClosed={this.closeBackdropHandler}
                    clicked={this.closeModalHandler}
                    show={this.state.showForm}>
                    <Weeklyforms 
                        requestId={this.state.requestId}
                        patientId={this.state.patientId}
                        patientName ={this.state.patientName}
                        weekly = {this.state.weekly}
                        firstForm = {this.state.firstForm}
                         />
                </Modal>)
        }
        if (this.state.HealthForm) {
            showForm = (
                <Modal
                    modalClosed={this.closeBackdropHandler}
                    clicked={this.closeModalHandler}
                    show={this.state.showForm}>
                    <HealthForm
                        requestId={this.state.requestId}
                        patientId={this.state.patientId}
                        patientName={this.state.patientName}
                        patientAge= {this.state.patientAge}
                        gender= {this.state.gender}
                         />
                </Modal>)
        }
        let list = null;
        if (!this.state.loading) {
            list = (
                <Aux>
                    {this.state.requests.map((request, index) => (
                        <div className={classes.ListItem} key={request.id}>
                            <div className={classes.list} onClick={() => this.showFormHandler(request)}>
                                <ListItem
                                    Detail= {'Doctor'}
                                    first={request.requestData.name.value}
                                    second={request.requestData.name.value}
                                    third={request.requestData.gender.value}
                                    fourth={request.date}
                                    fifth={()=> this.weeklyFormHandler(request.weekly,request.id,
                                        request.patientId,request.requestData.name.value,
                                        request.firstRecForm)}
                                    sixth={()=> this.HealthFormHandler(request.id,request.patientId,
                                        request.requestData.name.value,
                                        request.requestData.dob.value,request.requestData.gender.value)} />
                            </div>
                        </div>))}
                </Aux>
            )
        }
        return (
            <Aux>
                <div className={classes.Container}>
                    <div className={classes.Heading}>
                        <ListItem first={"Req Id"}
                            second={"Name"}
                            third={"Gender"}
                            fourth={"Weekly"}
                            fifth={"Recommendations"}/>
                    </div>
                    <div className={classes.MainContent}>
                        {this.state.loading?<h4 style={{widht:"100%", textAlign:"center", marginTop:"20px"}}>
                        No requests here</h4>:list}
                    </div>
                    {showForm}
                </div>
            </Aux>
        )
    }
};
export default withFirebase(AppDoctor);