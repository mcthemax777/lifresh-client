import React, {useEffect, useState} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import LoginButton from "../components/LoginButton";
import { AppContext } from '../../App'
import SendData from "../../api/SendData";
import MainPage from "./MainPage";

function LoginPage() {
    const store = React.useContext(AppContext)

    const navigate = useNavigate();

    const loginCallback = (response) => {
        const data = response.data;

        if(data.code !== 200)
        {
            alert(data.msg);
            console.log(data.code);
            return ;
        }

        alert("LOGIN");
        console.log(data.data.sid);

        //세션 저장
        localStorage.setItem("sid", data.data.sid);

        //화면 전환
        navigate("/MainPage");

    }

    const loginErr = (response) => {
        console.log("error" + response);
    }

    const handleClick = () => {
        const id = store.id;
        const password = store.password;

        //포맷 체크
        // if (id === '' || password === '') {
        //     alert('빈 문자열');
        //     return;
        // }

        console.log("id - " + id + ", password - " + password);

        // 로딩 화면 시작

        SendData("login",
            {
                api: "login",
                id: id,
                password: password
            },
            loginCallback,
            loginErr
        );
    }

    useEffect(() => {

        const sid = localStorage.getItem("sid");

        console.log(sid);

        //세션이 있으면 자동 로그인
        if(sid != null) {
            navigate('/MainPage');
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