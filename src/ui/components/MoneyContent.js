import React from 'react';
function MoneyContent(props) {

    const onClick = () => {
        // eslint-disable-next-line no-restricted-globals
        let rmConfirm = confirm(props.moneyTask.moneyTaskNo + "을 지우시겠습니까?");
        if (rmConfirm === true)
            props.removeFunc(props.moneyTask.moneyTaskNo);
    }

    return (
        <div>
            {props.moneyTask.moneyTaskNo} / {props.moneyTask.money > 0 ? "수입" : "지출"} / {props.mainName} /  {props.subName} / {props.moneyTask.money > 0 ? props.moneyTask.money : props.moneyTask.money * -1} / {props.moneyTask.startTime} / {props.moneyTask.detail}
            <button onClick={onClick}>
                REMOVE
            </button>
        </div>
    );
}

export default MoneyContent;