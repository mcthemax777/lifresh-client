import React, {useEffect, useState} from 'react';
import {AppContext} from "../../App";
import {useNavigate} from "react-router-dom";
import SendData from "../../api/SendData";
import '../../Global.css';
import AddMoneyTask from "../components/AddMoneyTask";
import MoneyContent from "../components/MoneyContent";
import {checkErrorResponse} from "../../Defines";
import AddMoneyCategory from "../components/AddMoneyCategory";
import css from "./MoneyPage.module.css";

function MoneyPage() {
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

        setPlusMoney(0);
        setMinusMoney(0);

        let pm = 0;
        let nm = 0;

        for(let i = 0 ; i < data.moneyTaskList.length ; i++) {
            const money = Number(data.moneyTaskList[i].money);

            if(money > 0) pm += money
            else nm -= money
        }

        setPlusMoney(pm);
        setMinusMoney(nm);
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

    useEffect(() => {
        console.log("change moneyTaskList!");

    }, [moneyTaskList]);

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
        <div id="scheduleDiv">
            <div id="daySchedule" className={css.daySchedule}>
                <div id="dayScheduleTimeScroll" className={css.dayScheduleTimeScroll}>
                    <div id="dayScheduleTime" className={css.dayScheduleTime}>
                        <div id="dayScheduleTimeSide" className={css.dayScheduleTimeSide}>
                        </div>
                        <div id="dayScheduleTimeMain" className={css.dayScheduleTimeMain}>

                        </div>
                    </div>
                </div>
                <div id="dayScheduleTask" className={css.dayScheduleTask}>

                </div>
            </div>
            <div id="weekSchedule" className={css.weekSchedule}></div>
            <div id="monthSchedule" className={css.monthSchedule}>
                <div id="monthScheduleCalendar" className={css.monthScheduleCalendar}>
                </div>
            </div>
            <div id="yearSchedule" className={css.yearSchedule}></div>
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