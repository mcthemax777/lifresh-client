import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import SendData from "../../api/SendData";
import '../../Global.css';
import {checkErrorResponse} from "../../Defines";

function AddScheduleCategory(props) {
    //const store = React.useContext(AppContext)
    let navigate = useNavigate();

    const [selectedMainCategoryNo, setSelectedMainCategoryNo] = useState(0);

    const uid = localStorage.getItem("uid");
    const sid = localStorage.getItem("sid");

    const addScheduleMainCategory = (response) => {
        if(selectedMainCategoryNo !== 0) {
            alert("대분류 정보가 이상합니다.");
            return ;
        }

        //대분류 추가
        const addMainCategoryName = document.getElementById('addMainCategoryName').value;

        if(addMainCategoryName === "") {
            alert("대분류 값이 비어있습니다.");
            return ;
        }

        const mainCategoryObj = {
            mainCategoryNo: 0,
            name: addMainCategoryName,
            categoryType: 2
        };

        SendData("addMainCategoryList",
            {
                uid: uid,
                sid: sid,
                mainCategoryList:
                    [
                        mainCategoryObj
                    ]
            },
            addScheduleMainCategoryListCallback,
            addScheduleMainCategoryListErr
        );
    }

    const addScheduleMainCategoryListCallback = (response) => {

        const data = response.data;

        if(checkErrorResponse(data, navigate) === false)
        {
            return ;
        }

        //인풋 데이터 초기화
        reset();

        //가계부 리로드
        props.getScheduleTaskList();
    }

    const addScheduleMainCategoryListErr = (response) => {
        console.log("addScheduleMainCategoryListErr" + response);
    }


    const addScheduleSubCategory = (response) => {
        if(selectedMainCategoryNo === 0) {
            alert("대분류 정보가 없습니다.");
            return ;
        }

        //중분류 추가
        const addSubCategoryName = document.getElementById('addSubCategoryName').value;

        if(addSubCategoryName === "") {
            alert("중분류 값이 비어있습니다.");
            return ;
        }

        const subCategoryObj = {
            mainCategoryNo: selectedMainCategoryNo,
            subCategoryNo: 0,
            name: addSubCategoryName
        };

        SendData("addSubCategoryList",
            {
                uid: uid,
                sid: sid,
                subCategoryList:
                    [
                        subCategoryObj
                    ]
            },
            addScheduleSubCategoryListCallback,
            addScheduleSubCategoryListErr
        );
    }

    const addScheduleSubCategoryListCallback = (response) => {

        const data = response.data;

        if(checkErrorResponse(data, navigate) === false)
        {
            return ;
        }

        //인풋 데이터 초기화
        reset();

        //가계부 리로드
        props.getScheduleTaskList();
    }

    const addScheduleSubCategoryListErr = (response) => {
        console.log("addScheduleSubCategoryListErr" + response);
    }

    const reset = () => {
        document.getElementById('addMainCategoryName').value = '';
        document.getElementById('addSubCategoryName').value = '';

        setSelectedMainCategoryNo(0);
        const mainCategorySelect = document.getElementById('mainCategorySelect');
        mainCategorySelect.selectedIndex = 0;
    };

    const handleMainCategorySelect = (e) => {

        const mainCategoryNo = Number(e.target.value);

        setSelectedMainCategoryNo(mainCategoryNo);
    }

    const handleMainCategoryRadioSelect = (e) => {
        setSelectedMainCategoryNo(Number(e.target.value));
        console.log("handleMainCategoryRadioSelect" + e.target.value);
    }

    return(
        <div className='addScheduleTask'>
            <h2>카테고리 관리</h2>
            <input type="radio" onClick={handleMainCategoryRadioSelect} name="chk_info" value="0" defaultChecked={true}/>대분류 추가
            <input type="radio" onClick={handleMainCategoryRadioSelect} name="chk_info" value="1"/>기존 대본류

            <div hidden={selectedMainCategoryNo !== 0}>
                 <input id='addMainCategoryName' type='text' /> <button onClick={addScheduleMainCategory}>추가</button>
            </div>
            <div hidden={selectedMainCategoryNo === 0}>
                <select onChange={handleMainCategorySelect} id="mainCategorySelect" hidden={selectedMainCategoryNo === 0}>
                {
                    props.mainCategoryList.map((mainCategory, index) => (
                        <option key={index} value={mainCategory.mainCategoryNo}>{mainCategory.name}</option>
                    ))
                }
                </select>
            </div>
            <br/>
            <div hidden={selectedMainCategoryNo === 0}>
                <h3>중분류</h3>
                <input id='addSubCategoryName' type='text' /> <button onClick={addScheduleSubCategory}>추가</button>
            </div>
        </div>
    )
}

export default AddScheduleCategory;