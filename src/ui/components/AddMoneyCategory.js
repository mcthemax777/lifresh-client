import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import SendData from "../../api/SendData";
import '../../Global.css';
import {
    checkErrorResponse,
    convertDateTimeLocalToTime,
    currentTime,
    isNumeric,
    MONEY_ADD_TYPE_MINUS, MONEY_ADD_TYPE_PLUS
} from "../../Defines";
import {MoneyContext} from "../pages/MoneyPage";
import css from "./AddMoneyTask.module.css";


function AddMoneyCategory(props) {

    const {store, loadMoneyTaskList} = useContext(MoneyContext);
    let navigate = useNavigate();

    const [categoryType, setCategoryType] = useState(MONEY_ADD_TYPE_MINUS);
    const [selectedMainCategoryNo, setSelectedMainCategoryNo] = useState(0);

    const uid = localStorage.getItem("uid");
    const sid = localStorage.getItem("sid");

    const addMoneyMainCategory = (response) => {
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
            categoryType: categoryType
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
            addMoneyMainCategoryListCallback,
            addMoneyMainCategoryListErr
        );
    }

    const addMoneyMainCategoryListCallback = (response) => {

        const data = response.data;

        if(checkErrorResponse(data, navigate) === false)
        {
            return ;
        }

        //인풋 데이터 초기화
        reset();

        props.closeFunc();
        //가계부 리로드
        loadMoneyTaskList();
    }

    const addMoneyMainCategoryListErr = (response) => {
        console.log("addMoneyMainCategoryListErr" + response);
    }


    const addMoneySubCategory = (response) => {
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
            name: addSubCategoryName,
            categoryType: categoryType
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
            addMoneySubCategoryListCallback,
            addMoneySubCategoryListErr
        );
    }

    const addMoneySubCategoryListCallback = (response) => {

        const data = response.data;

        if(checkErrorResponse(data, navigate) === false)
        {
            return ;
        }

        //인풋 데이터 초기화
        reset();

        props.closeFunc();
        //가계부 리로드
        loadMoneyTaskList();
    }

    const addMoneySubCategoryListErr = (response) => {
        console.log("addMoneySubCategoryListErr" + response);
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

    const minusCategoryTypeRef = useRef();
    const plusCategoryTypeRef = useRef();

    return(
        <div className='addScheduleTask'>
            <h2>카테고리 관리</h2>
            <input type="radio" onClick={handleMainCategoryRadioSelect} name="chk_info" value="0" defaultChecked={true}/>대분류 추가
            <input type="radio" onClick={handleMainCategoryRadioSelect} name="chk_info" value="1"/>기존 대본류
            <br/><br/>
            <input type="radio" name="pmRadio" onClick={() => setCategoryType(MONEY_ADD_TYPE_MINUS)}  ref={minusCategoryTypeRef} value={MONEY_ADD_TYPE_MINUS} defaultChecked={true}/>지출
            <input type="radio" name="pmRadio" onClick={() => setCategoryType(MONEY_ADD_TYPE_PLUS)} ref={plusCategoryTypeRef} value={MONEY_ADD_TYPE_PLUS} />수입

            <div hidden={selectedMainCategoryNo !== 0}>
                 <input id='addMainCategoryName' type='text' /> <button onClick={addMoneyMainCategory}>추가</button>
            </div>
            <div hidden={selectedMainCategoryNo === 0}>

                <select onChange={handleMainCategorySelect} id="mainCategorySelect" hidden={selectedMainCategoryNo === 0}>
                {
                    store.mainCategoryList.map((mainCategory, index) => (
                        Number(categoryType) === Number(mainCategory.categoryType) &&
                        <option key={index} value={mainCategory.mainCategoryNo}>{mainCategory.name}</option>
                    ))
                }
                </select>
            </div>
            <br/>
            <div hidden={selectedMainCategoryNo === 0}>
                <h3>중분류</h3>
                <input id='addSubCategoryName' type='text' /> <button onClick={addMoneySubCategory}>추가</button>
            </div>
        </div>
    )
}

export default AddMoneyCategory;