import React, { createContext, useEffect, useState } from "react";


export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);


  const fetchUser = async () => {
    let res = await fetch("/api/v1/users/whoami");
    try {
      if (res.ok) {
        res = await res.json();
        console.log(res)
        setUser(res);
      } else {
        setUser(null);
      }
    } catch {}
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const values = {
    user,
    fetchUser,
    setUser,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};
export default UserContextProvider;
