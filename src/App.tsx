import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AllRollingPapers from "./pages/AllRollingPapers";
import { Auth, Hub } from "aws-amplify";
import SignIn from "./pages/SignIn";
import { useRecoilState, useResetRecoilState } from "recoil";
import { googleJWTState, ownerState } from "./recoil/user";
import { getUrl } from "./api/user";

function App() {
  const navigate = useNavigate();

  const [jwt, setJwt] = useRecoilState(googleJWTState);
  const [userInfo, setUserInfo] = useRecoilState(ownerState);

  const resetUserInfo = useResetRecoilState(ownerState);

  const getUser = async () => {
    try {
      const token = await Auth.currentAuthenticatedUser();
      setJwt(token.getSignInUserSession().getAccessToken().getJwtToken());
      getUrl(jwt)
        .then((data) => {
          setUserInfo({ ...data, id: userInfo.id });
          navigate(`/${data.personalUrl}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Hub.listen("auth", ({ payload }) => {
      if (payload.event === "signIn") return getUser();
      else if (payload.event === "signOut") return resetUserInfo();
    });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          userInfo.username ? (
            <Navigate replace to={`/${userInfo.personalUrl}`} />
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
