import React, {Component} from 'react';
import  {DropdownButton,Dropdown} from 'react-bootstrap';
import classes from './FAQ.module.css';

class FAQ extends Component{
    render(){
        return(
            <div>
                <div >
                <DropdownButton className={classes.Dropdown}  title="This is a frequently asked question">
                <Dropdown.Item >Here is the answer of the above FAQ</Dropdown.Item>
                </DropdownButton>
                </div>
                <div >
                <DropdownButton className={classes.Dropdown}  title="This is a another frequently asked question">
                <Dropdown.Item >Here is the answer of the above FAQ</Dropdown.Item>
                </DropdownButton>
                </div>
            </div>
        )
    }
}
export default FAQ;