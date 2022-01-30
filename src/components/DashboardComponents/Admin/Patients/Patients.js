import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import ListItem from '../../../UI/ListItem/ListItem';
import classes from './Patients.module.css';
import Modal from '../../../UI/Modal/Modal';
import AddForm from '../../../Forms/AddForm/AddForm';
import Spinner from '../../../UI/Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Searchbar from '../../../UI/SeachBar/SearchBar';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../../Firebase';
import RequestApplication from '../../../Forms/ApplicationForm/RequestApplicationForm';
import Calendar from '../../../CalendarComponent/Calendar/Index';
class Patients extends Component {
    _isMounted = false;
    state = {
        patients: [],
        loading: true,
        isAddingPatient: false,
        isAddingAppointment: false,
        searchValue: '',
        patientId: false,
        showCalendar: false
    }
    componentDidMount() {
        this._isMounted = true
        const ref = this.props.firebase.db.ref().child(`users`);
        ref.on("value", snapshot => {
            let data = snapshot.val();
            let fetchedRequests = [];
            for (let key in data) {
                fetchedRequests.push({
                    ...data[key],
                    id: key
                })
            }
            if (this._isMounted) {
                this.setState({ patients: fetchedRequests, loading: false })
            }
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    closeModalHandler = () => {
        this.setState({
            isAddingPatient: false,
            isAddingAppointment: false,
            showCalendar: false
        })
    }
    closeBackdropHandler = () => {
        this.setState({
            isAddingPatient: false,
            isAddingAppointment: false,
            showCalendar: false
        })
        this.props.history.replace(this.props.history.location.pathname)
    }
    addPatientHandler = () => {
        this.setState({
            isAddingPatient: true
        })
    }
    addAppointmentHandler = (id) => {
        this.setState({
            isAddingAppointment: true,
            patientId: id
        })
    }
    showCalendar = (e, id) => {
        e.preventDefault();
        this.setState({
            patientId: id,
            showCalendar: true
        })
    }
    searchHandler = (event) => {
        const Search = event.target.value
        this.setState({
            searchValue: Search
        })
    }
    render() {
        console.log(this.state.patientId)
        let filteredPatients = null;
        if (!this.state.loading) {
            filteredPatients = this.state.patients.filter(patient => {
                return patient.name.toLowerCase().includes(this.state.searchValue.toLowerCase())
            })
        }
        let addPatientModal = null
        if (this.state.isAddingPatient) {
            addPatientModal = (
                <Modal
                    modalClosed={this.closeBackdropHandler}
                    clicked={this.closeModalHandler}
                    show={this.state.isAddingPatient}>
                    <div style={{ width: '800px' }} className={classes.ContainerModal}>
                        <AddForm role={"patient"} />
                    </div>
                </Modal>)
        }
        if (this.state.isAddingAppointment) {
            addPatientModal = (
                <Modal
                    style={{ width: '80%', left: 'calc( 100% - 90%)' }}
                    modalClosed={this.closeBackdropHandler}
                    clicked={this.closeModalHandler}
                    show={this.state.isAddingAppointment}>
                    <div className={classes.ContainerModal}>
                        <RequestApplication Uid={this.state.patientId} firebase={this.props.firebase} />
                    </div>
                </Modal>)
        }
        const patientUid = this.state.patientId ? this.state.patientId : false;
        if (this.state.showCalendar) {
            addPatientModal = (
                <Modal
                    style={{ width: '80%', left: 'calc( 100% - 90%)' }}
                    modalClosed={this.closeBackdropHandler}
                    clicked={this.closeModalHandler}
                    show={this.state.showCalendar}>
                    <div className={classes.ContainerModal}>
                        <Calendar authUser={this.props.authUser} patientUid={patientUid} />
                    </div>
                </Modal>)
        }
        let screen = <Spinner />
        let list = null;
        if (!this.state.loading) {
            list = (
                <Aux>
                    {filteredPatients.map((patient, index) => (
                        <div className={classes.ListItem} key={patient.id}>
                            <div className={classes.List} >
                                <ListItem
                                    Detail='patient'
                                    name={patient.name}
                                    info={patient.phone}
                                    clickedCalendar={(e) => this.showCalendar(e, patient.id)}
                                    clickedAddAppointment={() => this.addAppointmentHandler(patient.id)}
                                />
                            </div>
                        </div>))}
                </Aux>
            )
        }
        if (!this.state.loading) {
            screen = (
                <Aux>
                    <div className={classes.ContainerBox}>
                        <div className={classes.Container}>
                            <div className={classes.SearchSection}>
                                <div onClick={() => this.addPatientHandler()} className={classes.Add}>
                                    <FontAwesomeIcon icon={faPlus} />
                                    <div
                                        style={{
                                            fontSize: '15px',
                                            fontWeight: '700',
                                            marginLeft: '10px',
                                            width: '30px',
                                            backgroundColor: 'whitesmoke',
                                            color: '#484848',
                                            border: 'none',
                                        }}>ADD
                                    </div>
                                </div>
                                <Searchbar
                                    onChange={(event) => this.searchHandler(event)}
                                    searchValue={this.state.searchValue} />
                            </div>
                            <div className={classes.ListContainer}>{list}</div>
                        </div>
                        {addPatientModal}
                    </div>
                </Aux>
            )
        }
        return (
            <Aux>
                {screen}
            </Aux>
        )
    }
};
export default withRouter(withFirebase(Patients));