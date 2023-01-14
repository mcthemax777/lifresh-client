import React, {useContext, useEffect, useRef} from 'react';
import css from "./MoneyDateComponent.module.css";
import {
    PERIOD_TYPE_CUSTOM,
    PERIOD_TYPE_DAY,
    PERIOD_TYPE_MONTH,
    PERIOD_TYPE_WEEK,
    PERIOD_TYPE_YEAR
} from "../../Defines";
import {MoneyContext} from "../pages/MoneyPage";
function DateComponent(props) {

    const {store, } = useContext(MoneyContext);

    const currentDateTextDiv = useRef();
    const customDateTextDiv = useRef();
    const customDateDiv = useRef();

    const setDay = () => {
        const year = store.startDate.getFullYear();
        const month = ('0' + (store.startDate.getMonth() + 1)).slice(-2);
        const day = ('0' + store.startDate.getDate()).slice(-2);
        currentDateTextDiv.current.innerText = year + '.' + month + '.' + day;
    }

    const setWeek = () => {
        const year1 = store.startDate.getFullYear();
        const month1 = ('0' + (store.startDate.getMonth() + 1)).slice(-2);
        const day1 = ('0' + store.startDate.getDate()).slice(-2);

        const year2 = store.endDate.getFullYear();
        const month2 = ('0' + (store.endDate.getMonth() + 1)).slice(-2);
        const day2 = ('0' + store.endDate.getDate()).slice(-2);

        currentDateTextDiv.current.innerText = year1 + '.' + month1 + '.' + day1 + ' ~ ' + year2 + '.' + month2 + "." + day2;
    }

    const setMonth = () => {
        const year = store.startDate.getFullYear();
        const month = ('0' + (store.startDate.getMonth() + 1)).slice(-2);
        currentDateTextDiv.current.innerText = year + '년 ' + month + '월';
    }

    const setYear = () => {
        const year = store.startDate.getFullYear();
        currentDateTextDiv.current.innerText = year + '년 ';
    }

    const setCustom = () => {
        const year1 = store.startDate.getFullYear();
        const month1 = ('0' + (store.startDate.getMonth() + 1)).slice(-2);
        const day1 = ('0' + store.startDate.getDate()).slice(-2);

        currentDateTextDiv.current.innerText = year1 + '.' + month1 + '.' + day1;

        const year2 = store.endDate.getFullYear();
        const month2 = ('0' + (store.endDate.getMonth() + 1)).slice(-2);
        const day2 = ('0' + store.endDate.getDate()).slice(-2);

        customDateTextDiv.current.innerText = year2 + '.' + month2 + '.' + day2;
    }

    useEffect(() => {


        if(store.periodType === PERIOD_TYPE_CUSTOM) {
            console.log("cs");
            customDateDiv.current.style.display = "flex";
            setCustom();
        } else {

            //커스텀 기간 숨기기
            customDateDiv.current.style.display = "none";

            if(store.periodType === PERIOD_TYPE_DAY) setDay();
            else if(store.periodType === PERIOD_TYPE_WEEK) setWeek();
            else if(store.periodType === PERIOD_TYPE_MONTH) setMonth();
            else if(store.periodType === PERIOD_TYPE_YEAR) setYear();
        }

    }, [store.startDate, store.endDate]);

    useEffect(() => {

        clickChangeDateBtn(0);

    }, [store.periodType]);




    const clickChangeDateBtn = (num) => {

        let newStartDate = new Date(store.startDate);

        if(store.periodType === PERIOD_TYPE_DAY) {
            newStartDate.setDate(newStartDate.getDate() + num);

            store.setStartDate(newStartDate);
            store.setEndDate(newStartDate);

        } else if(store.periodType === PERIOD_TYPE_WEEK) {

            let day = newStartDate.getDay();

            newStartDate.setDate(newStartDate.getDate() + (num * 7) - day + 1);
            store.setStartDate(newStartDate);

            let newEndDate = new Date(newStartDate);
            newEndDate.setDate(newStartDate.getDate() + 6);
            store.setEndDate(newEndDate);

        } else if(store.periodType === PERIOD_TYPE_MONTH) {
            newStartDate.setMonth(newStartDate.getMonth() + num);
            newStartDate.setDate(1);
            store.setStartDate(newStartDate);

            let newEndDate = new Date(newStartDate);
            newEndDate.setMonth(newStartDate.getMonth() + 1);
            newEndDate.setDate(newStartDate.getDate() - 1);
            store.setEndDate(newEndDate);

        } else if(store.periodType === PERIOD_TYPE_YEAR) {
            newStartDate.setFullYear(newStartDate.getFullYear() + num);
            newStartDate.setMonth(0);
            newStartDate.setDate(1);

            store.setStartDate(newStartDate);

            let newEndDate = new Date(newStartDate);
            newEndDate.setFullYear(newStartDate.getFullYear() + 1);
            newEndDate.setDate(newStartDate.getDate() - 1);
            store.setEndDate(newEndDate);
        } else if(store.periodType === PERIOD_TYPE_CUSTOM) {

            newStartDate.setDate(newStartDate.getDate() + num);
            store.setStartDate(newStartDate);
            if(newStartDate > store.endDate) store.setEndDate(newStartDate);
        } else {
            console.log("invalid period type");
        }
    }

    const clickChangeCustomDateBtn = (num) => {

        let newEndDate = new Date(store.endDate);

        if(store.periodType === PERIOD_TYPE_CUSTOM) {
            newEndDate.setDate(newEndDate.getDate() + num);
            store.setEndDate(newEndDate);
            if(newEndDate < store.startDate) store.setStartDate(newEndDate);

        } else {
            console.log("invalid period type!");
        }
    }

    const clickPeriodBtn = (e) => {
        store.setPeriodType(Number(e.target.value));
    }

    const periodSelect = useRef();

    useEffect(() => {
        periodSelect.current.options[store.periodType].selected = true;
    }, []);

    return(
        <div id="componentDiv" className={css.componentDiv}>
            <div id="dateDiv" className={css.dateDiv}>
                <div className={css.currentDateDiv}>
                    <input type="button" id="datePrev" className={css.datePrev} onClick={() => clickChangeDateBtn(-1)} value="<"/>
                    <div ref={currentDateTextDiv} className={css.currentDateTextDiv}></div>
                    <input type="button" className={css.dateNext} onClick={() => clickChangeDateBtn(1)} value=">"/>
                </div>
                <div ref={customDateDiv} className={css.currentDateDiv}>
                    ~
                    <input type="button" id="datePrev" className={css.datePrev} onClick={() => clickChangeCustomDateBtn(-1)} value="<"/>
                    <div ref={customDateTextDiv} className={css.currentDateTextDiv}></div>
                    <input type="button" className={css.dateNext} onClick={() => clickChangeCustomDateBtn(1)} value=">"/>
                </div>
            </div>
            {/*<div className={css.periodMenu}>*/}
                {/*<label htmlFor="periodMenu"></label>*/}
                <select ref={periodSelect} className={css.periodSelect} onChange={clickPeriodBtn} >
                    <option id="dayScheduleBtn" value={PERIOD_TYPE_DAY}>일일</option>
                    <option id="weekScheduleBtn" value={PERIOD_TYPE_WEEK}>주간</option>
                    <option id="monthScheduleBtn" value={PERIOD_TYPE_MONTH}>월간</option>
                    <option id="yearScheduleBtn" value={PERIOD_TYPE_YEAR}>연간</option>
                    <option id="customDateBtn" value={PERIOD_TYPE_CUSTOM}>기간설정</option>
                </select>
            {/*</div>*/}
        </div>
    )
}

export default DateComponent;