import React, {useEffect, useState} from 'react';
import {AppContext} from "../../App";
import {useNavigate} from "react-router-dom";
import css from "./MainPage.module.css";
import MenuComponent from "../components/MenuComponent";
import SchedulePage from "./SchedulePage";
import ToDoPage from "./ToDoPage";
import MoneyPage from "./MoneyPage";
import DateComponent from "../components/DateComponent";

import {
    PAGE_TYPE_TO_DO,
    PAGE_TYPE_MONEY,
    PAGE_TYPE_SCHEDULE,
    PAGE_TYPE_SETTING,
    PERIOD_TYPE_DAY,
    PERIOD_TYPE_MONTH, PERIOD_TYPE_WEEK, PERIOD_TYPE_YEAR, POP_UP_TYPE_NONE
} from "../../Defines";
import useWindowDimensions from "../../WindowDimensions";

function MainPage() {
    const navigate = useNavigate();

    const [pageType, setPageType] = useState(PAGE_TYPE_MONEY);
    const [today, setToday] = useState(new Date());
    const [periodType, setPeriodType] = useState(0);

    const [isSchedulePageDisplay, setIsSchedulePageDisplay] = useState(true);
    const [isToDoPageDisplay, setIsToDoPageDisplay] = useState(true);
    const [isMoneyPageDisplay, setIsMoneyPageDisplay] = useState(true);

    const clickCategoryBtn = (changePageType) => {
        setPageType(changePageType);
    }

    const { windowHeight, windowWidth } = useWindowDimensions();

    const getWindowDimensions = () => {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {

        let windowWidth = windowDimensions.width;
        let windowHeight = windowDimensions.height;

        if(windowWidth >= 1000) {
            setIsSchedulePageDisplay(true);
            setIsToDoPageDisplay(true);
            setIsMoneyPageDisplay(true);
        } else {
            //3개다 켜져 있으면 하나만 키기
            if(isSchedulePageDisplay && isToDoPageDisplay && isMoneyPageDisplay) {
                setIsSchedulePageDisplay(false);
                setIsToDoPageDisplay(false);
                setIsMoneyPageDisplay(true);
            }
        }

    }, [windowDimensions]);

    const clickChangeCurrentDateBtn = (num) => {

        let newDate = new Date(today);

        if(periodType === PERIOD_TYPE_DAY) newDate.setDate(today.getDate() + num);
        else if(periodType === PERIOD_TYPE_WEEK) newDate.setDate(today.getDate() + (num * 7));
        else if(periodType === PERIOD_TYPE_MONTH) newDate.setMonth(today.getMonth() + num);
        else if(periodType === PERIOD_TYPE_YEAR) newDate.setFullYear(today.getFullYear() + num);
        else newDate.setDate(today.getDate() + num);

        setToday(newDate);
    }

    const clickPeriodBtn = (e) => {
        setPeriodType(Number(e.target.value));
    }

    const changePage = (changePageType) => {

        console.log("ff");
        if(isSchedulePageDisplay && isToDoPageDisplay && isMoneyPageDisplay) {

        } else {
            if(changePageType === PAGE_TYPE_SCHEDULE) {
                setIsToDoPageDisplay(false);
                setIsMoneyPageDisplay(false);
                setIsSchedulePageDisplay(true);
            }
            if(changePageType === PAGE_TYPE_TO_DO) {
                setIsToDoPageDisplay(true);
                setIsMoneyPageDisplay(false);
                setIsSchedulePageDisplay(false);
            }
            if(changePageType === PAGE_TYPE_MONEY) {
                setIsToDoPageDisplay(false);
                setIsMoneyPageDisplay(true);
                setIsSchedulePageDisplay(false);
            }
        }

        setPageType(changePageType);
    }
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    return(
        <div className="defaultReactDiv">
            {/*<button onClick={changeDisplay} className={css.menuDiv} value="MENU">MENU</button>*/}
            {
                isOpenMenu ? <MenuComponent changePage={changePage} setIsOpenMenu={setIsOpenMenu}></MenuComponent> : <div/>
            }
            <DateComponent setIsOpenMenu={setIsOpenMenu} clickChangeCurrentDateBtn={clickChangeCurrentDateBtn} clickPeriodBtn={clickPeriodBtn}></DateComponent>
            <div className={css.plannerContent}>
                <SchedulePage isSchedulePageDisplay={isSchedulePageDisplay} today={today} periodType={periodType}></SchedulePage>
                <ToDoPage isToDoPageDisplay={isToDoPageDisplay} today={today} periodType={periodType}></ToDoPage>
                <MoneyPage isMoneyPageDisplay={isMoneyPageDisplay} today={today} periodType={periodType} ></MoneyPage>
                {/*{ pageType === PAGE_TYPE_SETTING && <SettingPage></SettingPage> }*/}
            </div>
        </div>
    )
}

export default MainPage;