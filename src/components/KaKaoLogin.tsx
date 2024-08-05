import {
  browserSessionPersistence,
  OAuthProvider,
  setPersistence,
  signInWithCredential,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import {
  CLIENT_SECRET,
  KAKAO_AUTH_URL,
  REDIRECT_URI,
  REST_API_KEY,
} from "../config/KakaoConfig";
import { authService } from "../firebase/fbInstance";
import useZustandAuthStore from "../store/ZustandAuthStore";
import { getKakaoAuthToken } from "./Kakao.tsx/KakaoAuth";
import { useEffect } from "react";

function KakaoLogin() {
  const setUsername = useZustandAuthStore((state) => state.setUsername);
  const id_token = useZustandAuthStore((state) => state.id_token);
  async function handleKakaoLogin() {
    // 사용자 검증

    const provider = new OAuthProvider("oidc.Kakao");
    const credential = provider.credential({
      idToken: id_token as string | undefined,
    });

    setPersistence(authService, browserSessionPersistence).then(() => {
      signInWithRedirect(authService, credential);
      /*       signInWithCredential(authService, credential)
        .then((data) => {
          const credential = OAuthProvider.credentialFromResult(data);
          const accessToken = credential?.accessToken;
          const idToken = credential?.idToken;

          setUsername(data.user.displayName);
          console.log(data);
          console.log(idToken);
          console.log(accessToken);
        })
        .catch((err) => {
          console.log(err);
        }); */
    });
  }
  useEffect(() => {
    /*     if (id_token) {
      handleKakaoLogin();
    } */
  }, []);

  return (
    <button type="button" onClick={handleKakaoLogin}>
      카카오 로그인
    </button>
  );
}
export default KakaoLogin;

/* async function tokenIsValid(id_token: string | undefined) {
  const;
}
 */
