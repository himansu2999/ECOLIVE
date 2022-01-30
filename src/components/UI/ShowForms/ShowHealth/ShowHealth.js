import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import classes from './ShowHealth.module.css';
import ShowForm from '../../ShowForm/ShowForm';
class ShowHealth extends Component {
    state = {
        reqData: {},
        isDataPresent: false,
        mixHead: {
            Food: "Food",
            label: "Meal Type",
            time: "Time"
        },
        mixHead2: {
            Food: "Rounds/Frequency",
            label: "S No.",
            time: "Name"
        },
        mixHead3: {
            Food: "Therapy",
            label: "S No.",
            time: "Duration/Frequency"
        }
    }
    componentDidMount() {
        const mixData = { ...this.props.mixData }
        const mixData2 = { ...this.props.mixData2 }
        const mixData3 = { ...this.props.mixData3 }
        const firstTableData = { ...this.props.firstTableData }
        const textAreasData = { ...this.props.textAreasData }
        const textAreas2Data = { ...this.props.textAreas2Data }
        const textAreas3Data = { ...this.props.textAreas3Data }
        const textAreas4Data = { ...this.props.textAreas4Data }
        const reqData = { ...this.props.reqData }
        this.setState({
            reqData: reqData,
            mixData: mixData,
            mixData2: mixData2,
            mixData3: mixData3,
            firstTableData: firstTableData,
            textAreasData: textAreasData,
            textAreas2Data: textAreas2Data,
            textAreas3Data: textAreas3Data,
            textAreas4Data: textAreas4Data,
            isDataPresent: true
        })
    }
    render() {
        const ReqArray = [];
        const firstTableArray = [];
        const textAreasArray = [];
        const textAreas2Array = [];
        const textAreas3Array = [];
        const textAreas4Array = [];
        const mixedArray = [];
        const mixedArray2 = [];
        const mixedArray3 = [];
        for (let key in this.state.reqData) {
            ReqArray.push({
                id: key,
                config: this.state.reqData[key]
            })
        }
        for (let key in this.state.firstTableData) {
            firstTableArray.push({
                id: key,
                config: this.state.firstTableData[key]
            })
        }
        for (let key in this.state.mixData) {
            mixedArray.push({
                id: key,
                config: this.state.mixData[key]
            })
        }
        for (let key in this.state.mixData2) {
            mixedArray2.push({
                id: key,
                config: this.state.mixData2[key]
            })
        }
        for (let key in this.state.mixData3) {
            mixedArray3.push({
                id: key,
                config: this.state.mixData3[key]
            })
        }
        for (let key in this.state.textAreasData) {
            textAreasArray.push({
                id: key,
                config: this.state.textAreasData[key]
            })
        }
        for (let key in this.state.textAreas2Data) {
            textAreas2Array.push({
                id: key,
                config: this.state.textAreas2Data[key]
            })
        }
        for (let key in this.state.textAreas3Data) {
            textAreas3Array.push({
                id: key,
                config: this.state.textAreas3Data[key]
            })
        }
        for (let key in this.state.textAreas4Data) {
            textAreas4Array.push({
                id: key,
                config: this.state.textAreas4Data[key]
            })
        }
        let request = null;
        let text2Area = null;
        let text3Area = null;
        let text4Area = null;
        let textArea = null;
        let firstTable = null;
        let mix = null;
        let mix2 = null;
        let mix3 = null;
        if (this.state.isDataPresent) {
            request = ReqArray.map(dataElement => (
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
            textArea = textAreasArray.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'textArea'} />
            ))
        }
        if (this.state.isDataPresent) {
            text2Area = textAreas2Array.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'textArea'} />
            ))
        }
        if (this.state.isDataPresent) {
            text3Area = textAreas3Array.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'textArea'} />
            ))
        }
        if (this.state.isDataPresent) {
            text4Area = textAreas4Array.map(dataElement => (
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
            mix2 = mixedArray2.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'mixedTable'} />
            ))
        }
        if (this.state.isDataPresent) {
            mix3 = mixedArray3.map(dataElement => (
                <ShowForm key={dataElement.id}
                    QuestionBox={dataElement.config} Detail={'mixedTable'} />
            ))
        }
        return (
            <Aux>
                <div className={classes.Container}>
                    <form className={classes.form}>
                        <p className={classes.Title}>Holistic Health Recommendation Form</p>
                        <h3 style={{ marginTop: '50px' }}>Personal Details : </h3>
                        {request}
                        <h3 style={{ marginTop: '50px' }}>Inch Measurements :</h3>
                        <div className={classes.TableMaker}>
                            {firstTable}
                        </div>
                        {textArea}
                        <h4 style={{ marginTop: '50px' }}>DIET RECOMMENDATIONS:</h4>
                        <div className={classes.Mixed}>
                            <ShowForm
                                QuestionBox={this.state.mixHead}
                                Detail={'mixedTable'} />
                            {mix}
                        </div>
                        {text2Area}
                        <h5 style={{ marginTop: '50px'}}>YOGASANA/PRANAYAM/KRIYA RECOMMENDATIONS</h5>
                        <div className={classes.Mixed}>
                            <ShowForm
                                QuestionBox={this.state.mixHead2}
                                Detail={'mixedTable'} />
                            {mix2}
                        </div>
                        {text3Area}
                        <h4 style={{ marginTop: '50px'}}>THERAPY RECOMMENDATIONS</h4>
                        <div className={classes.Mixed}>
                            <ShowForm
                                QuestionBox={this.state.mixHead3}
                                Detail={'mixedTable'} />
                            {mix3}
                        </div>
                        {text4Area}
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
                    </form>
                </div>
            </Aux>
        );
    }
}
export default ShowHealth;