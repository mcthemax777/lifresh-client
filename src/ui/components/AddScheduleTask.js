import React, {useEffect} from 'react';
import DayPlanContent from "./DayPlanContent";
import {AppContext} from "../../App";
import {useNavigate} from "react-router-dom";
import SendData from "../../api/SendData";
import LoginButton from "./LoginButton";
import '../../Global.css';

var addTaskBtnPath = "img/add_task_btn.png";

function AddScheduleTask() {
    //const store = React.useContext(AppContext)
    let navigate = useNavigate();

    const mainCategory1 = "대분류 카테고리1";
    const mainCategory2 = "대분류 카테고리2";
    const mainCategory3 = "대분류 카테고리3";
    const subCategory1 = "중분류 카테고리1";
    const subCategory2 = "중분류 카테고리2";
    const subCategory3 = "중분류 카테고리3";


    const sid = localStorage.getItem("sid");

    const getScheduleCallback = (response) => {
        const data = response.data;

        if(data.code !== 200)
        {
            alert(data.code);
            console.log(data.code);
            return ;
        }

        alert("DATA RECEIVE");
        console.log(data);
    }

    const getDayScheduleErr = (response) => {
        console.log("error" + response);
    }

    const addScheduleTask = (response) => {
        console.log("error" + response);
    }

    function currentTime() {
        var today = new Date();
        today.setHours(today.getHours() + 9);
        return today.toISOString().replace('T', ' ').substring(0, 19);
    }

    useEffect(() => {

        // SendData("getDaySchedule",
        //     {
        //         api: "getDaySchedule",
        //         sid: sid,
        //         datetime: datetime
        //     },
        //     getScheduleCallback,
        //     getDayScheduleErr
        // );

    }, []);

    return(
        <div className='addScheduleTask'>
            <h2>추가</h2>
            <table className='listTable'>
                <tbody>
                <tr>
                    <td className='listTableIndex th'><input type='text' /></td>
                    <td className='listTableTitle th'><select><option value='mc1'>{mainCategory1}</option><option value='mc2'>{mainCategory2}</option><option value='mc3'>{mainCategory3}</option></select></td>
                    <td className='listTableTitle th'><select><option value='sc1'>{subCategory1}</option><option value='sc2'>{subCategory2}</option><option value='sc3'>{subCategory3}</option></select></td>
                </tr>
                </tbody>
            </table>
            <button onClick={addScheduleTask}>등록</button>
        </div>
    )
}

export default AddScheduleTask;