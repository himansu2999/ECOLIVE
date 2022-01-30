import React,{Component} from 'react';
import ShowApplication from '../../../../UI/Showwmf/Showwmf';
import Wmf from '../../../../Forms/WeeklyMonitoringForm/Wmf';
import ShowHealth from '../../../../UI/ShowForms/ShowHealth/ShowHealth';
import classes from './Weeklyforms.module.css';
import ReactToPrint from 'react-to-print';
import Aux from '../../../../../hoc/Auxiliary/Auxiliary'

class Weeklyforms extends Component {
    state={
        new: false,
        show: false,
        first: false,
        recom: null
    }
    componentDidMount(){
        this.setState()
    }
    showWeeklyForm(recom){
        this.setState({
            recom: recom,
            show: true,
            first: false,
            new : false
        })
    }
    showFirstForm(recom){
        this.setState({
            recom: recom,
            show: false,
            new: false,
            first: true
        })
    }
    newForm(patientId, requestId, patientName){
        this.setState({
            patientId:patientId, 
            requestId: requestId,
            patientName: patientName,
            new : true,
            show: false,
            first:false
        })
    }
    render(){
    let list =null;
    if(this.props.weekly!=null){
    list = Object.keys(this.props.weekly).map(recom => {
           return( <button className= {classes.but} key={recom} 
            onClick={() => this.showWeeklyForm(this.props.weekly[recom])}>
            Recommendations sent on {this.props.weekly[recom].date}
            </button>)
        }
    )}
    if(this.props.firstForm){
        list.push(<button className= {classes.but} key={"firstform"} 
            onClick={() => this.showFirstForm(this.props.firstForm)}>
            First Recommendation for Patient
            </button>
        )
    }

    let showform =null;
    let newform = null;
    if(this.state.show){
        const firstTableData = this.state.recom.firstTableData;
        const textAreasData = this.state.recom.textAreasData;
        const reqData = this.state.recom.requestData;
        console.log(this.state.recom)
        showform = <ShowApplication ref={el => (this.componentRef = el)}
                                     firstTableData={firstTableData}
                                    textAreasData= {textAreasData}
                                    requestData= {reqData}
        />
    }
    if(this.state.new){
        newform = <Wmf ref={el => (this.componentRef = el)}
        requestId={this.state.requestId}
        patientId={this.state.patientId}
        patientName ={this.state.patientName}
         />
    }
    if(this.state.first){
        const mixData = this.state.recom.mixedData 
        const mixData2 = this.state.recom.mixedData2 
        const mixData3 = this.state.recom.mixedData3 
        const firstTableData = this.state.recom.firstTableData 
        const textAreasData = this.state.recom.textAreasData 
        const textAreas2Data = this.state.recom.textAreas2Data 
        const textAreas3Data = this.state.recom.textAreas3Data 
        const textAreas4Data = this.state.recom.textAreas4Data 
        const reqData = this.state.recom.requestData 
        console.log(this.state.recom)
        showform = <ShowHealth ref={el => (this.componentRef = el)}
                                    firstTableData={firstTableData}
                                    textAreasData= {textAreasData}
                                    reqData= {reqData}
                                    mixData={mixData}
                                    mixData2={mixData2}
                                    mixData3={mixData3}
                                    textAreas2Data={textAreas2Data}
                                    textAreas3Data={textAreas3Data}
                                    textAreas4Data={textAreas4Data}
        />
    } 

    return(
        
        <div className ={classes.container}>
        <h5> Patient Name: {this.props.patientName}</h5>
            
            <button className= {classes.but} 
            onClick={() => this.newForm(this.props.patientId, this.props.requestId,this.props.patientName)}>
            Generate New Recommendations for patient
            </button>
            {list}
            <div className={classes.print}>
            <ReactToPrint
                 trigger={() => {
                 return <a className={classes.print}>Generate pdf!</a>;
                 }}
                 content={() => this.componentRef}/>
             </div>
            {newform}
            {showform}
        </div>
    )
    showform =null;
    newform = null;
    }
}
export default Weeklyforms;