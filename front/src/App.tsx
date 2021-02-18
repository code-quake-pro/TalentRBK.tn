import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import LoginForm from "./components/LoginForm";

function App() {
  const [clicks, setClicks] = useState(0);
  const [data, setData] = useState([]);

  return (
    <div className="App">
      <LoginForm />
    </div>
  );
}

export default App;
