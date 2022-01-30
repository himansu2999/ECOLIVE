import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import ListItem from '../../../UI/ListItem/ListItem';
import classes from './Doctors.module.css';
import Modal from '../../../UI/Modal/Modal';
import AddForm from '../../../Forms/AddForm/AddForm';
import Spinner from '../../../UI/Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Searchbar from '../../../UI/SeachBar/SearchBar';
import { withFirebase } from '../../../Firebase';
import { withRouter } from 'react-router-dom';
import Calendar from '../../../CalendarComponent/Calendar/Index';
class Doctors extends Component {
    _isMounted = false;
    state = {
        doctors: [],
        loading: true,
        isAddingDoctor: false,
        searchValue: '',
        doctorId:false,
        showCalendar:false
    }
    componentDidMount() {
        this._isMounted = true
        const ref = this.props.firebase.db.ref('doctors');
        ref.orderByChild("username").on("value", snapshot => {
            let data = snapshot.val();
            let fetchedRequests = [];
            for (let key in data) {
                fetchedRequests.push({
                    ...data[key],
                    id: key
                })
            }
            if (this._isMounted) {
                console.log(fetchedRequests)
                this.setState({ doctors: fetchedRequests, loading: false })
            }
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    closeModalHandler = () => {
        this.setState({
            isAddingDoctor: false,
            showCalendar:false
        })
    }
    closeBackdropHandler = () => {
        this.setState({
            isAddingDoctor: false,
            showCalendar:false
        })
        this.props.history.replace(this.props.history.location.pathname)
    }
    addPatientHandler = () => {
        this.setState({
            isAddingDoctor: true
        })
    }
    
    showCalendar=(e,id,docname)=>{
        e.preventDefault();
        this.setState({
            doctorId:id,
            showCalendar:true,
            docName:docname
        })
        console.log(id)
    }
    searchHandler = (event) => {
        const Search = event.target.value
        this.setState({
            searchValue: Search
        })
    }
    render() {
        
        let filteredDoctors = null;
        if (!this.state.loading) {
            filteredDoctors = this.state.doctors.filter(doctor => {
                return doctor.username.toLowerCase().includes(this.state.searchValue.toLowerCase())
            })
        }
        let addPatientModal = null
        if (this.state.isAddingDoctor) {
            addPatientModal = (
                <Modal
                    modalClosed={this.closeBackdropHandler}
                    clicked={this.closeModalHandler}
                    show={this.state.isAddingDoctor}>
                    <div style={{ width: '800px' }} className={classes.ContainerModal}>
                        <AddForm role={"isDoctor"} />
                    </div>
                </Modal>)
        }
        // const doctorUid = this.state.doctorId ? this.state.doctorId:false;
        if(this.state.showCalendar) {
            addPatientModal = (
                <Modal
                style={{ width: '80%', left: 'calc( 100% - 90%)' }}
                    modalClosed={this.closeBackdropHandler}
                    clicked={this.closeModalHandler}
                    show={this.state.showCalendar}>
                    <div  className={classes.ContainerModal}>
                    <Calendar authUser={this.props.authUser} doctorUid={this.state.doctorId} docName={this.state.docName}
                    assignList={"true"}/>
                    </div>
                </Modal>)
        }
        let screen = <Spinner />
        let list = null;
        if (!this.state.loading) {
            list = (
                <Aux>
                    {filteredDoctors.map((doctor, index) => (
                        <div className={classes.ListItem} key={doctor.id}>
                            <div className={classes.List} >
                                <ListItem
                                    Detail='doctor'
                                    name={doctor.name}
                                    info={doctor.phone}
                                    clickedCalendar={(e)=>this.showCalendar(e,doctor.id,doctor.name)}
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
export default withRouter(withFirebase(Doctors));