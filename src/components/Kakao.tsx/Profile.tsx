import { useNavigate } from "react-router-dom";
import useZustandAuthStore from "../../store/ZustandAuthStore";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const isLoggedIn = useZustandAuthStore((state) => state.isLoggedIn);
  const access_token = useZustandAuthStore((state) => state.accessToken);
  const id_token = useZustandAuthStore((state) => state.id_token);
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  async function getProfile() {
    try {
      /*       const data = await axios.get('https://kapi.kakao.com/v2/user/me',{
        headers:{
            Authorization:
        }
      }) */
      const data = await axios.post(
        "https://kauth.kakao.com/oauth/tokeninfo",
        id_token,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  function handleClick() {
    navigate("/");
  }
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      {isLoggedIn && (
        <div>
          <h2>WELCOME! {nickName} 🙌</h2>
          <h3>Your email is.. {email}</h3>
          <img src={profileImage}></img>
        </div>
      )}
      <button onClick={handleClick}>Home으로 돌아가기</button>
      <hr />
      {id_token && <p>{id_token}</p>}
      <hr />
      {access_token && <p>{access_token}</p>}
    </>
  );
}

export default Profile;
