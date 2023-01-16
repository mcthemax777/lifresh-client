import css from "./MoneyDayComponent.module.css";
import MoneyContent from "./MoneyContent";
import {convertStringToDateTime} from "../../Defines";
import {useEffect, useRef, useState} from "react";
function DayMoneyTaskGroupList(props) {

    const dayMoneyTaskDateDiv = useRef();
    const dayMoneyTaskDayOfWeekDiv = useRef();
    const [groupDate, setGroupDate] = useState('1970.1.1');
    const [dayText, setDayText] = useState('x');

    useEffect( () => {
        const taskStartTime = props.moneyTaskList[0];

        const taskDate = convertStringToDateTime(taskStartTime);

        const date = taskDate.getDate();
        const month = taskDate.getMonth();
        const year = taskDate.getFullYear();
        const day = taskDate.getDay();

        setGroupDate(year + "." + (month+1) + "." + date);

        switch (day) {
            case 1:
                setDayText('월');
                setDayText('mon');
                dayMoneyTaskDayOfWeekDiv.current.style.backgroundColor = '#2f2f2f';
                dayMoneyTaskDateDiv.current.style.color = '#2f2f2f';
                break;
            case 2:
                setDayText('화');
                setDayText('tue');
                dayMoneyTaskDayOfWeekDiv.current.style.backgroundColor = '#2f2f2f';
                dayMoneyTaskDateDiv.current.style.color = '#2f2f2f';
                break;
            case 3:
                setDayText('수');
                setDayText('wed');
                dayMoneyTaskDayOfWeekDiv.current.style.backgroundColor = '#2f2f2f';
                dayMoneyTaskDateDiv.current.style.color = '#2f2f2f';
                break;
            case 4:
                setDayText('목');
                setDayText('thu');
                dayMoneyTaskDayOfWeekDiv.current.style.backgroundColor = '#2f2f2f';
                dayMoneyTaskDateDiv.current.style.color = '#2f2f2f';
                break;
            case 5:
                setDayText('금');
                setDayText('fri');
                dayMoneyTaskDayOfWeekDiv.current.style.backgroundColor = '#2f2f2f';
                dayMoneyTaskDateDiv.current.style.color = '#2f2f2f';
                break;
            case 6:
                setDayText('토');
                setDayText('sat');
                dayMoneyTaskDayOfWeekDiv.current.style.backgroundColor = 'blue';
                dayMoneyTaskDateDiv.current.style.color = 'blue';

                break;
            case 0:
                setDayText('일');
                setDayText('sun');
                dayMoneyTaskDayOfWeekDiv.current.style.backgroundColor = 'red';
                dayMoneyTaskDateDiv.current.style.color = 'red';

                break;
            default:
                setDayText('?');
        }
    }, [props.moneyTaskList]);

    return (
        <div className={css.dayMoneyTaskGroupDiv}>
            <div ref={dayMoneyTaskDateDiv} className={css.dayMoneyTaskDateDiv}>
                {groupDate}
                <div ref={dayMoneyTaskDayOfWeekDiv} className={css.dayMoneyTaskDayOfWeekDiv}>
                    {dayText}
                </div>
            </div>
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