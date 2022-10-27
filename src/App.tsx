import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import AllRollingPapers from "./pages/AllRollingPapers";
import { Auth, Hub } from "aws-amplify";
import SignIn from "./pages/SignIn";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { googleJWTState, ownerState } from "./recoil/user";
import { getUrl } from "./api/user";
import { useQuery } from "react-query";
import GhostHome from "./pages/GhostHome";

function App() {
  const navigate = useNavigate();

  const [jwt, setJwt] = useRecoilState(googleJWTState);
  const [userInfo, setUserInfo] = useRecoilState(ownerState);

  useQuery(["getUrlByToken", jwt], () => getUrl(jwt), {
    onSuccess: (data) => {
      setUserInfo({ ...data, id: userInfo.id });
      navigate(`/${data.personalUrl}`);
    },
    enabled: !!jwt || false,
  });

  const getUser = async () => {
    try {
      const token = await Auth.currentAuthenticatedUser();
      setJwt(token.getSignInUserSession().getAccessToken().getJwtToken());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Hub.listen("auth", ({ payload }) => {
      if (payload.event === "signIn") return getUser();
      // else if (payload.event === "signOut") return setJwt("");
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<GhostHome />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/:personalPath" element={<AllRollingPapers />} />
    </Routes>
  );
}

export default App;
