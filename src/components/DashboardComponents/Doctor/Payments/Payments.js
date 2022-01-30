import React, { Component } from 'react';
import classes from './Payments.module.css';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
class Payments extends Component {
   render() {
        return (
            <Aux>
                <div className={classes.Chat}>Payments Here</div>
            </Aux>
        )
    }
}
export default Payments;