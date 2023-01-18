import React, {useContext, useEffect, useRef, useState} from 'react';
import '../../Global.css';
import css from './AddMoneyTaskComponent.module.css'
import {MoneyContext} from "../pages/MoneyPage";
import AddMoneyTask from "./AddMoneyTask";
import AddMoneyManager from "./AddMoneyManager";
import {
    ADD_TYPE_MONEY_CATEGORY,
    ADD_TYPE_MONEY_MANAGER,
    ADD_TYPE_MONEY_TASK
} from "../../Defines";
import AddMoneyCategory from "./AddMoneyCategory";

function AddMoneyTaskComponent(props) {
    const {store, } = useContext(MoneyContext);
    const [addType, setAddType] = useState(0);
    return(
        <div className={css.addDiv}>
            <div id="addTypeDiv" className={css.addTypeDiv}>
                <div className={css.addTypeTextDiv} onClick={ () => setAddType(ADD_TYPE_MONEY_TASK)}>수입,지출 추가</div>
                <div className={css.addTypeTextDiv} onClick={ () => setAddType(ADD_TYPE_MONEY_CATEGORY)}>카테고리 추가</div>
                <div className={css.addTypeTextDiv} onClick={ () => setAddType(ADD_TYPE_MONEY_MANAGER)}>자산 추가</div>
            </div>
            {
                addType === ADD_TYPE_MONEY_TASK ? <AddMoneyTask closeFunc={() => store.setIsAddTask(false)}/> :
                    addType === ADD_TYPE_MONEY_CATEGORY ? <AddMoneyCategory closeFunc={() => store.setIsAddTask(false)}/> :
                        <AddMoneyManager closeFunc={() => store.setIsAddTask(false)}/>
            }

        </div>
    )
}

export default AddMoneyTaskComponent;