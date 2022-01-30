import React, { useState } from 'react';
import './AddActivity.module.css';
import classes from './AddActivity.module.css';
function AddActivity(props) {
    const { authUser, firebase, setOpenSnackbar, setSnackbarMsg, Uid } = props;

    const defaultActivity = {
        name: '',
        type: 1,
        date: "not set"
    };
    const [activity, setActivity] = useState(defaultActivity);
    const handleChange = e => {
        const { name, value } = e.target;
        setActivity({
            ...activity,
            date: "not set",
            [name]: value,
            patientId: Uid,
            doctorId: "Not Assigned"
        });
    };
    const isValid = activity.name === '';
    // Add the activity to firebase via the API made in this app
    const handleSubmit = () => {
        if (authUser && Uid) {
            firebase.addActivity(Uid,activity);
            setActivity(defaultActivity);
            // Show notification
            setOpenSnackbar(true);
            setSnackbarMsg('Added activity');
            setTimeout(() => {
                setOpenSnackbar(false)
            }, 300)
        }
    }
    return (
        <form onSubmit={e => e.preventDefault()}>
            <div className={classes.Add}>
                <input type="text"
                    style={{ marginTop: '5px' }}
                    value={activity.name}
                    name="name"
                    onChange={handleChange}
                    placeholder="Activity Name"
                />
                <div style={{ marginTop: '20px', marginBottom: '30px' }}>
                    <p>Type</p>
                    <select
                        value={activity.type}
                        name="type"
                        onChange={handleChange}
                    >
                        <option value={1}>Lifting Weights</option>
                        <option value={2}>Running</option>
                        <option value={3}>Cycling</option>
                    </select>
                </div>
            </div>
            {!isValid ? <button style={{ marginLeft: '20px', marginBottom: '20px' }} onClick={handleSubmit}>Add activity</button> :
                <button style={{ marginLeft: '20px', marginBottom: '20px' }} >Add activity</button>}
        </form>
    )
};
export default AddActivity;