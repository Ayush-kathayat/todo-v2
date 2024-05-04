import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


type LoginFormContextType = {
  isLoginForm: boolean;
  setIsLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  avatar: string;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
};


export const LoginFormContext = React.createContext<LoginFormContextType>({
  isLoginForm: false,
  setIsLoginForm: () => {}, // This is just a placeholder
  avatar: "",
  setAvatar: () => {},
});
import "./App.css";

import Landing from "./Pages/Landing/landing";
import Home from "./Pages/Home/home";

function App() {
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [avatar, setAvatar] = useState("");


  return (
    <LoginFormContext.Provider value={{ isLoginForm, setIsLoginForm, avatar, setAvatar }}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </LoginFormContext.Provider>
  );
}

export default App;
