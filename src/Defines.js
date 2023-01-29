import {useNavigate} from "react-router-dom";

export const PAGE_TYPE_SCHEDULE = 0;
export const PAGE_TYPE_TO_DO = 1;
export const PAGE_TYPE_MONEY = 2;
export const PAGE_TYPE_SETTING = 3;

export const PERIOD_TYPE_DAY = 0;
export const PERIOD_TYPE_WEEK = 1;
export const PERIOD_TYPE_MONTH = 2;
export const PERIOD_TYPE_YEAR = 3;
export const PERIOD_TYPE_CUSTOM = 4;

export const MONEY_MENU_TYPE_USE = 0;
export const MONEY_MENU_TYPE_CATEGORY = 1;
export const MONEY_MENU_TYPE_MANAGER = 2;

export const MONEY_VIEW_TYPE_TIME = 0;
export const MONEY_VIEW_TYPE_CATEGORY = 1;
export const MONEY_VIEW_TYPE_MONEY_MANAGER = 2;

export const MONEY_FILTER_TYPE_INCOME = 0;
export const MONEY_FILTER_TYPE_FIXED_SPEND = 1;
export const MONEY_FILTER_TYPE_FREE_SPEND = 2;

export const MONEY_ADD_TYPE_MINUS = 0;
export const MONEY_ADD_TYPE_PLUS = 1;

export const MONEY_MINUS_TYPE_FIXED = 0;
export const MONEY_MINUS_TYPE_FREE = 1;


export const MONEY_MANAGER_TYPE_CASH = 0;
export const MONEY_MANAGER_TYPE_BANK_BOOK = 1;
export const MONEY_MANAGER_TYPE_CREDIT_CARD = 2;
export const MONEY_MANAGER_TYPE_CHECK_CARD = 3;
export const MONEY_MANAGER_TYPE_PREPAYMENT_CARD = 4;
export const MONEY_MANAGER_TYPE_GIFT_CARD = 5;

export const MONEY_MANAGER_TYPE_COUNT = 6;



export const ADD_TYPE_MONEY_TASK = 0;
export const ADD_TYPE_MONEY_CATEGORY = 1;
export const ADD_TYPE_MONEY_MANAGER = 2;

export const checkIsToday = (today, startTime) => {
    return today.getFullYear() === startTime.getFullYear() &&
        today.getMonth() === startTime.getMonth() &&
        today.getDate() === startTime.getDate();
}

export const checkIsMonth = (today, startTime) => {
    return today.getFullYear() === startTime.getFullYear() &&
        today.getMonth() === startTime.getMonth();
}

// eslint-disable-next-line no-extend-native
Date.prototype.addSeconds = function(s) {
    this.setTime(this.getTime() + (s*1000));
    return this;
}

export const RESPONSE_CODE_SUCCESS = 100;
export const RESPONSE_CODE_INVALID_SESSION = 201;

export const checkErrorResponse = (res, navigate) => {

    if(res.resultCode !== RESPONSE_CODE_SUCCESS)
    {
        alert(res.resultMsg);
        console.log(res.resultCode);

        if(res.resultCode === RESPONSE_CODE_INVALID_SESSION)
        {
            localStorage.clear();
            navigate("/Login");
        }

        return false;
    }

    return true;
}

export function currentTime() {
    var today = new Date();
    today.setHours(today.getHours() + 9);
    return today.toISOString().replace('T', ' ').substring(0, 19);
}

export function convertDateTimeToString(date) {
    date.setHours(date.getHours() + 9);
    return date.toISOString().replace('T', ' ').substring(0, 19);
}

export function convertDateTimeLocalToTime(dateTimeLocal) {
    dateTimeLocal += ":00";
    return dateTimeLocal.replace('T', ' ').substring(0, 19);
}

export function convertStringToDateTime(dateStr) {
    return new Date(dateStr.replace(' ', 'T').substring(0, 19));


}

export function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseInt(str)) // ...and ensure strings of whitespace fail
}