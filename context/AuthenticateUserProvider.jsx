import React, {useState, createContext} from "react";

const AuthenticatedUserContext = createContext();
const AuthenticatedUserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return (
      <AuthenticatedUserContext.Provider value={{ user, setUser }}>
        {children}
      </AuthenticatedUserContext.Provider>
    )
  }
  