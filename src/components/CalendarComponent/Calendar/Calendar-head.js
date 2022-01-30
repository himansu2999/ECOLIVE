import React from 'react';
import classes from './Calendar.module.css';
function CalendarHead(props) {
    const { allMonths, setMonth, setYear, toggleMonthSelect, currentMonth, currentYear, showMonthTable } = props;

    let months = [];

    allMonths.map(month => (
        months.push(
            <div className={classes.MonthCell}
                key={month}
                onClick={e => setMonth(month)}
            >
                <span>{month}</span>
            </div>
        )
    ));
    let rows = [];
    let cells = [];
    months.forEach((month, i) => {
        if (i % 3 !== 0 || i === 0) {
            cells.push(month);
        } else {
            rows.push(cells);
            cells = [];
            cells.push(month);
        }
    });
    rows.push(cells);
    let monthList = rows.map((row, i) => <div className={classes.TableRow} key={i}>{row}</div>);
    const changeYear = (action)=>{
        if(action.toString()==="dec"){
            setYear(currentYear()-1)
        }
        if(action.toString()==="inc"){
            let yearId = parseInt(currentYear());
            yearId = yearId + 1;
            const yearString = yearId.toString()
            setYear(yearString)
        }
    }
    return (
        <div className={classes.Container}>
            <div className={classes.Table}>
                <div className={classes.TableHead}>
                    <div className={classes.TableRow}>
                        <div
                            className={classes.Heading} style={{ borderRight: '1px solid #dbdbdb' }}
                            onClick={() => toggleMonthSelect()}>
                            {currentMonth()}
                        </div>
                        <div className={classes.Heading}>
                            <div className={classes.ButtonControl} onClick={()=>changeYear("dec")}>-</div>
                            {currentYear()}
                            <div className={classes.ButtonControl} onClick={()=>changeYear("inc")}>+</div>
                        </div>
                    </div>
                </div>
                {showMonthTable ?
                    <div className={classes.TableBody}>
                        <div className={classes.TableRow}>
                            <div
                                style={{ textAlign: "center", backgroundColor: '#d6d6d6', width: '100%' }}>
                                Select a month
                                </div>
                        </div>
                        {monthList}
                    </div>
                    : null}
            </div>
        </div>
    )
};
export default CalendarHead;