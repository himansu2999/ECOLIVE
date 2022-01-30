import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './HealthForm.module.css';
import InputForm from '../../UI/InputForm/InputForm';
import Buttonb from '../../UI/Buttonb/Buttonb';
import InputTable from '../../UI/InputTable/InputTable';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
//import {withAuthentication} from '../../Session';

class HealthForm extends Component {
    state = {
        isAuth: false,
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
            patronID: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Patron ID'
                },
                value: '',
                label: 'Patron-ID:',
            },
            plan: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Plan'
                },
                value: '',
                label: 'Plan:',
            },
            sex: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Male',
                    second: 'Female',
                    third: 'Other'
                },
                value: 'Male',
                label: 'Sex:',
            },
            age: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Age'
                },
                value: '',
                label: 'Age:',
            },
            
            weight: {
                elementType: 'input',
                elementConfig: {
                    type: 'input'
                },
                value: '',
                label: 'Weight(Kg):',
            },  
            bp: {
                elementType: 'input',
                elementConfig: {
                    type: 'input'
                },
                value: '',
                label: 'BP:',
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
            }
        },
        firstTable: {
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
                label: 'Mid-Arms',
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
            healthAssessment: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                },
                value: '',
                label: "Current Health Assessment",
            }
        }, 
        mixedTable: {
            earlyMorning: {
                elementType: 'mixed',
                title: 'Early Morning',
                valueInput: '',
                valueText: ''
            },
            breakfast: {
                elementType: 'mixed',
                title: 'Breakfast',
                valueInput: '',
                valueText: ''
            },
            midMeal: {
                elementType: 'mixed',
                title: 'Mid-Meal',
                valueInput: '',
                valueText: ''
            },
            beforeLunch: {
                elementType: 'mixed',
                title: 'Before Lunch',
                valueInput: '',
                valueText: ''
            },
            lunch: {
                elementType: 'mixed',
                title: 'Lunch',
                valueInput: '',
                valueText: ''
            },
            evening: {
                elementType: 'mixed',
                title: 'Evening',
                valueInput: '',
                valueText: ''
            },
            dinner: {
                elementType: 'mixed',
                title: 'Dinner',
                valueInput: '',
                valueText: ''
            },
            beforeSleep: {
                elementType: 'mixed',
                title: 'Before Sleep',
                valueInput: '',
                valueText: ''
            }
        }, 
        mixedTable2: {
            first: {
                elementType: 'mixed2',
                title: '1.',
                valueInput: '',
                valueText: ''
            },
            second: {
                elementType: 'mixed2',
                title: '2.',
                valueInput: '',
                valueText: ''
            },
            third: {
                elementType: 'mixed2',
                title: '3.',
                valueInput: '',
                valueText: ''
            },
            fourth: {
                elementType: 'mixed2',
                title: '4.',
                valueInput: '',
                valueText: ''
            },
            fifth: {
                elementType: 'mixed2',
                title: '5.',
                valueInput: '',
                valueText: ''
            }
        },
        textAreas2: {
            instructions: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                },
                value: '',
                label: "Special Instructions",
            }
        },   
        textAreas3: {
            activities: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                },
                value: '',
                label: "Other Activities",
            }
        },   
        textAreas4: {
            instructions: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                },
                value: '',
                label: "Other Recommendations",
            },
            precautions: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                },
                value: '',
                label: "Precautions:",
            },
            monitoring: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                },
                value: '',
                label: "Monitoring(to be reported before next consultation):",
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
            },
            sex: {
                ...this.state.inputs.sex,
                value: this.props.gender
            },
            age: {
                ...this.state.inputs.age,
                value: this.props.patientAge
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
    textArea2ChangeHandler = (event, controlName) => {
        const updatedInputs = {
            ...this.state.textAreas2,
            [controlName]: {
                ...this.state.textAreas2[controlName],
                value: event.target.value,
            }
        }
        this.setState({ textAreas2: updatedInputs });
    }
    textArea3ChangeHandler = (event, controlName) => {
        const updatedInputs = {
            ...this.state.textAreas3,
            [controlName]: {
                ...this.state.textAreas3[controlName],
                value: event.target.value,
            }
        }
        this.setState({ textAreas3: updatedInputs });
    }
    textArea4ChangeHandler = (event, controlName) => {
        const updatedInputs = {
            ...this.state.textAreas4,
            [controlName]: {
                ...this.state.textAreas4[controlName],
                value: event.target.value,
            }
        }
        this.setState({ textAreas4: updatedInputs });
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
    mixedTableInputChangeHandler = (event, controlName, valueType) => {
        const updatedInputs = {
            ...this.state.mixedTable,
            [controlName]: {
                ...this.state.mixedTable[controlName],
                [valueType]: event.target.value,
            }
        }
        this.setState({ mixedTable: updatedInputs })
    }
    mixedTable2InputChangeHandler = (event, controlName, valueType) => {
        const updatedInputs = {
            ...this.state.mixedTable2,
            [controlName]: {
                ...this.state.mixedTable2[controlName],
                [valueType]: event.target.value,
            }
        }
        this.setState({ mixedTable2: updatedInputs })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })
        const Uid= this.props.patientId;
        const requestData = {};
        const mixedTableData = {};
        const mixedTable2Data = {};
        const mixedTable3Data = {};
        const firstTableData = {};
        const textAreasData = {};
        const textAreas2Data = {};
        const textAreas3Data = {};
        const textAreas4Data = {};
        for (let formElementIdentifier in this.state.inputs) {
            requestData[formElementIdentifier] = {
                'value': this.state.inputs[formElementIdentifier].value,
                'label': this.state.inputs[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.firstTable) {
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
        for (let formElementIdentifier in this.state.textAreas2) {
            textAreas2Data[formElementIdentifier] = {
                'value': this.state.textAreas2[formElementIdentifier].value,
                'label': this.state.textAreas2[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.textAreas3) {
            textAreas3Data[formElementIdentifier] = {
                'value': this.state.textAreas3[formElementIdentifier].value,
                'label': this.state.textAreas3[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.textAreas4) {
            textAreas4Data[formElementIdentifier] = {
                'value': this.state.textAreas4[formElementIdentifier].value,
                'label': this.state.textAreas4[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.mixedTable) {
            mixedTableData[formElementIdentifier] = {
                'label': this.state.mixedTable[formElementIdentifier].title,
                'time': this.state.mixedTable[formElementIdentifier].valueInput,
                'Food': this.state.mixedTable[formElementIdentifier].valueText
            }
        }
        for (let formElementIdentifier in this.state.mixedTable2) {
            mixedTable2Data[formElementIdentifier] = {
                'label': this.state.mixedTable2[formElementIdentifier].title,
                'name': this.state.mixedTable2[formElementIdentifier].valueInput,
                'rounds': this.state.mixedTable2[formElementIdentifier].valueText
            }
        }
        for (let formElementIdentifier in this.state.mixedTable2) {
            mixedTable3Data[formElementIdentifier] = {
                'label': this.state.mixedTable2[formElementIdentifier].title,
                'therapy': this.state.mixedTable2[formElementIdentifier].valueInput,
                'duration': this.state.mixedTable2[formElementIdentifier].valueText
            }
        }
        const request = {
            name:this.state.inputs.name.value,
            gender:this.state.inputs.sex.value,
            requestData: requestData,
            mixedData: mixedTableData,
            mixedData2: mixedTable2Data,
            mixedData3: mixedTable3Data,
            firstTableData: firstTableData,
            textAreasData: textAreasData,
            textAreas2Data: textAreas2Data,
            textAreas3Data: textAreas3Data,
            textAreas4Data: textAreas4Data,
            date: 'not set',
            patientId: Uid,
            doctorId: 'not set',
            type: 1
        }
        
        if (Uid) {
        const ref =this.props.firebase.db.ref(`doctors/${this.props.firebase.auth.currentUser.uid}/activities/${this.props.requestId}`);
        var healthreq = {};
        healthreq['/firstRecForm']=request;
        ref.update(healthreq);
        const pef =this.props.firebase.db.ref(`users/${Uid}/activities/${this.props.requestId}`);
        pef.update(healthreq);
            setTimeout(() => {
                alert("First Recommendation form sent");
            }, 300)
        }
        else(
            setTimeout(() => {
                alert("Uid not added");
            }, 300)
        )
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
        ));
        const textAreas2Array = [];
        for (let key in this.state.textAreas2) {
            textAreas2Array.push({
                id: key,
                config: this.state.textAreas2[key]
            })
        }
        const textArea2 = textAreas2Array.map(inputElement => (
            <InputForm
                key={inputElement.id}
                elementType={inputElement.config.elementType}
                elementConfig={inputElement.config.elementConfig}
                value={inputElement.config.value}
                changed={(event) => this.textArea2ChangeHandler(event, inputElement.id)}
                label={inputElement.config.label}
                Options={inputElement.config.Options}
            />
        ));
        const textAreas3Array = [];
        for (let key in this.state.textAreas3) {
            textAreas3Array.push({
                id: key,
                config: this.state.textAreas3[key]
            })
        }
        const textArea3 = textAreas3Array.map(inputElement => (
            <InputForm
                key={inputElement.id}
                elementType={inputElement.config.elementType}
                elementConfig={inputElement.config.elementConfig}
                value={inputElement.config.value}
                changed={(event) => this.textArea3ChangeHandler(event, inputElement.id)}
                label={inputElement.config.label}
                Options={inputElement.config.Options}
            />
        ));
        const textAreas4Array = [];
        for (let key in this.state.textAreas4) {
            textAreas4Array.push({
                id: key,
                config: this.state.textAreas4[key]
            })
        }
        const textArea4 = textAreas4Array.map(inputElement => (
            <InputForm
                key={inputElement.id}
                elementType={inputElement.config.elementType}
                elementConfig={inputElement.config.elementConfig}
                value={inputElement.config.value}
                changed={(event) => this.textArea4ChangeHandler(event, inputElement.id)}
                label={inputElement.config.label}
                Options={inputElement.config.Options}
            />
        ));
        const Table_a_Array = "firstTable"
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
        const mixedTableInputsArray = [];
        for (let key in this.state.mixedTable) {
            mixedTableInputsArray.push({
                id: key,
                config: this.state.mixedTable[key]
            })
        }
        const mixedTable = mixedTableInputsArray.map(inputElement => (
            <InputTable
                elementType={inputElement.config.elementType}
                key={inputElement.id}
                Options={inputElement.config}
                changed_input={(event) => this.mixedTableInputChangeHandler(event, inputElement.id, "valueInput")}
                changed_text={(event) => this.mixedTableInputChangeHandler(event, inputElement.id, "valueText")}
                value_input={inputElement.config.valueInput}
                value_text={inputElement.config.valueText}

            />
        ))
        const mixedTable2InputsArray = [];
        for (let key in this.state.mixedTable2) {
            mixedTable2InputsArray.push({
                id: key,
                config: this.state.mixedTable2[key]
            })
        }
        const mixedTable2 = mixedTable2InputsArray.map(inputElement => (
            <InputTable
                elementType={inputElement.config.elementType}
                key={inputElement.id}
                Options={inputElement.config}
                changed_input={(event) => this.mixedTable2InputChangeHandler(event, inputElement.id, "valueInput")}
                changed_text={(event) => this.mixedTable2InputChangeHandler(event, inputElement.id, "valueText")}
                value_input={inputElement.config.valueInput}
                value_text={inputElement.config.valueText}

            />
        ))
        const mixedTable3InputsArray = [];
        for (let key in this.state.mixedTable2) {
            mixedTable3InputsArray.push({
                id: key,
                config: this.state.mixedTable2[key]
            })
        }
        const mixedTable3 = mixedTable3InputsArray.map(inputElement => (
            <InputTable
                elementType={inputElement.config.elementType}
                key={inputElement.id}
                Options={inputElement.config}
                changed_input={(event) => this.mixedTable2InputChangeHandler(event, inputElement.id, "valueInput")}
                changed_text={(event) => this.mixedTable2InputChangeHandler(event, inputElement.id, "valueText")}
                value_input={inputElement.config.valueInput}
                value_text={inputElement.config.valueText}

            />
        ))
        return (
            <Aux>
                <div className={classes.Container}>
                    <form onSubmit={(event) => this.handleSubmit(event)} className={classes.form}>
                        <p className={classes.Title}>Holistic Health Recommendation Form</p>
                        <br></br>
                        {input}
                        <h4 style={{ marginTop: '50px' }}>INCH MEASUREMENTS:</h4>
                        <div className={classes.Table}>
                            {table_a}
                        </div>
                        {textArea}
                        <h4 style={{ marginTop: '50px' }}>DIET RECOMMENDATIONS:</h4>
                        <div className={classes.MixedTable}>
                            <InputTable
                                elementType={'mixed'}
                                labelA={'Meal'}
                                labelB={'Time'}
                                labelC={'Food'}
                            />
                            <div style={{marginTop:'-14px'}}>{mixedTable}</div>
                        </div>
                        {textArea2}
                        <h5 style={{ marginTop: '50px'}}>YOGASANA/PRANAYAM/KRIYA RECOMMENDATIONS</h5>
                        <div className={classes.MixedTable}>
                            <InputTable
                                elementType={'mixed2'}
                                labelA={'S No.'}
                                labelB={'Name'}
                                labelC={'Rounds/Frequency'}
                            />
                            <div style={{marginTop:'-14px'}}>{mixedTable2}</div>
                        </div>
                        {textArea3}
                        <h4 style={{ marginTop: '50px'}}>THERAPY RECOMMENDATIONS</h4>
                        <div className={classes.MixedTable}>
                            <InputTable
                                elementType={'mixed2'}
                                labelA={'S No.'}
                                labelB={'Therapy'}
                                labelC={'Duration/Frequency'}
                            />
                            <div style={{marginTop:'-14px'}}>{mixedTable2}</div>
                        </div>
                        {textArea4}
                        <Buttonb btnType="Success" style={{ marginTop: '50px', width: '100%' }} >Submit</Buttonb>
                        <h4 style={{ marginTop: '50px' }}>Disclaimer:</h4>
                        <div>
                            <li className={classes.Disclaimer}>The above recommendations have been made basis the information provided by the patient.
                                    EcoLive is not responsible for health issues arising because for any omission/misrepresentation of
                                    facts on behalf of the patient.</li>
                            <li className={classes.Disclaimer}>The results of a treatment depend solely on the adherence to the recommendations provided in
                                    this form. The lower the adherence to these, the lower would be the improvement in the existing
                                    health issues.</li>
                            <li className={classes.Disclaimer}>Every body is unique. Hence, the results of similar treatments given to different people might
                                    vary from person-to-person.</li>
                            <li className={classes.Disclaimer}>Any deviation in the existing medication to be done only in consultation with your current
                                    physician. EcoLive is not responsible for any complications arising out of any changes in existing
                                    medication without proper doctor consultation.</li>
                            <li className={classes.Disclaimer}>EcoLive should be informed about any health complications experienced during the treatment.
                                    Any new medicines/treatments in parallel should be taken only after discussion with the
                                    concerned Naturopathy doctor.</li>
                            <li className={classes.Disclaimer}>If you are new to yoga, please learn/practice the relevant Asanas/Pranayams/Kriyas under the
                                    supervision of an expert trained professional. EcoLive will only recommend the exercises to be
                                    done. It will not be responsible for any issues arising out of wrong practice of
                                    Yoga/Asanas/Pranayams/Kriyas.</li>
                            <li className={classes.Disclaimer}>EcoLive will only provide recommendations about Naturopathy therapies. In case you are not
                                    confident in doing these therapies at home, please get it done at a proper Naturopathy center or
                                    take help from trained naturopathy professional.</li>
                        </div>
                                            <h4>“Nature does not hurry,
                                            yet everything is accomplished”</h4>
                        <div>
                            <ol>
                            In case of any issue/clarification, contact frontdest@ecolive.in or call 9999427097/9999163760
                            </ol>
                        </div>                          
                    </form>
                </div>
            </Aux>
        );
    }
}
export default withFirebase(HealthForm);