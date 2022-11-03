import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AllRollingPapers from "./pages/AllRollingPapers";
import { Auth, Hub } from "aws-amplify";
import { useRecoilState } from "recoil";
import { googleJWTState, ownerState } from "./recoil/user";
import { getUrl } from "./api/user";
import { useQuery } from "react-query";
import GhostHome from "./pages/GhostHome";

function App() {
  const navigate = useNavigate();

  const [flag, setFlag] = useState(false);

  const [jwt, setJwt] = useRecoilState(googleJWTState);
  const [userInfo, setUserInfo] = useRecoilState(ownerState);

  useQuery<string>(["getUrlByToken", flag, jwt], () => getUrl(jwt), {
    onSuccess: (personalUrl) => {
      console.log("✅ getUrlByToken:", personalUrl);
      setFlag(false);
      setUserInfo({ ...userInfo, personalUrl });
      navigate(`/${personalUrl}`);
    },
    enabled: jwt.length > 0 && flag,
  });

  useEffect(() => {
    Hub.listen("auth", ({ payload }) => {
      if (payload.event === "signIn") return getUserFromGoogle();
    });

    const getUserFromGoogle = async () => {
      try {
        const token = await Auth.currentAuthenticatedUser();
        console.log("✅getToken:", token);
        setFlag(true);
        setJwt(token.getSignInUserSession().getAccessToken().getJwtToken());
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<GhostHome />} />
      <Route
        path="/:personalPath"
        element={<AllRollingPapers setGetUrlFlag={setFlag} />}
      />
    </Routes>
  );
}

export default App;
