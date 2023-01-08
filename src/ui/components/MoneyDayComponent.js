import React, {useEffect, useRef, useState} from 'react';
import css from "./MoneyDayComponent.module.css";
import {checkIsToday, convertStringToDateTime} from "../../Defines";
import AddMoneyTask from "./AddMoneyTask";
import AddMoneyCategory from "./AddMoneyCategory";

const fontSize = 14;
const dayMoneyTimeHeight = 1200;
function MoneyDayComponent(props) {

    const dayMoneyTimeScroll = useRef();
    const dayMoneyTime = useRef();
    const dayMoneyTimeSide = useRef();
    const dayMoneyTimeMain = useRef();

    const [totalMoney, setTotalMoney] = useState(0);
    const [minusMoney, setMinusMoney] = useState(0);
    const [plusMoney, setPlusMoney] = useState(0);

    const isOverlapTime = (st1, et1, st2, et2) => {
        //겹치지 않으면 return 0
        //1번 시간대가 먼저면 return 1
        //2번 시간대가 먼저면 return -1

        if(st1 <= st2) {
            if(et1 <= st2) {
                return 0;
            } else {
                return 1;
            }
        } else {
            if(st1 >= et2) {
                return 0;
            } else {
                return -1;
            }
        }
    }


    useEffect(() => {

        dayMoneyTimeSide.current.innerHTML="";
        dayMoneyTimeMain.current.innerHTML="";

        dayMoneyTime.current.style.height = dayMoneyTimeHeight + (fontSize * 2) + "px";
        dayMoneyTime.current.style.fontSize = fontSize + "px";

        //1시간 화면 높이
        const hourHeight = dayMoneyTimeHeight / 24;

        for(let i = 0; i < 25; i++) {
            const timeText = document.createElement("div");
            timeText.style.top = (i * hourHeight) + "px";
            timeText.className = css.dayMoneyTimeSideText;
            timeText.innerText = i + "시";

            dayMoneyTimeSide.current.appendChild(timeText);
        }

        for(let i = 0; i < 25; i++) {
            const timeLine = document.createElement("span");
            timeLine.style.top = ((i * hourHeight) + (fontSize / 2)) + "px";
            timeLine.className = css.dayMoneyTimeMainSpan;

            dayMoneyTimeMain.current.appendChild(timeLine);
        }

        for(let i = 0; i < 24; i++) {
            const timeLine = document.createElement("span");
            timeLine.style.top = ((i * hourHeight) + (hourHeight / 2) + (fontSize / 2)) + "px";
            timeLine.className = css.dayMoneyTimeMainSpanDot;

            dayMoneyTimeMain.current.appendChild(timeLine);
        }

        setData();

    }, []);



    const setData = () => {

        //기존 moneyTask 제거
        const moneyTimeSideTextList = Array.from(
            document.getElementsByClassName(css.moneyTimeSideText)
        );

        for (let i = 0; i < moneyTimeSideTextList.length; i++) {
            dayMoneyTimeSide.current.removeChild(moneyTimeSideTextList[i]);
        }

        const moneyTaskDivList = Array.from(
            document.getElementsByClassName(css.moneyTaskDiv)
        );

        for (let i = 0; i < moneyTaskDivList.length; i++) {
            dayMoneyTimeMain.current.removeChild(moneyTaskDivList[i]);
        }

        //1시간 화면 높이
        const hourHeight = dayMoneyTimeHeight / 24;

        //데이터 삽입
        let moneyTaskList = props.moneyTaskLisk;

        //첫 task에 스크롤 위치 이동시키는 용도
        let isFindFirstTask = false;

        let addMoneyTaskDivList = {};
        let moneyTaskPositionList = {};


        for(let i = 0; i < moneyTaskList.length; i++) {

            const moneyTask = moneyTaskList[i];
            const taskStartTime = new Date(moneyTask.startTime);

            if(checkIsToday(props.today, taskStartTime) === false) {
                continue;
            }

            setTotalMoney(totalMoney + moneyTask.money);
            if(moneyTask.money > 0) setPlusMoney(plusMoney + moneyTask.money);
            else setMinusMoney(minusMoney + moneyTask.money);

            const hours = taskStartTime.getHours();
            const minutes = taskStartTime.getMinutes();
            const seconds = taskStartTime.getSeconds();

            const moneyTaskHeight = (hours + minutes/60 + seconds/3600) * hourHeight;

            // const timeText = document.createElement("div");
            // timeText.id = "moneyTaskText" + moneyTask.moneyTaskNo;
            // timeText.style.top = moneyTaskHeight + "px";
            // timeText.style.color = "blue";
            // timeText.className = css.moneyTimeSideText;
            // timeText.innerText =  moneyTask.money + "원";
            //
            // if(moneyTask.money > 0) timeText.style.color = "blue";
            // else timeText.style.color = "red";
            //
            // dayMoneyTimeSide.current.appendChild(timeText);


            const moneyTaskDiv = document.createElement("div");
            moneyTaskDiv.style.top = (moneyTaskHeight + (fontSize / 2)) + "px";
            moneyTaskDiv.className = css.moneyTaskDiv;
            moneyTaskDiv.style.color = "white";
            moneyTaskDiv.innerText = props.getSubCategoryNameByNo(moneyTask.subCategoryNo) + "[" + moneyTask.detail + "] : " + moneyTask.money + "원";
            moneyTaskDiv.data = moneyTask;

            moneyTaskDiv.style.height = (hourHeight / 2) + "px";

            if(moneyTask.money > 0) moneyTaskDiv.style.backgroundColor = "blue";
            else moneyTaskDiv.style.backgroundColor = "red";


            //중복시간 체크
            let st = convertStringToDateTime(moneyTask.startTime);
            let et = convertStringToDateTime(moneyTask.startTime);
            et.addSeconds(30 * 60);

            for(const key in addMoneyTaskDivList) {

                let compTask = addMoneyTaskDivList[key].data;
                let st1 = convertStringToDateTime(compTask.startTime);
                let et1 = convertStringToDateTime(compTask.startTime);
                et1.addSeconds(30 * 60);

                let resultOverlap = isOverlapTime(st, et, st1, et1);

                //배치 세팅
                if(resultOverlap === 1) {

                    if(moneyTaskPositionList[moneyTask.moneyTaskNo] === undefined) {
                        moneyTaskPositionList[moneyTask.moneyTaskNo] = [1, 2];
                    } else {
                        moneyTaskPositionList[moneyTask.moneyTaskNo][1] += 1;
                    }

                    if(moneyTaskPositionList[compTask.moneyTaskNo] === undefined) {
                        moneyTaskPositionList[compTask.moneyTaskNo] = [2, 2];
                    } else {
                        moneyTaskPositionList[compTask.moneyTaskNo][0] += 1;
                        moneyTaskPositionList[compTask.moneyTaskNo][1] += 1;
                    }

                } else if(resultOverlap === -1) {
                    if(moneyTaskPositionList[moneyTask.moneyTaskNo] === undefined) {
                        moneyTaskPositionList[moneyTask.moneyTaskNo] = [2, 2];
                    } else {
                        moneyTaskPositionList[moneyTask.moneyTaskNo][0] += 1;
                        moneyTaskPositionList[moneyTask.moneyTaskNo][1] += 1;
                    }

                    if(moneyTaskPositionList[compTask.moneyTaskNo] === undefined) {
                        moneyTaskPositionList[compTask.moneyTaskNo] = [1, 2];
                    } else {
                        moneyTaskPositionList[compTask.moneyTaskNo][1] += 1;
                    }
                } else {

                }
            }

            addMoneyTaskDivList[moneyTask.moneyTaskNo] = moneyTaskDiv;

            //dayMoneyTimeMain.current.appendChild(moneyTaskDiv);

            //첫번째 인자로 스크롤 위치 맞춤
            if(isFindFirstTask === false) {

                let scrollY = moneyTaskHeight - hourHeight;

                if(scrollY < 0) scrollY = 0;

                dayMoneyTimeScroll.current.scrollTop = scrollY;
                isFindFirstTask = true;
            }
        }

        //중복시간 가진 task들 div width 다시 세팅
        for(const key in moneyTaskPositionList) {
            let addMoneyTaskDiv = addMoneyTaskDivList[key];
            let moneyTaskPosition = moneyTaskPositionList[key];

            console.log(addMoneyTaskDivList[key]);

            addMoneyTaskDiv.style.left = ((dayMoneyTimeMain.current.clientWidth / moneyTaskPosition[1]) * (moneyTaskPosition[0] - 1)) + "px";
            addMoneyTaskDiv.style.width = dayMoneyTimeMain.current.clientWidth / moneyTaskPosition[1] + "px";

            console.log(addMoneyTaskDivList[key]);
        }

        for(const key in addMoneyTaskDivList) {
            dayMoneyTimeMain.current.appendChild(addMoneyTaskDivList[key]);
        }


        //money 총 합계 표시
        // let totalMoneyDiv = document.getElementById("totalMoneyDiv");
        // totalMoneyDiv.innerText = "합계 : " + totalMoney + "원";

        // let plusMoneyDiv = document.getElementById("plusMoneyDiv");
        // plusMoneyDiv.innerText = "수입 : " + plusMoney + "원";
        //
        // let minusMoneyDiv = document.getElementById("minusMoneyDiv");
        // minusMoneyDiv.innerText = "지출 : " + minusMoney + "원";

    }

    useEffect(() => {
        setData();

    },[props.today, props.getMoneyTaskList]);
    
    const onClick = () => {
        // eslint-disable-next-line no-restricted-globals
        let rmConfirm = confirm(props.moneyTask.moneyTaskNo + "을 지우시겠습니까?");
        if (rmConfirm === true)
            props.removeFunc(props.moneyTask.moneyTaskNo);
    }

    return (
        <div className="defaultReactDiv">
            <div ref={dayMoneyTimeScroll} className={css.dayMoneyTimeScroll}>
                <div ref={dayMoneyTime} className={css.dayMoneyTime}>
                    <div ref={dayMoneyTimeSide} className={css.dayMoneyTimeSide}>
                    </div>
                    <div ref={dayMoneyTimeMain} className={css.dayMoneyTimeMain}>

                    </div>
                </div>
            </div>
            <div id="dayMoneyTask" className={css.dayMoneyTask}>
                <AddMoneyTask mainCategoryList={props.mainCategoryList} subCategoryList={props.subCategoryList} getMoneyTaskList={props.getMoneyTaskList}></AddMoneyTask>
                <AddMoneyCategory mainCategoryList={props.mainCategoryList} subCategoryList={props.subCategoryList} getMoneyTaskList={props.getMoneyTaskList}></AddMoneyCategory>

            </div>
        </div>
    );
}

export default MoneyDayComponent;