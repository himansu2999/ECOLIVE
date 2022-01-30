import React from 'react';
import classes from './Activity.module.css';
import { withFirebase } from '../../Firebase';
function ActivityList(props) {
    const { Uid, loading, activities, editActivity, setOpenSnackbar, setSnackbarMsg } = props;
    const deleteActivity = (i) => {
        // Get key of activity in firebase
        const activityKey = Object.keys(activities)[i];
        // Connect to our firebase API
        const emptyActivity = {
            date: null,
            type: null,
            name: null,
        };
        props.firebase.updateActivity(Uid, emptyActivity, activityKey);

        // Show notification
        setOpenSnackbar(true);
        setSnackbarMsg('Deleted activity');
        setTimeout(() => {
            setOpenSnackbar(false)
        }, 300)
    }
    return (
        <div>
            {loading ? <h4 style={{ marginLeft: '30px' }}>Loading</h4> : <div>
                {props.docName===null? Uid?activities === 'not set' || activities === null ? <p style={{ marginLeft: '30px' }}> No activities on this day.</p>
                :
                <div className={classes.Container}>
                    <div className={classes.Table}>
                        <div className={classes.Head}>
                            <div className={classes.HeadRow}>
                                <div className={classes.TableCell}>Name</div>
                                <div className={classes.TableCell}>Time Slot</div>
                                <div className={classes.TableCell}>Doctor</div>
                            </div>
                        </div>
                        <div className={classes.Body}>
                            {

                                Object.values(activities).map((activity, i) => {
                                    let { name, timeslot, docName } = activity;
                                    
                                    return (
                                        <div className={classes.TableRow} key={i}>
                                            <div className={classes.TableCell}>{name.slice(0,20)}</div>
                                            <div className={classes.TableCell}>{timeslot}</div>
                                            <div className={classes.TableCell}>{docName}</div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                    
                    :<p style={{ marginLeft: '30px' }}>No Doctor selected</p> 
                : activities === 'not set' || activities === null ? <p style={{ marginLeft: '30px' }}>{props.docName} has no activities on this day.</p>
                    :
                    <div className={classes.Container}>
                        <div className={classes.Table}>
                            <div className={classes.Head}>
                                <div className={classes.HeadRow}>
                                    <div className={classes.TableCell}>Name</div>
                                    <div className={classes.TableCell}>Time Slot</div>
                                    <div className={classes.TableCell}>Doctor</div>
                                </div>
                            </div>
                            <div className={classes.Body}>
                                {

                                    Object.values(activities).map((activity, i) => {
                                        let { name, timeslot, docName } = activity;
                                        
                                        return (
                                            <div className={classes.TableRow} key={i}>
                                                <div className={classes.TableCell}>{name.slice(0,20)}</div>
                                                <div className={classes.TableCell}>{timeslot}</div>
                                                <div className={classes.TableCell}>{docName}</div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>}</div>}

        </div>
    )
};
export default withFirebase(ActivityList);