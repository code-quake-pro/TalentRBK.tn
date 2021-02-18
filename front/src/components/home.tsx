import { useSelector } from "react-redux";
import { selectUser } from "../store";

export default function Home() {
  const currentUser = useSelector(selectUser);
  return <h1>{currentUser.username}</h1>;
}
