import React, {useEffect} from 'react';
import css from "./MoneyDayComponent.module.css";
import MoneyContent from "./MoneyContent";
function DayMoneyTaskGroupList(props) {

    const onClick = () => {
        // eslint-disable-next-line no-restricted-globals
        let rmConfirm = confirm(props.moneyTask.moneyTaskNo + "을 지우시겠습니까?");
        if (rmConfirm === true)
            props.removeFunc(props.moneyTask.moneyTaskNo);
    }
    useEffect(() => {
        // console.log(props.moneyTaskList[1]);
    },[]);

    return (
        <div className={css.dayMoneyTaskGroupDiv}>
            <div className={css.dayMoneyTaskDateDiv}>{props.moneyTaskList[0]}</div>
            {
                props.moneyTaskList[1] !== undefined ? (
                props.moneyTaskList[1].map((moneyTask, index) => (
                    <MoneyContent key={index} moneyTask={moneyTask} removeMoneyTask={props.removeMoneyTask} />
                ))) : (
                    <div>NONE</div>
                )
            }
        </div>
    );
}

export default DayMoneyTaskGroupList;