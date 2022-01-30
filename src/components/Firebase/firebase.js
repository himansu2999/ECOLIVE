import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyAl9uNH65-zXwTF0FNiDdNx8TqJUq-I-JQ",
    authDomain: "ecolivefresh.firebaseapp.com",
    databaseURL: "https://ecolivefresh.firebaseio.com",
    projectId: "ecolivefresh",
    storageBucket: "ecolivefresh.appspot.com",
    messagingSenderId: "716263540441",
    appId: "1:716263540441:web:27728b9e6f9c76a27460c8",
    measurementId: "G-Y16FPCS03Z"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }

    /*** Authentication  ***/
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () =>
        this.auth.signOut();

    doPasswordReset = email =>
        this.auth.sendPasswordResetEmail(email);

    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');

    admin = uid => this.db.ref(`admins/${uid}`);
    admins = () => this.db.ref('admins');

    doctor = uid => this.db.ref(`doctors/${uid}`);
    doctors = () => this.db.ref('doctors');

    roles = uid => this.db.ref(`roles/${uid}`);
    addActivity = (uid, activity) => {
        const ref = this.db.ref().child(`requests`);
        ref.push(activity).then((snap) => {
            const refUser = this.db.ref().child(`users/${uid}/activities/${snap.key}`);
            refUser.set(activity);
        });
    };
    addDoctorToApplication = (reqId, uidDoctor, date, uidPatient,timeslot,docName) => {
        console.log({"reqId":reqId,"uiddoctor" :uidDoctor,"date":date,"uidPatient":uidPatient});
        const gef = this.db.ref().child(`requests/${reqId}`);
        var obj={};
        obj['/doctorId'] = uidDoctor;
        obj['/date'] = date;
        obj['/timeslot'] = timeslot;
        obj['/docName']= docName
        gef.update(obj);
        const uef = this.db.ref().child(`users/${uidPatient}/activities/${reqId}`);
        uef.update(obj);
    };
    addApplicationToDoctor = (reqId, uidDoctor, date, activity,timeslot,docName) => {
        const ref = this.db.ref().child(`doctors/${uidDoctor}/activities/${reqId}`);
        activity.timeslot = timeslot;
        activity.date = date;
        activity.doctorId= uidDoctor;
        activity.docName= docName;
        ref.update(activity);
    };
    removeUnassignedApplication = (reqId) => {
        const ref = this.db.ref(`requests/${reqId}`);
        ref.remove();
    }
    updateActivity = (uid, activity, activityKey) => {
        const ref = this.db.ref().child(`users/${uid}/activities/${activityKey}`);
        ref.update(activity);
    }
}

export default Firebase;