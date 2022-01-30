import React from 'react';
import classes from './InputTable.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
const inputTable = (props) => {
    let inputElement = null;
    switch (props.elementType) {
        case ('mixed'):
            inputElement = (
                <Aux>
                    <div className={classes.TableBoxMixed}>
            {props.labelA ? <p className={classes.LabelA}>{props.labelA}</p> : <div className={classes.TableHeadMixed}>{props.Options.title}</div>}
                        {props.labelB ? <p className={classes.LabelB}>{props.labelB}</p>:<input type="input" onChange={props.changed_input}
                            className={classes.Tablebody_A}
                            value={props.labelB ? props.labelB : props.value_input} />}
                        {props.labelC ?<p className={classes.LabelC}>{props.labelC}</p> :<input type="textarea" onChange={props.changed_text}
                            className={classes.Tablebody_B}
                            value={props.labelC ? props.labelC : props.value_text} />}
                    </div>
                </Aux>);
            break;
        case ('mixed2'):
            inputElement = (
                <Aux>
                    <div className={classes.TableBoxMixed}>
            {props.labelA ? <p className={classes.LabelA1}>{props.labelA}</p> : <div className={classes.TableHeadMixed1}>{props.Options.title}</div>}
                        {props.labelB ? <p className={classes.LabelB1}>{props.labelB}</p>:<input type="input" onChange={props.changed_input}
                            className={classes.Tablebody_A1}
                            value={props.labelB ? props.labelB : props.value_input} />}
                        {props.labelC ?<p className={classes.LabelC1}>{props.labelC}</p> :<input type="textarea" onChange={props.changed_text}
                            className={classes.Tablebody_B1}
                            value={props.labelC ? props.labelC : props.value_text} />}
                    </div>
                </Aux>);
            break;
            case ('mixed3'):
            inputElement = (
                <Aux>
                    <div className={classes.TableBoxMixed}>
            {props.labelA ? <p className={classes.LabelA2}>{props.labelA}</p> : <div className={classes.TableHeadMixed2}>{props.Options.title}</div>}
                        {props.labelB ? <p className={classes.LabelB2}>{props.labelB}</p>:<input type="input" onChange={props.changed_input}
                            className={classes.Tablebody_A2}
                            value={props.labelB ? props.labelB : props.value_input} />}
                        {props.labelC ?<p className={classes.LabelC2}>{props.labelC}</p> :<input type="textarea" onChange={props.changed_text}
                            className={classes.Tablebody_B2}
                            value={props.labelC ? props.labelC : props.value_text} />}
                        {props.labelD ?<p className={classes.LabelD}>{props.labelD}</p> :<input type="textarea" onChange={props.changed_text1}
                            className={classes.Tablebody_D}
                            value={props.labelD ? props.labelD : props.value_text1} />}    
                    </div>
                </Aux>);
            break;
        default:
            inputElement = (
                <Aux>
                    <div className={classes.TableBox}>
                        <div className={classes.TableHead}>{props.Options.label}</div>
                        <input onChange={props.changed}
                            className={classes.Tablebody}
                            value={props.Options.value} />
                    </div>
                </Aux>
            )
            break;
    }
    return (
        <Aux>
            <div className={classes.Container}>
                {inputElement}
            </div>
        </Aux>
    );
};
export default inputTable;