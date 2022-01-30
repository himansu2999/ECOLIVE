import React,{Component} from 'react';
import classes from './ContactUs.module.css';
import Buttonb from '../../components/UI/Buttonb/Buttonb';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Input from '../../components/UI/Input/Input';
import Photo from '../../components/Assets/Images/woman-discussing-a-lesson-3758869.jpg';
import Footer from '../../components/Footer/Footer';
class ContactUs extends Component {
    state = {
        inputs: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false,
                label: 'Name',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false,
                label: 'Email',
            },        
            Message: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Message'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                label: 'Message',
            },
        },
    }
    checkValidity(value, rules) {
        let isValid = false;
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '';
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength;
        }
        return isValid;
    }
    inputChangeHandler = (event, controlName) => {
        const updatedInputs = {
            ...this.state.inputs,
            [controlName]: {
                ...this.state.inputs[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.inputs[controlName].validation),
                touched: true
            }
        }
        this.setState({ inputs: updatedInputs })
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.history.push("/Home");
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
        return (
            <Aux>
                <div style={{backgroundColor:'skyblue', textAlign:'center'}}>
                <h1> Contact Us</h1>
                <h3>Tell us about your issue so we can help you more quickly.</h3>
                </div>
                <div className={classes.ContactUs} style={{backgroundImage:{Photo}}}>
                <div className={classes.AutherizationBox}>
                    {input}
                    <Buttonb btnType="Success"
                        clicked={this.submitHandler}>
                        Send
                    </Buttonb>
                    
                    </div>
                </div>
             <Footer />

            </Aux>
        )
    }
};
export default ContactUs;