import React, {useEffect, useState} from 'react';
import {AppContext} from "../../App";
import {useNavigate} from "react-router-dom";
import SendData from "../../api/SendData";
import '../../Global.css';
import MoneyContent from "../components/MoneyContent";
import {
    checkErrorResponse, checkIsMonth,
    checkIsToday,
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

function MoneyPage(props) {
    const store = React.useContext(AppContext)
    let navigate = useNavigate();

    const [mainCategoryList, setMainCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [moneyTaskList, setMoneyTaskList] = useState([]);
    const [minusMoney, setMinusMoney] = useState(0);
    const [plusMoney, setPlusMoney] = useState(0);

    const uid = localStorage.getItem("uid");
    const sid = localStorage.getItem("sid");

    const getMoneyTaskListCallback = (response) => {

        const data = response.data;

        if(checkErrorResponse(data, navigate) === false) {
            return ;
        }

        //없애도 될듯 (이 페이지에서 저장함)
        store.setMoneyTaskList(data.moneyTaskList);

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
            console.log("setTotalMoney1");

            const moneyTask = moneyTaskList[i];
            const taskStartTime = new Date(moneyTask.startTime);

            if((props.periodType === PERIOD_TYPE_DAY && checkIsToday(props.today, taskStartTime) === false) ||
                (props.periodType === PERIOD_TYPE_WEEK && checkIsToday(props.today, taskStartTime) === false) ||
                (props.periodType === PERIOD_TYPE_MONTH && checkIsMonth(props.today, taskStartTime) === false) ||
                (props.periodType === PERIOD_TYPE_YEAR && checkIsToday(props.today, taskStartTime) === false)) {
                console.log(moneyTask);
                continue;
            }
            console.log("setTotalMoney2");

            if(moneyTaskList[i].money > 0) resultPlusMoney += moneyTaskList[i].money;
            else resultMinusMoney += moneyTaskList[i].money;
        }

        setPlusMoney(resultPlusMoney);
        setMinusMoney(resultMinusMoney);
    }

    useEffect(() => {

        setTotalMoney(moneyTaskList);

    }, [props.today, props.periodType]);

    const removeMoneyTaskListCallback = (response) => {

        const data = response.data;

        if(checkErrorResponse(data, navigate) === false)
        {
            return ;
        }

        getMoneyTaskList();
    }

    const removeMoneyTaskListErr = (response) => {
        console.log("removeMoneyTaskListErr" + response);
    }

    const removeMoneyTask = (moneyTaskNo) => {
        console.log("remove - moneyTaskNo : " + moneyTaskNo);

        SendData("removeMoneyTaskList",
            {
                uid: uid,
                sid: sid,
                moneyTaskNoList: [moneyTaskNo]
            },
            removeMoneyTaskListCallback,
            removeMoneyTaskListErr
        );
    }

    const getMainCategoryNameByNo = (mainCategoryNo) => {

        for(let i = 0 ; i < mainCategoryList.length ; i++) {
            if (Number(mainCategoryList[i].mainCategoryNo) === mainCategoryNo) {
                return mainCategoryList[i].name;
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

    const plusMoneyTaskComponentList = moneyTaskList.map((moneyTask, index) => (
        moneyTask.money > 0 &&
        <MoneyContent key={index} moneyTask={moneyTask} mainName={getMainCategoryNameByNo(moneyTask.mainCategoryNo)} subName={getSubCategoryNameByNo(moneyTask.subCategoryNo)} removeFunc={removeMoneyTask}/>
    ));

    const minusMoneyTaskComponentList = moneyTaskList.map((moneyTask, index) => (
        moneyTask.money < 0 &&
        <MoneyContent key={index} moneyTask={moneyTask} mainName={getMainCategoryNameByNo(moneyTask.mainCategoryNo)} subName={getSubCategoryNameByNo(moneyTask.subCategoryNo)} removeFunc={removeMoneyTask}/>
    ));



    return(
        <div id="moneyDiv" className={css.moneyDiv}>
            <div id="moneySumDiv" className={css.moneySumDiv}>
                {/*<div id="totalMoneyDiv" className={css.totalMoneyDiv}></div>*/}
                <div id="plusMoneyDiv" className={css.plusMoneyDiv}> 수입 : {plusMoney}원</div>
                <div id="minusMoneyDiv" className={css.minusMoneyDiv}> 지출 : {minusMoney}원</div>
            </div>
            <div  className={css.plannerContent}>
                {props.periodType === PERIOD_TYPE_DAY && <MoneyDayComponent className={css.daySchedule} moneyTaskLisk={moneyTaskList} today={props.today} mainCategoryList={mainCategoryList} subCategoryList={subCategoryList} getMoneyTaskList={getMoneyTaskList} getSubCategoryNameByNo={getSubCategoryNameByNo}/> }
                {props.periodType === PERIOD_TYPE_WEEK && <MoneyWeekComponent className={css.daySchedule} moneyTaskLisk={moneyTaskList} today={props.today}/> }
                {props.periodType === PERIOD_TYPE_MONTH && <MoneyMonthComponent className={css.daySchedule} moneyTaskList={moneyTaskList} today={props.today}/> }
                {props.periodType === PERIOD_TYPE_YEAR && <MoneyYearComponent className={css.daySchedule} moneyTaskLisk={moneyTaskList} today={props.today}/> }
            </div>
       </div>
        //
        // <div>
        //     <h2>가계부</h2>
        //     <h3> 총 지출 : {minusMoney}원</h3>
        //     {minusMoneyTaskComponentList}
        //     <h3> 총 수입 : {plusMoney}원</h3>
        //     {plusMoneyTaskComponentList}
        //     <AddMoneyTask mainCategoryList={mainCategoryList} subCategoryList={subCategoryList} getMoneyTaskList={getMoneyTaskList}></AddMoneyTask>
        //     <AddMoneyCategory mainCategoryList={mainCategoryList} subCategoryList={subCategoryList} getMoneyTaskList={getMoneyTaskList}></AddMoneyCategory>
        // </div>
    )
}

export default MoneyPage;