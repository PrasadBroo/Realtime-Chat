import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthunticateContext } from "../contexts/AuthunticateContext";
import "../css/Navbar.css";

export default function Navbar() {
  const { user, logout } = useContext(AuthunticateContext);
  const [burger, setBurger] = useState(false);
  return (
    <nav>
      <h1>
        {/* <a href="/">Realtime Chat</a> */}
        <Link to="/">Realtime Chat</Link>
      </h1>
      <div
        onClick={() => setBurger(!burger)}
        className={burger ? "burger  burger-active" : "burger"}
      >
        <div className="done"></div>
        <div className="dtwo"></div>
        <div className="dthree"></div>
      </div>
      {handelRender()}
    </nav>
  );

  function handelRender() {
    if (user)
      return (
        <button
          className={burger ? "btn btn-danger btn-active" : "btn btn-danger"}
          onClick={logout}
        >
          Logout
        </button>
      );
    return (
      <ul className={burger ? "list-active" : "noclass"}>
        <li>
          {/* <a href="/Login">Login</a> */}
          <Link to="/login">Login</Link>
        </li>
        <li>
          {/* <a href="/Signup">Signup</a> */}
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    );
  }
}
