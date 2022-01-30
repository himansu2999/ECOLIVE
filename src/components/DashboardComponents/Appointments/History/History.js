import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import classes from './History.module.css';
import ListItem from '../../../UI/ListItem/ListItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from '../../../../axios-ecolive';
class History extends Component {
    _isMounted = false
    state = {
        requests: [],
        loading:true
    }
    componentDidMount() {
        this._isMounted = true
        axios.get('/History.json').then(res => {
            let fetchedRequests = [];
            for (let key in res.data) {
                fetchedRequests.push({
                    ...res.data[key],
                    id: key
                })
            }
            if(this._isMounted){
            this.setState({ loading: false, requests: fetchedRequests })}
        }).catch(err => {
            this.setState({ loading: false })
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    
    deleteHandler = (id,index) => {
        const updatedRequests = [...this.state.requests];
        updatedRequests.splice(index, 1)
        if (!this.state.loading) {
            this.setState({ requests: updatedRequests })
        }
        axios.delete('/History/' + id + '.json').catch(err=>console.log(err))
    }
    render() {
        let list = (
            <Aux>
                {this.state.requests.map((request, index) => (
                    <div className={classes.ListItem} key={request.id}>
                        <div className={classes.list}>
                            <ListItem
                                first={request.requestData.name.value}
                                second={request.requestData.name.value}
                                third={request.requestData.gender.value}
                                fourth={"Not Done"}
                                input={request.requestData.Assign} />
                        </div>
                        <FontAwesomeIcon onClick={() => this.deleteHandler(request.id,index)} className={classes.iconDelete} icon={faTimesCircle} color="crimson" />
                    </div>))}
            </Aux>
        )
        if (this.state.loading) { list = null; }
        return (
            <Aux>
                <div className={classes.Container}>
                    <div className={classes.Heading}>
                        <ListItem first={"Req Id"}
                            second={"Name"}
                            third={"gender"}
                            fourth={"Payment"}
                            input={"Assigned"} />
                    </div>
                    <div className={classes.MainContent}>
                        {list}
                    </div>
                </div>
            </Aux>
        )
    }
};
export default History;