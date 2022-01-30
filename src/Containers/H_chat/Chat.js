import React, { Component } from 'react';
import classes from './Chat.module.css';
//import Toolbarb from '../../components/Navigation/Toolbarb/Toolbarb';
import Aux from '../../hoc/Auxiliary/Auxiliary';
class Chat extends Component {
    state = {
        authorized: true
    }
    render() {
        return (
            <Aux>
                <div className={classes.Chat}>Chat Here</div>
            </Aux>
        )
    }
}
export default Chat;