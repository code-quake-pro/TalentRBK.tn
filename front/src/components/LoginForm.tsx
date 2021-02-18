import axios from "axios";
import { useState } from "react";
import { Redirect } from "react-router";

export default function LoginForm() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  var submit = () => {
    axios({
      url: "http://localhost:3001/api/user/login",
      method: "POST",
      data: { email: email, password: password }
    }).then((res) => {
      if (res.data.user) {
        console.log("here");
        return <Redirect to="/home" />;
      }
    });
  };

  return (
    <div>
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
      <button onClick={submit}>Login</button>
    </div>
  );
}
