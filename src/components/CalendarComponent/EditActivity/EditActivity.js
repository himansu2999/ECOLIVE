import React, { useState } from 'react';
import classes from '../AddActivity/AddActivity.module.css';
function EdiActivity(props) {
    const {Uid,authUser, firebase, activity, activityKey, setEditing, setOpenSnackbar, setSnackbarMsg} = props;
    const uid = Uid;
    const defaultActivity = {
        name: activity.name,
        type: activity.type,
        date: activity.date
    };
    const [newActivity, setNewActivity] = useState(defaultActivity);
    const handleChange = e => {
        const { name, value } = e.target;
        setNewActivity({
            ...newActivity,
            [name]: value,
        });
    };
    const isValid = newActivity.name === '';
    // Add the activity to firebase via the API made in this app
    const handleSubmit = () => {
        if (authUser) {
            firebase.updateActivity(uid, newActivity, activityKey);
            setEditing(false);
            // Show alert and hide after 3sec
            setOpenSnackbar(true);
            setSnackbarMsg('Updated activity');
            setTimeout(() => {
                setOpenSnackbar(false)
            }, 300)
        };
    }
    return (
        <form onSubmit={e => e.preventDefault()}>
            <div className={classes.Add}>
                <input type="text"
                    style={{ marginTop: '5px' }}
                    value={newActivity.name}
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
            {!isValid ? <button style={{ marginLeft: '20px', marginBottom: '20px' }} onClick={handleSubmit}>Add activity</button>:
            <button style={{ marginLeft: '20px', marginBottom: '20px' }} >Add activity</button>}
        </form>
    )
};
export default EdiActivity;