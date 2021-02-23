import React, { useEffect, useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Home from "./components/home";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AccountForm from "./components/AccountForm";
import AccountRegistration from "./components/AccountRegistration";

function App() {
  const [data, setData] = useState([]);

  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route path="/" exact component={LoginForm} />
            <Route path="/home" component={Home} />
            <Route path="/companies/add" component={AccountForm} />
            <Route path="/register/:user_id" component={AccountRegistration} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
