import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import SendData from "../../api/SendData";
import '../../Global.css';
import {
    checkErrorResponse,
    convertDateTimeLocalToTime,
    isNumeric, MONEY_ADD_TYPE_MINUS, MONEY_ADD_TYPE_PLUS, MONEY_MINUS_TYPE_FIXED, MONEY_MINUS_TYPE_FREE,
} from "../../Defines";
import css from './AddMoneyTask.module.css'
import {MoneyContext} from "../pages/MoneyPage";

function AddMoneyTask(props) {
    const {store, loadMoneyTaskList} = useContext(MoneyContext);
    let navigate = useNavigate();

    const plusMoney = "수입";
    const minusMoney = "지출";

    let isSettingCorrect = false;
    const [title, setTitle] = useState('추가');
    const [moneyTaskNo, setMoneyTaskNo] = useState(0);
    const [addMoneyType, setAddMoneyType] = useState(MONEY_ADD_TYPE_MINUS);
    const [priority, setPriority] = useState(MONEY_MINUS_TYPE_FIXED);

    const [selectedMainCategoryNo, setSelectedMainCategoryNo] = useState(0);
    const [selectedSubCategoryNo, setSelectedSubCategoryNo] = useState(0);

    const uid = localStorage.getItem("uid");
    const sid = localStorage.getItem("sid");

    useEffect(() => {
        console.log("start addMoneyTask Component");
        console.log(props);

        //수정에서 호출했음
        if(props.moneyTask !== undefined) {
            setTitle('수정');
            isSettingCorrect = true;
            setMoneyTaskNo(props.moneyTask.moneyTaskNo);

            pmSelectRef.current.options[props.moneyTask.categoryType].selected = true;
            setAddMoneyType(props.moneyTask.categoryType);








            moneyRef.current.value = props.moneyTask.money;
        } else {
            setAddMoneyType(MONEY_ADD_TYPE_MINUS)
            pmSelectRef.current.options[MONEY_ADD_TYPE_MINUS].selected = true;
        }

    }, []);

    const closeAddMoneyTask = () => {
        props.closeFunc();
    }

    const addMoneyTask = (response) => {
        const moneyValue = moneyRef.current.value;
        const dateTimeLocal = dateTimeRef.current.value;
        const detail = detailRef.current.value;
        let overMoney = 0;
        if(addMoneyType === MONEY_ADD_TYPE_MINUS && priority === MONEY_MINUS_TYPE_FREE) {
            const overMoneyValue = overMoneyRef.current.value;

            //숫자가 아닐 경우 에러
            if (isNumeric(overMoneyValue) === false) {
                alert("비필수금액 - 숫자를 입력하세요.");
                return;
            }

            overMoney = Number(overMoneyValue);
        }

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

        //비필수금액이 현재돈보다 클 수 없음
        if(money < overMoney) {
            alert("비필수 금액이 사용금액보다 큽니다.");
            return;
        }

        //날자 입력 안 했을 경우
        if(dateTimeLocal === "") {
            alert("날짜 시간을 선택해주세요.");
            return;
        }

        if(addMoneyType === MONEY_ADD_TYPE_PLUS && priority === MONEY_MINUS_TYPE_FREE) {
            alert("수입은 비필수가 없습니다.");
        }

        const dateTime = convertDateTimeLocalToTime(dateTimeLocal);


        // eslint-disable-next-line no-restricted-globals
        var addConfirm = confirm(" 데이터를 추가하시겠습니까?");
        if (addConfirm === true) {

            const addMoneyTaskObj = {
                moneyTaskNo: moneyTaskNo,
                categoryType: addMoneyType,
                mainCategoryNo: selectedMainCategoryNo,
                subCategoryNo: selectedSubCategoryNo,
                startTime: dateTime,
                endTime: dateTime,
                money: money,
                overMoney: overMoney,
                priority: priority,
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

    const addMoneyTaskListCallback = (response, sendData) => {

        const data = response.data;

        if(checkErrorResponse(data, navigate) === false)
        {
            return ;
        }

        console.log(data);
        console.log(store.moneyTaskList);


        //인풋 데이터 초기화
        reset();
        props.closeFunc();

        //데이터 추가(TODO. 서버에서 데이터 내려주면 주석 풀기)
        // let copyMoneyTaskList = [...store.moneyTaskList];
        //
        // for( let i = 0; i < data.moneyTaskList.length; i++) {
        //
        //     let moneyTask = data.moneyTaskList[i];
        //
        //     for( let j  = 0 ; j < copyMoneyTaskList.length ; j++) {
        //
        //         //TODO. 부등호 맞는지 확인해야됨
        //         if(copyMoneyTaskList[j].startTime <= moneyTask.startTime) {
        //             copyMoneyTaskList.splice(j, 0, moneyTask);
        //             break;
        //         }
        //     }
        //
        // }
        //
        // store.setMoneyTaskList(copyMoneyTaskList);
        loadMoneyTaskList();

        //닫기
        closeAddMoneyTask();

    }

    const addMoneyTaskListErr = (response) => {
        console.log("addMoneyTaskListErr");
        console.log(response);

    }

    const reset = () => {
        pmSelectRef.current.selectedIndex = MONEY_ADD_TYPE_MINUS;
        moneyRef.current.value = '';
        detailRef.current.value = '';

        setSelectedMainCategoryNo(0);
        mainCategorySelectRef.current.selectedIndex = 0;
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

    const pmSelectRef = useRef();

    useEffect(() => {
        if(addMoneyType === MONEY_ADD_TYPE_PLUS) {
            setPriority(MONEY_MINUS_TYPE_FIXED);
        }

        if(isSettingCorrect) {
            let len = mainCategorySelectRef.current.options.length; //select box의 option 갯수
            console.log(props.moneyTask.mainCategoryNo);

            //select box의 option 갯수만큼 for문 돌림
            for (let i=0; i<len; i++){
                console.log(mainCategorySelectRef.current.options[i].value);

                //select box의 option value가 입력 받은 value의 값과 일치할 경우 selected
                if(Number(mainCategorySelectRef.current.options[i].value) === Number(props.moneyTask.mainCategoryNo)){
                    mainCategorySelectRef.current.options[i].selected = true;
                }
            }

            setSelectedMainCategoryNo(props.moneyTask.mainCategoryNo);
        }

    }, [addMoneyType]);

    useEffect(() => {

        if(isSettingCorrect) {
            let len = subCategorySelectRef.current.options.length; //select box의 option 갯수
            //select box의 option 갯수만큼 for문 돌림
            for (let i=0; i<len; i++){
                //select box의 option value가 입력 받은 value의 값과 일치할 경우 selected
                if(Number(subCategorySelectRef.current.options[i].value) === Number(props.moneyTask.subCategoryNo)){
                    subCategorySelectRef.current.options[i].selected = true;
                }
            }
            setSelectedSubCategoryNo(props.moneyTask.subCategoryNo);
        }

    }, [selectedMainCategoryNo]);

    const minusTypeSelectRef = useRef();
    const moneyRef = useRef();
    const overMoneyRef = useRef();
    const mainCategorySelectRef = useRef();
    const subCategorySelectRef = useRef();
    const dateTimeRef = useRef();
    const detailRef = useRef();

    return(
        <div className={css.addMoneyTaskDiv}>
            <h2>{title}</h2>
            <div className={css.addMoneyTaskContent}> 금액 : <input ref={moneyRef} type='text' className={css.addMoneyTaskContent1}/></div>
            <div className={css.addMoneyTaskContent}> 타입 :
                <select ref={pmSelectRef} className={css.addMoneyTaskContent1} onChange={(e) => setAddMoneyType(Number(e.target.value))}>
                    <option value={MONEY_ADD_TYPE_MINUS}>{minusMoney}</option>
                    <option value={MONEY_ADD_TYPE_PLUS}>{plusMoney}</option>
                </select>
            </div>
            <div className={css.addMoneyTaskContent}> 대분류 :
                <select onChange={handleMainCategorySelect} ref={mainCategorySelectRef} className={css.addMoneyTaskContent1}>
                    <option value='0'>=== 선택 ===</option>
                    {
                        store.mainCategoryList.map((mainCategory, index) => (
                            Number(addMoneyType) === Number(mainCategory.categoryType) &&
                            <option key={index} value={mainCategory.mainCategoryNo}>{mainCategory.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className={css.addMoneyTaskContent}> 중분류 :
                <select onChange={handleSubCategorySelect} ref={subCategorySelectRef} className={css.addMoneyTaskContent1}>
                    <option value='0'>=== 선택 ===</option>
                    {
                        store.subCategoryList.map((subCategory, index) => (
                            Number(selectedMainCategoryNo) === Number(subCategory.mainCategoryNo) &&
                            <option key={index} value={subCategory.subCategoryNo}>{subCategory.name}</option>
                        ))
                    }
                </select>
            </div>
            {
                addMoneyType === MONEY_ADD_TYPE_MINUS ?
                <div className={css.addMoneyTaskContent}> 지출고급세팅 :
                    <select ref={minusTypeSelectRef} className={css.addMoneyTaskContent1} onChange={(e) => setPriority(Number(e.target.value))}>
                        <option value={MONEY_MINUS_TYPE_FIXED}>필수지출</option>
                        <option value={MONEY_MINUS_TYPE_FREE}>비필수지출</option>
                    </select>
                </div> : <div/>
            }
            {
                priority === MONEY_MINUS_TYPE_FREE ?
                <div className={css.addMoneyTaskContent}> 불필요사용금액 :
                    <input ref={overMoneyRef} type='text' className={css.addMoneyTaskContent1}/>
                </div> : <div/>
            }
            <div className={css.addMoneyTaskContent}> 사용날짜 : <input ref={dateTimeRef} type='datetime-local' className={css.addMoneyTaskContent1}/></div>
            <div className={css.addMoneyTaskContent}> 설명 : <input ref={detailRef} type='text' className={css.addMoneyTaskContent1}/></div>
            <button  className={css.addMoneyTaskContent} onClick={addMoneyTask}>등록</button>
            <button  className={css.addMoneyTaskContent} onClick={closeAddMoneyTask}>취소</button>

            <br/>
            <br/>
        </div>
    )
}

export default AddMoneyTask;