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
