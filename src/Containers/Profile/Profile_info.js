import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './Showwmf.module.css';
import Buttonb from '../Buttonb/Buttonb';
import ShowForm from '../ShowForm/ShowForm';
class ShowApplication extends Component {
    state = {
        reqData: {},
        isDataPresent: false,
        edit: false,
        inputs : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Name'
                },
                value: '',
                label: 'Name:',
            },
            dob: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'DOB'
                },
                value: '',
                label: 'DOB:',
            },
            gender: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Gender'
                },
                value: '',
                label: 'Gender',
            },
            number: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Number'
                },
                value: '',
                label: 'Phone Number:',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                label: 'Email',
            }
        }
    }
}
    componentDidMount() {
        
        axios.get('/RequestsDev.json').then(res => {
            let fetchedRequests = [];
            for (let key in res.data) {
                
                fetchedRequests.push({
                    ...res.data[key],
                    id: key
                })
                
            }
            if (this._isMounted) {
                this.setState({ requests: fetchedRequests, loading: false })
                
            }
        }).catch(err => {
            this.setState({ loading: false })
        });
    }
    render() {
        const ReqArray = [];
        const inputsArray = [];
        for (let key in this.state.inputs) {
            inputsArray.push({
                id: key,
                config: this.state.inputs[key]
            })
        }
        const input = inputsArray.map(inputElement => (
            <InputForm
                key={inputElement.id}
                elementType={inputElement.config.elementType}
                elementConfig={inputElement.config.elementConfig}
                value={inputElement.config.value}
                changed={(event) => this.inputChangeHandler(event, inputElement.id)}
                label={inputElement.config.label}
                Options={inputElement.config.Options}
            />
        ))

        let request1 = null;
        
        if (this.state.isDataPresent) {
            request1 = ReqArray.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} />
            ));
            
        }
        if(this.state.edit){
            return(
                <Aux>
                <div className={classes.Container}>
                    <form onSubmit={(event) => this.handleSubmit(event)} className={classes.form}>
                        <p className={classes.Title}>Edit Profile Info</p>
                        {input}
                        <Buttonb btnType="Success" style={{ marginTop: '50px', width: '100%' }} >Save</Buttonb>
                        
                    </form>
                </div>
            </Aux>
            )
        }
        else{
        return (
            <Aux>
                <div className={classes.Container}>
                    <form className={classes.form}>
                        <p className={classes.Title}> Profile Information</p>
                        {request1}
                        <h3 style={{ marginTop: '50px' }}>Health Details :</h3>
                    </form>
                </div>
            </Aux>
        );
        }
    }
}
export default ShowApplication;