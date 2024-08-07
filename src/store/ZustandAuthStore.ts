import { create } from "zustand";
import fbConfig from "../config/FirebaseConfig";

interface ZustandAuthStoreInterface {
  isLoggedIn: boolean;
  username: string | null;
  id_token: string | null;
  accessToken: string | null;
  photoURL: string | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUsername: (username: string | null) => void;
  setIdToken: (id_token: string | null) => void;
  setAccessToken: (accessToken: string | null) => void;
  setPhotoURL: (photoURL: string | null) => void;
}

const sessionData = window.sessionStorage.getItem(
  `firebase:authUser:${fbConfig.apiKey}:[DEFAULT]`
);
let displayName: string | null = null;
let userImage: string | null = null;
let loggedinState = false;
if (sessionData) {
  const userData = JSON.parse(sessionData);
  loggedinState = true;
  displayName = userData.displayName;
  userImage = userData.photoURL;
}

const useZustandAuthStore = create<ZustandAuthStoreInterface>((set) => ({
  isLoggedIn: loggedinState,
  username: displayName,
  id_token: "",
  accessToken: "",
  photoURL: userImage,
  setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
  setUsername: (username) => set(() => ({ username })),
  setIdToken: (id_token) => set(() => ({ id_token })),
  setAccessToken: (accessToken) => set(() => ({ accessToken })),
  setPhotoURL: (photoURL) => set(() => ({ photoURL })),
}));

export default useZustandAuthStore;
