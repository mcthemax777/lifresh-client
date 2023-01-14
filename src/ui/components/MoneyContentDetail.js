import React, {useContext} from 'react';
import css from "./MoneyContentDetail.module.css";
import {checkErrorResponse} from "../../Defines";
import SendData from "../../api/SendData";
import {MoneyContext} from "../pages/MoneyPage";
import {useNavigate} from "react-router-dom";
function MoneyContentDetail(props) {

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

    const dollarIconPath = 'img/dollar_icon.png';

    return (
        <div className={css.moneyContentDetailDiv}>

            <div className={css.moneyContentDetailDataDiv}>
                <div className={css.moneyContentDetailTextDiv}> 대분류 : {getMainCategoryNameBySubCategoryNo(props.moneyTask.subCategoryNo)}</div>
                <div className={css.moneyContentDetailTextDiv}> 중분류 : {getSubCategoryNameByNo(props.moneyTask.subCategoryNo)}</div>
                <div className={css.moneyContentDetailTextDiv}> 설명 : {props.moneyTask.detail}</div>
                <div className={css.moneyContentDetailTextDiv}> 금액 : {props.moneyTask.money}</div>
                <div className={css.moneyContentDetailTextDiv}> 사용시간 : {props.moneyTask.startTime}</div>
            </div>
            <div className={css.detailBtn}>
            <button className={css.dayMoneyTaskRemoveDiv} onClick={onClick}>
                {<img src={removeTaskBtnPath} width={24} height={24} alt=''/>}
            </button>
            </div>
        </div>
    );
}

export default MoneyContentDetail;