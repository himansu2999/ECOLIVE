import React,{Component, useCallback,useState} from 'react';
import classes from './Calendar.module.css';
import nextId from "react-id-generator";
import TimeSlot from './TimeSlot';
import Modal from '../../UI/Modal/Modal';
function CalendarBody(props) {

    const { currentYear, actualYear, firstDayOfMonth, daysInMonth, currentDay, currentMonth, currentMonthNum, selectedDay, setSelectedDay, actualMonth, weekdays, activeDays } = props;
    let blanks = [];
    for (let i = 0; i < firstDayOfMonth(); i++) {
        blanks.push(
            <div className={classes.TableCell} key={nextId()}>{""}</div>
        )
    }
    const [timeslots, setTimeslots]= useState({});
    const [showTS, setTS] = useState(false);
    const [Day, setDay] = useState(null);
    const setDaytime =(timeslot) => {
        const DayTime ={
            Day: Day,
            timeslot: timeslot
        };
        setSelectedDay(DayTime);
        setTS(false);
    }
    const showTShandler = (flag,d) => {
        setDay(d);
        if(!props.chooseSlot){
            const DayTime ={
                Day: d,
                timeslot: '10:0 AM -- 10:15 AM'
            };
            setSelectedDay(DayTime);
        }
        setTS(flag);
    }
    const closeTS = () =>{
        setTS(false)
    }
    const timeSlotHandler =() =>{
        if(showTS){
        setTimeslots(<Modal
                    show= {true}
                    modalClosed={closeTS}
                    clicked={closeTS}
                    >
                    <TimeSlot
                    clicked={setDaytime}
                    />
                    </Modal>);
            return;    
        }
        setTimeslots(null);
    }
 
    React.useEffect(() => timeSlotHandler(), [showTS]);
    

    let monthDays = [];
    for (let d = 1; d <= daysInMonth(); d++) {
        let currDay, selectDay, activeDay, history;
        // Check if day is today
        if (currentDay().toString() === d.toString() && currentMonth() === actualMonth() && currentYear().toString() === actualYear.toString()) currDay = "today";

        // Check if day is selected day
        if (selectedDay.day === d && currentMonthNum() === selectedDay.month && currentYear().toString() === selectedDay.year.toString()) selectDay = "selected-day";
        if (currentDay().toString() > d && currentMonth() === actualMonth() && currentYear().toString() === actualYear.toString()) history = "history";

        let formattedDate = `${d}-${currentMonthNum()+1}-${currentYear()}`;
        if (activeDays) { if (activeDays.indexOf(formattedDate) !== -1) activeDay = "active"; }
        monthDays.push(
            <div className={(history &&activeDay) ? classes.history :
                activeDay ?
                    (activeDay && selectDay) ?
                        classes.MarkDay :
                        (activeDay && currDay) ?
                            classes.MarkCurDay :
                            classes.Active :
                    selectDay ?
                        classes.Selected :
                        currDay ?
                            classes.Today :
                            classes.TableCell}
                key={d}
                onClick={() => showTShandler(true,d)}
            >
                <span className={activeDay}>{d}</span>
            </div>
        );
    }

    let totalSlots = [...blanks, ...monthDays];
    if (totalSlots.length < 35) {
        const remainingslots = 35 - totalSlots.length;
        for (let d = 1; d <= remainingslots; d++) {
            totalSlots.push(
                <div className={classes.TableCell} key={nextId()}>{""}</div>
            )
        }
    }
    else if (totalSlots.length > 35) {
        const remainingslots = 42 - totalSlots.length;
        for (let d = 1; d <= remainingslots; d++) {
            totalSlots.push(
                <div className={classes.TableCell} key={nextId()}>{""}</div>
            )
        }
    }
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
        if (i % 7 !== 0) {
            cells.push(row);
        } else {
            rows.push(cells);
            cells = [];
            cells.push(row);
        }
        if (i === totalSlots.length - 1) {
            rows.push(cells)
        }
    })


    return (
        <div className={classes.Container} >
            <div className={classes.Table}>
                <div className={classes.WeakHead}>
                    <div className={classes.TableRow}>
                        {
                            weekdays.map((day, i) => (
                                <div className={classes.WeekCell} key={i}>
                                    {day}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    {
                        rows.map((day, i) =>
                            <div className={classes.TableRow}
                                key={i}
                            >
                                {day}
                            </div>)
                    }
                </div>
            </div>
            {showTS&&props.chooseSlot?<Modal
                    show= {true}
                    modalClosed={closeTS}
                    clicked={closeTS}
                    >
                    <TimeSlot clicked={setDaytime}
                    day={Day.toString()}
                    actualMonth={actualMonth().toString()} 
                    actualYear={actualYear.toString()} 
                    />
                    </Modal>:null}
        </div>
    )
}

export default CalendarBody;
