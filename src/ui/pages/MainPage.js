import React, {useEffect, useState} from 'react';
import {AppContext} from "../../App";
import {useNavigate} from "react-router-dom";
import SendData from "../../api/SendData";
import MenuComponent from "../components/MenuComponent";
import SchedulePage from "./SchedulePage";
import ToDoPage from "./ToDoPage";
import MoneyPage from "./MoneyPage";
import SettingPage from "./SettingPage";

const PAGE_TYPE_SCHEDULE = 0;
const PAGE_TYPE_DO_TO = 1;
const PAGE_TYPE_MONEY = 2;
const PAGE_TYPE_SETTING = 3;


function MainPage() {
    let store = React.useContext(AppContext)

    const [pageType, setPageType] = useState(PAGE_TYPE_SCHEDULE);

    const sid = localStorage.getItem("sid");

    const getAllDataCallback = (response) => {
        const data = response.data;

        if(data.code !== 200)
        {
            alert(data.code);
            console.log(data.code);
            return ;
        }

        alert("DATA RECEIVE");
        store.setData(data.data);
    }

    const getAllDataErr = (response) => {
        console.log("error" + response);
    }

    function currentTime() {
        var today = new Date();
        today.setHours(today.getHours() + 9);
        return today.toISOString().replace('T', ' ').substring(0, 19);
    }

    const changePage = (changePageType) => {
        setPageType(changePageType);
    }

    useEffect(() => {

        const datetime = currentTime();

        console.log(sid);
        console.log(datetime);
        SendData("getDaySchedule",
            {
                api: "getDaySchedule",
                sid: sid,
                datetime: datetime
            },
            getAllDataCallback,
            getAllDataErr
        );

    }, []);

    useEffect(() => {
        console.log(store.data);
    }, [store.data]);

    return(
        <div>
            <h2>테스트</h2>
            { pageType === PAGE_TYPE_SCHEDULE && <SchedulePage></SchedulePage> }
            { pageType === PAGE_TYPE_DO_TO && <ToDoPage></ToDoPage> }
            { pageType === PAGE_TYPE_MONEY && <MoneyPage></MoneyPage> }
            { pageType === PAGE_TYPE_SETTING && <SettingPage></SettingPage> }
            <MenuComponent onClick1={changePage}></MenuComponent>
        </div>
    )
}

export default MainPage;