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
    const provider = new GoogleAuthProvider(); // provider를 구글로 설정
    console.log(provider);

    setPersistence(authService, browserSessionPersistence).then(() => {
      signInWithPopup(authService, provider) // popup을 이용한 signup
        .then((data) => {
          setUsername(data.user.displayName);
          console.log(data); // console로 들어온 데이터 표시
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
