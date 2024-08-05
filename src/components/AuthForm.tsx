import { useEffect, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService } from "../firebase/fbInstance";
import useZustandAuthStore from "../store/ZustandAuthStore";
import GoogleLogin from "./GoogleLogin";
import EnrollmentForm from "./EnrollmentForm";

function AuthForm() {
  const username = useZustandAuthStore((state) => state.username);
  useEffect(() => {
    console.log(username);
  }, [username]);

  return (
    <div>
      <EnrollmentForm />
      <div>
        <GoogleLogin />
        <button name="Github">Github 로그인</button>
      </div>
    </div>
  );
}

export default AuthForm;
