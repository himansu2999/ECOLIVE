import React,{Component} from 'react';
import ShowApplication from '../../../UI/Showwmf/Showwmf';
import classes from './Weeklyforms.module.css';
import ReactToPrint from 'react-to-print';
import Aux from '../../../../hoc/Auxiliary/Auxiliary'
import ShowHealth from '../../../UI/ShowForms/ShowHealth/ShowHealth';

class Weeklyforms extends Component {
    state={
        show: false,
        recom: null,
        first: false
    }
    showWeeklyForm(recom){
        this.setState({
            recom: recom,
            show: true,
            first:false
        })
    }
    showFirstForm(recom){
        this.setState({
            recom: recom,
            show: false,
            first: true
        })
    }
    render(){
    let list =[];
    if(this.props.weekly!=undefined){
    list = Object.keys(this.props.weekly).map(recom => {
           return( <button className= {classes.but} key={recom} 
            onClick={() => this.showWeeklyForm(this.props.weekly[recom])}>
            Recommendations on {this.props.weekly[recom].date} 
            </button>)
        })
    }
    if(this.props.firstForm!=undefined){
        list.push(<button className= {classes.but} key={"firstform"} 
            onClick={() => this.showFirstForm(this.props.firstForm)}>
            Your First Recommendation
            </button>
        )
    }

    let showform =null;
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
            <p className= {classes.head}>Weekly Recommendations </p>
            {list.length>=1?list : <h4 style={{textAlign: "center", marginTop:'20px'}}>No recomendations Recieved yet</h4>}
            <div className={classes.print}>
            <ReactToPrint
                 trigger={() => {
                 return <a className={classes.print}>Generate pdf!</a>;
                 }}
                 content={() => this.componentRef}/>
             </div>
            {showform}
        </div>
    )
    }
}
export default Weeklyforms;