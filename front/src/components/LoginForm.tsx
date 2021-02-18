import { current } from "@reduxjs/toolkit";
import axios from "axios";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login, selectUser } from "../store";

function LoginForm() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const currentUser = useSelector(selectUser);
  var submit = () => {
    if (!email || !password) return setError("Fill in the fields");
    setLoading(true);
    axios({
      url: "http://localhost:3001/api/user/login",
      method: "POST",
      data: { email: email, password: password }
    }).then((res) => {
      let user = res.data.user;
      if (user) {
        dispatch(
          login({ email: user.email, username: user.username, isLogged: true })
        );
      } else {
        if (res.data.exists) {
          setError("Wrong password");
        } else {
          setError("User does not exist");
        }
      }
      setLoading(false);
    });
  };

  return (
    <div
      style={{
        border: "1px solid gray",
        width: "33%",
        height: "33%",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "50px"
      }}>
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        onChange={(e: any) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input
        type="password"
        name="password"
        onChange={(e: any) => setPassword(e.target.value)}
      />
      <br />
      <button disabled={isLoading} onClick={submit}>
        Login
      </button>
      <p style={{ color: "red" }}>{error}</p>
    </div>
  );
}

export default connect()(LoginForm);
