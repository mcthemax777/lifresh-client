import React from 'react';
import {useDispatch} from "react-redux";
import {uriSave} from "../../reducers/myReducer";

function SignUpPage() {
    const dispatch = useDispatch();

    // reducer의 uriSave 함수를 호출
    function onClick() {
        dispatch(uriSave('/DaySchedulePage'))
    }

    return(
            <button onClick={onClick}>
                Home
            </button>
    );
}

export default SignUpPage;