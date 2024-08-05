import {
  browserSessionPersistence,
  getRedirectResult,
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
  const provider = new OAuthProvider("oidc.kakao");
  console.log(provider);
  console.log(authService);

  async function handleKakaoLogin() {
    // 사용자 검증

    const provider = new OAuthProvider("oidc.Kakao");
    console.log("provider");

    console.log(provider);

    signInWithRedirect(authService, provider).then(() => {
      getRedirectResult(authService).then((result) => {
        console.log(result);
        if (result) {
          const credential = OAuthProvider.credentialFromResult(result);
          console.log("credential");
          console.log(credential);

          const accessToken = credential?.accessToken;
          const idToken = credential?.idToken;
        } else console.log("result does not exist");
      });
    });
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
  }
  useEffect(() => {
    /*     if (id_token) {
      handleKakaoLogin();
    } */
  }, []);

  return (
    <button type="button">
      <a href={KAKAO_AUTH_URL}>카카오 로그인</a>
    </button>
  );
}
export default KakaoLogin;

/* async function tokenIsValid(id_token: string | undefined) {
  const;
}
 */
