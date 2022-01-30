import React,{Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import '../../Firebase';
import { withRouter } from 'react-router-dom';
import { authUserContext, withAuthentication } from '../../Session'
import classes from './Patient.module.css';
import NavIcon from '../../UI/NavIcon/NavIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faClipboard, faSearch } from '@fortawesome/free-solid-svg-icons';
import {faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import BookAppointment from '../../../Containers/BookAppointment/BookAppointment';
import Appointments from './Appointments';

class Patient extends Component{
    state={
        window : null
    }
    
    componentDidMount(){
        this.props.firebase.auth.onAuthStateChanged(
            authUser => {
              authUser
                ? console.log(authUser.uid)
                : console.log(null);
            },
          );

    }
    switchWindow(window){
        this.setState({
            window : window
        }
        )
    }
    backbuttonhandler = () => {
        this.setState({
            window: null,
        })
    }
    
    render(){
        let screen =    <div>
                        <img src={require('./ecolive-dispimg.jpg')} alt ={"ecolive"} className={classes.image} />
                        <div className ={classes.container}>
                        <div className ={classes.sub} onClick={this.switchWindow.bind(this,"Booknew")}>
                             <h3 style={{marginTop:'calc(1vh)'}}>New Consultation Request</h3>
                         </div>
                        <div className ={classes.sub} onClick={this.switchWindow.bind(this,"Manage")}>
                             <h3 style={{marginTop:'calc(2vh)'}}>Manage Appointments</h3>
                        </div>
                    </div>
                    </div>
        switch(this.state.window){
            case('Booknew'):
                screen = <div >
                            <FontAwesomeIcon onClick={() => this.backbuttonhandler()} className={classes.iconback} title={'back'} icon={faArrowLeft} color="black" />
                            <BookAppointment back={this.backbuttonhandler}/>
                         </div>
            break;
            case('Manage'):
                screen = <div>
                <div className={classes.Top}>
                <FontAwesomeIcon className= {classes.iconback1} onClick={() => this.backbuttonhandler()} title={'back'} icon={faArrowLeft} color="black" />
                <div className={classes.Search}>
                    <input placeholder="Search" className={classes.Input} />
                    <FontAwesomeIcon style={{ marginTop: '5px', marginLeft: '5px' }} icon={faSearch} />
                </div>
                <div className={classes.Navigators}>
                    <button className={classes.newButton} onClick={this.switchWindow.bind(this,"Booknew")} icon={faPlus} > New Appointment</button>
                </div>
                </div>             
                    <Appointments/>
                </div>
            break;
            default: screen =screen;
        }
        
    return(
        <Aux>
            {screen}
            
        </Aux>
    )
    }
};
export default withRouter(withAuthentication(Patient));