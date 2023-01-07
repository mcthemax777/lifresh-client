import React, {useEffect, useRef, useState} from 'react';
import css from "./MoneyMonthComponent.module.css";
import {
    checkIsMonth,
    checkIsToday,
    PERIOD_TYPE_DAY,
    PERIOD_TYPE_MONTH,
    PERIOD_TYPE_WEEK,
    PERIOD_TYPE_YEAR
} from "../../Defines";
function MoneyMonthComponent(props) {

    const monthMoneyCalendar = useRef();
    const dayMoneyTimeSide = useRef();
    const dayMoneyTimeMain = useRef();

    const [totalMoney, setTotalMoney] = useState(0);
    const [minusMoney, setMinusMoney] = useState(0);
    const [plusMoney, setPlusMoney] = useState(0);


// 달력 생성
    const makeCalendar = () => {

        monthMoneyCalendar.current.innerHTML = "";

        // 현재 년도와 월 받아오기
        const currentYear = props.today.getFullYear();
        const currentMonth = props.today.getMonth() + 1;

        // 첫날의 요일 구하기 - 초기 시작위치를 위해서
        const firstDay = new Date(props.today.setDate(1)).getDay();
        // 마지막 날짜 구하기
        const lastDay = new Date(currentYear, currentMonth, 0).getDate();

        // 남은 박스만큼 다음달 날짜 표시
        const limitDay = firstDay + lastDay;
        const nextDay = Math.ceil(limitDay / 7) * 7;

        //이전달 마지막 날짜 구하기
        let prevMonthLastDate = new Date(props.today.getFullYear(), props.today.getMonth(), 0).getDate();

        const dayDivArray = [];
        const currentMonthDayDivArray = [];

        // 한달전 날짜 표시하기
        for (let i = 0; i < firstDay; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.className = css.monthMoneyBlankDay;
            //dayDiv.innerText = "" + (prevMonthLastDate - firstDay + i + 1);
            dayDivArray.push(dayDiv);
            monthMoneyCalendar.current.appendChild(dayDiv);
        }

        // 이번달 날짜 표시하기
        for (let i = 1; i <= lastDay; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.id = "dayDiv"+i;
            dayDiv.className = css.monthMoneyDay;
            dayDiv.innerText = "" + i;
            dayDivArray.push(dayDiv);
            currentMonthDayDivArray.push(dayDiv);
            monthMoneyCalendar.current.appendChild(dayDiv);
        }

        // 다음달 날짜 표시하기
        for (let i = limitDay; i < nextDay; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.className = css.monthMoneyBlankDay;
            //dayDiv.innerText = "" + (i - lastDay + 1);
            dayDivArray.push(dayDiv);
            monthMoneyCalendar.current.appendChild(dayDiv);
        }

        //만들어진 블럭 개수
        let dayCount = dayDivArray.length;

        let weekCount = dayCount / 7;

        let reverseDayBlockIndex = 0;

        for(let i = 0 ; i < weekCount ; i++) {
            const weekDiv = document.createElement("div");
            weekDiv.className = css.monthMoneyWeek;

            //하나의 주단위 블럭에 일단위 블럭 7개 넣기
            for(let j = 0 ; j < 7 ; j++) {
                weekDiv.appendChild(dayDivArray[reverseDayBlockIndex]);
                reverseDayBlockIndex++;
            }

            monthMoneyCalendar.current.appendChild(weekDiv);
        }

        //수입 지출 확인하여 각일자에 맞는 날에 데이터 세팅하기
        setPlusMoney(0);
        setMinusMoney(0);

        let plusMoneyArray = {};
        let minusMoneyArray = {};

        console.log(props.moneyTaskList);

        for(let i = 0 ; i < props.moneyTaskList.length; i++) {

            const moneyTask = props.moneyTaskList[i];
            const taskStartTime = new Date(moneyTask.startTime);

            if((props.periodType === PERIOD_TYPE_DAY && checkIsToday(props.today, taskStartTime) === false) ||
                (props.periodType === PERIOD_TYPE_WEEK && checkIsToday(props.today, taskStartTime) === false) ||
                (props.periodType === PERIOD_TYPE_MONTH && checkIsMonth(props.today, taskStartTime) === false) ||
                (props.periodType === PERIOD_TYPE_YEAR && checkIsToday(props.today, taskStartTime) === false)) {
                console.log(moneyTask);
                continue;
            }

            console.log(plusMoneyArray[taskStartTime.getDay()])
            if(props.moneyTaskList[i].money > 0) {
                if(plusMoneyArray[taskStartTime.getDay()] === undefined) {
                    plusMoneyArray[taskStartTime.getDay()] = moneyTask.money;

                } else {
                    plusMoneyArray[taskStartTime.getDay()] += moneyTask.money;
                }
            } else {
                if(minusMoneyArray[taskStartTime.getDay()] === undefined) {
                    minusMoneyArray[taskStartTime.getDay()] = moneyTask.money;
                } else {
                    minusMoneyArray[taskStartTime.getDay()] += moneyTask.money;
                }
            }
        }

        console.log(plusMoneyArray);
        console.log(minusMoneyArray);

        for(let i = 0 ; i < currentMonthDayDivArray.length ; i++) {
            const currentMonthDayDiv = currentMonthDayDivArray[i];

            const dayPlusTextDiv = document.createElement("div");
            dayPlusTextDiv.id = "dayDiv"+i;
            dayPlusTextDiv.className = css.dayTextDiv;
            dayPlusTextDiv.style.color = "blue";
            dayPlusTextDiv.innerText = "수입 : ";

            if(plusMoneyArray[currentMonthDayDiv.innerText] === undefined) {
                dayPlusTextDiv.innerText += "0";
            } else {
                dayPlusTextDiv.innerText += plusMoneyArray[currentMonthDayDiv.innerText];
            }

            const dayMinusTextDiv = document.createElement("div");
            dayMinusTextDiv.id = "dayDiv"+i;
            dayMinusTextDiv.className = css.dayTextDiv;
            dayMinusTextDiv.style.color = "red";
            dayMinusTextDiv.innerText = "지출 : ";

            if(minusMoneyArray[currentMonthDayDiv.innerText] === undefined) {
                dayMinusTextDiv.innerText += "0";
            } else {
                dayMinusTextDiv.innerText += minusMoneyArray[currentMonthDayDiv.innerText];
            }

            currentMonthDayDiv.appendChild(dayPlusTextDiv);
            currentMonthDayDiv.appendChild(dayMinusTextDiv);
        }
    }


    useEffect(() => {
        makeCalendar();
    }, []);

    useEffect(() => {


        makeCalendar();

    },[props.today]);
    
    const onClick = () => {
        // eslint-disable-next-line no-restricted-globals
        let rmConfirm = confirm(props.moneyTask.moneyTaskNo + "을 지우시겠습니까?");
        if (rmConfirm === true)
            props.removeFunc(props.moneyTask.moneyTaskNo);
    }

    return (
        <div id="monthSchedule" className={css.dayMoney}>
            <div ref={monthMoneyCalendar} className={css.moneyCalendar}></div>
        </div>
    );
}

export default MoneyMonthComponent;