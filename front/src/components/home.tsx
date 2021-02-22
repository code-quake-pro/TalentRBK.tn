import { useSelector } from "react-redux";
import { selectUser } from "../reducers/user";

export default function Home() {
  const currentUser = useSelector(selectUser);
  return <h1>{currentUser.username}</h1>;
}
