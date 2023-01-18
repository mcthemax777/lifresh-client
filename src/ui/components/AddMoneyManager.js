import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import SendData from "../../api/SendData";
import '../../Global.css';
import {
    checkErrorResponse, isNumeric,
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
    const calcDateRef = useRef();
    const payDateRef = useRef();
    const cardBankBookRef = useRef();

    const [title, setTitle] = useState('자산');
    const [linkedMoneyManagerNo, setLinkedMoneyManagerNo] = useState(0);
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
        console.log(store.moneyManagerList);


        //인풋 데이터 초기화
        reset();
        props.closeFunc();

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

    const addMoneyManager = (response) => {
        const moneyValue = moneyRef.current.value;
        const name = nameRef.current.value;
        const detail = detailRef.current.value;
        let payDate = new Date();
        let calcDate = new Date();

        // if(moneyManagerType === MONEY_MANAGER_TYPE_CREDIT_CARD || moneyManagerType === MONEY_MANAGER_TYPE_CHECK_CARD) {
        //     const overMoneyValue = overMoneyRef.current.value;
        //
        //     //숫자가 아닐 경우 에러
        //     if (isNumeric(overMoneyValue) === false) {
        //         alert("비필수금액 - 숫자를 입력하세요.");
        //         return;
        //     }
        //
        //     if(moneyManagerType === MONEY_MANAGER_TYPE_CREDIT_CARD) {
        //     }
        // }

        //숫자가 아닐 경우 에러
        if(isNumeric(moneyValue) === false ) {
            alert("숫자를 입력하세요.");
            return;
        }

        let money = Number(moneyValue);



        // eslint-disable-next-line no-restricted-globals
        var addConfirm = confirm(" 데이터를 추가하시겠습니까?");
        if (addConfirm === true) {

            const addMoneyManagerObj = {
                moneyManagerNo: 0,
                moneyManagerType: moneyManagerType,
                calcDate: 1,
                payDate: 25,
                money: money,
                name: name,
                detail: detail,
                linkedMoneyManagerNo: linkedMoneyManagerNo,
            };

            console.log(addMoneyManagerObj);

            SendData("addMoneyManagerList",
                {
                    uid: uid,
                    sid: sid,
                    moneyManagerList:
                        [
                            addMoneyManagerObj
                        ]
                },
                addMoneyManagerListCallback,
                addMoneyManagerListErr
            );
        }
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
                        <select ref={cardBankBookRef} className={css.addMoneyTaskContent1} onChange={(e) => setLinkedMoneyManagerNo(Number(e.target.value))}>
                            {
                                store.moneyManagerList.map((moneyManager, index) => (
                                    Number(MONEY_MANAGER_TYPE_BANK_BOOK) === Number(moneyManager.moneyManagerType) &&
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
                        <div className={css.addMoneyTaskContent}> 정산일 :  <input ref={calcDateRef} type='number' className={css.addMoneyTaskContent1}/></div>
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