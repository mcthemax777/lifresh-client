import React, {useEffect} from 'react';
import DayPlanContent from "../components/DayPlanContent";
import {AppContext} from "../../App";
import {useNavigate} from "react-router-dom";
import SendData from "../../api/SendData";
import LoginButton from "../components/LoginButton";
import '../../Global.css';
import AddScheduleTask from "../components/AddScheduleTask";

var addTaskBtnPath = "img/add_task_btn.png";

function SchedulePage() {
    const store = React.useContext(AppContext)
    let navigate = useNavigate();

    const sid = localStorage.getItem("sid");

    const addScheduleTask = (response) => {
        console.log("error" + response);
    }

    function currentTime() {
        var today = new Date();
        today.setHours(today.getHours() + 9);
        return today.toISOString().replace('T', ' ').substring(0, 19);
    }

    useEffect(() => {

        console.log(store.data);

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