import { useNavigate } from "react-router-dom";
import useZustandAuthStore from "../../store/ZustandAuthStore";
import {
  CLIENT_SECRET,
  KAKAO_APP_KEY,
  REDIRECT_URI,
  REST_API_KEY,
} from "../../config/KakaoConfig";
import axios from "axios";
import { useEffect } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

function KakaoAuth() {
  const navigate = useNavigate();
  const setIsLoggedIn = useZustandAuthStore((state) => state.setIsLoggedIn);
  const code = new URL(document.URL).searchParams.get("code");

  async function getKakaoAuthToken() {
    let payload;
    if (code) {
      payload = {
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
        client_secret: CLIENT_SECRET,
      };
      console.log(payload);
    } else {
      alert("code doesn't exist , try again");
    }
    try {
      const req = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      window.Kakao.Auth.setAccessToken(req.data.access_token);
      setIsLoggedIn(true);
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getKakaoAuthToken();
    if (window.Kakao.isInitialized()) {
      console.log("asd");
    } else {
      console.log("Aasd");
    }
  }, []);
  return <div>로그인 진행중</div>;
}

export default KakaoAuth;

export async function getKakaoAuthToken() {
  const code = new URL(document.URL).searchParams.get("code");
  const payload = new URLSearchParams();
  if (code) {
    payload.append("grant_type", "authorization_code");
    payload.append("client_id", REST_API_KEY);
    payload.append("redirect_uri", REDIRECT_URI);
    payload.append("code", code);
    payload.append("client_secret", CLIENT_SECRET);
  } else {
    alert("code doesn't exist , try again");
  }
  try {
    const req = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      payload,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      }
    );

    //window.Kakao.init();
    //window.Kakao.Auth.setAccessToken(req.data.access_token);
    return req.data.access_token;
  } catch (err) {
    console.log(err);
  }
}
