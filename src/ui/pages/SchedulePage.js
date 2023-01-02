import React, {useEffect} from 'react';
import DayPlanContent from "../components/DayPlanContent";
import {AppContext} from "../../App";
import {useNavigate} from "react-router-dom";
import SendData from "../../api/SendData";
import LoginButton from "../components/LoginButton";
import '../../Global.css';
import AddScheduleTask from "../components/AddScheduleTask";
import {checkErrorResponse} from "../../Defines";

var addTaskBtnPath = "img/add_task_btn.png";

function SchedulePage() {
    const store = React.useContext(AppContext)
    let navigate = useNavigate();

    const sid = localStorage.getItem("sid");
    const uid = localStorage.getItem("uid");

    const addScheduleTask = (response) => {
        console.log("addScheduleTask" + response);
    }

    const getAllDataCallback = (response) => {

        const data = response.data;

        if(checkErrorResponse(data, navigate) === false)
        {
            return ;
        }

        alert("ScheduleTaskList RECEIVE");
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

    useEffect(() => {

        console.log(store.scheduleTaskList);

    }, [store.data]);

    return(
        <div>
            <h2>일정</h2>
            <table className='listTable'>
                <tbody>
                <tr>
                    <td className='listTableIndex th'><DayPlanContent /></td>
                    <td className='listTableTitle th'><DayPlanContent /></td>

                    <td className='listTableIndex'><DayPlanContent /></td>
                    <td className='listTableTitle noData'><DayPlanContent /></td>
                </tr>
                </tbody>
            </table>
            <AddScheduleTask></AddScheduleTask>
            <button><img className='addTaskBtn' src={addTaskBtnPath} onClick={addScheduleTask} alt={addTaskBtnPath}/></button>
        </div>
    )
}

export default SchedulePage;