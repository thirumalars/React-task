import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { withRouter } from 'react-router';

function Header(props) {
    const [selectedMenu, setSelectedMenu] = useState("Dashboard")

    function redirect(path, menu) {
        props.history.push(path)
        setSelectedMenu(menu)
    }
    useEffect(()=>
    {
        let url=window.location.pathname
        if(url==="/home/product")
        {
            setSelectedMenu("Product")
        }
        else{
            setSelectedMenu("Dashboard")
        }

    },[])

    function logout() {
        let status = window.confirm("Are you sure want to logout")
        if (status === true) {
            props.history.push("/")
            localStorage.removeItem("loggeduser")
        }
    }
    const [loggedUser] = useState(localStorage.getItem("loggeduser"))
    return (
        <div className="head">
            <a onClick={() => redirect("/home", "Dashboard")}
                className={selectedMenu === "Dashboard" ? "selected" : null}> Dashboard</a>
            <a onClick={() => redirect("/home/product", "Product")}
                className={selectedMenu === "Product" ? "selected" : null}>Product</a>
            <a id="log" onClick={() => logout()}>Logout</a>
            <a id="log">{loggedUser}</a>
        </div>
    )
}
export default withRouter(Header);