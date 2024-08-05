import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "./App.css";
import AuthForm from "./components/AuthForm";
import { authService } from "./firebase/fbInstance";
import Logout from "./components/Logout";
import useZustandAuthStore from "./store/ZustandAuthStore";
import KakaoLogin from "./components/KaKaoLogin";

function LoginHome() {
  const isLoggedIn = useZustandAuthStore((state) => state.isLoggedIn);
  const username = useZustandAuthStore((state) => state.username);
  const setIsLoggedIn = useZustandAuthStore((state) => state.setIsLoggedIn);
  const setUsername = useZustandAuthStore((state) => state.setUsername);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setIsLoggedIn(true);
        setUsername(user.displayName);
      } else {
        setIsLoggedIn(false);
        setUsername(null);
      }
    });
  }, []);

  return (
    <>
      {!isLoggedIn && <AuthForm />}
      {isLoggedIn && <p>welcome! {username}</p>}
      {isLoggedIn && <Logout />}

      {!isLoggedIn && <KakaoLogin />}
    </>
  );
}

export default LoginHome;
