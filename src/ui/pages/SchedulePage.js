import React, {useEffect, useRef, useState} from 'react';
import DayPlanContent from "../components/DayPlanContent";
import {AppContext} from "../../App";
import {useNavigate} from "react-router-dom";
import SendData from "../../api/SendData";
import css from "./SchedulePage.module.css";
import '../../Global.css';
import AddScheduleTask from "../components/AddScheduleTask";
import {checkErrorResponse} from "../../Defines";
import ScheduleDayComponent from "../components/ScheduleDayComponent";

function SchedulePage(props) {
    const store = React.useContext(AppContext)
    let navigate = useNavigate();

    const sid = localStorage.getItem("sid");
    const uid = localStorage.getItem("uid");

    const [mainCategoryList, setMainCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [scheduleTaskList, setScheduleTaskList] = useState([]);

    const scheduleComponentDiv = useRef();
    const addScheduleTask = (response) => {
        console.log("addScheduleTask" + response);
    }

    const getAllDataCallback = (response) => {

        const data = response.data;

        if(checkErrorResponse(data, navigate) === false)
        {
            return ;
        }

        store.setScheduleTaskList(data.scheduleTaskList);
        console.log(store.scheduleTaskList);
    }

    const getAllDataErr = (response) => {
        console.log("error" + response);
    }


    useEffect(() => {

        // const datetime = currentTime();
        //
        // console.log(sid);
        // console.log(datetime);
        SendData("getScheduleTaskList",
            {
                uid: uid,
                sid: sid
            },
            getAllDataCallback,
            getAllDataErr
        );

    }, []);

    //화면 크기에 따라 데이터 보일지 안보일지 세팅
    const schedulePageDiv = useRef();
    useEffect(() => {
        if(props.isSchedulePageDisplay === true) {
            schedulePageDiv.current.style.display = "flex";
        } else {
            schedulePageDiv.current.style.display = "none";
        }

    }, [props.isSchedulePageDisplay]);

    const [addTaskBtn, setAddTaskBtn] = useState(0);

    const scheduleAddTaskBtnPath = "img/schedule_add_task_btn.png";
    const scheduleAddTaskBtnClickPath = "img/schedule_add_task_btn_click.png";

    const clickAddTaskBtn = () => {
        console.log("clickAddTaskBtn");
    }

    const reloadScheduleTaskList = () => {
        console.log("reloadScheduleTaskList");
    }

    return(
        <div ref={schedulePageDiv} className={css.schedulePageDiv}>
            <div className={css.scheduleTitleDiv}>일정관리</div>
            <div ref={scheduleComponentDiv} className={css.scheduleComponentDiv}>
            <ScheduleDayComponent className={css.daySchedule} scheduleTaskList={scheduleTaskList} today={props.today} mainCategoryList={mainCategoryList} subCategoryList={subCategoryList} reloadScheduleTaskList={reloadScheduleTaskList}/>
            {/*<AddScheduleTask></AddScheduleTask>*/}
            </div>
            <button onClick={clickAddTaskBtn} className="addTaskBtn" draggable={false} onMouseDown={() => setAddTaskBtn(1)} onMouseUp={() => setAddTaskBtn(0)} onMouseLeave={() => setAddTaskBtn(0)} >
                { addTaskBtn === 0 && <img src={scheduleAddTaskBtnPath} width={64} height={64} /> }
                { addTaskBtn === 1 && <img src={scheduleAddTaskBtnClickPath} width={64} height={64} /> }
            </button>
        </div>
    )
}

export default SchedulePage;