import {
  browserSessionPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "../firebase/fbInstance";
import useZustandAuthStore from "../store/ZustandAuthStore";

function GoogleLogin() {
  const setUsername = useZustandAuthStore((state) => state.setUsername);

  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    console.log(provider);

    setPersistence(authService, browserSessionPersistence).then(() => {
      signInWithPopup(authService, provider)
        .then((data) => {
          setUsername(data.user.displayName);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  return (
    <button type="button" onClick={handleGoogleLogin}>
      구글 로그인
    </button>
  );
}

export default GoogleLogin;
