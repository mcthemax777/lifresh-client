import React, {useEffect, useRef, useState} from 'react';
import {AppContext} from "../../App";
import {useNavigate} from "react-router-dom";
import SendData from "../../api/SendData";
import '../../Global.css';
import MoneyContent from "../components/MoneyContent";
import {
    checkErrorResponse,
    PERIOD_TYPE_DAY,
    PERIOD_TYPE_MONTH,
    PERIOD_TYPE_WEEK,
    PERIOD_TYPE_YEAR
} from "../../Defines";
import css from "./MoneyPage.module.css";
import MoneyDayComponent from "../components/MoneyDayComponent";
import MoneyYearComponent from "../components/MoneyYearComponent";
import MoneyWeekComponent from "../components/MoneyWeekComponent";
import MoneyMonthComponent from "../components/MoneyMonthComponent";
import AddMoneyTask from "../components/AddMoneyTask";

export const MoneyContext = React.createContext()

function MoneyPage(props) {
    let navigate = useNavigate();

    const [mainCategoryList, setMainCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [moneyTaskList, setMoneyTaskList] = useState([]);
    const [minusMoney, setMinusMoney] = useState(0);
    const [plusMoney, setPlusMoney] = useState(0);
    const [isAddTask, setIsAddTask] = useState(false);

    const store = {
        mainCategoryList, setMainCategoryList,
        subCategoryList, setSubCategoryList,
        moneyTaskList, setMoneyTaskList,
        minusMoney, setMinusMoney,
        plusMoney, setPlusMoney,
        isAddTask, setIsAddTask,

    }


    const uid = localStorage.getItem("uid");
    const sid = localStorage.getItem("sid");

    const moneyComponentDiv = useRef();

    const getMoneyTaskListCallback = (response) => {

        const data = response.data;

        if(checkErrorResponse(data, navigate) === false) {
            return ;
        }

        //정렬하기
        data.moneyTaskList.sort(function(a, b)  {
            if(a.startTime > b.startTime) return -1;
            if(a.startTime === b.startTime) return 0;
            if(a.startTime < b.startTime) return 1;
        });

        setMainCategoryList(data.mainCategoryList);
        setSubCategoryList(data.subCategoryList);
        setMoneyTaskList(data.moneyTaskList);

        setTotalMoney(data.moneyTaskList);
    }

    const getMoneyTaskListErr = (response) => {
        console.log("error" + response);
    }

    const getMoneyTaskList = () =>
    {
        SendData("getMoneyTaskList",
            {
                uid: uid,
                sid: sid
            },
            getMoneyTaskListCallback,
            getMoneyTaskListErr
        );
    }

    useEffect(() => {
        getMoneyTaskList();
    }, []);

    const setTotalMoney = (moneyTaskList) => {

        let resultPlusMoney = 0;
        let resultMinusMoney = 0;

        for(let i = 0 ; i < moneyTaskList.length; i++) {

            const moneyTask = moneyTaskList[i];
            const taskStartTime = new Date(moneyTask.startTime);

            // if((props.periodType === PERIOD_TYPE_DAY && checkIsToday(props.today, taskStartTime) === false) ||
            //     (props.periodType === PERIOD_TYPE_WEEK && checkIsToday(props.today, taskStartTime) === false) ||
            //     (props.periodType === PERIOD_TYPE_MONTH && checkIsMonth(props.today, taskStartTime) === false) ||
            //     (props.periodType === PERIOD_TYPE_YEAR && checkIsToday(props.today, taskStartTime) === false)) {
            //     continue;
            // }

            if(moneyTaskList[i].money > 0) resultPlusMoney += moneyTaskList[i].money;
            else resultMinusMoney += moneyTaskList[i].money;
        }

        setPlusMoney(resultPlusMoney);
        setMinusMoney(resultMinusMoney);
    }

    useEffect(() => {

        setTotalMoney(moneyTaskList);

    }, [props.today, props.periodType]);

    const getMainCategoryNameByNo = (mainCategoryNo) => {

        for(let i = 0 ; i < mainCategoryList.length ; i++) {
            if (Number(mainCategoryList[i].mainCategoryNo) === mainCategoryNo) {
                return mainCategoryList[i].name;
            }
        }

        return "NONE";
    }

    const getMainCategoryNameBySubCategoryNo = (subCategoryNo) => {

        for(let i = 0 ; i < subCategoryList.length ; i++) {
            if (Number(subCategoryList[i].subCategoryNo) === subCategoryNo) {
                for(let i = 0 ; i < mainCategoryList.length ; i++) {
                    if (Number(mainCategoryList[i].mainCategoryNo) === Number(subCategoryList[i].mainCategoryNo)) {
                        return mainCategoryList[i].name;
                    }
                }
            }
        }

        return "NONE";
    }

    const getSubCategoryNameByNo = (subCategoryNo) => {

        for(let i = 0 ; i < subCategoryList.length ; i++) {
            if (Number(subCategoryList[i].subCategoryNo) === subCategoryNo) {
                return subCategoryList[i].name;
            }
        }

        return "NONE";
    }

    const [addTaskBtn, setAddTaskBtn] = useState(0);

    const moneyAddTaskBtnPath = "img/money_add_task_btn.png";
    const moneyAddTaskBtnClickPath = "img/money_add_task_btn_click.png";

    const clickAddTaskBtn = () => {
        console.log("clickAddTaskBtn");

        setIsAddTask(true);
    }

    //화면 크기에 따라 데이터 보일지 안보일지 세팅
    const moneyPageDiv = useRef();
    useEffect(() => {
        if(props.isMoneyPageDisplay === true) {
            moneyPageDiv.current.style.display = "flex";
        } else {
            moneyPageDiv.current.style.display = "none";
        }

    }, [props.isMoneyPageDisplay]);

    return(
        <MoneyContext.Provider value={{store, getMainCategoryNameByNo, getSubCategoryNameByNo, getMainCategoryNameBySubCategoryNo}}>
            <div ref={moneyPageDiv} className={css.moneyPageDiv}>
                <div className={css.moneyTitleDiv}>가계부</div>
                <div id="moneySumDiv" className={css.moneySumDiv}>
                    {/*<div id="totalMoneyDiv" className={css.totalMoneyDiv}></div>*/}
                    <div id="plusMoneyDiv" className={css.plusMoneyDiv}> 수입 : {plusMoney}원</div>
                    <div id="minusMoneyDiv" className={css.minusMoneyDiv}> 지출 : {minusMoney}원</div>
                </div>
                <div ref={moneyComponentDiv} className={css.moneyComponentDiv}>
                    {props.periodType === PERIOD_TYPE_DAY && <MoneyDayComponent className={css.daySchedule} today={props.today}/> }
                    {props.periodType === PERIOD_TYPE_WEEK && <MoneyWeekComponent className={css.daySchedule} moneyTaskLisk={moneyTaskList} today={props.today}/> }
                    {props.periodType === PERIOD_TYPE_MONTH && <MoneyMonthComponent className={css.daySchedule} today={props.today}/> }
                    {props.periodType === PERIOD_TYPE_YEAR && <MoneyYearComponent className={css.daySchedule} moneyTaskLisk={moneyTaskList} today={props.today}/> }
                </div>
                <button onClick={clickAddTaskBtn} className="addTaskBtn" onMouseDown={() => {setAddTaskBtn(1); clickAddTaskBtn();}} onMouseUp={() => setAddTaskBtn(0)} onMouseLeave={() => setAddTaskBtn(0)} >
                    { addTaskBtn === 0 && <img src={moneyAddTaskBtnPath} width={64} height={64} /> }
                    { addTaskBtn === 1 && <img src={moneyAddTaskBtnClickPath} width={64} height={64} /> }
                </button>
                {
                    isAddTask === true ? <AddMoneyTask/> : <div></div>
                }
            </div>
        </MoneyContext.Provider>
    )
}

export default MoneyPage;