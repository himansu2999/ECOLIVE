import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './ShowApplication.module.css';
import ShowForm from '../ShowForm/ShowForm';
class ShowApplication extends Component {
    state = {
        reqData: {},
        isDataPresent: false,
        mixHead: {
            Food: "Food",
            label: "Meal Type",
            time: "Time"
        },
        mixHead2: {
            Food: "Test Name(Thyroid profile, Uric acid etc.)",
            label: "Sr No.",
            time: "Value",
            more: "Normal Range"
        }
    }
    componentDidMount() {
        const inputData = { ...this.props.inputData }
        const input3Data = { ...this.props.input3Data }
        const input4Data = { ...this.props.input4Data }
        const mixData = { ...this.props.mixData }
        const mixedTable2Data = { ...this.props.mixedTable2Data }
        const mixedTable3Data = { ...this.props.mixedTable3Data }
        const mixedTable4Data = { ...this.props.mixedTable4Data }
        const radioData = { ...this.props.radioData }
        const firstTableData = { ...this.props.firstTableData }
        const tableData = { ...this.props.tableData }
        const secondTableData = { ...this.props.secondTableData }
        const table2Data = { ...this.props.table2Data }
        const textAreasData = { ...this.props.textAreasData }
        const CtextAreasData = { ...this.props.CtextAreasData }
        const BtextAreasData = { ...this.props.BtextAreasData }
        const reqData = { ...this.props.reqData }
        const womenData = { ...this.props.womenData }
        this.setState({
            reqData: reqData,
            inputData: inputData,
            input3Data: input3Data,
            input4Data: input4Data,
            mixData: mixData,
            mixedTable2Data: mixedTable2Data,
            mixedTable3Data: mixedTable3Data,
            mixedTable4Data: mixedTable4Data,
            radioData: radioData,
            firstTableData: firstTableData,
            tableData: tableData,
            secondTableData: secondTableData,
            table2Data: table2Data,
            textAreasData: textAreasData,
            CtextAreasData: CtextAreasData,
            BtextAreasData: BtextAreasData,
            womenData: womenData,
            isDataPresent: true
        })
    }
    render() {
        const ReqArray = [];
        const inputArray = [];
        const input3Array = [];
        const input4Array = [];
        const firstTableArray = [];
        const tableArray = [];
        const seconTableArray = [];
        const table2Array = [];
        const textAreasArray = [];
        const CtextAreasArray = [];
        const BtextAreasArray = [];
        const radioArray = [];
        const mixedArray = [];
        const mixed2Array = [];
        const mixed3Array = [];
        const mixed4Array = [];
        const womenArray = [];
        for (let key in this.state.reqData) {
            ReqArray.push({
                id: key,
                config: this.state.reqData[key]
            })
        }
        for (let key in this.state.inputData) {
            inputArray.push({
                id: key,
                config: this.state.inputData[key]
            })
        }
        for (let key in this.state.input3Data) {
            input3Array.push({
                id: key,
                config: this.state.input3Data[key]
            })
        }
        for (let key in this.state.input4Data) {
            input4Array.push({
                id: key,
                config: this.state.input4Data[key]
            })
        }
        for (let key in this.state.firstTableData) {
            firstTableArray.push({
                id: key,
                config: this.state.firstTableData[key]
            })
        }
        for (let key in this.state.tableData) {
            tableArray.push({
                id: key,
                config: this.state.tableData[key]
            })
        }
        for (let key in this.state.secondTableData) {
            seconTableArray.push({
                id: key,
                config: this.state.secondTableData[key]
            })
        }
        for (let key in this.state.table2Data) {
            table2Array.push({
                id: key,
                config: this.state.table2Data[key]
            })
        }
        for (let key in this.state.mixData) {
            mixedArray.push({
                id: key,
                config: this.state.mixData[key]
            })
        }
        for (let key in this.state.mixedTable2Data) {
            mixed2Array.push({
                id: key,
                config: this.state.mixedTable2Data[key]
            })
        }
        for (let key in this.state.mixedTable3Data) {
            mixed3Array.push({
                id: key,
                config: this.state.mixedTable3Data[key]
            })
        }
        for (let key in this.state.mixedTable4Data) {
            mixed4Array.push({
                id: key,
                config: this.state.mixedTable4Data[key]
            })
        }
        for (let key in this.state.textAreasData) {
            textAreasArray.push({
                id: key,
                config: this.state.textAreasData[key]
            })
        }
        for (let key in this.state.CtextAreasData) {
            CtextAreasArray.push({
                id: key,
                config: this.state.CtextAreasData[key]
            })
        }
        for (let key in this.state.BtextAreasData) {
            BtextAreasArray.push({
                id: key,
                config: this.state.BtextAreasData[key]
            })
        }
        for (let key in this.state.radioData) {
            radioArray.push({
                id: key,
                config: this.state.radioData[key]
            })
        }
        for (let key in this.state.womenData) {
            womenArray.push({
                id: key,
                config: this.state.womenData[key]
            })
        }
        let request = null;
        let input = null;
        let input3 = null;
        let input4 = null;
        let BtextArea = null;
        let textArea = null;
        let CtextArea = null;
        let firstTable = null;
        let table = null;
        let secondTable = null;
        let table2 = null;
        let radio = null;
        let mix = null;
        let mix2 = null;
        let mix3 = null;
        let mix4 = null;
        let women = null;
        if (this.state.isDataPresent) {
            request = ReqArray.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} />
            ))
        }
        if (this.state.isDataPresent) {
            input = inputArray.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} />
            ))
        }
        if (this.state.isDataPresent) {
            input3= input3Array.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} />
            ))
        }
        if (this.state.isDataPresent) {
            input4 = input4Array.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} />
            ))
        }
        if (this.state.isDataPresent) {
            firstTable = firstTableArray.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'table'} />
            ))
        }
        if (this.state.isDataPresent) {
            table = tableArray.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'table'} />
            ))
        }
        if (this.state.isDataPresent) {
            secondTable = seconTableArray.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'table'} />
            ))
        }
        if (this.state.isDataPresent) {
            table2 = table2Array.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'table'} />
            ))
        }
        if (this.state.isDataPresent) {
            textArea = textAreasArray.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'textArea'} />
            ))
        }
        if (this.state.isDataPresent) {
            BtextArea = BtextAreasArray.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'textArea'} />
            ))
        }
        if (this.state.isDataPresent) {
            CtextArea = CtextAreasArray.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'textArea'} />
            ))
        }
        if (this.state.isDataPresent) {
            radio = radioArray.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'textArea'} />
            ))
        }
        if (this.state.isDataPresent) {
            women = womenArray.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'textArea'} />
            ))
        }
        if (this.state.isDataPresent) {
            mix = mixedArray.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'mixedTable'} />
            ))
        }
        if (this.state.isDataPresent) {
            mix2 = mixed2Array.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'mixedTable'} />
            ))
        }
        if (this.state.isDataPresent) {
            mix3 = mixed3Array.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'mixedTable'} />
            ))
        }
        if (this.state.isDataPresent) {
            mix4 = mixed4Array.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'mixedTable2'} />
            ))
        }
        return (
            <Aux>
                <div className={classes.Container}>
                    <form className={classes.form}>
                        <p className={classes.Title}>Consultation Request Form</p>
                        <h3 style={{ marginTop: '50px' }}>Personal Details : </h3>
                        {request}
                        {CtextArea}
                        <h3 style={{ marginTop: '50px' }}>Health Details :</h3>
                        <div className={classes.TableMaker}>
                            {firstTable}
                        </div>
                        <h3 style={{ marginTop: '50px' }}>Inch Measurements(optional) :</h3>
                        <div className={classes.TableMaker}>
                            {table}
                        </div>
                        <h3 style={{ marginTop: '50px' }}>Test Report Date:</h3>
                        <div className={classes.TableMaker}>
                            {secondTable}
                        </div>
                        <div className={classes.TableMaker}>
                            {table2}
                        </div>
                        <h4 style={{ marginTop: '50px'}}>Special Tests(If applicable):</h4>
                        <div className={classes.Mixed}>
                            <ShowForm
                                QuestionBox={this.state.mixHead2}
                                Detail={'mixedTable2'} />
                            {mix4}
                        </div>
                        {textArea}
                        <h3 style={{ marginTop: '50px' }}>Current Diet :</h3>
                        <div className={classes.Mixed}>
                            <ShowForm
                                QuestionBox={this.state.mixHead}
                                Detail={'mixedTable'} />
                            {mix}
                        </div>
                        <h4 style={{ marginTop: '50px' }}>Personal History</h4>
                        <h5 style={{ marginTop: '50px' }}>Ticked/Filled responses:</h5>
                        <div>
                            {input3}
                        </div>
                        <div>
                            {input}
                        </div>
                        <h4 style={{ marginTop: '50px' }}>Emotional History:</h4>
                        <p>
                        Over the last 2 weeks, how often have you experienced any of the following
                        symptoms?
                        </p>
                        {input4}
                        <h3 style={{ marginTop: '50px' }}>For Women Only :</h3>
                        {women}
                        <h3 style={{ marginTop: '50px' }}>Additional Details :</h3>
                        {BtextArea}
                        {radio}
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
export default ShowApplication;