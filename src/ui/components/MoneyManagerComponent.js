import React, {useContext, useEffect, useRef, useState} from 'react';
import css from "./MoneyManagerComponent.module.css";
import DayMoneyTaskGroupList from "./DayMoneyTaskGroupList";
import {MoneyContext} from "../pages/MoneyPage";
import {
    convertDateTimeLocalToTime,
    convertDateTimeToString,
    MONEY_MANAGER_TYPE_CASH, MONEY_MANAGER_TYPE_CHECK_CARD,
    MONEY_MANAGER_TYPE_COUNT, MONEY_MANAGER_TYPE_CREDIT_CARD
} from "../../Defines";
import MoneyManagerGroupList from "./MoneyManagerGroupList";

function MoneyManagerComponent(props) {

    const dayMoneyTimeScroll = useRef();
    const dayMoneyTask = useRef();
    const { store, } = useContext(MoneyContext);

    const [moneyManagerListWithoutCard, setMoneyManagerListWithoutLinkedCard] = useState([]);
    const [moneyManagerListLinkedCard, setMoneyManagerListLinkedCard] = useState([]);

    useEffect(() => {

        let newMoneyManagerListWithoutCard = [];
        let newMoneyManagerListLinkedCard = [];

        console.log(store.moneyManagerList);


        for(let i = 0 ; i < store.moneyManagerList.length; i++) {
            let moneyManager = store.moneyManagerList[i];

            if(moneyManager.moneyManagerType === MONEY_MANAGER_TYPE_CREDIT_CARD ||
                moneyManager.moneyManagerType === MONEY_MANAGER_TYPE_CHECK_CARD) {
                if(newMoneyManagerListLinkedCard[moneyManager.linkedMoneyManagerNo] === undefined)
                    newMoneyManagerListLinkedCard[moneyManager.linkedMoneyManagerNo] = [];
                newMoneyManagerListLinkedCard[moneyManager.linkedMoneyManagerNo][moneyManager.moneyManagerNo] = moneyManager;
            } else {
                newMoneyManagerListWithoutCard[moneyManager.moneyManagerNo] = moneyManager;

            }
        }

        console.log(newMoneyManagerListWithoutCard);
        console.log(newMoneyManagerListLinkedCard);

        setMoneyManagerListWithoutLinkedCard(newMoneyManagerListWithoutCard);
        setMoneyManagerListLinkedCard(newMoneyManagerListLinkedCard);

    }, []);


    const setData = () => {

        // //기존 moneyTask 제거
        // const moneyTaskTimeDivList = Array.from(
        //     document.getElementsByClassName(css.moneyTaskTimeDiv)
        // );
        //
        // for (let i = 0; i < moneyTaskTimeDivList.length; i++) {
        //     dayMoneyTask.current.removeChild(moneyTaskTimeDivList[i]);
        // }
        //
        // const moneyTaskDivList = Array.from(
        //     document.getElementsByClassName(css.moneyTaskDiv)
        // );
        //
        // for (let i = 0; i < moneyTaskDivList.length; i++) {
        //     dayMoneyTask.current.removeChild(moneyTaskDivList[i]);
        // }
        //
        // //데이터 삽입
        // let moneyTaskList = props.moneyTaskList;
        //
        // let resultGroupList = {};
        //
        // for(let i = 0; i < moneyTaskList.length; i++) {
        //
        //     const moneyTask = moneyTaskList[i];
        //     const taskStartTime = new Date(moneyTask.startTime);
        //
        //     // if(checkIsToday(props.today, taskStartTime) === false) {
        //     //     continue;
        //     // }
        //
        //     setTotalMoney(totalMoney + moneyTask.money);
        //     if(moneyTask.money > 0) setPlusMoney(plusMoney + moneyTask.money);
        //     else setMinusMoney(minusMoney + moneyTask.money);
        //
        //     taskStartTime.setHours(0);
        //     taskStartTime.setMinutes(0);
        //     taskStartTime.setSeconds(0);
        //     taskStartTime.setMilliseconds(0);
        //
        //     const taskDate = convertDateTimeToString(taskStartTime);
        //
        //     resultGroupList[taskDate] === undefined ? resultGroupList[taskDate] = [moneyTask] : resultGroupList[taskDate].push(moneyTask);
        // }
        //
        // setGroupList(resultGroupList);
    }

    // useEffect(() => {
    //     setData();
    // },[props.today, store.filterList, props.moneyTaskList]);

    return (
        <div className="defaultReactDiv">

            <div ref={dayMoneyTimeScroll} className={css.dayMoneyTimeScroll}>
                <div ref={dayMoneyTask} className={css.dayMoneyTask}>
                    {
                        moneyManagerListWithoutCard.map((moneyManager, index) => (
                            <MoneyManagerGroupList key={index} moneyManager={moneyManager} linkedCardList={moneyManagerListLinkedCard[moneyManager.moneyManagerNo]}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default MoneyManagerComponent;