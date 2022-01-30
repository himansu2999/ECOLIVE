import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import classes from './New.module.css';
import ListItem from '../../../UI/ListItem/ListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import axios from '../../../../axios-ecolive';
import Modal from '../../../UI/Modal/Modal';
import ShowApplication from '../../../UI/ShowApplication/ShowApplication';
import Calendar from '../../../CalendarComponent/Calendar/Index';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../Firebase';
import {withAuthentication} from '../../../Session';
class New extends Component {
    _isMounted = false;
    state = {
        requests: [],
        loading: true,
        showForm: false,
        reqData: {},
        inputData: {},
        input3Data: {},
        input4Data: {},
        mixData: {},
        mixedTable2Data: {},
        mixedTable3Data: {},
        mixedTable4Data: {},
        radioData: {},
        firstTableData: {},
        tableData: {},
        secondTableData: {},
        table2Data: {},
        textAreasData: {},
        BtextAreasData: {},
        CtextAreasData: {},
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
    deleteHandler = (id, index) => {
        const updatedRequests = [...this.state.requests];
        updatedRequests.splice(index, 1)
        if (this._isMounted) {
            this.setState({ requests: updatedRequests })
        }
        axios.delete('/requests/' + id + '.json').catch(err => console.log(err))
    }
    sendHandler = (reqId, doctorId, request, patientId) => {
        console.log(reqId);
        const selectedRequest = {
            reqId: reqId,
            doctorId: doctorId,
            request: request,
            patientId: patientId
        }
        this.setState({
            assignApplication: true,
            selectedRequest: selectedRequest
        })
    }
    showFormHandler = (request) => {
        const reqData = { ...request.requestData }
        const inputData = { ...request.inputData }
        const input3Data = { ...request.input3Data }
        const input4Data = { ...request.input4Data }
        const mixData = { ...request.mixedData }
        const mixedTable2Data = { ...request.mixedTable2Data }
        const mixedTable3Data = { ...request.mixedTable3Data }
        const mixedTable4Data = { ...request.mixedTable4Data }
        const firstTableData = { ...request.firstTableData }
        const tableData = { ...request.tableData }
        const BtextAreasData = { ...request.BtextAreasData }
        const CtextAreasData = { ...request.CtextAreasData }
        const radioData = { ...request.radiosData }
        const secondTableData = { ...request.secondTableData }
        const table2Data = { ...request.table2Data }
        console.log(table2Data);
        const textAreasData = { ...request.textAreasData }
        const womenData = { ...request.womenData }
        this.setState(
            {
                reqData: reqData,
                inputData: inputData,
                input3Data: input3Data,
                input4Data: input4Data,
                mixData: mixData,
                mixedTable2Data: mixedTable2Data,
                mixedTable3Data: mixedTable3Data,
                mixedTable4Data: mixedTable4Data,
                radioData: radioData,
                firstTableData: firstTableData,
                tableData: tableData,
                secondTableData: secondTableData,
                table2Data: table2Data,
                textAreasData: textAreasData,
                BtextAreasData: BtextAreasData,
                CtextAreasData: CtextAreasData,
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
                return request.doctorId.toString() === "not set"
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
                        inputData={this.state.inputData}
                        input3Data={this.state.input3Data}
                        input4Data={this.state.input4Data}
                        mixData={this.state.mixData}
                        mixedTable2Data={this.state.mixedTable2Data}
                        mixedTable3Data={this.state.mixedTable3Data}
                        mixedTable4Data={this.state.mixedTable4Data}
                        radioData={this.state.radioData}
                        firstTableData={this.state.firstTableData}
                        tableData={this.state.tableData}
                        secondTableData={this.state.secondTableData}
                        table2Data={this.state.table2Data}
                        textAreasData={this.state.textAreasData}
                        BtextAreasData={this.state.BtextAreasData}
                        CtextAreasData={this.state.CtextAreasData}
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
                                    second={request.requestData.name.value}
                                    third={request.requestData.gender.value}
                                />
                            </div>
                            <FontAwesomeIcon onClick={() => this.deleteHandler(request.id, index)} className={classes.iconDelete} icon={faTimesCircle} color="crimson" />
                            <FontAwesomeIcon onClick={() => this.sendHandler(request.id, request.doctorId, request, request.patientId)} className={classes.iconSend} icon={faCheckCircle} color="green" />
                        </div>))}
                </Aux>
            )
        }
        return (
            <Aux>
                <div className={classes.Container}>
                    <div className={classes.Heading}>
                        <ListItem style= {{color:"blue", fontSize: "16px"}}
                            first={"Req Id"}
                            second={"Name"}
                            third={"Gender"}
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
export default withRouter(withFirebase(withAuthentication(New)));