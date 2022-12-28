import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";

const loginUrl = 'http://127.0.0.1/nine2017_yongchan/gameserver/gateway.php';

function SendData(url, data, callback, err) {
    // 서버 전송 후 로그인 처리
    axios.post(

        loginUrl,
        data,
        {
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        }
    ).then((response) => {
        callback(response)
    }).catch((response) => {
        err(response)
    });
}

export default SendData;
