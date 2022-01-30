import React, { useState, useCallback, useEffect } from 'react';
import classes from './SelectPatient.module.css';
function SelectPatient(props) {
    const {setUid} = props;
    const [arr, setArr] = useState([]);
    const call = useCallback(() => {
        let aef = props.firebase.db.ref().child(`users`);
        aef.on("value", snapshot => {
            let data = snapshot.val();
            const DoctorArray = [];
            for (let key in data) {
                DoctorArray.push({
                    id: key,
                    config: data[key]
                })
            }
            setArr(DoctorArray)
        })
    },[props.firebase.db])
    useEffect(()=>call(),[props.firebase.db,call])
    const update=(id)=>{
        setUid(id);
    }
    return (
        <div className={classes.SelectDoctor}>
            {arr.map(Doctor => (
                <div className={classes.DoctorOption}
                    key={Doctor.id}
                    onClick={(event) => update(Doctor.id)}
            >{Doctor.config.username}</div>))}
        </div>
    )
};
export default SelectPatient;