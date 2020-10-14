import React, { createContext, useState, useEffect } from "react";
import { auth } from "../services/firebase";
export const AuthunticateContext = createContext();

export default function AuthunticateContextProvider(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) return setUser(user);
      return setUser(null);
    });
  }, []);
  return (
    <AuthunticateContext.Provider value={{ user, login, signup, logout }}>
      {props.children}
    </AuthunticateContext.Provider>
  );

  async function login(email, pass) {
    try {
      await auth().signInWithEmailAndPassword(email, pass);
    } catch (error) {
      return alert(error.code);
    }
  }

  async function signup(email, password, confirmpassword) {
    if (password !== confirmpassword) return alert("Password Must Be Same");
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      auth().currentUser.sendEmailVerification();
      return alert("Email Verification Link Sent,Plz Verify To Continue Use");
    } catch (error) {
      return alert(error.code);
    }
  }

  async function logout() {
    await auth().signOut();
  }
}
