import React, { Component } from 'react';
import classes from './Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
class Modal extends Component{
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !==this.props.show || nextProps.children!==this.props.children;
    }
    render(){
    return(
        <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed} Bcolor="rgb(179, 229, 238)"/>
    <div className={classes.Modal} 
    style={{
        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: this.props.show ? '1' : '0',...this.props.style
         }}>
               <FontAwesomeIcon className={classes.faCircle} onClick={this.props.clicked} icon={faTimesCircle} size="2x" />
             {this.props.children}
    </div>
    </Aux>)
}};
export default Modal;