import React, {useContext, useEffect, useRef, useState} from 'react';
import css from "./MoneyDayComponent.module.css";
import {MONEY_ADD_TYPE_PLUS} from "../../Defines";
import {MoneyContext} from "../pages/MoneyPage";
import MoneyContentDetail from "./MoneyContentDetail";
function MoneyContent(props) {

    const { store, getMainCategoryNameByNo, getSubCategoryNameByNo, setActiveDetail } = useContext(MoneyContext);

    const [isClicked, setIsClicked] = useState(false);

    const dollarIconPath = 'img/dollar_icon.png';

    const onClick = () => {
        console.log(this);
        if(isClicked) {
            setActiveDetail(props.moneyTask.moneyTaskNo, undefined);
            setIsClicked(false);
        } else {
            //다른 detail 창 닫기
            setActiveDetail(props.moneyTask.moneyTaskNo, closeDetail);
            setIsClicked(true);
        }
    }

    useEffect(() => {
        console.log(Number(props.moneyTask.categoryType));
        if(Number(props.moneyTask.categoryType) === MONEY_ADD_TYPE_PLUS) {
            dayMoneyTaskMoneyDiv.current.style.color = "#00ff00";
        } else {
            dayMoneyTaskMoneyDiv.current.style.color = "#2f2f2f";
        }
    }, []);

    const dayMoneyTaskMoneyDiv = useRef();

    const closeDetail = () => {
        setIsClicked(false);
    }

    return (
        <div className={css.dayMoneyTaskWithDetailDiv}>
            <div className={css.dayMoneyTaskDiv} onClick={onClick}>
                <div className={css.dayMoneyTaskMCDiv}>{<img src={dollarIconPath} width={42} height={42} alt='' />}</div>
                <div className={css.dayMoneyTaskDetailDiv}>
                    <div className={css.dayMoneyTaskDetailCategoryDiv}>{getMainCategoryNameByNo(props.moneyTask.mainCategoryNo) + (getSubCategoryNameByNo(props.moneyTask.subCategoryNo) !== '기본' ? (" - " + getSubCategoryNameByNo(props.moneyTask.subCategoryNo)) : "")}</div>
                    <div className={css.dayMoneyTaskDetailTimeDiv} >{props.moneyTask.startTime.substring(10, 16)}</div>
                </div>
                <div ref={dayMoneyTaskMoneyDiv} className={css.dayMoneyTaskMoneyDiv}>{props.moneyTask.categoryType === MONEY_ADD_TYPE_PLUS ? props.moneyTask.money : -props.moneyTask.money}원</div>
                {/*<button className={css.dayMoneyTaskRemoveDiv} onClick={onClick}>*/}
                {/*    {<img src={removeTaskBtnPath} width={24} height={24} />}*/}
                {/*</button>*/}
            </div>
            {
                isClicked === true ? <MoneyContentDetail moneyTask={props.moneyTask} closeFunc={closeDetail}/> : <div/>
            }

        </div>
    );
}

export default MoneyContent;