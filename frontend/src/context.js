import React, { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = (props) => {
  const [user, setUser] = useState(undefined);
  const [userList, setUserList] = useState([]);

  const value = { user, setUser, userList, setUserList };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};
