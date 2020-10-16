import React, { useContext } from "react";
import "../css/Homepage.css";
import { AuthunticateContext } from "../contexts/AuthunticateContext";
import Chat from "../components/Chat";
import Loader from "../components/Loader";

export default function Homepage() {
  const { user, showloader } = useContext(AuthunticateContext);
  return user ? (
    <Chat />
  ) : (
    <React.Fragment>
      <Loader hide={!showloader} />
      <h1 className="same">Log in Plz</h1>
    </React.Fragment>
  );
}
