import React, { useState, useCallback, useEffect } from 'react';
import classes from './SelectDoctor.module.css';
function SelectDoctor(props) {
    const {setUid} = props;
    const [arr, setArr] = useState([]);
    const call = useCallback(() => {
        let aef = props.firebase.db.ref().child(`doctors`);
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
            if(DoctorArray.lenght===1){
                props.setUid(DoctorArray[0].id)
                props.setDocName(DoctorArray[0].config.name)
                console.log("single doctor")
                setTimeout(() => {
                    alert(`${DoctorArray[0].config.name} is selected`)
                }, 200);
            }
        })
    },[props.firebase.db])
    useEffect(()=>call(),[props.firebase.db,call])
    const update=(id,name)=>{
        setUid(id);
        props.setDocName(name);
        setTimeout(() => {
            alert(`${name} is selected`)
        }, 200);
    }
    return (
        <div className={classes.SelectDoctor}>
            {arr.map(Doctor => (
                <div className={classes.DoctorOption} style={(props.docName===Doctor.config.name?{background:'lightblue'}:null)}
                    key={Doctor.id}
                    onClick={(event) => update(Doctor.id,Doctor.config.name)}
            >{Doctor.config.username}</div>))}
        </div>
    )
};
export default SelectDoctor;