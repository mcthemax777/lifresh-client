import React, {useRef} from 'react';
import css from "./MenuComponent.module.css";
import {
    MONEY_MENU_TYPE_CATEGORY,
    MONEY_MENU_TYPE_MANAGER,
    MONEY_MENU_TYPE_USE,
    PAGE_TYPE_MONEY,
    PAGE_TYPE_SCHEDULE,
    PAGE_TYPE_TO_DO
} from "../../Defines";
function MenuComponent(props) {

    const myInfoRef = useRef();
    const myInfoPictRef = useRef();
    const myInfoNoPictRef = useRef();
    const myInfoNameRef = useRef();
    const myInfoEmailRef = useRef();

    const myInfoPictPath = "img/my_info_pict.png";

    const clickDiv = (e) => {
        e.stopPropagation()
    }

    const clickMenu = (pageType) => {
        props.changePage(pageType);
        props.setIsOpenMenu(false);
    }

    return(
        <div className={css.categoryMenuWithOutside} onClick={() => props.setIsOpenMenu(false)}>
            <div className={css.categoryMenuWithOutside1}></div>
            <div id="categoryMenu" className={css.categoryMenu} onClick={clickDiv}>
                <div ref={myInfoRef} className={css.myInfoDiv}>
                    <div ref={myInfoPictRef} className={css.myInfoPictDiv}>
                        <img src={myInfoPictPath} width={64} height={64} alt={undefined}/>
                    </div>
                    <div ref={myInfoNoPictRef} className={css.myInfoNoPictDiv}>
                        <div ref={myInfoNameRef} className={css.myInfoNameDiv}>운영자</div>
                        <div ref={myInfoEmailRef} className={css.myInfoEmailDiv}>mcthemax777@gmail.com</div>
                    </div>
                </div>
                <div className={css.categoryDiv}>
                    일정관리
                    <div className={css.categoryTextDiv} onClick={() => clickMenu(PAGE_TYPE_SCHEDULE)}> ⅰ 일정표</div>
                </div>
                <div className={css.categoryDiv}>
                    체크리스트
                    <div className={css.categoryTextDiv} onClick={() => clickMenu(PAGE_TYPE_TO_DO)}> ⅱ 목표</div>
                </div>
                <div className={css.categoryDiv}>
                    가계부
                    <div className={css.categoryTextDiv} onClick={() => clickMenu(PAGE_TYPE_MONEY)}> ⅲ 가계부</div>
                </div>
                <div className={css.categoryDiv}>
                    종합
                    <div className={css.categoryTextDiv}> ⅴ 일기</div>
                    <div className={css.categoryTextDiv}> ⅵ 농장</div>
                </div>
                <div className={css.categoryDiv}>
                    기타
                    <div className={css.categoryTextDiv}> ⅶ 설정</div>
                </div>
            </div>
        </div>
    )
}

export default MenuComponent;