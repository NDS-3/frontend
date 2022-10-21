import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AllRollingPapers from "./pages/AllRollingPapers";
import { Auth, Hub } from "aws-amplify";
import SignIn from "./pages/SignIn";

interface IUser {
  username: string;
}

function App() {
  const [user, setUser] = useState<IUser>({
    username: "",
  });

  const getUser = async () => {
    try {
      const token = await Auth.currentAuthenticatedUser();
      setUser(token);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Hub.listen("auth", ({ payload }) => {
      if (payload.event === "signIn") {
        return getUser();
      }
      if (payload.event === "signOut") {
        setUser({
          username: "",
        });
      }
    });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          user.username ? (
            <Navigate replace to={`/${user.username}`} />
          ) : (
            <SignIn />
          )
        }
      ></Route>
      <Route path="/:personalPath" element={<AllRollingPapers />} />
    </Routes>
  );
}

export default App;
