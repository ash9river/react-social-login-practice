import { useNavigate } from "react-router-dom";
import { authService } from "../firebase/fbInstance";

function Logout() {
  //const navigate = useNavigate();
  function onLogOutClik() {
    authService.signOut();
    //navigate("../");
  }
  return (
    <button type="button" onClick={onLogOutClik}>
      로그아웃
    </button>
  );
}

export default Logout;
