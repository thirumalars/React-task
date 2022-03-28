import {
  BrowserRouter as Router, Route,
  Switch
} from 'react-router-dom';
import { Redirect } from 'react-router-dom';


import Login from './components/prelogin/Login';
import Register from './components/prelogin/Register';
import Home from './components/postlogin/Home';

import './App.css';
import './assets/styles/global.css';

function App(props) {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <Redirect to={localStorage.getItem("loggeduser")?"/home":"/"}></Redirect>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
