import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./components/layout.tsx";
import Profile from "./routes/profile.tsx";
import Home from "./routes/home.tsx";
import Login from "./routes/login.tsx";
import CreateAccount from "./routes/create-account.tsx";
import styled, {createGlobalStyle} from "styled-components";
import reset from "styled-reset";
import {useEffect, useState} from "react";
import LoadingScreen from "./components/loading-screen.tsx";
import {auth} from "./firebase.ts";
import ProtectedRoute from "./components/protected-route.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  }
]);

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: white;
    color: black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async() => {
    await auth.authStateReady();

    setLoading(false);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      { isLoading ? <LoadingScreen /> : <RouterProvider router={ router } /> }
    </Wrapper>
  )
}

export default App;