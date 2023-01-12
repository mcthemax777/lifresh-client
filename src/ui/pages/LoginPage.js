import React, {useEffect, useState} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import LoginButton from "../components/LoginButton";
import { AppContext } from '../../App'
import SendData from "../../api/SendData";
import MainPage from "./MainPage";
import {RESPONSE_CODE_SUCCESS} from "../../Defines";

function LoginPage() {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const loginCallback = (response) => {
        const data = response.data;

        if(data.resultCode !== RESPONSE_CODE_SUCCESS)
        {
            alert(data.resultMsg);
            console.log(data.resultCode);
            return ;
        }

        //세션 저장
        localStorage.setItem("uid", data.uid);
        localStorage.setItem("sid", data.sid);

        //화면 전환
        navigate("/Main");
    }

    const loginErr = (response) => {
        console.log("error" + response);
    }

    const handleClick = () => {

        //포맷 체크
        if (id === '' || password === '') {
            alert('빈 문자열');
            return;
        }

        // TODO. 로딩 화면 시작해야됨

        //전송
        SendData("login",
            {
                userId: id,
                password: password
            },
            loginCallback,
            loginErr
        );
    }

    useEffect(() => {

        const uid = localStorage.getItem("uid");
        const sid = localStorage.getItem("sid");

        //uid, sid 있으면 자동 로그인
        if(uid != null && sid != null) {
            console.log("uid : " + uid + ", sid : " + sid);
            navigate('/Main');
        }

    }, []);

    return (
        <div>
            <input type="text" id="id" onChange={e=> setId(e.target.value)}></input><br/>
            <input type="password" id="password" onChange={e=> setPassword(e.target.value)}></input><br/>
            <LoginButton onClick={handleClick}></LoginButton>
        </div>
    )
}

export default LoginPage;