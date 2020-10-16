import cogoToast from "cogo-toast";
import React, { createContext, useState, useEffect } from "react";
import { auth } from "../services/firebase";
export const AuthunticateContext = createContext();

export default function AuthunticateContextProvider(props) {
  const [user, setUser] = useState(null);
  const [showloader, setLoader] = useState(false);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) return setUser(user);
      return setUser(null);
    });
  }, []);
  return (
    <AuthunticateContext.Provider
      value={{ user, login, signup, logout, showloader }}
    >
      {props.children}
    </AuthunticateContext.Provider>
  );

  async function login(email, pass) {
    try {
      setLoader(true);
      await auth().signInWithEmailAndPassword(email, pass);
      setLoader(false);
      cogoToast.success("Login Success");
    } catch (error) {
      setLoader(false);
      cogoToast.error(error.code.split("/")[1]);
      return;
    }
  }

  async function signup(email, password, confirmpassword) {
    if (password !== confirmpassword) return alert("Password Must Be Same");
    try {
      setLoader(true);
      await auth().createUserWithEmailAndPassword(email, password);
      setLoader(false);
      cogoToast.success("Signup Success");
      // For Email Verification
      // auth().currentUser.sendEmailVerification();
      // return alert("Email Verification Link Sent,Plz Verify To Continue Use");
    } catch (error) {
      cogoToast.error(error.code.split("/")[1]);
      return setLoader(false);
    }
  }

  async function logout() {
    await auth().signOut();
  }
}
