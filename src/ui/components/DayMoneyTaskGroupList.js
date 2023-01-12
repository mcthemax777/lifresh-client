import css from "./MoneyDayComponent.module.css";
import MoneyContent from "./MoneyContent";
function DayMoneyTaskGroupList(props) {

    return (
        <div className={css.dayMoneyTaskGroupDiv}>
            <div className={css.dayMoneyTaskDateDiv}>{props.moneyTaskList[0]}</div>
            {
                props.moneyTaskList[1] !== undefined ? (
                props.moneyTaskList[1].map((moneyTask, index) => (
                    <MoneyContent key={index} moneyTask={moneyTask}/>
                ))) : (
                    <div>NONE</div>
                )
            }
        </div>
    );
}

export default DayMoneyTaskGroupList;