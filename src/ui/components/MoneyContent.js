import React, {useContext, useEffect, useRef, useState} from 'react';
import css from "./MoneyDayComponent.module.css";
import {checkErrorResponse} from "../../Defines";
import SendData from "../../api/SendData";
import {MoneyContext} from "../pages/MoneyPage";
import {useNavigate} from "react-router-dom";
import MoneyContentDetail from "./MoneyContentDetail";
import AddMoneyTask from "./AddMoneyTask";
function MoneyContent(props) {

    const navigate = useNavigate();
    const { store, getMainCategoryNameBySubCategoryNo, getSubCategoryNameByNo } = useContext(MoneyContext);

    const [isClicked, setIsClicked] = useState(false);

    const removeTaskBtnPath = "img/remove_task_btn.png";

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

    const onClick = () => {
        console.log(isClicked);
        if(isClicked) setIsClicked(false);
        else setIsClicked(true);
    }

    useEffect(() => {
        if(Number(props.moneyTask.money) > 0) {
            dayMoneyTaskMoneyDiv.current.style.color = "#00ff00";
        }
    }, []);

    const dayMoneyTaskMoneyDiv = useRef();

    return (
        <div className={css.dayMoneyTaskWithDetailDiv} onClick={onClick}>
            <div className={css.dayMoneyTaskDiv} onClick={onClick}>
                <div className={css.dayMoneyTaskMCDiv}>{<img src={dollarIconPath} width={42} height={42} alt='' />}</div>
                <div className={css.dayMoneyTaskDetailDiv}>
                    <div className={css.dayMoneyTaskDetailCategoryDiv}>{getMainCategoryNameBySubCategoryNo(props.moneyTask.subCategoryNo) + (getSubCategoryNameByNo(props.moneyTask.subCategoryNo) !== '기본' ? (" - " + getSubCategoryNameByNo(props.moneyTask.subCategoryNo)) : "")}</div>
                    <div className={css.dayMoneyTaskDetailTimeDiv} >{props.moneyTask.startTime.substring(10, 16)}</div>
                </div>
                <div ref={dayMoneyTaskMoneyDiv} className={css.dayMoneyTaskMoneyDiv}>{props.moneyTask.money}원</div>
                {/*<button className={css.dayMoneyTaskRemoveDiv} onClick={onClick}>*/}
                {/*    {<img src={removeTaskBtnPath} width={24} height={24} />}*/}
                {/*</button>*/}
            </div>
            {
                isClicked === true ? <MoneyContentDetail moneyTask={props.moneyTask}/> : <div/>
            }

        </div>
    );
}

export default MoneyContent;