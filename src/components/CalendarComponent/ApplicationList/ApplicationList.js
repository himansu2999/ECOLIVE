import React from 'react';
import classes from './ApplicationList.module.css';
import { withFirebase } from '../../Firebase';
function ApplicationList(props) {
    const {firebase, selectedDay, Uid, loading, activities } = props;
    /////////////////// Add activity
    const uid = Uid;

    selectedDay.year = new Date().getFullYear();
    let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

    const isValid = uid.toString() === 'false';
    // Add the activity to firebase via the API made in this app
    const handleSubmit = (reqId,patientId,activity) => {
        console.log(activity)
        if (Uid && queryDate) {
            firebase.addDoctorToApplication(reqId, uid, queryDate,patientId,activity);
            //firebase.removeUnassignedApplication(reqId, uid, queryDate,patientId);
            firebase.addApplicationToDoctor(reqId, uid, queryDate,activity);
            console.log("done")
        }
    }
        const reqArray = activities ? Object.keys(activities) : [];
    return (
        <div>
            {loading ? <h4 style={{ marginLeft: '30px' }}>Loading</h4> : <div>
                {activities === 'not set' || activities === null ? <p style={{ marginLeft: '30px' }}>No activities added yet.</p>
                    :
                    <div className={classes.Container}>
                        <div className={classes.Table}>
                            <div className={classes.Head}>
                                <div className={classes.HeadRow}>
                                    <div className={classes.TableCell}>Name</div>
                                    <div className={classes.TableCell}>Type</div>
                                    <div className={classes.TableCell}>Actions</div>
                                </div>
                            </div>
                            <div className={classes.Body}>
                                {
                                    Object.values(activities).map((activity, i) => {
                                        let { name, type, patientId } = activity;
                                        const reqId = reqArray[i];
                                        let Showtype = null;
                                        switch (type) {
                                            case 1:
                                                Showtype = "Lifting weights";
                                                break;
                                            case 2:
                                                Showtype = "Running";
                                                break;
                                            case 3:
                                                Showtype = "Cycling";
                                                break;
                                            default:
                                                Showtype = "Not set";
                                        };
                                        return (
                                            <div className={classes.TableRow} key={i}>
                                                <div className={classes.TableCell}>{name}</div>
                                                <div className={classes.TableCell}>{Showtype}</div>
                                                <div className={classes.TableCell}>
                                                    {!isValid ? <div className={classes.DelIcon}
                                                        onClick={() => handleSubmit(reqId,patientId,activity)}
                                                        style={{ marginLeft: "20px" }}
                                                    >Assign</div> :
                                                        <div className={classes.DelIcon}
                                                            style={{ marginLeft: "20px" }}
                                                        >Assign</div>}
                                                </div>
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
export default withFirebase(ApplicationList);