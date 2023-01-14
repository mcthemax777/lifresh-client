import React, {useEffect, useState} from 'react';
import {AppContext} from "../../App";
import {useNavigate} from "react-router-dom";
import css from "./MainPage.module.css"
import MenuComponent from "../components/MenuComponent";
import SchedulePage from "./SchedulePage";
import ToDoPage from "./ToDoPage";
import MoneyPage from "./MoneyPage";
import SettingPage from "./SettingPage";
import DateComponent from "../components/DateComponent";

import {
    PAGE_TYPE_DO_TO,
    PAGE_TYPE_MONEY,
    PAGE_TYPE_SCHEDULE,
    PAGE_TYPE_SETTING,
    PERIOD_TYPE_DAY,
    PERIOD_TYPE_MONTH, PERIOD_TYPE_WEEK, PERIOD_TYPE_YEAR
} from "../../Defines";
import useWindowDimensions from "../../WindowDimensions";

function MainPage() {
    let store = React.useContext(AppContext)
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

        if(windowWidth >= 700) {
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

    const changeDisplay = () => {

        console.log("ff");
        if(isSchedulePageDisplay && isToDoPageDisplay && isMoneyPageDisplay) {

        } else {
            if(isSchedulePageDisplay) {
                setIsToDoPageDisplay(true);
                setIsSchedulePageDisplay(false);
            }

            if(isToDoPageDisplay) {
                setIsMoneyPageDisplay(true);
                setIsToDoPageDisplay(false);
            }

            if(isMoneyPageDisplay) {
                setIsSchedulePageDisplay(true);
                setIsMoneyPageDisplay(false);
            }
        }

    }

    return(
        <div className="defaultReactDiv">
            {/*<button onClick={changeDisplay} className={css.menuDiv} value="MENU">MENU</button>*/}
            {/*<MenuComponent clickCategoryBtn={clickCategoryBtn}></MenuComponent>*/}
            {/*<DateComponent isMoneyPageDisplay={isMoneyPageDisplay} isToDoPageDisplay={isToDoPageDisplay} isSchedulePageDisplay={isSchedulePageDisplay} setIsMoneyPageDisplay={setIsMoneyPageDisplay} setIsToDoPageDisplay={setIsToDoPageDisplay} setIsSchedulePageDisplay={setIsSchedulePageDisplay} today={today} periodType={periodType} clickChangeCurrentDateBtn={clickChangeCurrentDateBtn} clickPeriodBtn={clickPeriodBtn}></DateComponent>*/}
            <div className={css.plannerContent}>
                <SchedulePage isSchedulePageDisplay={isSchedulePageDisplay} today={today} periodType={periodType}></SchedulePage>
                <ToDoPage isToDoPageDisplay={isToDoPageDisplay} today={today} periodType={periodType}></ToDoPage>
                <MoneyPage isMoneyPageDisplay={isMoneyPageDisplay} today={today} periodType={periodType}></MoneyPage>
                {/*{ pageType === PAGE_TYPE_SETTING && <SettingPage></SettingPage> }*/}
            </div>
        </div>
    )
}

export default MainPage;