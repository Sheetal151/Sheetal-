import { createContext, useContext, useState, useEffect } from "react";

//  Create context
const AuthContext = createContext();
//  Custom hook for easy usage
export const useAuthContext = () => useContext(AuthContext);

//  Provide context to app
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  // load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("chat-user");
    if (storedUser) {
      setAuthUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};


