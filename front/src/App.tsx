import React, { useEffect, useState } from "react";
import "./App.css";
import LoginForm from "./components/LoginForm";
import Home from "./components/home";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const [data, setData] = useState([]);

  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route path="/" exact component={LoginForm} />
            <Route path="/home" component={Home} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
