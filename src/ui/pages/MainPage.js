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

function MainPage() {
    let store = React.useContext(AppContext)
    const navigate = useNavigate();


    const [pageType, setPageType] = useState(PAGE_TYPE_MONEY);
    const [today, setToday] = useState(new Date());
    const [periodType, setPeriodType] = useState(0);



    const clickCategoryBtn = (changePageType) => {
        setPageType(changePageType);
    }

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

    useEffect(() => {

    }, []);

    useEffect(() => {
        console.log(store.data);
    }, [store.data]);

    return(
        <div className="defaultReactDiv">
            {/*<MenuComponent clickCategoryBtn={clickCategoryBtn}></MenuComponent>*/}
            <DateComponent today={today} periodType={periodType} clickChangeCurrentDateBtn={clickChangeCurrentDateBtn} clickPeriodBtn={clickPeriodBtn}></DateComponent>
            <div className={css.plannerContent}>
                <SchedulePage today={today} periodType={periodType}></SchedulePage>
                <ToDoPage today={today} periodType={periodType}></ToDoPage>
                <MoneyPage today={today} periodType={periodType}></MoneyPage>
                {/*{ pageType === PAGE_TYPE_SETTING && <SettingPage></SettingPage> }*/}
            </div>
        </div>
    )
}

export default MainPage;