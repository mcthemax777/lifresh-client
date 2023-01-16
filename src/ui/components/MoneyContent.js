import React, {useContext, useEffect, useRef, useState} from 'react';
import css from "./MoneyDayComponent.module.css";
import {
    MONEY_ADD_TYPE_MINUS,
    MONEY_ADD_TYPE_PLUS,
    MONEY_FILTER_TYPE_FIXED_SPEND,
    MONEY_FILTER_TYPE_FREE_SPEND
} from "../../Defines";
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
        console.log("useEffect[]")
        initText();
    }, []);

    useEffect(() => {
        console.log("useEffect[filterList]")
        initText();
    }, [store.filterList, props.moneyTask]);

    const initText = () => {
        console.log(props.moneyTask);

        let newMoneyText = "";
        let newOverMoneyText = "";


        if(Number(props.moneyTask.categoryType) === MONEY_ADD_TYPE_PLUS) {
            dayMoneyTaskMoneyDiv.current.style.color = "#00ff00";
            newMoneyText = props.moneyTask.money;
        } else {
            if(store.filterList[MONEY_FILTER_TYPE_FIXED_SPEND] && store.filterList[MONEY_FILTER_TYPE_FREE_SPEND]) {

                newMoneyText = "-" + props.moneyTask.money;
                if(props.moneyTask.overMoney !== 0) newOverMoneyText = overMoneyTextStr + "-" + props.moneyTask.overMoney + wonText;

                dayMoneyTaskMoneyDiv.current.style.color = "#2f2f2f";

                if(Number(props.moneyTask.overMoney) === 0) {
                    overMoneyTextRef.current.style.color = "#1f1fff";
                } else {
                    overMoneyTextRef.current.style.color = "#ff1f1f";
                }

            } else if(store.filterList[MONEY_FILTER_TYPE_FIXED_SPEND]) {
                dayMoneyTaskMoneyDiv.current.style.color = "#2f2f2f";
                newMoneyText = "-" + (props.moneyTask.money - props.moneyTask.overMoney);
            } else if(store.filterList[MONEY_FILTER_TYPE_FREE_SPEND]) {
                dayMoneyTaskMoneyDiv.current.style.color = "#ff1f1f";
                newMoneyText = "-" + props.moneyTask.overMoney;
            }
        }

        setMoneyText(newMoneyText);
        setOverMoneyText(newOverMoneyText);
    }

    const dayMoneyTaskMoneyDiv = useRef();

    const closeDetail = () => {
        setIsClicked(false);
    }

    const moneyTextFunc = () => {

    }

    const [moneyText, setMoneyText] = useState("");
    const [overMoneyText, setOverMoneyText] = useState("");
    const perfectSpendText = '완벽한 소비에요!';
    const overMoneyTextStr = '과소비 금액 : ';
    const wonText = '원';

    const overMoneyTextRef = useRef();

    return (
        <div className={css.dayMoneyTaskWithDetailDiv}>
            <div className={css.dayMoneyTaskDiv} onClick={onClick}>
                <div className={css.dayMoneyTaskMCDiv}>{<img src={dollarIconPath} width={42} height={42} alt='' />}</div>
                <div className={css.dayMoneyTaskDetailDiv}>
                    <div className={css.dayMoneyTaskDetailCategoryDiv}>{getMainCategoryNameByNo(props.moneyTask.mainCategoryNo) + (getSubCategoryNameByNo(props.moneyTask.subCategoryNo) !== '기본' ? (" - " + getSubCategoryNameByNo(props.moneyTask.subCategoryNo)) : "")}</div>
                    <div className={css.dayMoneyTaskDetailTimeDiv} >{props.moneyTask.startTime.substring(10, 16)}</div>
                </div>
                <div ref={dayMoneyTaskMoneyDiv} className={css.dayMoneyTaskMoneyDiv}>
                    <div>
                        {moneyText}원
                    </div>
                    <div ref={overMoneyTextRef} className={css.overMoneyTextDiv}>
                        {overMoneyText}
                    </div>
                </div>
            </div>
            {
                isClicked === true ? <MoneyContentDetail moneyTask={props.moneyTask} closeFunc={closeDetail}/> : <div/>
            }

        </div>
    );
}

export default MoneyContent;