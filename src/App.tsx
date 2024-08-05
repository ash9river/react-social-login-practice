import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginHome from "./LoginHome";
import KakaoAuth from "./components/Kakao.tsx/KakaoAuth";
import Profile from "./components/Kakao.tsx/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <LoginHome />,
      },
      {
        path: "auth/kakao/callback",
        element: <KakaoAuth />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
