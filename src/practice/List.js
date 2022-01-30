import React, {Component} from './node_modules/react';
import classes from './List.module.css'

class List extends Component{
    
    render(){
        let lst = this.props.listarray.map((item)=>(
            <div className={classes.ListItem}>
                    <div className={classes.li}>{item.first}</div>
                    <div className={classes.li}>{item.second}</div>
                    <div className={classes.li}>{item.third}</div>
            </div>
            ))
            
        return(
            <div>
            {lst}
            </div>
            )
    }
}
export default List;