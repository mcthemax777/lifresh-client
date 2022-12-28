import './Login.css';
import * as React from 'react';
import {useEffect, useState} from "react";
import LoginButton from "./ui/components/LoginButton";

export let testtt = 1;

function Login(props) {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {

        console.log('컴포넌트가 화면에 나타남 - ' + id + ', ' + password );
        return () => {
            console.log('컴포넌트가 화면에서 사라짐 - ' + id + ', ' + password);
        };

    }, [id, password]);

    return (
        <div>
            <input type="text" id="id" onChange={e=> setId(e.target.value)}></input>
            <br></br>
            <input type="password" id="password" onChange={e=> setPassword(e.target.value)}></input>
            <br></br>
            <input type="password" id="password" onChange={e=> setPassword(e.target.value)}></input>
            <br></br>
            <LoginButton id={id} password={password}></LoginButton>
        </div>
    )
}


export default Login;
