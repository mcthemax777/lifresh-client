import React, {useEffect, useState} from 'react';
import {AppContext} from "../../App";
import {useNavigate} from "react-router-dom";
import SendData from "../../api/SendData";
import MenuComponent from "../components/MenuComponent";
import LoginPage from "./LoginPage";
import SchedulePage from "./SchedulePage";
import ToDoPage from "./ToDoPage";
import MoneyPage from "./MoneyPage";
import SettingPage from "./SettingPage";
import {checkErrorResponse} from "../../Defines";

const PAGE_TYPE_SCHEDULE = 0;
const PAGE_TYPE_DO_TO = 1;
const PAGE_TYPE_MONEY = 2;
const PAGE_TYPE_SETTING = 3;


function MainPage() {
    let store = React.useContext(AppContext)
    const navigate = useNavigate();
    const [pageType, setPageType] = useState(PAGE_TYPE_MONEY);



    const changePage = (changePageType) => {
        setPageType(changePageType);
    }

    useEffect(() => {

    }, []);

    useEffect(() => {
        console.log(store.data);
    }, [store.data]);

    return(
        <div>
            <h2>LIFRESH</h2>
            { pageType === PAGE_TYPE_SCHEDULE && <SchedulePage></SchedulePage> }
            { pageType === PAGE_TYPE_DO_TO && <ToDoPage></ToDoPage> }
            { pageType === PAGE_TYPE_MONEY && <MoneyPage></MoneyPage> }
            { pageType === PAGE_TYPE_SETTING && <SettingPage></SettingPage> }
            <br/><br/>
            <MenuComponent onClick1={changePage}></MenuComponent>
        </div>
    )
}

export default MainPage;