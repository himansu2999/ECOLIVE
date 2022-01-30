import React from 'react';
import classes from './TableCell.module.css';
function TableCell(props){
    return(
        <div className={classes.TableCell} onClick={props.onClick}>
            {this.props.children}
        </div>
    )
};
export default TableCell;