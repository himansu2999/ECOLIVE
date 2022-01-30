import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './AddForm.module.css';
import InputForm from '../../UI/InputForm/InputForm';
import Buttonb from '../../UI/Buttonb/Buttonb';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
import Axios from 'axios';
class AddForm extends Component {
    state = {
        inputs: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Name'
                },
                value: '',
                label: 'Name:',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'email'
                },
                value: '',
                label: 'Email:',
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'phone'
                },
                value: '',
                label: 'Phone:',
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'password'
                },
                value: '',
                label: 'Password:',
            }
        },
        isAdmin: false,
        isDoctor: false,
        isPatient: false,
        role: null,
        loading: true
    }
    componentDidMount() {
        if (this.props.role) {
            this.setState({ role: this.props.role })
        }
    }
    inputChangeHandler = (event, inputType, controlName) => {
        const updatedInputs = {
            ...this.state[inputType],
            [controlName]: {
                ...this.state[inputType][controlName],
                value: event.target.value,
            }
        }
        this.setState({ [inputType]: updatedInputs });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        const { name, email, phone, password } = { ...this.state.inputs };
        const emailAccount = email.value;
        const passwordAccount = password.value;
        const nameAccount = name.value;
        const phoneAccount = phone.value;
        const updatedInputs = {
            ...this.state.inputs,
            email: {
                ...this.state.inputs.email,
                value: ''
            },
            password: {
                ...this.state.inputs.password,
                value: ''
            },
            name: {
                ...this.state.inputs.name,
                value: ''
            },
            phone: {
                ...this.state.inputs.phone,
                value: ''
            },
        }
        if (this.state.role) {
            const UserData = {
                email: emailAccount,
                password: passwordAccount,
                returnSecureToken: true
            }
            Axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAl9uNH65-zXwTF0FNiDdNx8TqJUq-I-JQ', UserData)
                .then(authUser => {
                    if (this.state.role === "isAdmin") {
                        return (this.props.firebase
                            .admin(authUser.data.localId)
                            .set({
                                username: nameAccount,
                                name: nameAccount,
                                email: emailAccount,
                                activities: 'not set',
                                phone: phoneAccount
                            }),
                            this.props.firebase
                                .roles(authUser.data.localId)
                                .set({
                                    username: nameAccount,
                                    role: this.state.role
                                }))
                    }
                    if (this.state.role === "isDoctor") {
                        return (this.props.firebase
                            .doctor(authUser.data.localId)
                            .set({
                                username: nameAccount,
                                name: nameAccount,
                                email: emailAccount,
                                activities: 'not set',
                                phone: phoneAccount
                            }),
                            this.props.firebase
                                .roles(authUser.data.localId)
                                .set({
                                    username: nameAccount,
                                    role: this.state.role
                                }))
                    }
                    else {
                        return (this.props.firebase
                            .user(authUser.data.localId)
                            .set({
                                username: nameAccount,
                                name: nameAccount,
                                email: emailAccount,
                                activities: 'not set',
                                phone: phoneAccount
                            }),
                            this.props.firebase
                                .roles(authUser.data.localId)
                                .set({
                                    username: nameAccount,
                                    role: this.state.role
                                }),
                            console.log("ASDAs"))

                    }
                    this.props.firebase.auth.createUserWithEmailAndPassword(emailAccount, passwordAccount);
                })
                .then(response => {
                    this.setState({
                        inputs: updatedInputs
                    })
                    alert('User Created')
                })
                .catch(error => {
                    this.setState({ error: error.message })
                });
        }
        else {
            alert('Please Select a Role')
        }
    }
    roleChangeHandler = (role) => {
        this.setState({ role: role, loading: false })
    }
    render() {
        const inputs = "inputs";
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
                changed={(event) => this.inputChangeHandler(event, inputs, inputElement.id)}
                label={inputElement.config.label}
                Options={inputElement.config.Options}
            />
        ))
        return (
            <Aux>
                <div className={classes.Container}>
                    <form onSubmit={(event) => this.handleSubmit(event)} className={classes.form}>
                        <p className={classes.Title}>ADD</p>
                        <h3 style={{ marginTop: '50px' }}>Personal Details : </h3>
                        <div className={classes.PersonalDetail}>
                            <div className={classes.InputBox}>{input}</div>
                        </div>
                        {this.props.role ? null : (<div><h4>Assign Role:</h4>
                            <div className={classes.RoleSelector}>
                                <label className={classes.radio} >
                                    <input
                                        onChange={(event) => this.roleChangeHandler(event.target.value)}
                                        type="radio"
                                        name="role"
                                        value="isPatient" />
                                Patient
                            </label>
                                <label className={classes.radio}>
                                    <input
                                        onChange={(event) => this.roleChangeHandler(event.target.value)}
                                        type="radio"
                                        name="role"
                                        value="isDoctor" />
                                Doctor
                            </label>
                                <label className={classes.radio}>
                                    <input
                                        onChange={(event) => this.roleChangeHandler(event.target.value)}
                                        type="radio"
                                        name="role"
                                        value="isAdmin" />
                                Admin
                            </label>
                            </div></div>) }
                        <Buttonb btnType="Success" style={{ marginTop: '50px', width: '100%' }} >ADD</Buttonb>
                    </form>
                </div>
            </Aux>
        );
    }
}
export default withRouter(withFirebase(AddForm));