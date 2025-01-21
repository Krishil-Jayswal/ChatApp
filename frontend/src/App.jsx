import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Spinner } from "./components";
import { Auth, Chat, ProfileUpdate } from "./pages";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "./store";

const App = () => {
  const { user, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !user) {
    return <Spinner />;
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={!user ? <Auth /> : <Navigate to={"/chat"} />}
        />
        <Route 
        path="/chat" 
        element={user ? <Chat /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile"
          element={user ? <ProfileUpdate /> : <Navigate to={"/"} />}
        />
      </Routes>
    </>
  );
};

export default App;
