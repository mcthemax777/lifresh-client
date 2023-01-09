import React from 'react';
import css from './ToDoPage.module.css'

function ToDoPage() {
    return(
        <div className={css.toDoPageDiv}>
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
        </div>
    )
}

export default ToDoPage;