import React, {useContext, useEffect, useRef, useState} from 'react';
import '../../Global.css';
import css from './AddMoneyTaskComponent.module.css'
import {MoneyContext} from "../pages/MoneyPage";
import AddMoneyTask from "./AddMoneyTask";
import AddMoneyManager from "./AddMoneyManager";
import {
    ADD_TYPE_MONEY_MANAGER,
    ADD_TYPE_MONEY_TASK
} from "../../Defines";

function AddMoneyTaskComponent(props) {
    const {store, } = useContext(MoneyContext);
    const [addType, setAddType] = useState(0);
    return(
        <div className={css.addDiv}>
            <div id="addTypeDiv" className={css.addTypeDiv}>
                <div className={css.addTypeTextDiv} onClick={ () => setAddType(ADD_TYPE_MONEY_TASK)}>수입,지출</div>
                <div className={css.addTypeTextDiv} onClick={ () => setAddType(ADD_TYPE_MONEY_MANAGER)}>자산추가</div>
            </div>
            {
                addType === 0 ? <AddMoneyTask closeFunc={() => store.setIsAddTask(false)}/> : <AddMoneyManager closeFunc={() => store.setIsAddTask(false)}/>
            }

        </div>
    )
}

export default AddMoneyTaskComponent;