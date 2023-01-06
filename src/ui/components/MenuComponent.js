import React from 'react';
import css from "./MenuComponent.module.css";
function MenuComponent(props) {

    return(
        <div id="categoryMenu" className={css.categoryMenu}>
            <button id="scheduleCategoryBtn" className={css.categoryBtn} onClick={() => props.clickCategoryBtn(0)}
                    value="일정">일정</button>
            <button id="todoCategoryBtn" className={css.categoryBtn} onClick={() => props.clickCategoryBtn(1)}
                    value="체크리스트">체크리스트</button>
            <button id="moneyCategoryBtn" className={css.categoryBtn} onClick={() => props.clickCategoryBtn(2)}
                    value="가계부">가계부</button>
        </div>
    )
}

export default MenuComponent;