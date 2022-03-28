import React from "react";
import { useEffect } from "react";
import {
  BrowserRouter as Router, Route,
  Switch
} from 'react-router-dom';
import { Redirect } from 'react-router-dom';


import Product from './Product';
import Dashboard from './Dashboard';
import Header from "./Header";

function Home(props) {
  useEffect(() => {
    if (!localStorage.getItem("loggeduser")) {
      props.history.push("/");
    }
  }, [])
  return (
    <div className="top">
      <Header />
      <Switch>
        <Route exact path="/home/product" component={Product} />
        <Route exact path="/home" component={Dashboard} />
        <Redirect to="/home"></Redirect>
      </Switch>
    </div>
  )
}
export default Home;