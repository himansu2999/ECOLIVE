import React, { Component, } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './ApplicationForm.module.css';
import InputForm from '../../UI/InputForm/InputForm';
import Buttonb from '../../UI/Buttonb/Buttonb';
import InputTable from '../../UI/InputTable/InputTable';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../../Firebase';
//import DatePicker, { DateInput, TimeInput } from '@trendmicro/react-datepicker';
import DatePicker from 'react-date-picker';
import '@trendmicro/react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

class RequestApplication extends Component {
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
            dob: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'YYYY-MM-DD'
                },
                value: '',
                label: 'DOB:',
            },
            gender: {
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
                label: 'Gender:',
            },
            bloodg: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'A-Positive "A+"',
                    second: 'A-Negative "A-"',
                    third: 'AB-Positive "AB+"',
                    fourth: 'AB-Negative "AB-"',
                    fifth: 'B-Positive "B+"',
                    sixth: 'B-Negative "B-"',
                    seventh: 'O-Positive "O+"',
                    eighth: 'O-Negative "O-"'
                },
                value: 'A-Positive "A+"',
                label: 'Blood Group:',
            },
            maritalStatus: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Married',
                    second: 'Unmarried'
                },
                value: 'Married',
                label: 'Marital Status:',
            },
            havingKids: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Yes',
                    second: 'No'
                },
                value: 'No',
                label: 'Having Kids:',
            },
            workingStatus: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Working',
                    second: 'Non-Working'
                },
                value: 'Working',
                label: 'Working Status:',
            },
            wellnessPlan: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Plans'
                },
                value: '',
                label: 'Wellness Plan:'
            },
            number: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Mobile No.'
                },
                value: '',
                label: 'Phone Number:'
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: '',
                label: 'E-mail:',
            }
        },
        CtextAreas: {
            address: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                },
                value: '',
                label: 'Address:',
            }
        },
        inputs2: {
            water: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'litres/day'
                },
                value: '',
                label: 'Water Intake:'
            },
            wakeup: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Time'
                },
                value: '',
                label: 'Wake-Up Time:'
            },
            sleep: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Time'
                },
                value: '',
                label: 'Sleep Time:'
            }
        },
        inputs3: {
            appetite: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Good',
                    second: 'Average',
                    third: 'Poor'
                },
                value: 'Average',
                label: 'Appetite:',
            },
            diet: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Vegetarian',
                    second: 'Non-Vegetarian',
                    third: 'Eggetarian'
                },
                value: 'Vegetarian',
                label: 'Diet:',
            },
            sleep: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Sound',
                    second: 'Disturbed'
                },
                value: 'Sound',
                label: 'Sleep Quality:',
            },
            bowel: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Regular',
                    second: 'Irregular'
                },
                value: 'Regular',
                label: 'Bowel Movement:',
            },
            stool: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Normal',
                    second: 'Loose',
                    third: 'Hard'
                },
                value: 'Normal',
                label: 'Stool Consistency:',
            },
            habits: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Tea/Coffee',
                    second: 'Drinking',
                    third: 'Smoking'
                },
                value: 'Tea/Coffee',
                label: 'Daily Habits:',
            },
            exercise: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: '7 Days',
                    second: '5 Days',
                    third: '3 Days',
                    fourth: 'No Exercise'
                },
                value: '5 Days',
                label: 'Weekly Exercise Frequency:',
            },
            type: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Yoga',
                    second: 'Walk',
                    third: 'Gym',
                    fourth: 'Others'
                },
                value: 'Yoga',
                label: 'Exercise Type:',
            },
            duration: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: '30 Mins.',
                    second: '1 Hour',
                    third: '2 Hour'
                },
                value: '30 Mins.',
                label: 'Exercise Duration:',
            }
        },
        inputs4: {
            first: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Not At All',
                    second: 'Less than 7 Days',
                    third: 'More than 7 Days',
                    fourth: 'Nearly Every Day'
                },
                value: 'Not At All',
                label: 'Feeling nervous, anxious or on edge?',
            },
            second: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Not At All',
                    second: 'Less than 7 Days',
                    third: 'More than 7 Days',
                    fourth: 'Nearly Every Day'
                },
                value: 'Not At All',
                label: 'Not being able to stop or control worrying?',
            },
            third: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Not At All',
                    second: 'Less than 7 Days',
                    third: 'More than 7 Days',
                    fourth: 'Nearly Every Day'
                },
                value: 'Not At All',
                label: 'Worrying too much about different things?',
            },
            fourth: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Not At All',
                    second: 'Less than 7 Days',
                    third: 'More than 7 Days',
                    fourth: 'Nearly Every Day'
                },
                value: 'Not At All',
                label: 'Trouble relaxing?                    ',
            },
            fifth: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Not At All',
                    second: 'Less than 7 Days',
                    third: 'More than 7 Days',
                    fourth: 'Nearly Every Day'
                },
                value: 'Not At All',
                label: 'Being so restless that it is hard to sit still?',
            },
            sixth: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Not At All',
                    second: 'Less than 7 Days',
                    third: 'More than 7 Days',
                    fourth: 'Nearly Every Day'
                },
                value: 'Not At All',
                label: 'Becoming easily annoyed or irritable?',
            },
            seventh: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Not At All',
                    second: 'Less than 7 Days',
                    third: 'More than 7 Days',
                    fourth: 'Nearly Every Day'
                },
                value: 'Not At All',
                label: 'Feeling afraid as if something awful might happen?',
            }
        },                      
        firstTable: {
            weight: {
                label: 'Weight (kg)',
                value: ''
            },
            height: {
                label: 'Height (cm)',
                value: ''
            },
            bloodPressure: {
                label: 'Blood Pressure',
                value: ''
            },
            pulseRate: {
                label: 'Pulse Rate',
                value: ''
            },
            temperature: {
                label: 'Temperature',
                value: ''
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
        secondTable: {
            heamoglobin: {
                label: 'Haemoglobin',
                value: ''
            },
            cholestrol: {
                label: 'Total Cholestrol',
                value: ''
            },
            HDL: {
                label: 'HDL',
                value: ''
            },
            LGL: {
                label: 'LGL',
                value: ''
            },
            triglyceride: {
                label: 'Triglyceride',
                value: ''
            },
            tCholHDLRatio: {
                label: 'T.Chol:HDL Ratio',
                value: ''
            }
        },
        table2: {
            bloodPressure: {
                label: 'BP',
                value: ''
            },
            Hba: {
                label: 'HbA1c',
                value: ''
            },
            sugar: {
                label: 'Fasting Sugar',
                value: ''
            },
            pp: {
                label: 'PP',
                value: ''
            },
            b12: {
                label: 'B12',
                value: ''
            },
            vitamin: {
                label: 'Vitamin-D',
                value: ''
            }
        },  
        textAreas: {
            healthConcerns: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                },
                value: '',
                label: "Current Health Concerns",
            },
            treatmentDetails: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                },
                value: '',
                label: 'Current Treatment Details',
            },
            medicalHistory: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                },
                value: '',
                label: 'Past Medical History(past health issues and treatment details)',
            },
            healthHistory: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea'
                },
                value: '',
                label: 'Family Health History(any hereditary diseases)',
            }
        },
        radios: {
            date: {
                elementType: 'radio',
                elementConfig: {
                    type: 'radio',
                },
                Radios: {
                    first: 'Urgent',
                    second: 'Within a week',
                    third: 'Within fifteen days'
                },
                value: '',
                name: 'Date Preference',
                label: 'How urgent you want your appointment to be assigned:'
            },
            timing: {
                elementType: 'radio',
                elementConfig: {
                    type: 'radio',
                },
                Radios: {
                    first: '0800 to 1100 Hrs',
                    second: '1100 to 1400 Hrs',
                    third: '1400 to 1700 Hrs',
                    fourth: '1700 to 1900 Hrs',
                },
                value: '',
                name: 'Time Preference',
                label: 'What appropriate "time slot" you would like to select for your appointment:'
            }
        },
        BtextAreas: {
            unprovidedDetails: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'textarea',
                },
                value: '',
                label: 'Would you like to provide any other details? (not covered till now):',
            }
        },
        forWomen: {
            menoPause: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Yes',
                    second: 'No'
                },
                value: 'Yes',
                label: 'Have you reached to Menopause Stage ?',
            },
            menstrualCycle: {
                elementType: 'select',
                elementConfig: {
                    type: 'select',
                },
                Options: {
                    first: 'Yes',
                    second: 'No',
                },
                value: 'Yes',
                label: 'Are your menstrual cycles regular?',
            },
            menstrualFlow: {
                elementType: 'radio',
                elementConfig: {
                    type: 'radio',
                },
                Radios: {
                    first: 'Painful',
                    second: 'Heavy Flow',
                    third: 'Scanty Flow',
                },
                value: '',
                name: 'WEEKLYEXERCISE',
                label: 'What kind of difficulty do you face during your menstrual cycles? Tick against the appropriate response:'
            },
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
            earlyMorning: {
                elementType: 'mixed',
                title: 'Appetite',
                valueInput: '',
                valueText: ''
            },
            breakfast: {
                elementType: 'mixed',
                title: 'Diet',
                valueInput: '',
                valueText: ''
            },
            sleepQuality: {
                elementType: 'mixed',
                title: 'Sleep Quality',
                valueInput: '',
                valueText: ''
            },
            bowelMovement: {
                elementType: 'mixed',
                title: 'Bowel Movement',
                valueInput: '',
                valueText: ''
            },
            stoolConsistency: {
                elementType: 'mixed',
                title: 'Stool Consistency',
                valueInput: '',
                valueText: ''
            },
            dailyHabits: {
                elementType: 'mixed',
                title: 'Daily Habits',
                valueInput: '',
                valueText: ''
            },
            weeklyExercise: {
                elementType: 'mixed',
                title: 'Weekly Exercise Frequency',
                valueInput: '',
                valueText: ''
            },
            exerciseType: {
                elementType: 'mixed',
                title: 'Exercise Type',
                valueInput: '',
                valueText: ''
            },
            exerciseDuration: {
                elementType: 'mixed',
                title: 'Exercise Duration',
                valueInput: '',
                valueText: ''
            },  
        },
        mixedTable3: {
            feelings: {
                elementType: 'mixed',
                title: 'Feeling nervous, anxious or on edge?',
                valueInput: '',
                valueText: ''
            },
            worrying: {
                elementType: 'mixed',
                title: 'Not being able to stop or control worrying?',
                valueInput: '',
                valueText: ''
            },
            worrying2: {
                elementType: 'mixed',
                title: 'Worrying too much about different things?',
                valueInput: '',
                valueText: ''
            },
            trouble: {
                elementType: 'mixed',
                title: 'Trouble relaxing?',
                valueInput: '',
                valueText: ''
            },
            restless: {
                elementType: 'mixed',
                title: 'Being so restless that it is hard to sit still?',
                valueInput: '',
                valueText: ''
            },
            annoyed: {
                elementType: 'mixed',
                title: 'Becoming easily annoyed or irritable?',
                valueInput: '',
                valueText: ''
            },
            afraid: {
                elementType: 'mixed',
                title: 'Feeling afraid as if something awful might happen?',
                valueInput: '',
                valueText: ''
            }
        },
        mixedTable4: {
            first: {
                elementType: 'mixed3',
                title: '1.',
                valueInput: '',
                valueText: ''
            },
            second: {
                elementType: 'mixed3',
                title: '2.',
                valueInput: '',
                valueText: ''
            },
            third: {
                elementType: 'mixed3',
                title: '3.',
                valueInput: '',
                valueText: ''
            },
            fourth: {
                elementType: 'mixed3',
                title: '4.',
                valueInput: '',
                valueText: ''
            },
            fifth: {
                elementType: 'mixed3',
                title: '5.',
                valueInput: '',
                valueText: ''
            }
        },
        loading: true
    }
    componentDidMount(){
        const name=  localStorage.getItem('name');
        const email= localStorage.getItem('email');
        
        
        const {  firebase, Uid } = this.props;
        const ref =firebase.db.ref(`/users/${Uid}/patientData`);
        var self= this;
        ref.once("value").then(function(snapshot){
            const snap =snapshot.val();
            if(snapshot.exists){
                for(let inparr in snap){
                let updatedInputs= {...self.state[inparr]}
                
                for(let controlName in snap[inparr]){
                     {
                        updatedInputs[controlName] = {
                            ...self.state[inparr][controlName],
                            value: snap[inparr][controlName].value,
                        }
                    }
                    
                }
                self.setState({ [inparr]: updatedInputs });
            }
        }
        })
    }
    inputDateChangeHandler = (date) =>{
        const updatedInputs = {
            ...this.state.inputs,
            dob: {
                ...this.state.inputs.dob,
                value: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
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
    input2ChangeHandler = (event, controlName) => {
        const updatedInputs = {
            ...this.state.inputs2,
            [controlName]: {
                ...this.state.inputs2[controlName],
                value: event.target.value,
            }
        }
        this.setState({ inputs: updatedInputs });
    }
    input3ChangeHandler = (event, controlName) => {
        const updatedInputs = {
            ...this.state.inputs3,
            [controlName]: {
                ...this.state.inputs3[controlName],
                value: event.target.value,
            }
        }
        this.setState({ inputs3: updatedInputs });
    }
    input4ChangeHandler = (event, controlName) => {
        const updatedInputs = {
            ...this.state.inputs4,
            [controlName]: {
                ...this.state.inputs4[controlName],
                value: event.target.value,
            }
        }
        this.setState({ inputs4: updatedInputs });
    }
    RadioChangeHandler = (event, controlName) => {
        const updatedInputs = {
            ...this.state.radios,
            [controlName]: {
                ...this.state.radios[controlName],
                value: event.target.value,
            }
        }
        this.setState({ radios: updatedInputs });
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
    BtextAreaChangeHandler = (event, controlName) => {
        const updatedInputs = {
            ...this.state.BtextAreas,
            [controlName]: {
                ...this.state.BtextAreas[controlName],
                value: event.target.value,
            }
        }
        this.setState({ BtextAreas: updatedInputs });
    }
    CtextAreaChangeHandler = (event, controlName) => {
        const updatedInputs = {
            ...this.state.CtextAreas,
            [controlName]: {
                ...this.state.CtextAreas[controlName],
                value: event.target.value,
            }
        }
        this.setState({ CtextAreas: updatedInputs });
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
    mixedTable3InputChangeHandler = (event, controlName, valueType) => {
        const updatedInputs = {
            ...this.state.mixedTable3,
            [controlName]: {
                ...this.state.mixedTable3[controlName],
                [valueType]: event.target.value,
            }
        }
        this.setState({ mixedTable3: updatedInputs })
    }
    mixedTable4InputChangeHandler = (event, controlName, valueType) => {
        const updatedInputs = {
            ...this.state.mixedTable4,
            [controlName]: {
                ...this.state.mixedTable4[controlName],
                [valueType]: event.target.value,
            }
        }
        this.setState({ mixedTable4: updatedInputs })
    }
    womenDetailsChangeHandler = (event, controlName) => {
        const updatedInputs = {
            ...this.state.forWomen,
            [controlName]: {
                ...this.state.forWomen[controlName],
                value: event.target.value,
            }
        }
        this.setState({ forWomen: updatedInputs }); 
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const {  firebase, Uid } = this.props;
        this.setState({
            loading: true
        })
        const requestData = {};
        const inputData = {};
        const input3Data = {};
        const input4Data = {};
        const mixedTableData = {};
        const mixedTable2Data = {};
        const mixedTable3Data = {};
        const mixedTable4Data = {};
        const firstTableData = {};
        const tableData = {};
        const secondTableData = {};
        const table2Data = {};
        const textAreasData = {};
        const BtextAreasData = {};
        const CtextAreasData = {};
        const radiosData = {};
        const womenData = {};
        for (let formElementIdentifier in this.state.inputs) {
            requestData[formElementIdentifier] = {
                'value': this.state.inputs[formElementIdentifier].value,
                'label': this.state.inputs[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.inputs2) {
            inputData[formElementIdentifier] = {
                'value': this.state.inputs2[formElementIdentifier].value,
                'label': this.state.inputs2[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.inputs3) {
            input3Data[formElementIdentifier] = {
                'value': this.state.inputs3[formElementIdentifier].value,
                'label': this.state.inputs3[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.inputs4) {
            input4Data[formElementIdentifier] = {
                'value': this.state.inputs4[formElementIdentifier].value,
                'label': this.state.inputs4[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.firstTable) {
            firstTableData[formElementIdentifier] = {
                'value': this.state.firstTable[formElementIdentifier].value,
                'label': this.state.firstTable[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.table) {
            tableData[formElementIdentifier] = {
                'value': this.state.table[formElementIdentifier].value,
                'label': this.state.table[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.secondTable) {
            secondTableData[formElementIdentifier] = {
                'value': this.state.secondTable[formElementIdentifier].value,
                'label': this.state.secondTable[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.table2) {
            table2Data[formElementIdentifier] = {
                'value': this.state.table2[formElementIdentifier].value,
                'label': this.state.table2[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.textAreas) {
            textAreasData[formElementIdentifier] = {
                'value': this.state.textAreas[formElementIdentifier].value,
                'label': this.state.textAreas[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.BtextAreas) {
            BtextAreasData[formElementIdentifier] = {
                'value': this.state.BtextAreas[formElementIdentifier].value,
                'label': this.state.BtextAreas[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.CtextAreas) {
            CtextAreasData[formElementIdentifier] = {
                'value': this.state.CtextAreas[formElementIdentifier].value,
                'label': this.state.CtextAreas[formElementIdentifier].label
            }
        }
        for (let formElementIdentifier in this.state.radios) {
            radiosData[formElementIdentifier] = {
                'value': this.state.radios[formElementIdentifier].value,
                'label': this.state.radios[formElementIdentifier].label
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
                'Response 1': this.state.mixedTable2[formElementIdentifier].valueInput,
                'Response 2': this.state.mixedTable2[formElementIdentifier].valueText
            }
        }
        for (let formElementIdentifier in this.state.mixedTable3) {
            mixedTable3Data[formElementIdentifier] = {
                'label': this.state.mixedTable3[formElementIdentifier].title,
                'time': this.state.mixedTable3[formElementIdentifier].valueInput,
                'Food': this.state.mixedTable3[formElementIdentifier].valueText
            }
        }
        for (let formElementIdentifier in this.state.mixedTable4) {
            mixedTable4Data[formElementIdentifier] = {
                'label': this.state.mixedTable4[formElementIdentifier].title,
                'time': this.state.mixedTable4[formElementIdentifier].valueInput,
                'Food': this.state.mixedTable4[formElementIdentifier].valueText
            }
        }
        for (let formElementIdentifier in this.state.forWomen) {
            womenData[formElementIdentifier] = {
                'value': this.state.forWomen[formElementIdentifier].value,
                'label': this.state.forWomen[formElementIdentifier].label
            }
        }
        const request = {
            name:this.state.inputs.name.value,
            gender:this.state.inputs.gender.value,
            requestData: requestData,
            inputData: inputData,
            input3Data: input3Data,
            input4Data: input4Data,
            mixedData: mixedTableData,
            mixedTable2Data: mixedTable2Data,
            mixedTable3Data: mixedTable3Data,
            mixedTable4Data: mixedTable4Data,
            firstTableData: firstTableData,
            tableData: tableData,
            secondTableData: secondTableData,
            table2Data: table2Data,
            textAreasData: textAreasData,
            BtextAreasData: BtextAreasData,
            CtextAreasData: CtextAreasData,
            radiosData: radiosData,
            womenData: womenData,
            date: 'not set',
            patientId: Uid,
            doctorId: 'not set',
            type: 1
        }
        const request1= {
            inputs: requestData,
            inputs2: inputData,
            inputs3: input3Data,
            inputs4: input4Data,
            mixedTable: mixedTableData,
            mixedTable2: mixedTable2Data,
            mixedTable3: mixedTable3Data,
            mixedTable4: mixedTable4Data,
            firstTable: firstTableData,
            table: tableData,
            secondTable: secondTableData,
            table2: table2Data,
            textAreas: textAreasData,
            BtextAreas: BtextAreasData,
            CtextAreas: CtextAreasData,
            radios: radiosData,
            forWomen: womenData
        }
        if (Uid) {
            firebase.addActivity(Uid, request);
            setTimeout(() => {
                alert("Thank you for filling all the details. Our team will reach out to you to setup your appointment with our holistic wellness expert. In case of any query, please connect with us on 9999427097");
            }, 300);
            const ref=firebase.db.ref(`/users/${Uid}/patientData`);
            ref.update(request1);
            this.props.back();
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
            inputElement.config.label==='DOB:'?<div key={inputElement.id} >   
            <InputForm
                elementType={inputElement.config.elementType}
                elementConfig={inputElement.config.elementConfig}
                value={inputElement.config.value}
                 changed={(event) => this.inputChangeHandler(event, inputElement.id)}
                label={inputElement.config.label}
                Options={inputElement.config.Options}
                />
                <div style={{marginLeft:'25%'}}> 
                <DatePicker
                format ={'yyyy-MM-dd'}
                className={classes.DatePicker}
                monthPlaceholder ={'MM'}
                dayPlaceholder={'DD'}
                yearPlaceholder={'YYYY'}
                 onChange={date => 
                        this.inputDateChangeHandler(date)}
                date ={moment().format('yyyy-MM-dd')}
                 />
                 </div>
                </div>
            :<InputForm
            key={inputElement.id}
            elementType={inputElement.config.elementType}
            elementConfig={inputElement.config.elementConfig}
            value={inputElement.config.value}
            changed={(event) => this.inputChangeHandler(event, inputElement.id)}
            label={inputElement.config.label}
            Options={inputElement.config.Options}
            />
            
        ))
        const inputs2Array = [];
        for (let key in this.state.inputs2) {
            inputs2Array.push({
                id: key,
                config: this.state.inputs2[key]
            })
        }
        const input2 = inputs2Array.map(inputElement => (
            <InputForm
            key={inputElement.id}
            elementType={inputElement.config.elementType}
            elementConfig={inputElement.config.elementConfig}
            value={inputElement.config.value}
            changed={(event) => this.input2ChangeHandler(event, inputElement.id)}
            label={inputElement.config.label}
            Options={inputElement.config.Options}
            />
        ))
        const inputs3Array = [];
        for (let key in this.state.inputs3) {
            inputs3Array.push({
                id: key,
                config: this.state.inputs3[key]
            })
        }
        const input3 = inputs3Array.map(inputElement => (
            <InputForm
            key={inputElement.id}
            elementType={inputElement.config.elementType}
            elementConfig={inputElement.config.elementConfig}
            value={inputElement.config.value}
            changed={(event) => this.input3ChangeHandler(event, inputElement.id)}
            label={inputElement.config.label}
            Options={inputElement.config.Options}
            />
        ))
        const inputs4Array = [];
        for (let key in this.state.inputs4) {
            inputs4Array.push({
                id: key,
                config: this.state.inputs4[key]
            })
        }
        const input4 = inputs4Array.map(inputElement => (
            <InputForm
            key={inputElement.id}
            elementType={inputElement.config.elementType}
            elementConfig={inputElement.config.elementConfig}
            value={inputElement.config.value}
            changed={(event) => this.input4ChangeHandler(event, inputElement.id)}
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
        const BtextAreasArray = [];
        for (let key in this.state.BtextAreas) {
            BtextAreasArray.push({
                id: key,
                config: this.state.BtextAreas[key]
            })
        }
        const BtextArea = BtextAreasArray.map(inputElement => (
            <InputForm
                key={inputElement.id}
                elementType={inputElement.config.elementType}
                elementConfig={inputElement.config.elementConfig}
                value={inputElement.config.value}
                changed={(event) => this.BtextAreaChangeHandler(event, inputElement.id)}
                label={inputElement.config.label}
                Options={inputElement.config.Options}
            />
        ))
        const CtextAreasArray = [];
        for (let key in this.state.CtextAreas) {
            CtextAreasArray.push({
                id: key,
                config: this.state.CtextAreas[key]
            })
        }
        const CtextArea = CtextAreasArray.map(inputElement => (
            <InputForm
                key={inputElement.id}
                elementType={inputElement.config.elementType}
                elementConfig={inputElement.config.elementConfig}
                value={inputElement.config.value}
                changed={(event) => this.CtextAreaChangeHandler(event, inputElement.id)}
                label={inputElement.config.label}
                Options={inputElement.config.Options}
            />
        ))
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
        const Table_1_Array = "table"
        const tableInputsArray1 = [];
        for (let key in this.state[Table_1_Array]) {
            tableInputsArray1.push({
                id: key,
                config: this.state[Table_1_Array][key]
            })
        }
        const table_1 = tableInputsArray1.map(inputElement => (
            <InputTable
                key={inputElement.id}
                Options={inputElement.config}
                changed={(event) => this.tableInputChangeHandler(event, inputElement.id, Table_1_Array)}
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
        for (let key in this.state.mixedTable3) {
            mixedTable3InputsArray.push({
                id: key,
                config: this.state.mixedTable3[key]
            })
        }
        const mixedTable3 = mixedTable3InputsArray.map(inputElement => (
            <InputTable
                elementType={inputElement.config.elementType}
                key={inputElement.id}
                Options={inputElement.config}
                changed_input={(event) => this.mixedTable3InputChangeHandler(event, inputElement.id, "valueInput")}
                changed_text={(event) => this.mixedTable3InputChangeHandler(event, inputElement.id, "valueText")}
                value_input={inputElement.config.valueInput}
                value_text={inputElement.config.valueText}

            />
        ))
        const mixedTable4InputsArray = [];
        for (let key in this.state.mixedTable4) {
            mixedTable4InputsArray.push({
                id: key,
                config: this.state.mixedTable4[key]
            })
        }
        const mixedTable4 = mixedTable4InputsArray.map(inputElement => (
            <InputTable
                elementType={inputElement.config.elementType}
                key={inputElement.id}
                Options={inputElement.config}
                changed_input={(event) => this.mixedTable4InputChangeHandler(event, inputElement.id, "valueInput")}
                changed_text={(event) => this.mixedTable4InputChangeHandler(event, inputElement.id, "valueText")}
                value_input={inputElement.config.valueInput}
                value_text={inputElement.config.valueText}

            />
        ))
        const Table_b_Array = "secondTable"
        const tableInputsArrayb = [];
        for (let key in this.state[Table_b_Array]) {
            tableInputsArrayb.push({
                id: key,
                config: this.state[Table_b_Array][key]
            })
        }
        const table_b = tableInputsArrayb.map(inputElement => (
            <InputTable
                key={inputElement.id}
                Options={inputElement.config}
                changed={(event) => this.tableInputChangeHandler(event, inputElement.id, Table_b_Array)}
            />
        ))
        const Table_2_Array = "table2"
        const tableInputsArray2 = [];
        for (let key in this.state[Table_2_Array]) {
            tableInputsArray2.push({
                id: key,
                config: this.state[Table_2_Array][key]
            })
        }
        const table_2 = tableInputsArray2.map(inputElement => (
            <InputTable
                key={inputElement.id}
                Options={inputElement.config}
                changed={(event) => this.tableInputChangeHandler(event, inputElement.id, Table_2_Array)}
            />
        ))
        const RadioArray = [];
        for (let key in this.state.radios) {
            RadioArray.push({
                id: key,
                config: this.state.radios[key]
            })
        }
        const radio = RadioArray.map(inputElement => (
            <InputForm
                key={inputElement.id}
                elementType={inputElement.config.elementType}
                elementConfig={inputElement.config.elementConfig}
                value={inputElement.config.value}
                changed={(event) => this.RadioChangeHandler(event, inputElement.id)}
                name={inputElement.config.name}
                Radios={inputElement.config.Radios}
                label={inputElement.config.label}
            />
        ))
        const WomenDetailsArray = [];
        for (let key in this.state.forWomen) {
            WomenDetailsArray.push({
                id: key,
                config: this.state.forWomen[key]
            })
        }
        const Details = WomenDetailsArray.map(inputElement => (
            <InputForm
                key={inputElement.id}
                elementType={inputElement.config.elementType}
                elementConfig={inputElement.config.elementConfig}
                value={inputElement.config.value}
                changed={(event) => this.womenDetailsChangeHandler(event, inputElement.id)}
                label={inputElement.config.label}
                Radios={inputElement.config.Radios}
                Options={inputElement.config.Options}
                name={inputElement.config.name}
            />
        ))
        console.log(moment().format('y-MM-dd'));
        return (
            <Aux>
                <div className={classes.Container}>
                    <form onSubmit={(event) => this.handleSubmit(event)} className={classes.form}>
                        <p className={classes.Title}>Consultation Request Form</p>
                        <h3 style={{ marginTop: '50px' }}>Personal Details : </h3>
                        {input}
                        {CtextArea}
                        <h3 style={{ marginTop: '50px' }}>Health Details :</h3>
                        <div className={classes.Table}>
                            {table_a}
                        </div>
                        <h4 style={{ marginTop: '50px' }}>Inch Measurements(optional) :</h4>
                        <div className={classes.Table}>
                            {table_1}
                        </div>
                        <h4 style={{ marginTop: '50px'}}>Test Report Date:</h4>
                        <div className={classes.Table}>
                            {table_b}
                        </div>
                        <div className={classes.Table}>
                            {table_2}
                        </div>
                        <h4 style={{ marginTop: '50px'}}>Special Tests(If applicable):</h4>
                        <div className={classes.MixedTable}>
                            <InputTable
                                elementType={'mixed3'}
                                labelA={'Sr No.'}
                                labelB={'Test Name(Thyroid Profile, Uric Acid etc.)'}
                                labelC={'Value'}
                                labelD={'Normal Range'}
                            />
                            <div style={{marginTop:'-14px'}}>{mixedTable4}</div>
                            </div>
                        {textArea}
                        <h4 style={{ marginTop: '50px' }}>Diet History:</h4>
                        <div className={classes.MixedTable}>
                            <InputTable
                                elementType={'mixed'}
                                labelA={'Meal Type'}
                                labelB={'Time'}
                                labelC={'Food'}
                            />
                            <div style={{marginTop:'-14px'}}>{mixedTable}</div>
                        </div>
                        <h4 style={{ marginTop: '50px' }}>Personal History</h4>
                        <h5 style={{ marginTop: '50px' }}>Please Tick/fill correct responses:</h5>
                        <div>
                            {input3}
                        </div>
                        <div>
                            {input2}
                        </div>
                        <h4 style={{ marginTop: '50px' }}>Emotional History:</h4>
                        <p>
                        Over the last 2 weeks, how often have you experienced any of the following
                        symptoms?
                        </p>
                        {input4}
                        <h3 style={{ marginTop: '50px' }}>For Women Only</h3>
                        {Details}
                        <h3 style={{ marginTop: '50px' }}>Additional Details :</h3>
                        {BtextArea}
                        {radio}
                        <Buttonb btnType="Success" style={{ marginTop: '50px', width: '100%' }} >Submit</Buttonb>
                        <h4 style={{ marginTop: '50px' }}>Disclaimer:</h4>
                        <div>
                            <li className={classes.Disclaimer}>By providing all the above details in-person or through email to Ecolive,
                            you certify that all the information provided in
                                    this form is complete and correct.</li>
                            <li className={classes.Disclaimer}>Treatment will be planned on the basis of information provided in this form. Any missing or incorrect information in this form might lead to incomplete
                            assessment of health issues and incorrect recommendations.
                                    Ecolive will not be responsible in such cases.</li>
                            <li className={classes.Disclaimer}>Any changes in your existing medication should be done after consulting your current doctor
                                    (allopathy / homoeopathy / Ayurveda etc.)</li>
                            <li className={classes.Disclaimer}>The information provided by you, will be solely used for assessing your health and providing required recommendations and treatments.</li>
                            <li className={classes.Disclaimer}>EcoLive might use your profile data for data analysis, research or sharing the testimonials on
                                    our website/social media and sharing upcoming events/health knowledge</li>
                        </div>
                    </form>
                </div>
            </Aux>
        );
    }
}
export default withRouter(withFirebase(RequestApplication));

// <DatePicker 
//                 date ={inputElement.config.value?inputElement.config.value:moment().format('YYYY-MM-DD')}
//                 onSelect={date => {
//                     this.inputDateChangeHandler(date);
//                 }}
//                 />