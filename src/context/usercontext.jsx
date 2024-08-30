// src/context/UserContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userdata, setUserdata] = useState(null);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3200/login/success", {
        withCredentials: true,
      });
      console.log("response", response);
      setUserdata(response.data.lebhaidata);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <UserContext.Provider value={{ userdata, setUserdata }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};
