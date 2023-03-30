import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import SendData from "../../api/SendData";
import '../../Global.css';
import {
    checkErrorResponse,
    PERIOD_TYPE_DAY,
    PERIOD_TYPE_MONTH,
    PERIOD_TYPE_WEEK,
    PERIOD_TYPE_YEAR,
    MONEY_VIEW_TYPE_TIME,
    PERIOD_TYPE_CUSTOM,
    convertStringToDateTime,
    MONEY_FILTER_TYPE_INCOME,
    MONEY_VIEW_TYPE_CATEGORY,
    MONEY_FILTER_TYPE_FIXED_SPEND,
    MONEY_FILTER_TYPE_FREE_SPEND,
    MONEY_ADD_TYPE_PLUS,
    MONEY_ADD_TYPE_MINUS,
    MONEY_MANAGER_TYPE_BANK_BOOK,
    MONEY_MENU_TYPE_USE,
    MONEY_MENU_TYPE_MANAGER,
    MONEY_VIEW_TYPE_MONEY_MANAGER,
    MONEY_MENU_TYPE_CATEGORY
} from "../../Defines";
import css from "./MoneyPage.module.css";
import MoneyDayComponent from "../components/MoneyDayComponent";
import MoneyYearComponent from "../components/MoneyYearComponent";
import MoneyWeekComponent from "../components/MoneyWeekComponent";
import MoneyMonthComponent from "../components/MoneyMonthComponent";
import MoneyDateComponent from "../components/MoneyDateComponent";
import AddMoneyTaskComponent from "../components/AddMoneyTaskComponent";
import MoneyManagerComponent from "../components/MoneyManagerComponent";

export const MoneyContext = React.createContext()

function MoneyPage(props) {

    let navigate = useNavigate();

    const [moneyMenuType, setMoneyMenuType] = useState(MONEY_MENU_TYPE_USE);
    const [viewType, setViewType] = useState(MONEY_VIEW_TYPE_TIME);
    const [mainCategoryList, setMainCategoryList] = useState([]);
    const [subCategoryList, setSubCategoryList] = useState([]);
    const [moneyManagerList, setMoneyManagerList] = useState([]);
    const [moneyTaskList, setMoneyTaskList] = useState([]);
    const [freeMinusMoney, setFreeMinusMoney] = useState(0);
    const [minusMoney, setMinusMoney] = useState(0);
    const [plusMoney, setPlusMoney] = useState(0);
    const [isAddTask, setIsAddTask] = useState(false);
    const [startDate, setStartDate] = useState(getTodayDateWithoutTime());
    const [endDate, setEndDate] = useState(getTodayDateWithoutTime());
    const [filterList, setFilterList] = useState([true, true, true]);
    const [periodType, setPeriodType] = useState(PERIOD_TYPE_MONTH);
    const [moneyTaskListWithFilter, setMoneyTaskListWithFilter] = useState([]);

    const store = {
        mainCategoryList, setMainCategoryList,
        subCategoryList, setSubCategoryList,
        moneyManagerList, setMoneyManagerList,
        moneyTaskList, setMoneyTaskList,
        minusMoney, setMinusMoney,
        plusMoney, setPlusMoney,
        freeMinusMoney, setFreeMinusMoney,
        isAddTask, setIsAddTask,
        startDate, setStartDate,
        endDate, setEndDate,
        periodType, setPeriodType,
        filterList, setFilterList,
    }

    const uid = localStorage.getItem("uid");
    const sid = localStorage.getItem("sid");

    const moneyComponentDiv = useRef();

    function getTodayDateWithoutTime() {
        let date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);

        return date;
    }

    const isBetweenPeriod = (date) => {


        if (startDate.getFullYear() > date.getFullYear()) {
            return false;
        } else if(startDate.getFullYear() === date.getFullYear()) {
            if (startDate.getMonth() > date.getMonth()) {
                return false;
            } else if(startDate.getMonth() === date.getMonth()) {
                if (startDate.getDate() > date.getDate()) {
                    return false;
                }
            }
        }

        if (endDate.getFullYear() < date.getFullYear()) {
            return false;
        } else if(endDate.getFullYear() === date.getFullYear()) {
            if (endDate.getMonth() < date.getMonth()) {
                return false;
            } else if(endDate.getMonth() === date.getMonth()) {
                if (endDate.getDate() < date.getDate()) {
                    return false;
                }
            }
        }

        return true;
    }

    const loadMoneyTaskListCallback = (response) => {

        const data = response.data;

        if(checkErrorResponse(data, navigate) === false) {
            return ;
        }

        //정렬하기
        data.moneyTaskList.sort(function(a, b)  {
            if(a.startTime > b.startTime) return -1;
            if(a.startTime === b.startTime) return 0;
            if(a.startTime < b.startTime) return 1;
        });

        console.log("receive data");
        console.log(data);

        setMainCategoryList(data.mainCategoryList);
        setSubCategoryList(data.subCategoryList);
        setMoneyTaskList(data.moneyTaskList);
        setMoneyManagerList(data.moneyManagerList);
    }

    const loadMoneyTaskListErr = (response) => {
        console.log("error" + response);
    }

    const loadMoneyTaskList = () =>
    {
        SendData("getMoneyTaskList",
            {
                uid: uid,
                sid: sid
            },
            loadMoneyTaskListCallback,
            loadMoneyTaskListErr
        );
    }

    useEffect(() => {
        loadMoneyTaskList();
    }, []);

    useEffect( () => {

        let newMoneyTaskListWithFilter = [];
        let newPlusMoney = 0;
        let newMinusMoney = 0;
        let newFreeMinusMoney = 0;

        for(let i = 0; i < moneyTaskList.length; i++) {

            const moneyTask = moneyTaskList[i];
            //기간 확인
            if (isBetweenPeriod(convertStringToDateTime(moneyTask.startTime))) {

                let passFilter = true;

                //필터 확인
                if (filterList[MONEY_FILTER_TYPE_INCOME] === false && moneyTask.categoryType === MONEY_ADD_TYPE_PLUS) {
                    passFilter = false;
                } else if (filterList[MONEY_FILTER_TYPE_FIXED_SPEND] === false && (moneyTask.categoryType === MONEY_ADD_TYPE_MINUS && moneyTask.overMoney === 0)) {
                    passFilter = false;
                } else if (filterList[MONEY_FILTER_TYPE_FREE_SPEND] === false) {
                    if (filterList[MONEY_FILTER_TYPE_FIXED_SPEND]) {
                        if (moneyTask.categoryType === MONEY_ADD_TYPE_MINUS && moneyTask.overMoney === moneyTask.money) {
                            passFilter = false;
                        }
                    } else {
                        if (moneyTask.categoryType === MONEY_ADD_TYPE_MINUS) {
                            passFilter = false;
                        }
                    }
                }

                if (passFilter) {
                    newMoneyTaskListWithFilter.push(moneyTask);

                    if (filterList[MONEY_FILTER_TYPE_INCOME] && moneyTask.categoryType === MONEY_ADD_TYPE_PLUS) newPlusMoney += moneyTask.money;
                    else if(moneyTask.categoryType === MONEY_ADD_TYPE_MINUS) {
                        if (filterList[MONEY_FILTER_TYPE_FIXED_SPEND]) {
                            newMinusMoney += (moneyTask.money);
                        }
                        if (filterList[MONEY_FILTER_TYPE_FREE_SPEND] && moneyTask.overMoney > 0) {
                            newFreeMinusMoney += moneyTask.overMoney;
                        }
                    }
                }
            }
        }


        setMoneyTaskListWithFilter(newMoneyTaskListWithFilter);
        setPlusMoney(newPlusMoney);
        setMinusMoney(newMinusMoney);
        setFreeMinusMoney(newFreeMinusMoney);

    }, [startDate, endDate, moneyTaskList, viewType, filterList]);


    const getMainCategoryNameByNo = (mainCategoryNo) => {

        for(let i = 0 ; i < mainCategoryList.length ; i++) {
            if (Number(mainCategoryList[i].mainCategoryNo) === mainCategoryNo) {
                return mainCategoryList[i].name;
            }
        }

        return "NONE";
    }

    // const getMainCategoryNameBySubCategoryNo = (subCategoryNo) => {
    //
    //     for(let i = 0 ; i < subCategoryList.length ; i++) {
    //         if (Number(subCategoryList[i].subCategoryNo) === subCategoryNo) {
    //             for(let j = 0 ; j < mainCategoryList.length ; j++) {
    //                 if (Number(mainCategoryList[j].mainCategoryNo) === Number(subCategoryList[i].mainCategoryNo)) {
    //                     return mainCategoryList[j].name;
    //                 }
    //             }
    //         }
    //     }
    //
    //     return "NONE";
    // }

    const getSubCategoryNameByNo = (subCategoryNo) => {

        for(let i = 0 ; i < subCategoryList.length ; i++) {
            if (Number(subCategoryList[i].subCategoryNo) === subCategoryNo) {
                return subCategoryList[i].name;
            }
        }

        return "NONE";
    }

    const [addTaskBtn, setAddTaskBtn] = useState(0);

    const moneyAddTaskBtnPath = "img/money_add_task_btn.png";
    const moneyAddTaskBtnClickPath = "img/money_add_task_btn_click.png";

    const clickAddTaskBtn = () => {
        console.log("clickAddTaskBtn");

        setIsAddTask(true);
    }

    //화면 크기에 따라 데이터 보일지 안보일지 세팅
    const moneyPageDiv = useRef();
    useEffect(() => {
        if(props.isMoneyPageDisplay === true) {
            moneyPageDiv.current.style.display = "flex";
        } else {
            moneyPageDiv.current.style.display = "none";
        }

    }, [props.isMoneyPageDisplay]);

    const clickView = (newViewType) => {

        if(newViewType === viewType) return ;

        setViewType(newViewType);

        // if(newViewType === MONEY_VIEW_TYPE_CATEGORY) {
        //     if(filterList[MONEY_FILTER_TYPE_INCOME] && (filterList[MONEY_FILTER_TYPE_FIXED_SPEND] || filterList[MONEY_FILTER_TYPE_FREE_SPEND])) {
        //         let copyFilterList = [...filterList];
        //         copyFilterList[MONEY_FILTER_TYPE_INCOME] = false;
        //
        //         setFilterList(copyFilterList);
        //     }
        // }
    }

    const clickFilter = (filterType) => {
        let copyFilterList = [...filterList];

        if(copyFilterList[filterType]) copyFilterList[filterType] = false;
        else {
            copyFilterList[filterType] = true;
            if(filterType === MONEY_FILTER_TYPE_INCOME && viewType === MONEY_VIEW_TYPE_CATEGORY) {
                copyFilterList[MONEY_FILTER_TYPE_FIXED_SPEND] = false;
                copyFilterList[MONEY_FILTER_TYPE_FREE_SPEND] = false;
            }
            else if(filterType !== MONEY_FILTER_TYPE_INCOME && viewType === MONEY_VIEW_TYPE_CATEGORY) {
                copyFilterList[MONEY_FILTER_TYPE_INCOME] = false;
            }
        }

        setFilterList(copyFilterList);
    }

    const viewRefList = [useRef(), useRef(), useRef()];
    const menuRefList = [useRef(), useRef(), useRef()];

    useEffect(() => {

        for( let i = 0 ; i < menuRefList.length ; i++) {
            if(i === moneyMenuType) {
                // filterRefList[i].current.style.backgroundColor = "#80ff80";
                // filterRefList[i].current.style.color = "white";
                menuRefList[i].current.style.color = "#2f2f2f";
            } else {
                // filterRefList[i].current.style.backgroundColor = "white";
                // filterRefList[i].current.style.color = "#8f8f8f";
                menuRefList[i].current.style.color = "#d0d0d0";
            }
        }

    }, [moneyMenuType]);

    useEffect(() => {

        for( let i = 0 ; i < viewRefList.length ; i++) {
            if(i === viewType) {
                // filterRefList[i].current.style.backgroundColor = "#80ff80";
                // filterRefList[i].current.style.color = "white";
                viewRefList[i].current.style.borderBottom = "2px solid #00ff00";
            } else {
                // filterRefList[i].current.style.backgroundColor = "white";
                // filterRefList[i].current.style.color = "#8f8f8f";
                viewRefList[i].current.style.borderBottom = "0px solid #00ff00";

            }
        }

    }, [viewType]);

    const filterRefList = [useRef(), useRef(), useRef()];

    // useEffect(() => {
    //
    //     for( let i = 0 ; i < filterRefList.length ; i++) {
    //         if(filterList[i]) {
    //             filterRefList[i].current.style.backgroundColor = "#80ff80";
    //             filterRefList[i].current.style.color = "white";
    //             filterRefList[i].current.style.border = "1px solid white";
    //         } else {
    //             filterRefList[i].current.style.backgroundColor = "white";
    //             filterRefList[i].current.style.color = "#8f8f8f";
    //             filterRefList[i].current.style.border = "1px solid #d0d0d0";
    //         }
    //     }
    //
    // }, [filterList]);

    let closeDetail = undefined;
    let moneyTaskNo = 0;

    const setActiveDetail = (newMoneyTaskNo, newCloseDetail) => {

        if(moneyTaskNo === newMoneyTaskNo) {
            moneyTaskNo = 0;
            closeDetail = undefined;

            return ;
        }

        //기존 창 닫기
        if(closeDetail !== undefined) {
            console.log("setActiveDetail");

            closeDetail();

        }

        moneyTaskNo = newMoneyTaskNo;
        closeDetail = newCloseDetail;

    }

    return(
        <MoneyContext.Provider value={{store, loadMoneyTaskList, getMainCategoryNameByNo, getSubCategoryNameByNo, setActiveDetail}}>
            <div ref={moneyPageDiv} className={css.moneyPageDiv}>
                <div id="menuTypeDiv" className={css.menuTypeDiv}>
                    <div ref={menuRefList[MONEY_MENU_TYPE_USE]} className={css.menuTypeTextDiv} onClick={ () => setMoneyMenuType(MONEY_MENU_TYPE_USE)}>가계부</div>
                    <div ref={menuRefList[MONEY_MENU_TYPE_MANAGER]} className={css.menuTypeTextDiv} onClick={ () => setMoneyMenuType(MONEY_MENU_TYPE_MANAGER)}>자산 관리</div>
                    <div ref={menuRefList[MONEY_MENU_TYPE_CATEGORY]} className={css.menuTypeTextDiv} onClick={ () => setMoneyMenuType(MONEY_MENU_TYPE_CATEGORY)}>카테고리 관리</div>
                </div>
                {
                    moneyMenuType === MONEY_MENU_TYPE_USE ?
                        <div className={css.MenuContentDiv}>
                            <MoneyDateComponent />
                            <div id="viewTypeDiv" className={css.viewTypeDiv}>
                                <div ref={viewRefList[MONEY_VIEW_TYPE_TIME]} className={css.viewTypeTextDiv} onClick={ () => clickView(MONEY_VIEW_TYPE_TIME)}>날짜별</div>
                                <div ref={viewRefList[MONEY_VIEW_TYPE_CATEGORY]} className={css.viewTypeTextDiv} onClick={ () => clickView(MONEY_VIEW_TYPE_CATEGORY)}>카테고리별</div>
                                <div ref={viewRefList[MONEY_VIEW_TYPE_MONEY_MANAGER]} className={css.viewTypeTextDiv} onClick={ () => clickView(MONEY_VIEW_TYPE_MONEY_MANAGER)}>자산별</div>
                            </div>
                            {
                                1 === 0 ?
                                <div className={css.filterTypeDiv}>
                                    <div className={css.filterTypeContentDiv}>
                                        <div ref={filterRefList[MONEY_FILTER_TYPE_INCOME]} className={css.filterTypeBtnDiv} onClick={ () => clickFilter(MONEY_FILTER_TYPE_INCOME)}>수입</div>
                                        <div className={css.filterTypePlusTextDiv}>{plusMoney}원</div>
                                    </div>
                                    <div className={css.filterTypeContentDiv}>
                                        <div ref={filterRefList[MONEY_FILTER_TYPE_FIXED_SPEND]} className={css.filterTypeBtnDiv} onClick={ () => clickFilter(MONEY_FILTER_TYPE_FIXED_SPEND)}>필수지출</div>
                                        <div className={css.filterTypeMinusTextDiv}>{minusMoney}원</div>
                                    </div>
                                    <div className={css.filterTypeContentDiv}>
                                        <div ref={filterRefList[MONEY_FILTER_TYPE_FREE_SPEND]} className={css.filterTypeBtnDiv} onClick={ () => clickFilter(MONEY_FILTER_TYPE_FREE_SPEND)}>비필수지출</div>
                                        <div className={css.filterTypeFreeMinusTextDiv}>{freeMinusMoney}원</div>
                                    </div>
                                </div> : <div></div>
                            }



                            {/*<div id="moneySumDiv" className={css.moneySumDiv}>*/}
                            {/*    <div id="plusMoneyDiv" className={css.plusMoneyDiv}>{plusMoney}원</div>*/}
                            {/*    <div id="minusMoneyDiv" className={css.minusMoneyDiv}>{minusMoney}원</div>*/}
                            {/*    <div id="totalMoneyDiv" className={css.totalMoneyDiv}></div>*/}
                            {/*</div>*/}
                            <div ref={moneyComponentDiv} className={css.moneyComponentDiv}>
                                {props.periodType === PERIOD_TYPE_DAY && <MoneyDayComponent className={css.daySchedule} today={props.today} moneyTaskList={moneyTaskListWithFilter}/> }
                                {props.periodType === PERIOD_TYPE_WEEK && <MoneyWeekComponent className={css.daySchedule} moneyTaskLisk={moneyTaskList} today={props.today}/> }
                                {props.periodType === PERIOD_TYPE_MONTH && <MoneyMonthComponent className={css.daySchedule} today={props.today}/> }
                                {props.periodType === PERIOD_TYPE_YEAR && <MoneyYearComponent className={css.daySchedule} moneyTaskLisk={moneyTaskList} today={props.today}/> }
                            </div>

                        </div> :
                            <MoneyManagerComponent className={css.daySchedule} today={props.today} moneyTaskList={moneyTaskListWithFilter}/>
                }
                <button onClick={clickAddTaskBtn} className="addTaskBtn" onMouseDown={() => {setAddTaskBtn(1); clickAddTaskBtn();}} onMouseUp={() => setAddTaskBtn(0)} onMouseLeave={() => setAddTaskBtn(0)} >
                    { addTaskBtn === 0 && <img src={moneyAddTaskBtnPath} width={64} height={64}  alt='추가'/> }
                    { addTaskBtn === 1 && <img src={moneyAddTaskBtnClickPath} width={64} height={64}  alt='추가'/> }
                </button>
                {
                    isAddTask === true ? <AddMoneyTaskComponent closeFunc={() => setIsAddTask(false)}/> : <div></div>
                }

            </div>
        </MoneyContext.Provider>
    )
}

export default MoneyPage;