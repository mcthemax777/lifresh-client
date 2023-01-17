import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import SendData from "../../api/SendData";
import '../../Global.css';
import {
    checkErrorResponse,
    MONEY_MANAGER_TYPE_BANK_BOOK,
    MONEY_MANAGER_TYPE_CASH, MONEY_MANAGER_TYPE_CHECK_CARD,
    MONEY_MANAGER_TYPE_CREDIT_CARD, MONEY_MANAGER_TYPE_GIFT_CARD,
    MONEY_MANAGER_TYPE_PREPAYMENT_CARD,
} from "../../Defines";
import css from './AddMoneyManager.module.css'
import {MoneyContext} from "../pages/MoneyPage";

function AddMoneyManager(props) {
    const {store, loadMoneyTaskList} = useContext(MoneyContext);
    let navigate = useNavigate();

    const nameRef = useRef();
    const moneyRef = useRef();
    const typeRef = useRef();
    const detailRef = useRef();
    const calculateDateRef = useRef();
    const payDateRef = useRef();
    const cardBankBookRef = useRef();

    const [title, setTitle] = useState('자산');
    const [cardBankBook, setCardBankBook] = useState(0);
    const [moneyManagerType, setMoneyManagerType] = useState(MONEY_MANAGER_TYPE_CASH);

    const uid = localStorage.getItem("uid");
    const sid = localStorage.getItem("sid");



    const addMoneyManagerListCallback = (response, sendData) => {

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
        closeAddMoneyManager();

    }

    const addMoneyManagerListErr = (response) => {
        console.log("addMoneyTaskListErr");
        console.log(response);

    }

    const reset = () => {
        // pmSelectRef.current.selectedIndex = MONEY_ADD_TYPE_MINUS;
        // moneyRef.current.value = '';
        // detailRef.current.value = '';
        //
        // setSelectedMainCategoryNo(0);
        // mainCategorySelectRef.current.selectedIndex = 0;
    };

    useEffect(() => {

    }, []);

    const bankCardList = () => {
        return
    }



    const addMoneyManager = (response) => {
        // const moneyValue = moneyRef.current.value;
        // const dateTimeLocal = dateTimeRef.current.value;
        // const detail = detailRef.current.value;
        // let overMoney = 0;
        // if(addMoneyType === MONEY_ADD_TYPE_MINUS && priority === MONEY_MINUS_TYPE_FREE) {
        //     const overMoneyValue = overMoneyRef.current.value;
        //
        //     //숫자가 아닐 경우 에러
        //     if (isNumeric(overMoneyValue) === false) {
        //         alert("비필수금액 - 숫자를 입력하세요.");
        //         return;
        //     }
        //
        //     overMoney = Number(overMoneyValue);
        // }
        //
        // //분류가 되지 않은 경우
        // if(selectedMainCategoryNo === 0 || selectedSubCategoryNo === 0) {
        //     alert("분류를 선택해주세요.");
        //     return;
        // }
        //
        // //숫자가 아닐 경우 에러
        // if(isNumeric(moneyValue) === false ) {
        //     alert("숫자를 입력하세요.");
        //     return;
        // }
        //
        //
        //
        // let money = Number(moneyValue);
        //
        // //돈 입력 안했을 경우
        // if(money <= 0) {
        //     alert("0보다 큰 입력하세요.");
        //     return;
        // }
        //
        // //비필수금액이 현재돈보다 클 수 없음
        // if(money < overMoney) {
        //     alert("비필수 금액이 사용금액보다 큽니다.");
        //     return;
        // }
        //
        // //날자 입력 안 했을 경우
        // if(dateTimeLocal === "") {
        //     alert("날짜 시간을 선택해주세요.");
        //     return;
        // }
        //
        // if(addMoneyType === MONEY_ADD_TYPE_PLUS && priority === MONEY_MINUS_TYPE_FREE) {
        //     alert("수입은 비필수가 없습니다.");
        // }
        //
        // const dateTime = convertDateTimeLocalToTime(dateTimeLocal);
        //
        //
        // // eslint-disable-next-line no-restricted-globals
        // var addConfirm = confirm(" 데이터를 추가하시겠습니까?");
        // if (addConfirm === true) {
        //
        //     const addMoneyTaskObj = {
        //         moneyTaskNo: moneyTaskNo,
        //         categoryType: addMoneyType,
        //         mainCategoryNo: selectedMainCategoryNo,
        //         subCategoryNo: selectedSubCategoryNo,
        //         startTime: dateTime,
        //         endTime: dateTime,
        //         money: money,
        //         overMoney: overMoney,
        //         priority: priority,
        //         detail: detail,
        //         type: 0,
        //         todayNo: 0
        //     };
        //
        //     console.log(addMoneyTaskObj);
        //
        //     SendData("addMoneyTaskList",
        //         {
        //             uid: uid,
        //             sid: sid,
        //             moneyTaskList:
        //                 [
        //                     addMoneyTaskObj
        //                 ]
        //         },
        //         addMoneyTaskListCallback,
        //         addMoneyTaskListErr
        //     );
        // }
    }

    const closeAddMoneyManager = () => {
        props.closeFunc();
    }

    const BANK_TYPE_LIST = [MONEY_MANAGER_TYPE_CREDIT_CARD, MONEY_MANAGER_TYPE_CHECK_CARD];

    return(
        <div className={css.addMoneyTaskDiv}>
            <h2>{title}</h2>
            <div className={css.addMoneyTaskContent}> 이름 :  <input ref={nameRef} type='text' className={css.addMoneyTaskContent1}/></div>

            <div className={css.addMoneyTaskContent}> 타입 :
                <select ref={typeRef} className={css.addMoneyTaskContent1} onChange={(e) => setMoneyManagerType(Number(e.target.value))}>
                    <option value={MONEY_MANAGER_TYPE_CASH}>현금</option>
                    <option value={MONEY_MANAGER_TYPE_BANK_BOOK}>은행</option>
                    <option value={MONEY_MANAGER_TYPE_CREDIT_CARD}>신용카드</option>
                    <option value={MONEY_MANAGER_TYPE_CHECK_CARD}>체크카드</option>
                    <option value={MONEY_MANAGER_TYPE_PREPAYMENT_CARD}>선불카드</option>
                    <option value={MONEY_MANAGER_TYPE_GIFT_CARD}>상품권</option>
                </select>
            </div>

            <div className={css.addMoneyTaskContent}> 금액 :  <input ref={moneyRef} type='number' className={css.addMoneyTaskContent1}/></div>
            <div className={css.addMoneyTaskContent}> 설명 :  <input ref={detailRef} type='text' className={css.addMoneyTaskContent1}/></div>

            {
                BANK_TYPE_LIST.includes(moneyManagerType) ?
                    <div className={css.addMoneyTaskContent}> 은행 :
                        <select ref={cardBankBookRef} className={css.addMoneyTaskContent1} onChange={(e) => setCardBankBook(Number(e.target.value))}>
                            {
                                store.moneyManagerList.map((moneyManager, index) => (
                                    Number(MONEY_MANAGER_TYPE_BANK_BOOK) === Number(moneyManager.type) &&
                                    <option key={index} value={moneyManager.moneyManagerNo}>{moneyManager.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    :
                    <div/>
            }

            {
                moneyManagerType === MONEY_MANAGER_TYPE_CREDIT_CARD ?
                    <div className={css.addMoneyTaskContent}>  :
                        <div className={css.addMoneyTaskContent}> 정산일 :  <input ref={calculateDateRef} type='number' className={css.addMoneyTaskContent1}/></div>
                        <div className={css.addMoneyTaskContent}> 결제일 :  <input ref={payDateRef} type='number' className={css.addMoneyTaskContent1}/></div>
                    </div>
                    :
                    <div/>
            }

            <button  className={css.addMoneyTaskContent} onClick={addMoneyManager}>등록</button>
            <button  className={css.addMoneyTaskContent} onClick={closeAddMoneyManager}>취소</button>

            <br/>
            <br/>
        </div>
    )
}

export default AddMoneyManager;