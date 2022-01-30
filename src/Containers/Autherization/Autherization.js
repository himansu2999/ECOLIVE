import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Autherization.module.css';
import Input from '../../components/UI/Input/Input';
import Buttonb from '../../components/UI/Buttonb/Buttonb';
import Footer from '../../components/Footer/Footer';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../components/Firebase';
class Autherization extends Component {
    state = {
        inputs: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                label: 'Email',
            },
            password: {
                elementType: 'password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                label: 'Password',
            },
        },
        auth: null,
        isSignIn: true,
        isDoctor:false,
        isAdmin:false,
        user:null
    }
    switchAuthModeHandler = () => {
        let inputState = {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Name'
                },
                value: '',
                label: 'Name',
            },
            ...this.state.inputs
        }
        if (!this.state.isSignIn) {
            inputState = { ...this.state.inputs };
            delete inputState.name;
        }
        this.setState(prevState => {
            return {
                isSignIn: !prevState.isSignIn,
                inputs: inputState
            };
        })
    }

    inputChangeHandler = (event, controlName) => {
        const updatedInputs = {
            ...this.state.inputs,
            [controlName]: {
                ...this.state.inputs[controlName],
                value: event.target.value
            }
        }
        this.setState({ inputs: updatedInputs });
    }
    submitHandler = (e) => {
        e.preventDefault();
        const { email, password } = { ...this.state.inputs };
        const emailAccount = email.value;
        const passwordAccount = password.value;
        const updatedInputs = {
            ...this.state.inputs,
            email: {
                ...this.state.email,
                value: ''
            },
            password: {
                ...this.state.password,
                value: ''
            }
        }
        if (this.state.isSignIn) {
            this.props.firebase.doSignInWithEmailAndPassword(emailAccount, passwordAccount)
            .then(response => {
                localStorage.setItem('isLoggedIn', true)
                localStorage.setItem('user', JSON.stringify(response.user))
                // localStorage.setItem('email', emailAccount.toString());
                // localStorage.setItem('name', this.state.inputs.name.value.toString());
                this.setState({
                    inputs: updatedInputs,
                    signingin: false
                })
                
                this.props.history.push("/dashboard");
                console.log(this.props.authUser)
            })
            .catch(error => {
                this.setState({ error: error.message , signingin: false});
                setTimeout(() => {
                    alert(error.message);
                }, 200)
            });
        }
        else {
            const { name} = { ...this.state.inputs };
            const nameAccount = name.value;
            this.props.firebase.auth.createUserWithEmailAndPassword(emailAccount, passwordAccount)
            .then(authUser => {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('userUid',JSON.stringify( authUser.user))
                // localStorage.setItem('email', emailAccount.toString());
                // localStorage.setItem('name', nameAccount.toString());
                if (this.state.isAdmin) {
                    return (this.props.firebase
                        .admin(authUser.user.uid)
                        .set({
                            username: nameAccount,
                            email: emailAccount,
                            activities: 'not set'
                        }),
                        this.props.firebase
                        .roles(authUser.user.uid)
                        .set({
                            username: nameAccount,
                            role:"isAdmin"
                        }))
                }
                if (this.state.isDoctor) {
                    return (this.props.firebase
                        .doctor(authUser.user.uid)
                        .set({
                            username: nameAccount,
                            email: emailAccount,
                            activities: 'not set'
                        }),
                        this.props.firebase
                        .roles(authUser.user.uid)
                        .set({
                            username: nameAccount,
                            role:"isDoctor"
                        }))
                }
                else {
                    return (this.props.firebase
                        .user(authUser.user.uid)
                        .set({
                            username: nameAccount,
                            name:nameAccount,
                            email: emailAccount,
                            activities: 'not set'
                        }),
                        this.props.firebase
                        .roles(authUser.user.uid)
                        .set({
                            username: nameAccount,
                            role:"isPatient"
                        }))

                }
                // Create a user in the Firebase realtime database
            })
            .then(response => {
                this.setState({
                    inputs: updatedInputs,
                    signingin: false
                })
                setTimeout(() => {
                    alert("Your account has been created");
                }, 200)
                this.props.history.push("/dashboard");
            })
            .catch(error => {
                this.setState({ error: error.message, signingin: false });
                setTimeout(() => {
                    alert(error.message);
                }, 200)
            });
        }
        this.setState({
            signingin: true
        })
    }

    notValidHandler = () => {
        alert('Incorrect Email id or Password');
    }
    render() {
        const inputsArray = [];
        for (let key in this.state.inputs) {
            inputsArray.push({
                id: key,
                config: this.state.inputs[key]
            })
        }
        const input = inputsArray.map(inputElement => (
            <Input
                key={inputElement.id}
                elementType={inputElement.config.elementType}
                elementConfig={inputElement.config.elementConfig}
                value={inputElement.config.value}
                changed={(event) => this.inputChangeHandler(event, inputElement.id)}
                invalid={!inputElement.config.valid}
                shouldValidate={inputElement.config.validation}
                touched={inputElement.config.touched}
                label={inputElement.config.label}
            />
        ))
        let AuthChangeHeading = <p className={classes.FormHeading}>Create Your Ecolive Account</p>;
        let Question = <p className={classes.Title}>Why Create Account ?</p>;
        let AuthChange = <div onClick={() => this.switchAuthModeHandler()}><text className={classes.AuthChange}>{this.state.isSignIn?"New User? SignUp":"Existing User?SignIn"}</text></div>;
        if (this.state.isSignIn) {
            AuthChangeHeading = <p className={classes.FormHeading}>Continue to Ecolive</p>;
            Question = <p className={classes.Title}>Login Benefits !</p>
        }
        return (
            <Aux>
                <div className={classes.Container} style= {this.state.signingin?{opacity: "50%"}:null}>
                    <div className={classes.Content}>
                        {Question}
                        <div className={classes.column}>
                            <p className={classes.Options}>Easy Booking</p>
                            <p className={classes.Options}>Faster Appointments</p>
                        </div>
                        <div className={classes.column}>
                            <p className={classes.Options}>Easier Weekly monitoring</p>
                            <p className={classes.Options}>1 on 1 Queries Solved</p>
                        </div>
                        <div className={classes.column}>
                            <p className={classes.Options}>Easy Payments</p>
                            <p className={classes.Options}>Fast Consultation</p>
                        </div>
                    </div>
                    <div className={classes.AutherizationBox}>
                        {AuthChangeHeading}
                        {input}
                        <div className={classes.ButtonBox}>
                            <Buttonb btnType="Success"
                                clicked={(e) => this.submitHandler(e)}>
                                {this.state.isSignIn ? 'Log In' : 'Sign Up'}
                            </Buttonb>
                        </div>
                        {AuthChange}
                    </div>
                </div>
                <Footer />
            </Aux>
        )
    }
};
export default withRouter(withFirebase(Autherization));