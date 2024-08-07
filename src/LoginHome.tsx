import React, { useEffect, useLayoutEffect, useState } from "react";
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
  const photoURL = useZustandAuthStore((state) => state.photoURL);
  const setPhotoURL = useZustandAuthStore((state) => state.setPhotoURL);
  const setIsLoggedIn = useZustandAuthStore((state) => state.setIsLoggedIn);
  const setUsername = useZustandAuthStore((state) => state.setUsername);
  authService.onAuthStateChanged((user) => {
    if (user) {
      if (!isLoggedIn) setIsLoggedIn(true);
      if (!user.displayName) setUsername(user.displayName || "");
      if (!photoURL) setPhotoURL(user.photoURL);
    } else {
      setIsLoggedIn(false);
      setUsername(null);
      setPhotoURL(null);
    }
  });

  return (
    <>
      {!isLoggedIn && <AuthForm />}
      {isLoggedIn && <p>welcome! {username}</p>}
      {isLoggedIn && photoURL && <img src={photoURL} alt="alt" />}
      {isLoggedIn && <Logout />}

      {!isLoggedIn && <KakaoLogin />}
    </>
  );
}

export default LoginHome;
