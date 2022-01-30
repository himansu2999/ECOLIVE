import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import classes from './ShowWeekly.module.css';
import ShowForm from '../../ShowForm/ShowForm';
class ShowWeekly extends Component {
    state = {
        reqData: {},
        isDataPresent: false
    }
    componentDidMount() {
        const firstTableData = { ...this.props.firstTableData }
        const textAreasData = { ...this.props.textAreasData }
        const reqData = { ...this.props.reqData }
        this.setState({
            reqData: reqData,
            firstTableData: firstTableData,
            textAreasData: textAreasData,
            isDataPresent: true
        })
    }
    render() {
        const ReqArray = [];
        const firstTableArray = [];
        const textAreasArray = [];
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
        for (let key in this.state.textAreasData) {
            textAreasArray.push({
                id: key,
                config: this.state.textAreasData[key]
            })
        }
        let request = null;
        let textArea = null;
        let firstTable = null;
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
        return (
            <Aux>
                <div className={classes.Container}>
                    <form className={classes.form}>
                        <p className={classes.Title}>Weekly Monitoring Form</p>
                        <h3 style={{ marginTop: '50px' }}>Personal Details : </h3>
                        {request}
                        <h3 style={{ marginTop: '50px' }}>Health Details :</h3>
                        <div className={classes.TableMaker}>
                            {firstTable}
                        </div>
                        {textArea}
                    </form>
                </div>
            </Aux>
        );
    }
}
export default ShowWeekly;