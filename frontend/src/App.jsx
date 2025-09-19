import {  Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login.jsx";
import { Signup } from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";

function App() {
  const authUser = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster/>
    </div>
  );
}

export default App;
