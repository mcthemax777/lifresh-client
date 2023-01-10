import React, {useEffect, useRef, useState} from 'react';
import css from "./ScheduleDayComponent.module.css";
import {checkIsToday, convertStringToDateTime} from "../../Defines";
import AddScheduleTask from "./AddScheduleTask";
import AddScheduleCategory from "./AddScheduleCategory";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

const fontSize = 14;
const dayScheduleTimeHeight = 1200;

//1시간 height
const hourHeight = dayScheduleTimeHeight / 24;
function ScheduleDayComponent(props) {

    const dayScheduleTimeScroll = useRef();
    const dayScheduleTime = useRef();
    const dayScheduleTimeSide = useRef();
    const dayScheduleTimeRightSide = useRef();
    const dayScheduleTimeMain = useRef();
    const currentTimeDiv = useRef();
    const currentTimeTextDiv = useRef();

    const [totalSchedule, setTotalSchedule] = useState(0);
    const [minusSchedule, setMinusSchedule] = useState(0);
    const [plusSchedule, setPlusSchedule] = useState(0);

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

        dayScheduleTime.current.style.height = dayScheduleTimeHeight + (fontSize * 2) + "px";
        dayScheduleTime.current.style.fontSize = fontSize + "px";

        for(let i = 0; i < 25; i++) {
            const timeText = document.createElement("div");
            timeText.style.top = (i * hourHeight) + "px";
            timeText.className = css.dayScheduleTimeSideText;
            timeText.innerText = i + ":00";

            dayScheduleTimeSide.current.appendChild(timeText);
        }

        for(let i = 0; i < 25; i++) {
            const timeLine = document.createElement("span");
            timeLine.style.top = ((i * hourHeight) + (fontSize / 2)) + "px";
            timeLine.className = css.dayScheduleTimeMainSpan;

            dayScheduleTimeMain.current.appendChild(timeLine);
        }

        for(let i = 0; i < 24; i++) {
            const timeLine = document.createElement("span");
            timeLine.style.top = ((i * hourHeight) + (hourHeight / 2) + (fontSize / 2)) + "px";
            timeLine.className = css.dayScheduleTimeMainSpanDot;

            dayScheduleTimeMain.current.appendChild(timeLine);
        }

        setData();

        //분마다 현재 위치 변경
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);
        return () => clearInterval(interval);

    }, []);



    const setData = () => {

        // //기존 scheduleTask 제거
        // const scheduleTimeSideTextList = Array.from(
        //     document.getElementsByClassName(css.scheduleTimeSideText)
        // );
        //
        // for (let i = 0; i < scheduleTimeSideTextList.length; i++) {
        //     dayScheduleTimeSide.current.removeChild(scheduleTimeSideTextList[i]);
        // }
        //
        // const scheduleTaskDivList = Array.from(
        //     document.getElementsByClassName(css.scheduleTaskDiv)
        // );
        //
        // for (let i = 0; i < scheduleTaskDivList.length; i++) {
        //     dayScheduleTimeMain.current.removeChild(scheduleTaskDivList[i]);
        // }
        //
        // //데이터 삽입
        // let scheduleTaskList = props.scheduleTaskLisk;
        //
        // //첫 task에 스크롤 위치 이동시키는 용도
        // let isFindFirstTask = false;
        //
        // let addScheduleTaskDivList = {};
        // let scheduleTaskPositionList = {};
        //
        //
        // for(let i = 0; i < scheduleTaskList.length; i++) {
        //
        //     const scheduleTask = scheduleTaskList[i];
        //     const taskStartTime = new Date(scheduleTask.startTime);
        //
        //     if(checkIsToday(props.today, taskStartTime) === false) {
        //         continue;
        //     }
        //
        //     setTotalSchedule(totalSchedule + scheduleTask.schedule);
        //     if(scheduleTask.schedule > 0) setPlusSchedule(plusSchedule + scheduleTask.schedule);
        //     else setMinusSchedule(minusSchedule + scheduleTask.schedule);
        //
        //     const hours = taskStartTime.getHours();
        //     const minutes = taskStartTime.getMinutes();
        //     const seconds = taskStartTime.getSeconds();
        //
        //     const scheduleTaskHeight = (hours + minutes/60 + seconds/3600) * hourHeight;
        //
        //     // const timeText = document.createElement("div");
        //     // timeText.id = "scheduleTaskText" + scheduleTask.scheduleTaskNo;
        //     // timeText.style.top = scheduleTaskHeight + "px";
        //     // timeText.style.color = "blue";
        //     // timeText.className = css.scheduleTimeSideText;
        //     // timeText.innerText =  scheduleTask.schedule + "원";
        //     //
        //     // if(scheduleTask.schedule > 0) timeText.style.color = "blue";
        //     // else timeText.style.color = "red";
        //     //
        //     // dayScheduleTimeSide.current.appendChild(timeText);
        //
        //
        //     const scheduleTaskDiv = document.createElement("div");
        //     scheduleTaskDiv.style.top = (scheduleTaskHeight + (fontSize / 2)) + "px";
        //     scheduleTaskDiv.className = css.scheduleTaskDiv;
        //     scheduleTaskDiv.style.color = "white";
        //     scheduleTaskDiv.innerText = props.getSubCategoryNameByNo(scheduleTask.subCategoryNo) + "[" + scheduleTask.detail + "] : " + scheduleTask.schedule + "원";
        //     scheduleTaskDiv.data = scheduleTask;
        //
        //     scheduleTaskDiv.style.height = (hourHeight / 2) + "px";
        //     scheduleTaskDiv.onclick = (event) => {
        //         event.stopPropagation();
        //         console.log(scheduleTask);
        //     };
        //     scheduleTaskDiv.draggable = true;
        //     scheduleTaskDiv.ondragenter = (e) => {console.log("onDragStart" + e);}
        //     scheduleTaskDiv.ondrag = (e) => {console.log("ondrag" + e)};
        //     scheduleTaskDiv.ondragover = (e) => {console.log("ondragover" + e)};
        //     scheduleTaskDiv.ondragend = (e) => {console.log("ondragend" + e)};
        //
        //     if(scheduleTask.schedule > 0) scheduleTaskDiv.style.backgroundColor = "blue";
        //     else scheduleTaskDiv.style.backgroundColor = "red";
        //
        //
        //     //중복시간 체크
        //     let st = convertStringToDateTime(scheduleTask.startTime);
        //     let et = convertStringToDateTime(scheduleTask.startTime);
        //     et.addSeconds(30 * 60);
        //
        //     for(const key in addScheduleTaskDivList) {
        //
        //         let compTask = addScheduleTaskDivList[key].data;
        //         let st1 = convertStringToDateTime(compTask.startTime);
        //         let et1 = convertStringToDateTime(compTask.startTime);
        //         et1.addSeconds(30 * 60);
        //
        //         let resultOverlap = isOverlapTime(st, et, st1, et1);
        //
        //         //배치 세팅
        //         if(resultOverlap === 1) {
        //
        //             if(scheduleTaskPositionList[scheduleTask.scheduleTaskNo] === undefined) {
        //                 scheduleTaskPositionList[scheduleTask.scheduleTaskNo] = [1, 2];
        //             } else {
        //                 scheduleTaskPositionList[scheduleTask.scheduleTaskNo][1] += 1;
        //             }
        //
        //             if(scheduleTaskPositionList[compTask.scheduleTaskNo] === undefined) {
        //                 scheduleTaskPositionList[compTask.scheduleTaskNo] = [2, 2];
        //             } else {
        //                 scheduleTaskPositionList[compTask.scheduleTaskNo][0] += 1;
        //                 scheduleTaskPositionList[compTask.scheduleTaskNo][1] += 1;
        //             }
        //
        //         } else if(resultOverlap === -1) {
        //             if(scheduleTaskPositionList[scheduleTask.scheduleTaskNo] === undefined) {
        //                 scheduleTaskPositionList[scheduleTask.scheduleTaskNo] = [2, 2];
        //             } else {
        //                 scheduleTaskPositionList[scheduleTask.scheduleTaskNo][0] += 1;
        //                 scheduleTaskPositionList[scheduleTask.scheduleTaskNo][1] += 1;
        //             }
        //
        //             if(scheduleTaskPositionList[compTask.scheduleTaskNo] === undefined) {
        //                 scheduleTaskPositionList[compTask.scheduleTaskNo] = [1, 2];
        //             } else {
        //                 scheduleTaskPositionList[compTask.scheduleTaskNo][1] += 1;
        //             }
        //         } else {
        //
        //         }
        //     }
        //
        //     addScheduleTaskDivList[scheduleTask.scheduleTaskNo] = scheduleTaskDiv;
        //
        //     //dayScheduleTimeMain.current.appendChild(scheduleTaskDiv);
        //
        // }
        //
        // //중복시간 가진 task들 div width 다시 세팅
        // for(const key in scheduleTaskPositionList) {
        //     let addScheduleTaskDiv = addScheduleTaskDivList[key];
        //     let scheduleTaskPosition = scheduleTaskPositionList[key];
        //
        //     console.log(addScheduleTaskDivList[key]);
        //
        //     addScheduleTaskDiv.style.left = ((dayScheduleTimeMain.current.clientWidth / scheduleTaskPosition[1]) * (scheduleTaskPosition[0] - 1)) + "px";
        //     addScheduleTaskDiv.style.width = dayScheduleTimeMain.current.clientWidth / scheduleTaskPosition[1] + "px";
        //
        //     console.log(addScheduleTaskDivList[key]);
        // }
        //
        // for(const key in addScheduleTaskDivList) {
        //     dayScheduleTimeMain.current.appendChild(addScheduleTaskDivList[key]);
        // }

        const now = new Date();
        setCurrentTime(now);

        let scrollY = ((now.getHours() + now.getMinutes()/60 + now.getSeconds()/3600) * hourHeight) - (dayScheduleTimeScroll.current.clientWidth / 3);

        // if(scrollY < 0) scrollY = 0;

        dayScheduleTimeScroll.current.scrollTop = scrollY;

        //schedule 총 합계 표시
        // let totalScheduleDiv = document.getElementById("totalScheduleDiv");
        // totalScheduleDiv.innerText = "합계 : " + totalSchedule + "원";

        // let plusScheduleDiv = document.getElementById("plusScheduleDiv");
        // plusScheduleDiv.innerText = "수입 : " + plusSchedule + "원";
        //
        // let minusScheduleDiv = document.getElementById("minusScheduleDiv");
        // minusScheduleDiv.innerText = "지출 : " + minusSchedule + "원";

    }

    const setCurrentTime = (now) => {
        const nowHeight = (now.getHours() + now.getMinutes()/60 + now.getSeconds()/3600) * hourHeight;

        currentTimeTextDiv.current.style.top = (nowHeight - (fontSize / 4)) + "px";
        currentTimeDiv.current.style.top = (nowHeight + (fontSize / 2)) + "px";

    }

    useEffect(() => {
        setData();

    },[props.today, props.getScheduleTaskList]);
    
    const onClick = () => {
        console.log("add task");
    }

    return (
        <div className="defaultReactDiv">
            <div ref={dayScheduleTimeScroll} className={css.dayScheduleTimeScroll}>
                <div ref={dayScheduleTime} className={css.dayScheduleTime}>
                    <div ref={dayScheduleTimeSide} className={css.dayScheduleTimeSide}>
                    </div>
                    <div ref={dayScheduleTimeMain} className={css.dayScheduleTimeMain} onClick={onClick}>
                        <div ref={currentTimeDiv} className={css.currentTimeDiv}/>
                    </div>
                    <div ref={dayScheduleTimeRightSide} className={css.dayScheduleTimeRightSide}>
                        <div ref={currentTimeTextDiv} className={css.currentTimeTextDiv}>now</div>
                    </div>
                </div>
            </div>
            {/*<div id="dayScheduleTask" className={css.dayScheduleTask}>*/}
            {/*    <AddScheduleTask mainCategoryList={props.mainCategoryList} subCategoryList={props.subCategoryList} getScheduleTaskList={props.getScheduleTaskList}></AddScheduleTask>*/}
            {/*    <AddScheduleCategory mainCategoryList={props.mainCategoryList} subCategoryList={props.subCategoryList} getScheduleTaskList={props.getScheduleTaskList}></AddScheduleCategory>*/}

            {/*</div>*/}
        </div>
    );
}

export default ScheduleDayComponent;