import React, {useEffect, useRef} from 'react';
import css from "./DateComponent.module.css";
import {PERIOD_TYPE_DAY, PERIOD_TYPE_MONTH, PERIOD_TYPE_WEEK, PERIOD_TYPE_YEAR} from "../../Defines";
function DateComponent(props) {

    const currentDate = useRef();

    const setDay = () => {
        const year = props.today.getFullYear();
        const month = ('0' + (props.today.getMonth() + 1)).slice(-2);
        const day = ('0' + props.today.getDate()).slice(-2);
        currentDate.current.innerText = year + '년 ' + month + '월 ' + day + '일';
    }

    const setWeek = () => {
        const year = props.today.getFullYear();
        const month = ('0' + (props.today.getMonth() + 1)).slice(-2);
        const day = ('0' + props.today.getDate()).slice(-2);
        currentDate.current.innerText = year + '년 ' + month + '월 ' + day + '일' + ' ~ +7';
    }

    const setMonth = () => {
        const year = props.today.getFullYear();
        const month = ('0' + (props.today.getMonth() + 1)).slice(-2);
        currentDate.current.innerText = year + '년 ' + month + '월';
    }

    const setYear = () => {
        const year = props.today.getFullYear();
        currentDate.current.innerText = year + '년 ';
    }

    useEffect(() => {
        if(props.periodType === PERIOD_TYPE_DAY) setDay();
        else if(props.periodType === PERIOD_TYPE_WEEK) setWeek();
        else if(props.periodType === PERIOD_TYPE_MONTH) setMonth();
        else if(props.periodType === PERIOD_TYPE_YEAR) setYear();
        else setDay();

    }, [props.today, props.periodType]);

    const changeDisplay = () => {

        console.log("ff");
        if(props.isSchedulePageDisplay && props.isToDoPageDisplay && props.isMoneyPageDisplay) {

        } else {
            if(props.isSchedulePageDisplay) {
                props.setIsToDoPageDisplay(true);
                props.setIsSchedulePageDisplay(false);
            }

            if(props.isToDoPageDisplay) {
                props.setIsMoneyPageDisplay(true);
                props.setIsToDoPageDisplay(false);
            }

            if(props.isMoneyPageDisplay) {
                props.setIsSchedulePageDisplay(true);
                props.setIsMoneyPageDisplay(false);
            }
        }

    }

    return(
        <div id="componentDiv" className={css.componentDiv}>
            <button onClick={changeDisplay} className={css.menuDiv} value="MENU">MENU</button>
            <div id="dateDiv" className={css.dateDiv}>
                <input type="button" id="datePrev" className={css.datePrev} onClick={() => props.clickChangeCurrentDateBtn(-1)} value="<"/>
                <div ref={currentDate} className={css.currentDate}></div>
                <input type="button" className={css.dateNext} onClick={() => props.clickChangeCurrentDateBtn(1)} value=">"/>
            </div>
            <div className={css.periodMenu}>
                <label htmlFor="periodMenu"></label>
                <select id="periodMenu" className={css.periodSelect} onChange={props.clickPeriodBtn} >
                    <option id="dayScheduleBtn" value="0">일일</option>
                    {/*<option id="weekScheduleBtn" value="1">주간</option>*/}
                    <option id="monthScheduleBtn" value="2">월간</option>
                    {/*<option id="yearScheduleBtn" value="3">연간</option>*/}
                </select>
            </div>
        </div>
    )
}

export default DateComponent;