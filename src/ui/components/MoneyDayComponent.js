import React, {useEffect, useRef, useState} from 'react';
import css from "./MoneyDayComponent.module.css";
import DayMoneyTaskGroupList from "./DayMoneyTaskGroupList";
import {MoneyContext} from "../pages/MoneyPage";

function MoneyDayComponent(props) {

    const dayMoneyTimeScroll = useRef();
    const dayMoneyTask = useRef();


    const [totalMoney, setTotalMoney] = useState(0);
    const [minusMoney, setMinusMoney] = useState(0);
    const [plusMoney, setPlusMoney] = useState(0);
    const [groupList, setGroupList] = useState({});
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
        setData();
    }, []);



    const setData = () => {

        //기존 moneyTask 제거
        const moneyTaskTimeDivList = Array.from(
            document.getElementsByClassName(css.moneyTaskTimeDiv)
        );

        for (let i = 0; i < moneyTaskTimeDivList.length; i++) {
            dayMoneyTask.current.removeChild(moneyTaskTimeDivList[i]);
        }

        const moneyTaskDivList = Array.from(
            document.getElementsByClassName(css.moneyTaskDiv)
        );

        for (let i = 0; i < moneyTaskDivList.length; i++) {
            dayMoneyTask.current.removeChild(moneyTaskDivList[i]);
        }

        //데이터 삽입
        let moneyTaskList = props.moneyTaskList;

        let resultGroupList = {};

        for(let i = 0; i < moneyTaskList.length; i++) {

            const moneyTask = moneyTaskList[i];
            const taskStartTime = new Date(moneyTask.startTime);

            // if(checkIsToday(props.today, taskStartTime) === false) {
            //     continue;
            // }

            setTotalMoney(totalMoney + moneyTask.money);
            if(moneyTask.money > 0) setPlusMoney(plusMoney + moneyTask.money);
            else setMinusMoney(minusMoney + moneyTask.money);

            const date = taskStartTime.getDate();
            const month = taskStartTime.getMonth();
            const year = taskStartTime.getFullYear();
            const taskDate = year + "." + (month+1) + "." + date;

            resultGroupList[taskDate] === undefined ? resultGroupList[taskDate] = [moneyTask] : resultGroupList[taskDate].push(moneyTask);
        }

        setGroupList(resultGroupList);
    }

    useEffect(() => {
        setData();
    },[props.today, props.moneyTaskList]);

    return (
        <div className="defaultReactDiv">
            <div ref={dayMoneyTimeScroll} className={css.dayMoneyTimeScroll}>
                <div ref={dayMoneyTask} className={css.dayMoneyTask}>
                    {
                        Object.entries(groupList).map((moneyTaskList, index) => (
                            <DayMoneyTaskGroupList key={index} moneyTaskList={moneyTaskList} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default MoneyDayComponent;