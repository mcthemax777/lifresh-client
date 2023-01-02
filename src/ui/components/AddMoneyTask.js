import React, {useEffect, useState} from 'react';
import DayPlanContent from "./DayPlanContent";
import {AppContext} from "../../App";
import {useNavigate} from "react-router-dom";
import SendData from "../../api/SendData";
import LoginButton from "./LoginButton";
import '../../Global.css';
import {checkErrorResponse, convertDateTimeLocalToTime, currentTime, isNumeric} from "../../Defines";
import MoneyContent from "./MoneyContent";

var addTaskBtnPath = "img/add_task_btn.png";

function AddMoneyTask(props) {
    //const store = React.useContext(AppContext)
    let navigate = useNavigate();

    const plusMoney = "수입";
    const minusMoney = "지출";

    const [selectedMainCategoryNo, setSelectedMainCategoryNo] = useState(0);
    const [selectedSubCategoryNo, setSelectedSubCategoryNo] = useState(0);

    const uid = localStorage.getItem("uid");
    const sid = localStorage.getItem("sid");

    const addMoneyTask = (response) => {
        const pmSelect = document.getElementById('pmSelect');
        const pmType = pmSelect.options[pmSelect.selectedIndex].value;
        const moneyValue = document.getElementById('money').value;
        const dateTimeLocal = document.getElementById('dateTime').value;

        //분류가 되지 않은 경우
        if(selectedMainCategoryNo === 0 || selectedSubCategoryNo === 0) {
            alert("분류를 선택해주세요.");
            return;
        }

        //숫자가 아닐 경우 에러
        if(isNumeric(moneyValue) === false ) {
            alert("숫자를 입력하세요.");
            return;
        }

        let money = Number(moneyValue);

        //돈 입력 안했을 경우
        if(money <= 0) {
            alert("0보다 큰 입력하세요.");
            return;
        }

        //날자 입력 안 했을 경우
        if(dateTimeLocal === "") {
            alert("날짜 시간을 선택해주세요.");
            return;
        }

        const dateTime = convertDateTimeLocalToTime(dateTimeLocal);

        console.log(dateTime);

        //지출일 경우 마이너스 추가해주기
        if(pmType === '2') money *= -1;

        // eslint-disable-next-line no-restricted-globals
        var addConfirm = confirm(" 데이터를 추가하시겠습니까?");
        if (addConfirm === true) {

            const detail = document.getElementById('detail').value;

            const addMoneyTaskObj = {
                moneyTaskNo: 0,
                subCategoryNo: selectedSubCategoryNo,
                startTime: dateTime,
                endTime: dateTime,
                money: money,
                detail: detail,
                type: 0,
                todayNo: 0
            };

            console.log(addMoneyTaskObj);

            SendData("addMoneyTaskList",
                {
                    uid: uid,
                    sid: sid,
                    moneyTaskList:
                        [
                            addMoneyTaskObj
                        ]
                },
                addMoneyTaskListCallback,
                addMoneyTaskListErr
            );
        }
    }

    const addMoneyTaskListCallback = (response) => {

        const data = response.data;

        if(checkErrorResponse(data, navigate) === false)
        {
            return ;
        }

        //인풋 데이터 초기화
        reset();

        //가계부 리로드
        props.getMoneyTaskList();
    }

    const addMoneyTaskListErr = (response) => {
        console.log("addMoneyTaskListErr" + response);
    }

    const reset = () => {
        const pmSelect = document.getElementById('pmSelect');
        pmSelect.selectedIndex=1;
        document.getElementById('money').value = 0;
        document.getElementById('detail').value = '';

        setSelectedMainCategoryNo(0);
        const mainCategorySelect = document.getElementById('mainCategorySelect');
        mainCategorySelect.selectedIndex = 0;
    };

    const handleMainCategorySelect = (e) => {

        const mainCategoryNo = Number(e.target.value);

        setSelectedMainCategoryNo(mainCategoryNo);

        //sub category 도 기본으로 변경해주기
        if(mainCategoryNo === 0) {
            setSelectedSubCategoryNo(0);
        }
    }

    const handleSubCategorySelect = (e) => {
        console.log("handleSubCategorySelect" + e.target.value);

        //sub category 변경해주기
        setSelectedSubCategoryNo(Number(e.target.value));
    }


    return(
        <div className='addScheduleTask'>
            <h2>추가</h2>
            <table className='listTable'>
                <tbody>
                <tr>
                    <td className='listTableIndex th'><input id='money' type='text'/></td>
                    <td className='listTableTitle th'>
                        <select id='pmSelect'><option value='1'>{plusMoney}</option><option value='2'>{minusMoney}</option></select>
                    </td>
                    <td className='listTableTitle th'>
                        <select onChange={handleMainCategorySelect} id="mainCategorySelect">
                            <option value='0'>=== 선택 ===</option>
                            {
                                props.mainCategoryList.map((mainCategory, index) => (
                                    <option key={index} value={mainCategory.mainCategoryNo}>{mainCategory.name}</option>
                                ))
                            }
                        </select>
                    </td>
                    <td className='listTableTitle th'>
                        <select onChange={handleSubCategorySelect} id="subCategorySelect">
                            <option value='0'>=== 선택 ===</option>
                            {
                                props.subCategoryList.map((subCategory, index) => (
                                    Number(selectedMainCategoryNo) === Number(subCategory.mainCategoryNo) &&
                                    <option key={index} value={subCategory.subCategoryNo}>{subCategory.name}</option>
                                ))
                            }
                        </select>
                    </td>
                    <td className='listTableIndex th'><input id='dateTime' type='datetime-local'/></td>
                    <td className='listTableIndex th'><input id='detail' type='text'/></td>
                    <td><button onClick={addMoneyTask}>등록</button></td>
                </tr>
                </tbody>
            </table>
            <br/>
            <br/>
        </div>
    )
}

export default AddMoneyTask;