import {useNavigate} from "react-router-dom";
import LoginPage from './ui/pages/LoginPage';


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

export function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseInt(str)) // ...and ensure strings of whitespace fail
}