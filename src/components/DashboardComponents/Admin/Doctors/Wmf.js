import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import classes from './Wmf.module.css';
import InputForm from '../../../UI/InputForm/InputForm';
import Buttonb from '../../../UI/Buttonb/Buttonb';
import InputTable from '../../../UI/InputTable/InputTable';
import axios from '../../../../axios-ecolive';

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
                    type: 'input'
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
                label: 'Weight:',
            },
            nextdate: {
                elementType: 'input',
                elementConfig: {
                    type: 'input'
                },
                value: '',
                label: 'Next Consultation Date:',
            }
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
                'value': this.state.firstTable[formElementIdentifier].value,
                'label': this.state.firstTable[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.textAreas) {
            textAreasData[formElementIdentifier] = {
                'value': this.state.textAreas[formElementIdentifier].value,
                'label': this.state.textAreas[formElementIdentifier].label
            }
        }
        const request = {
            requestData: requestData,
            firstTableData: firstTableData,
            textAreasData: textAreasData,
        }
        axios.post('/Requests.json', request).then(
            this.setState({ loading: false }),
            alert('DONE')
        ).catch(err => console.log(err))

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
                <div className={classes.Container}>
                    <form onSubmit={(event) => this.handleSubmit(event)} className={classes.form}>
                        <p className={classes.Title}>Weekly Monitoring Form</p>
                        {input}
                        <h3 style={{ marginTop: '50px' }}>Inch Measurements:</h3>
                        <div className={classes.Table}>
                            {table_a}
                        </div>
                        {textArea}
                        <Buttonb btnType="Success" style={{ marginTop: '50px', width: '100%' }} >Submit</Buttonb>
                        <h4 style={{ marginTop: '50px' }}>Disclaimer:</h4>
                        <div>
                            <li className={classes.Disclaimer}>By providing all the above details in-person or through email to Ecolive,
                            you certify that all the information provided in
                                    this form is complete and correct.</li>
                            <li className={classes.Disclaimer}>Treatment will be planned on the basis of information provided in this form. Any missing or incorrect information in this form might lead to incomplete
                            assessment of health issues and incorrect recommendations.
                                    Ecolive will not be responsible in such cases.</li>
                            <li className={classes.Disclaimer}>The information provided by you, will be solely used for assessing your health and providing required recommendations and treatments.</li>
                        </div>
                    </form>
                </div>
            </Aux>
        );
    }
}

export default Wmf;