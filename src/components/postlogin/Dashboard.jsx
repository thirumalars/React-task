import React from "react";
import { connect } from 'react-redux'
import { useState } from "react";

import Popup from "./Popup";
import { storeDetails } from '../../redux/Actions'

function Dashboard(props) {
    const [drag, setDrag] = useState("");
    const [storeIndex, setStoreIndex] = useState("");
    const [currentTask, setCurrentTask] = useState("");
    const [menu] = useState(['todo', 'inprogress', 'completed', 'tested'])
    let { loginUser } = props;
    let user = localStorage.getItem("loggeduser");
    let value = JSON.parse(localStorage.getItem("addedDetails"));
    let dat = Object.assign(loginUser, value);
    const [popupState, setPopupState] = useState(false);

    function addPopUp(e) {
        setPopupState(true);
        setCurrentTask(e.target.id);
    }

    function Close() {
        setPopupState(false);
    }

    function onDragStart(e, item, task, index) {
        e.dataTransfer.setData("item", JSON.stringify(item));
        setDrag(task);
        setStoreIndex(index);
    }

    function onDragOver(e) {
        e.preventDefault();
    }

    function onDrop(e, task) {
        let item = JSON.parse(e.dataTransfer.getData("item"));
        let data = Object.assign({}, loginUser)
        data[user][drag].splice(storeIndex, 1);
        data[user][task].push(item);
        props.storeDetails(data);
        localStorage.setItem("addedDetails", JSON.stringify(loginUser));
    }

    return (
        <div className="dashboard">
            {menu && menu.length ? menu.map((items, menuIndex) =>
                <div className="todos"
                    onDragOver={(e) => onDragOver(e)}
                    key={menuIndex}
                    onDrop={(e) => onDrop(e, items)}>
                    <h3>{items.toUpperCase()}</h3>
                    <div className="content">
                        {loginUser && loginUser[user] && loginUser[user][items].map((item, cardIndex) =>
                            <div className="con" draggable key={cardIndex}
                                onDragStart={(e) => onDragStart(e, item, items, cardIndex)}>
                                {item.task}<br></br>{item.description}
                            </div>)}
                    </div>
                    <a id={items} onClick={(e) => addPopUp(e)}>Add a card...</a>
                </div>) : null}
            {popupState &&
                <Popup close={Close} currentTask={currentTask} />}
        </div>
    )
}
const mapStateToProps = ({ DashboardReducer }) => {
    return {
        loginUser: DashboardReducer.loginUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        storeDetails: (data) => {
            dispatch(storeDetails(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);