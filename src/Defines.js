import {useNavigate} from "react-router-dom";

export const PAGE_TYPE_SCHEDULE = 0;
export const PAGE_TYPE_DO_TO = 1;
export const PAGE_TYPE_MONEY = 2;
export const PAGE_TYPE_SETTING = 3;

export const PERIOD_TYPE_DAY = 0;
export const PERIOD_TYPE_WEEK = 1;
export const PERIOD_TYPE_MONTH = 2;
export const PERIOD_TYPE_YEAR = 3;

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