import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Contato } from "./pages/Contato";
import { Dashboard } from "./pages/Dashboard";
import Route404 from "./pages/404";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useApi } from "./hooks/useApi/useApi";

function App() {
  // const isAuth = Boolean(useSelector((state: any) => state.token));
  const isAuth = useSelector((state: any) => state.token);
  const userAuth = useSelector((state: any) => state.user);

  const api = useApi();

  const valideToken = async () => {
    const storageData = isAuth;
    const data = await api.validateToken(userAuth?.email, storageData);
    
    return data;
  };
  useEffect(() => {
    valideToken();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Route404 />} />
      </Routes>
    </div>
  );
}

export default App;
