import React, {useContext} from 'react';
import css from "./MoneyDayComponent.module.css";
import {checkErrorResponse} from "../../Defines";
import SendData from "../../api/SendData";
import {MoneyContext} from "../pages/MoneyPage";
import {useNavigate} from "react-router-dom";
function MoneyContent(props) {

    const navigate = useNavigate();
    const { store, getMainCategoryNameBySubCategoryNo, getSubCategoryNameByNo } = useContext(MoneyContext);

    const removeTaskBtnPath = "img/remove_task_btn.png";
    const onClick = () => {
        // eslint-disable-next-line no-restricted-globals
        let rmConfirm = confirm(props.moneyTask.moneyTaskNo + "을 지우시겠습니까?");
        if (rmConfirm === true)
            removeMoneyTask(props.moneyTask.moneyTaskNo);
    }

    const removeMoneyTaskListCallback = (response, sendData) => {

        const data = response.data;

        if(checkErrorResponse(data, navigate) === false)
        {
            return ;
        }


        let copyMoneyTaskList = [...store.moneyTaskList];

        for( let i = 0; i < copyMoneyTaskList.length; i++) {
            if ( sendData.moneyTaskNoList.includes(copyMoneyTaskList[i].moneyTaskNo)) {
                copyMoneyTaskList.splice(i, 1);
            }
        }

        store.setMoneyTaskList(copyMoneyTaskList);
    }

    const removeMoneyTaskListErr = (response) => {
        console.log("removeMoneyTaskListErr" + response);
    }

    const removeMoneyTask = (moneyTaskNo) => {

        const uid = localStorage.getItem("uid");
        const sid = localStorage.getItem("sid");

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

    return (
        <div className={css.dayMoneyTaskDiv}>
            <div className={css.dayMoneyTaskMCDiv}>{getMainCategoryNameBySubCategoryNo(props.moneyTask.subCategoryNo)}</div>
            <div className={css.dayMoneyTaskDetailDiv}>
                <div className={css.dayMoneyTaskMoneyDiv}>{props.moneyTask.money}</div>
                <div>{getSubCategoryNameByNo(props.moneyTask.subCategoryNo) + (props.moneyTask.detail !== "" ? (" - " + props.moneyTask.detail) : "")}</div>
                <div>{props.moneyTask.startTime.substring(10, 16)}</div>
            </div>
            <button className={css.dayMoneyTaskRemoveDiv} onClick={onClick}>
                {<img src={removeTaskBtnPath} width={24} height={24} />}
            </button>
        </div>
    );
}

export default MoneyContent;