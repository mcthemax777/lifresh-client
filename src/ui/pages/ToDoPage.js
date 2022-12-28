import React from 'react';

function ToDoPage() {
    return(
        <div>
            <h2>ToDoPage</h2>
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