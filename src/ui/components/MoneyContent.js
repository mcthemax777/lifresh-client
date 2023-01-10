import React from 'react';
import css from "./MoneyDayComponent.module.css";
function MoneyContent(props) {

    const removeTaskBtnPath = "img/remove_task_btn.png";
    const onClick = () => {
        // eslint-disable-next-line no-restricted-globals
        let rmConfirm = confirm(props.moneyTask.moneyTaskNo + "을 지우시겠습니까?");
        if (rmConfirm === true)
            props.removeMoneyTask(props.moneyTask.moneyTaskNo);
    }

    return (
        <div className={css.dayMoneyTaskDiv}>
            <div className={css.dayMoneyTaskMCDiv}>{props.moneyTask.subCategoryNo}</div>
            <div className={css.dayMoneyTaskDetailDiv}>
                <div className={css.dayMoneyTaskMoneyDiv}>{props.moneyTask.money}</div>
                <div>{props.moneyTask.detail}</div>
                <div>{props.moneyTask.startTime.substring(10, 16)}</div>
            </div>
            <button className={css.dayMoneyTaskRemoveDiv} onClick={onClick}>
                {<img src={removeTaskBtnPath} width={24} height={24} />}
            </button>
        </div>
    );
}

export default MoneyContent;