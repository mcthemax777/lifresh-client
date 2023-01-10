import React, {useEffect, useRef, useState} from 'react';
import css from './ToDoPage.module.css'

function ToDoPage(props) {

    const [addTaskBtn, setAddTaskBtn] = useState(0);

    const moneyAddTaskBtnPath = "img/todo_add_task_btn.png";
    const moneyAddTaskBtnClickPath = "img/todo_add_task_btn_click.png";

    const clickAddTaskBtn = () => {
        console.log("clickAddTaskBtn");
    }

    //화면 크기에 따라 데이터 보일지 안보일지 세팅
    const toDoPageDiv = useRef();
    useEffect(() => {
        if(props.isToDoPageDisplay === true) {
            toDoPageDiv.current.style.display = "flex";
        } else {
            toDoPageDiv.current.style.display = "none";
        }

    }, [props.isToDoPageDisplay]);

    return(
        <div ref={toDoPageDiv} className={css.toDoPageDiv}>
            <div className={css.todoTitleDiv}>체크리스트</div>
            <div>
                <table className='listTable'>
                    <tbody>
                    <tr>
                        <td className='listTableIndex th'>index</td>
                        <td className='listTableTitle th'>title</td>
                    </tr>
                    <tr>
                        <td className='listTableIndex'></td>
                        <td className='listTableTitle noData'>작성된 글이 없습니다.</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <button onClick={clickAddTaskBtn} className="addTaskBtn" draggable={false} onMouseDown={() => setAddTaskBtn(1)} onMouseUp={() => setAddTaskBtn(0)} onMouseLeave={() => setAddTaskBtn(0)} >
                { addTaskBtn === 0 && <img src={moneyAddTaskBtnPath} width={64} height={64} /> }
                { addTaskBtn === 1 && <img src={moneyAddTaskBtnClickPath} width={64} height={64} /> }
            </button>
        </div>
    )
}

export default ToDoPage;