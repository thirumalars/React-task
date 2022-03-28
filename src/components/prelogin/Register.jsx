import React from "react";
import { withRouter } from 'react-router';
import { useState, useRef, useEffect } from "react";
import Hoc from './Hoc';

import { BUG_EMAIL, BUG_NAME, BUG_PASS, USERERROR, BUG_PASS1, EMAILERROR } from "../../Constants";

import LOGOIMAGE from '../../assets/images/logo.jpg';

function Register(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [errorUsername, setUsernameError] = useState("");
    const [errorPassword, setPasswordError] = useState("");
    const [errorEmail, setEmailError] = useState("");
    const [errorUser, seterrorUser] = useState("");
    let name = useRef();
    let valid = true;

    useEffect(() => {
        name.current.focus();
    }, [])

    function validateUsername(username) {
        let error
        if (!username) {
            error = BUG_NAME
            valid = false;
        }
        else if (username.trim().length === 0) {
            error = BUG_NAME
            valid = false;
        }
        return error;
    }

    function validatePassword(password) {
        let reg = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"
        let error
        if (!password) {
            error = BUG_PASS;
            valid = false;
        }
        else if (!password.match(reg)) {
            error = BUG_PASS1;
            valid = false;
        }
        return error;
    }

    function validateEmail(email) {
        let reg = "^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$"
        let error
        if (!email) {
            valid = false;
            error = BUG_EMAIL
        }
        else if (!email.match(reg)) {
            error = EMAILERROR;
            valid = false;
        }
        return error;
    }

    function addSignupDetails() {
        valid = true;
        setUsernameError(validateUsername(username));
        setPasswordError(validatePassword(password));
        setEmailError(validateEmail(email));
        if (valid) {
            let details = {
                username: username.trim(),
                password: password,
                email: email,
            }
            let userDetails = JSON.parse(localStorage.getItem("personObject")) || [];
            if (userDetails) {
                let findUserEmail = userDetails.findIndex((item) => {
                    return item.email.toLowerCase() === email.toLowerCase();
                })
                let findUserDetail = userDetails.findIndex((item) => {
                    return item.username.toLowerCase() === username.toLowerCase();
                })

                if (findUserEmail === -1 && findUserDetail === -1) {
                    userDetails.push(details);
                    localStorage.setItem("personObject", JSON.stringify(userDetails));
                    let detail = {

                        todo: [],
                        inprogress: [],
                        tested: [],
                        completed: []
                    }
                    let initial = JSON.parse(localStorage.getItem("addedDetails")) || {};
                    initial[email] = detail;
                    localStorage.setItem("addedDetails", JSON.stringify(initial));
                    seterrorUser("");
                    setPassword("");
                    setEmail("");
                    setUsername("");
                    alert("Registered successfully");
                    props.history.push("/");

                } else {
                    seterrorUser(USERERROR);
                }
            }

        }
    }

    function loginPage() {
        props.history.push("/");
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
                <p>Log in to get in the moment updates on the things<br></br>that interest you</p>
            </div>
            <div className="forminput">
                <i className="fa fa-user icon"></i>
                <input type="text" ref={name}
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}>
                </input>
            </div>
            <div className="error" title={errorUsername}>
                {errorUsername}
            </div>
            <div className="forminput">
                <i className
                ="fa fa-envelope icon">
                </i>
                <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                </input>
            </div>
            <div className="error" title={errorEmail}>
                {errorEmail}
            </div>
            <div className="forminput">
                <i className="fa fa-key icon">
                </i>
                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                </input>
            </div>
            <div className="error" title={errorPassword}>
                {errorPassword}
            </div>
            <div className="formbutton">
                <button onClick={() => addSignupDetails()}>SIGN UP</button>
            </div>
            <div className="newregister">
                <p>Have an account? <a onClick={() => loginPage()}>Login Now</a></p>
            </div>
            <div className="error">
                {errorUser}
            </div>
        </div>
    )
}

export default Hoc(withRouter(Register));