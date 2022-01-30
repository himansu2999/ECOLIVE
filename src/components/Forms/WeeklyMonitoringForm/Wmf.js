import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './Wmf.module.css';
import InputForm from '../../UI/InputForm/InputForm';
import Buttonb from '../../UI/Buttonb/Buttonb';
import InputTable from '../../UI/InputTable/InputTable';
import moment from 'moment';
import {withFirebase} from '../../Firebase';
import { Button } from 'reactstrap';



class Wmf extends Component {
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
            patronid: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Patron-ID'
                },
                value: '',
                label: 'Patron-ID/Plan:',
            },
            consultation: {
                elementType: 'input',
                elementConfig: {
                    type: 'input'
                },
                value: '',
                label: 'Consultation No.:',
            },   
            consultationdate: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'YYYY-MM-DD'
                },
                value: '',
                label: 'Consultation Date:',
            }, 
            weight: {
                elementType: 'input',
                elementConfig: {
                    type: 'input'
                },
                value: '',
                label: 'Weight(Kg):',
            },  
            nextdate: {
                elementType: 'input',
                elementConfig: {
                    type: 'input'
                },
                value: '',
                label: 'Next Consultation Date:',
            },
        },  
            table: {
                chest: {
                    label: 'Chest',
                    value: ''
                },
                waist: {
                    label: 'Waist',
                    value: ''
                },
                abdomen: {
                    label: 'Abdomen',
                    value: ''
                },
                arms: {
                    label: 'Arms',
                    value: ''
                },
                hips: {
                    label: 'Hips',
                    value: ''
                },
                midthighs: {
                    label: 'Mid-Thighs',
                    value: ''
                }
            },  
            textAreas: {
                patroncomments: {
                    elementType: 'textarea',
                    elementConfig: {
                        type: 'textarea',
                    },
                    value: '',
                    label: "Patron's Comments",
                },
                benefitsobserved: {
                    elementType: 'textarea',
                    elementConfig: {
                        type: 'textarea',
                    },
                    value: '',
                    label: "Benefits Observed",
                },
                concerns: {
                    elementType: 'textarea',
                    elementConfig: {
                        type: 'textarea',
                    },
                    value: '',
                    label: "Concerns",
                },
                diet: {
                    elementType: 'textarea',
                    elementConfig: {
                        type: 'textarea',
                    },
                    value: '',
                    label: "Diet",
                },
                exercises: {
                    elementType: 'textarea',
                    elementConfig: {
                        type: 'textarea',
                    },
                    value: '',
                    label: "Exercises",
                },
                therapies: {
                    elementType: 'textarea',
                    elementConfig: {
                        type: 'textarea',
                    },
                    value: '',
                    label: "Therapies",
                },
                othercomments: {
                    elementType: 'textarea',
                    elementConfig: {
                        type: 'textarea',
                    },
                    value: '',
                    label: "Other Comments",
                }
            },
            loading: true
    
    }   
    componentDidMount(){
        const updatedInputs = {
            ...this.state.inputs,
            name: {
                ...this.state.inputs.name,
                value: this.props.patientName 
            }
        }
        this.setState({ inputs: updatedInputs });
    } 
    inputChangeHandler = (event, controlName) => {
        const updatedInputs = {
            ...this.state.inputs,
            [controlName]: {
                ...this.state.inputs[controlName],
                value: event.target.value,
            }
        }
        this.setState({ inputs: updatedInputs });
    }
    textAreaChangeHandler = (event, controlName) => {
        const updatedInputs = {
            ...this.state.textAreas,
            [controlName]: {
                ...this.state.textAreas[controlName],
                value: event.target.value,
            }
        }
        this.setState({ textAreas: updatedInputs });    
    } 
    tableInputChangeHandler = (event, controlName, tableName) => {
        const updatedInputs = {
            ...this.state[tableName],
            [controlName]: {
                ...this.state[tableName][controlName],
                value: event.target.value,
            }
        }
        this.setState({ [tableName]: updatedInputs })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        const requestData = {};
        const firstTableData = {};
        const textAreasData = {};
        for (let formElementIdentifier in this.state.inputs) {
            requestData[formElementIdentifier] = {
                'value': this.state.inputs[formElementIdentifier].value,
                'label': this.state.inputs[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.table) {
            firstTableData[formElementIdentifier] = {
                'value': this.state.table[formElementIdentifier].value,
                'label': this.state.table[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.textAreas) {
            textAreasData[formElementIdentifier] = {
                'value': this.state.textAreas[formElementIdentifier].value,
                'label': this.state.textAreas[formElementIdentifier].label
            }
        }   
        const weekly = {
            requestData: requestData,
            firstTableData: firstTableData,
            textAreasData: textAreasData,
            date : `${moment().format("D")}-${moment().month()}-${moment().year()}`
        }
        const ref =this.props.firebase.db.ref(`doctors/${this.props.firebase.auth.currentUser.uid}/activities/${this.props.requestId}/weekly`);
        
        ref.push(weekly).then((snap) => {
            const refUser = this.props.firebase.db.ref().child(`users/${this.props.patientId}/activities/${this.props.requestId}/weekly/${snap.key}`);
            refUser.update(weekly);
            setTimeout(() => {
                alert("Recommendations sent to user");
            }, 300)
        });
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
        const textAreasArray = [];
        for (let key in this.state.textAreas) {
            textAreasArray.push({
                id: key,
                config: this.state.textAreas[key]
            })
        }
        const textArea = textAreasArray.map(inputElement => (
            <InputForm
                key={inputElement.id}
                elementType={inputElement.config.elementType}
                elementConfig={inputElement.config.elementConfig}
                value={inputElement.config.value}
                changed={(event) => this.textAreaChangeHandler(event, inputElement.id)}
                label={inputElement.config.label}
                Options={inputElement.config.Options}
            />
        ))
        const Table_a_Array = "table"
        const tableInputsArraya = [];
        for (let key in this.state[Table_a_Array]) {
            tableInputsArraya.push({
                id: key,
                config: this.state[Table_a_Array][key]
            })
        }
        const table_a = tableInputsArraya.map(inputElement => (
            <InputTable
                key={inputElement.id}
                Options={inputElement.config}
                changed={(event) => this.tableInputChangeHandler(event, inputElement.id, Table_a_Array)}
            />
        ))
        
        return (
            <Aux>
                <div className={classes.Container} >
                    <form onSubmit={(event) => this.handleSubmit(event)} className={classes.form}>
                        <p className={classes.Title}>Weekly Monitoring Form</p>
                        {input}
                        <h3 style={{ marginTop: '50px' }}>Inch Measurements:</h3>
                        <div className={classes.Table}>
                            {table_a}
                        </div>
                        {textArea}
                        <Buttonb btnType="Success" style={{ marginTop: '50px', width: '100%' }} >Submit</Buttonb>
                    </form>
                </div>
        
            </Aux>
        );
   }
}

export default withFirebase(Wmf);