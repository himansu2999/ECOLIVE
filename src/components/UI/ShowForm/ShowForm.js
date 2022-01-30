import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './ShowForm.module.css';
const ShowForm = props => {
    let outputElement = null;
    if(props.Detail === 'mixedTable'){
        console.log(props.QuestionBox)
    }
    switch (props.Detail) {
        case ('table'):
            outputElement = (
                <Aux>
                    <div className={classes.QuestionTable}>
                        <div className={classes.TableHead}>{props.QuestionBox.label}</div>
                        <div className={classes.TableBody}>{props.QuestionBox.value}</div>
                    </div>
                </Aux>
            )
            break;
        case ('textArea'):
            outputElement = (
                <Aux>
                    <div className={classes.QuestionArea}>
                        <div className={classes.Head}>{props.QuestionBox.label}</div>
                        <div className={classes.AreaBody}>{props.QuestionBox.value}</div>
                    </div>
                </Aux>
            )
            break;
        case ('mixedTable'):
            outputElement = (
                <Aux>
                    <div className={classes.QuestionMix}>
                        <div className={classes.HeadMix}>{props.QuestionBox.label}</div>
                        <div className={classes.AreaMix}>{props.QuestionBox.Food}</div>
                        <div className={classes.AreaMix}>{props.QuestionBox.time}</div>
                    </div>
                </Aux>
            );
            break;
        case ('mixedTable2'):
              outputElement = (
                  <Aux>
                      <div className={classes.QuestionMix}>
                          <div className={classes.HeadMix}>{props.QuestionBox.label}</div>
                          <div className={classes.AreaMix}>{props.QuestionBox.Food}</div>
                          <div className={classes.AreaMix}>{props.QuestionBox.time}</div>
                          <div className={classes.AreaMix}>{props.QuestionBox.more}</div>
                      </div>
                  </Aux>
              );
              break;    
        default:
            outputElement = (
                <Aux>
                    <div className={classes.QuestionBox}>
                        <p className={classes.Head}>{props.QuestionBox.label}</p>
                        <p className={classes.Body}>{props.QuestionBox.value}</p>
                    </div>
                </Aux>
            )
    }
    return (
        <Aux>
            {outputElement}
        </Aux>
    )
};
export default ShowForm;