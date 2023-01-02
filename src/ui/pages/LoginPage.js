import React, {useEffect, useState} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import LoginButton from "../components/LoginButton";
import { AppContext } from '../../App'
import SendData from "../../api/SendData";
import MainPage from "./MainPage";
import {RESPONSE_CODE_SUCCESS} from "../../Defines";

function LoginPage() {
    const store = React.useContext(AppContext)

    const navigate = useNavigate();

    const loginCallback = (response) => {
        const data = response.data;

        if(data.resultCode !== RESPONSE_CODE_SUCCESS)
        {
            alert(data.resultMsg);
            console.log(data.resultCode);
            return ;
        }

        alert("LOGIN");

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
        const id = store.id;
        const password = store.password;

        //포맷 체크
        if (id === '' || password === '') {
            alert('빈 문자열');
            return;
        }

        console.log("id - " + id + ", password - " + password);
        // 로딩 화면 시작

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

        const sid = localStorage.getItem("sid");

        //세션이 있으면 자동 로그인
        if(sid != null) {
            console.log(sid);
            navigate('/Main');
        }

    }, []);

    useEffect(() => {

        console.log('컴포넌트가 화면에 나타남 - ' + store.id + ', ' + store.password );
        return () => {
            console.log('컴포넌트가 화면에서 사라짐 - ' + store.id + ', ' + store.password);
        };

    }, [store.id, store.password]);

    return (
        <div>
            <input type="text" id="id" onChange={e=> store.setId(e.target.value)}></input>
            <br></br>
            <input type="password" id="password" onChange={e=> store.setPassword(e.target.value)}></input>
            <br></br>
            <LoginButton onClick={handleClick}></LoginButton>
        </div>
    )
}

export default LoginPage;