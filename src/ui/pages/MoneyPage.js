import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import SendData from "../../api/SendData";
import '../../Global.css';
import {
    checkErrorResponse,
    PERIOD_TYPE_DAY,
    PERIOD_TYPE_MONTH,
    PERIOD_TYPE_WEEK,
    PERIOD_TYPE_YEAR,
    PERIOD_TYPE_CUSTOM, convertStringToDateTime
} from "../../Defines";
import css from "./MoneyPage.module.css";
import MoneyDayComponent from "../components/MoneyDayComponent";
import MoneyYearComponent from "../components/MoneyYearComponent";
import MoneyWeekComponent from "../components/MoneyWeekComponent";
import MoneyMonthComponent from "../components/MoneyMonthComponent";
import AddMoneyTask from "../components/AddMoneyTask";
import MoneyDateComponent from "../components/MoneyDateComponent";

export const MoneyContext = React.createContext()

function MoneyPage(props) {
    let navigate = useNavigate();

    const [mainCategoryList, setMainCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [moneyTaskList, setMoneyTaskList] = useState([]);
    const [minusMoney, setMinusMoney] = useState(0);
    const [plusMoney, setPlusMoney] = useState(0);
    const [isAddTask, setIsAddTask] = useState(false);
    const [startDate, setStartDate] = useState(getTodayDateWithoutTime());
    const [endDate, setEndDate] = useState(getTodayDateWithoutTime());
    const [periodType, setPeriodType] = useState(PERIOD_TYPE_DAY);
    const [moneyTaskListWithFilter, setMoneyTaskListWithFilter] = useState([]);

    const store = {
        mainCategoryList, setMainCategoryList,
        subCategoryList, setSubCategoryList,
        moneyTaskList, setMoneyTaskList,
        minusMoney, setMinusMoney,
        plusMoney, setPlusMoney,
        isAddTask, setIsAddTask,
        startDate, setStartDate,
        endDate, setEndDate,
        periodType, setPeriodType,
    }

    const uid = localStorage.getItem("uid");
    const sid = localStorage.getItem("sid");

    const moneyComponentDiv = useRef();

    function getTodayDateWithoutTime() {
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);

        return date;
    }

    const isBetweenPeriod = (date) => {


        if (startDate.getFullYear() > date.getFullYear()) {
            return false;
        } else if(startDate.getFullYear() === date.getFullYear()) {
            if (startDate.getMonth() > date.getMonth()) {
                return false;
            } else if(startDate.getMonth() === date.getMonth()) {
                if (startDate.getDate() > date.getDate()) {
                    return false;
                }
            }
        }

        if (endDate.getFullYear() < date.getFullYear()) {
            return false;
        } else if(endDate.getFullYear() === date.getFullYear()) {
            if (endDate.getMonth() < date.getMonth()) {
                return false;
            } else if(endDate.getMonth() === date.getMonth()) {
                if (endDate.getDate() < date.getDate()) {
                    return false;
                }
            }
        }

        return true;
    }

    const loadMoneyTaskListCallback = (response) => {

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
    }

    const loadMoneyTaskListErr = (response) => {
        console.log("error" + response);
    }

    const loadMoneyTaskList = () =>
    {
        SendData("getMoneyTaskList",
            {
                uid: uid,
                sid: sid
            },
            loadMoneyTaskListCallback,
            loadMoneyTaskListErr
        );
    }

    useEffect(() => {
        loadMoneyTaskList();
    }, []);

    useEffect( () => {

        let newMoneyTaskListWithFilter = [];
        let newPlusMoney = 0;
        let newMinusMoney = 0;

        for(let i = 0; i < moneyTaskList.length; i++) {
            if(isBetweenPeriod(convertStringToDateTime(moneyTaskList[i].startTime))) {
                newMoneyTaskListWithFilter.push(moneyTaskList[i]);

                if(moneyTaskList[i].money > 0) newPlusMoney += moneyTaskList[i].money;
                else newMinusMoney += moneyTaskList[i].money;
            }
        }

        setMoneyTaskListWithFilter(newMoneyTaskListWithFilter);
        setPlusMoney(newPlusMoney);
        setMinusMoney(newMinusMoney);

    }, [startDate, endDate, moneyTaskList]);


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
                for(let j = 0 ; j < mainCategoryList.length ; j++) {
                    if (Number(mainCategoryList[j].mainCategoryNo) === Number(subCategoryList[i].mainCategoryNo)) {
                        return mainCategoryList[j].name;
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
        <MoneyContext.Provider value={{store, loadMoneyTaskList, getMainCategoryNameByNo, getSubCategoryNameByNo, getMainCategoryNameBySubCategoryNo}}>
            <div ref={moneyPageDiv} className={css.moneyPageDiv}>
                <div className={css.moneyTitleDiv}>가계부</div>
                <MoneyDateComponent />
                <div id="DateDiv" className={css.moneyDateDiv}>
                </div>
                <div id="moneySumDiv" className={css.moneySumDiv}>
                    {/*<div id="totalMoneyDiv" className={css.totalMoneyDiv}></div>*/}
                    <div id="plusMoneyDiv" className={css.plusMoneyDiv}> 수입 : {plusMoney}원</div>
                    <div id="minusMoneyDiv" className={css.minusMoneyDiv}> 지출 : {minusMoney}원</div>
                </div>
                <div ref={moneyComponentDiv} className={css.moneyComponentDiv}>
                    {props.periodType === PERIOD_TYPE_DAY && <MoneyDayComponent className={css.daySchedule} today={props.today} moneyTaskList={moneyTaskListWithFilter}/> }
                    {props.periodType === PERIOD_TYPE_WEEK && <MoneyWeekComponent className={css.daySchedule} moneyTaskLisk={moneyTaskList} today={props.today}/> }
                    {props.periodType === PERIOD_TYPE_MONTH && <MoneyMonthComponent className={css.daySchedule} today={props.today}/> }
                    {props.periodType === PERIOD_TYPE_YEAR && <MoneyYearComponent className={css.daySchedule} moneyTaskLisk={moneyTaskList} today={props.today}/> }
                </div>
                <button onClick={clickAddTaskBtn} className="addTaskBtn" onMouseDown={() => {setAddTaskBtn(1); clickAddTaskBtn();}} onMouseUp={() => setAddTaskBtn(0)} onMouseLeave={() => setAddTaskBtn(0)} >
                    { addTaskBtn === 0 && <img src={moneyAddTaskBtnPath} width={64} height={64}  alt='추가'/> }
                    { addTaskBtn === 1 && <img src={moneyAddTaskBtnClickPath} width={64} height={64}  alt='추가'/> }
                </button>
                {
                    isAddTask === true ? <AddMoneyTask/> : <div></div>
                }
            </div>
        </MoneyContext.Provider>
    )
}

export default MoneyPage;