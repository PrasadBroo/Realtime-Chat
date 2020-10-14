import React, { useContext } from "react";
import "../css/Homepage.css";
import { AuthunticateContext } from "../contexts/AuthunticateContext";
import Chat from "../components/Chat";

export default function Homepage() {
  const { user } = useContext(AuthunticateContext);
  return user ? <Chat /> : <h1 className="same">Log in Plz</h1>;
}
