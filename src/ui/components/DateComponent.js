import React, {useEffect, useRef, useState} from 'react';
import css from "./DateComponent.module.css";
import {PERIOD_TYPE_DAY, PERIOD_TYPE_MONTH, PERIOD_TYPE_WEEK, PERIOD_TYPE_YEAR} from "../../Defines";
function DateComponent(props) {

    const alertBtnPath = "img/alert_btn.png";
    const titleImgPath = "img/title_icon.png";

    const clickAddTaskBtn = () => {

        console.log("ff");
    }

    return(
        <div id="componentDiv" className={css.componentDiv}>
            <button onClick={ () => props.setIsOpenMenu(true)} className={css.menuBtnDiv} value="MENU">MENU</button>
            <div id="dateDiv" className={css.titleDiv}>
                <img src={titleImgPath} width={24} height={24}/>
                <div id="dateDiv" className={css.titleTextDiv}>Lifresh</div>
                <img src={titleImgPath} width={24} height={24}/>
            </div>
            <div className={css.periodMenu}>
                <button onClick={clickAddTaskBtn} className={css.alertBtnDiv} >
                    <img src={alertBtnPath} width={32} height={32}/>
                </button>
            </div>
        </div>
    )
}

export default DateComponent;