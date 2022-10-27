import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AllRollingPapers from "./pages/AllRollingPapers";
import { Auth, Hub } from "aws-amplify";
import SignIn from "./pages/SignIn";
import { useRecoilState, useSetRecoilState } from "recoil";
import { googleJWTState, ownerState } from "./recoil/user";
import { getUrl } from "./api/user";
import { useQuery } from "react-query";
import GhostHome from "./pages/GhostHome";

function App() {
  const navigate = useNavigate();

  const [flag, setFlag] = useState(false);

  const [jwt, setJwt] = useRecoilState(googleJWTState);
  const setUserInfo = useSetRecoilState(ownerState);

  useQuery(["getUrlByToken", flag, jwt], () => getUrl(jwt), {
    onSuccess: (data) => {
      setFlag(false);
      setUserInfo({ ...data });
      navigate(`/${data.personalUrl}`);
    },
    enabled: flag && !!jwt,
  });

  useEffect(() => {
    Hub.listen("auth", ({ payload }) => {
      if (payload.event === "signIn") return getUser();
      // else if (payload.event === "signOut") return setJwt("");
    });

    const getUser = async () => {
      try {
        setFlag(true);
        const token = await Auth.currentAuthenticatedUser();
        setJwt(token.getSignInUserSession().getAccessToken().getJwtToken());
      } catch (err) {
        setFlag(false);
        console.log(err);
      }
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<GhostHome />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/:personalPath"
        element={<AllRollingPapers setGetUrlFlag={setFlag} />}
      />
    </Routes>
  );
}

export default App;
