import './LoginButton.css';
import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import SendData from "../../api/SendData";

const loginUrl = 'http://127.0.0.1/nine2017_yongchan/gameserver/gateway.php';

function LoginButton(props) {

    const cb = (response) => {
        // 유아이변경 끝나면 다음으로 넘기기
        setTimeout(() => {
            console.log("get main data");
            props.cb(response);

        }, 3000);
    }

    const err = (response) => {
        // 유아이변경 끝나면 다음으로 넘기기
        setTimeout(() => {
            console.log("error");
            props.err(response);

        }, 3000);
    }


    return (
        <button onClick={props.onClick}>
            Click me
        </button>
    );
}

export default LoginButton;
