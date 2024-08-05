import { create } from "zustand";

interface ZustandAuthStoreInterface {
  isLoggedIn: boolean;
  username: string | null;
  id_token: string | null;
  accessToken: string | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setUsername: (username: string | null) => void;
  setIdToken: (id_token: string | null) => void;
  setAccessToken: (accessToken: string | null) => void;
}

const useZustandAuthStore = create<ZustandAuthStoreInterface>((set) => ({
  isLoggedIn: false,
  username: "",
  id_token: "",
  accessToken: "",
  setIsLoggedIn: (isLoggedIn) => set(() => ({ isLoggedIn })),
  setUsername: (username) => set(() => ({ username })),
  setIdToken: (id_token) => set(() => ({ id_token })),
  setAccessToken: (accessToken) => set(() => ({ accessToken })),
}));

export default useZustandAuthStore;
