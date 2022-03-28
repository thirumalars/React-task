import React from "react";
import { useState } from "react";
import { withRouter } from 'react-router';

import { ERRORMSG, BUG_EMAIL, BUG_PASS } from "../../Constants";

import Hoc from './Hoc';
import LOGOIMAGE from '../../assets/images/logo.jpg';

import { useEffect, useRef } from "react";

function Login(props) {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [errorPassword, setPasswordError] = useState("");
    const [errorEmail, setEmailError] = useState("");
    let email = useRef();

    useEffect(() => {
        email.current.focus();
    }, [])
    let valid = true;

    function validatePassword(password) {
        let error
        if (!loginPassword) {
            error = BUG_PASS;
            valid = false;
        }
        return error;
    }

    function validateEmail(email) {
        let error
        if (!loginEmail) {
            valid = false;
            error = BUG_EMAIL
        }
        else if (email.trim().length === 0) {
            error = BUG_EMAIL
            valid = false;
        }
        return error;
    }

    function loginUser() {
        valid = true;
        setPasswordError(validatePassword(loginPassword));
        setEmailError(validateEmail(loginEmail));
        let userDetails = JSON.parse(localStorage.getItem("personObject")) || [];
        if (userDetails) {
            let findUser = userDetails.findIndex((item) => {
                return item.email.toLowerCase() === loginEmail.toLowerCase() && item.password === loginPassword ||
                    item.username.toLowerCase() === loginEmail.trim().toLowerCase() && item.password === loginPassword;
            })
            if (findUser !== -1) {
                sessionStorage.setItem("validUser", true);
                props.history.push("/home");
                localStorage.setItem("loggeduser", userDetails[findUser].email)
            }
            else {
                if (valid)
                    setErrorMsg(ERRORMSG);
            }
        }
    }

    function signUpPage() {
        props.history.push("/register");
    }

    return (
            <div className="Login">
                <div className="header">
                    <p>WELCOME TO</p>
                </div>
                <div className="logo">
                    <img src={LOGOIMAGE}>
                    </img>
                </div>
                <div className="content">
                    <p>Log in to get in the moment updates on the things
                        <br></br>that interest you</p>
                </div>
                <div className="forminput">
                    <i className="fa fa-user icon"></i>
                    <input type="text"
                        placeholder="Username/Email"
                        ref={email}
                        onChange={(e) => setLoginEmail(e.target.value)}>
                    </input>
                </div>
                <div className="error" title={errorEmail}>
                    {errorEmail}
                </div>
                <div className="forminput">
                    <i className="fa fa-key icon"></i>
                    <input type="password"
                        placeholder="Password"
                        onChange={(e) => setLoginPassword(e.target.value)}>
                    </input>
                </div>
                <div className="error" title={errorPassword}>
                    {errorPassword}
                </div>
                <div className="formbutton">
                    <button onClick={() => loginUser()}>SIGN IN</button>
                </div>
                <div className="newregister">
                    <p>Don't have an account?
                        <a onClick={() => signUpPage()}>Sign Up Now</a></p>
                </div>
                <div className="error">
                    {errorMsg}
                </div>
            </div>
    )
}

export default Hoc(withRouter(Login));