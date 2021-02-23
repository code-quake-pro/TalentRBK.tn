import axios from "axios";
import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login, selectUser } from "../reducers/user";
import { useHistory } from "react-router-dom";
import $ from "jquery";

function LoginForm() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);
  const history = useHistory();

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
          login({
            email: user.email,
            role: user.role,
            isLogged: true
          })
        );
        history.push("/home");
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

  useEffect(() => {
    $("#form").on("submit", function (e) {
      e.preventDefault();
    });

    return () => {
      $("#form").on("submit", function (e) {
        e.preventDefault();
      });
    };
  });

  return (
    <div
      style={{
        border: "1px solid #ccc",
        width: "33%",
        minWidth: "300px",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "50px",
        fontSize: "20px"
      }}
      className="h-auto grid-rows-1 shadow-xl">
      <h2
        style={{ textAlign: "center", marginBottom: "30px" }}
        className="text-4xl ">
        Login
      </h2>
      <form id="form" onSubmit={submit}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          className="input"
          type="text"
          name="email"
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          className="input"
          type="password"
          name="password"
          onChange={(e: any) => setPassword(e.target.value)}
        />
        <br />
        <button
          className="submit"
          type="submit"
          disabled={isLoading}
          onClick={submit}>
          Login
        </button>
      </form>
      <p style={{ color: "red", textAlign: "center" }}>{error}</p>
    </div>
  );
}

export default connect()(LoginForm);
