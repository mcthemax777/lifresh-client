import React from 'react';

function MenuComponent(props) {

    return(
        <div>
            <button onClick={() => props.onClick1(0)}>
                일정관리
            </button>
            <button onClick={() => props.onClick1(1)}>
                해야할일
            </button>
            <button onClick={() => props.onClick1(2)}>
                가계부
            </button>
            <button onClick={() => props.onClick1(3)}>
                설정
            </button>
        </div>
    )
}

export default MenuComponent;