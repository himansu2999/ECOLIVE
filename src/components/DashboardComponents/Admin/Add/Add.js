import React from 'react';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';
import AddForm from '../../../Forms/AddForm/AddForm';
import classes from './Add.module.css';
const addrole = props=>{
    return(
        <Aux>
            <div className={classes.Container}>
                <AddForm />
            </div>
        </Aux>
    )
};
export default addrole;