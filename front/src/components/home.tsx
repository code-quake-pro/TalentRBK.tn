import { useSelector } from "react-redux";
import { selectUser } from "../reducers/user";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

export default function Home() {
  const currentUser = useSelector(selectUser);

  function renderView() {
    if (currentUser.role === "company") {
      return <h1>Company</h1>;
    } else {
      return (
        <nav>
          <ul>
            <li>
              <Link to="/companies/add">Create Account</Link>
            </li>
            <li>Add Resume</li>
          </ul>
        </nav>
      );
    }
  }
  return (
    <div>
      <div>{renderView()}</div>
    </div>
  );
}
