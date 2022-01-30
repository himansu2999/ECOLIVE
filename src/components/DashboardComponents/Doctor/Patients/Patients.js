import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import ListItem from '../../../UI/ListItem/ListItem';
import classes from './Patients.module.css';
import Modal from '../../../UI/Modal/Modal';
import AddForm from '../../../Forms/AddForm/AddForm';
import axios from '../../../../axios-ecolive';
import Spinner from '../../../UI/Spinner/Spinner';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import Searchbar from '../../../UI/SeachBar/SearchBar';
class Patients extends Component {
    _isMounted = false;
    state = {
        patients: [],
        loading: true,
        isAddingPatient: false,
        searchValue: ''
    }
    componentDidMount() {
        this._isMounted = true
        axios.get('/Patients.json').then(res => {
            let fetchedRequests = [];
            for (let key in res.data) {
                fetchedRequests.push({
                    ...res.data[key],
                    id: key
                })
            }
            if (this._isMounted) {
                this.setState({ patients: fetchedRequests, loading: false })
            }
        }).catch(err => {
            console.log(err)
            this.setState({ loading: false })
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    closeModalHandler = () => {
        this.setState({
            isAddingPatient: false
        })
    }
    closeBackdropHandler = () => {
        this.setState({
            isAddingPatient: false,
        })
        this.props.history.replace(this.props.history.location.pathname)
    }
    addPatientHandler = () => {
        this.setState({
            isAddingPatient: true
        })
    }
    searchHandler=(event)=>{
        const Search = event.target.value
        this.setState({
            searchValue:Search
        })
    }
    render() {
        let filteredPatients = null;
        if(!this.state.loading){
         filteredPatients = this.state.patients.filter(patient=>{
            return patient.Data.name.toLowerCase().includes(this.state.searchValue.toLowerCase())
        })}
        let addPatientModal = null
        if (this.state.isAddingPatient) {
            addPatientModal = (
                <Modal
                    modalClosed={this.closeBackdropHandler}
                    clicked={this.closeModalHandler}
                    show={this.state.isAddingPatient}>
                    <div style={{ width: '800px' }} className={classes.ContainerModal}>
                        <AddForm />
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
                                    name={patient.Data.name}
                                    info={patient.Data.phone}
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
export default Patients;