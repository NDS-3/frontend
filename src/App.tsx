import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AllRollingPapers from "./pages/AllRollingPapers";
import { Auth, Hub } from "aws-amplify";
import { useRecoilState, useSetRecoilState } from "recoil";
import { googleJWTState, ownerState } from "./recoil/user";
import { getUrl } from "./api/user";
import { useQuery } from "react-query";

function App() {
  const navigate = useNavigate();

  const [flag, setFlag] = useState(false);

  const [jwt, setJwt] = useRecoilState(googleJWTState);
  const setUerInfo = useSetRecoilState(ownerState);

  useQuery<string>(["getUrlByToken", flag, jwt], () => getUrl(jwt), {
    onSuccess: (personalUrl) => {
      setFlag(false);
      setUerInfo((prevUserInfo) => ({
        ...prevUserInfo,
        personalUrl: personalUrl,
      }));
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
        setFlag(true);
        setJwt(token.getSignInUserSession().getAccessToken().getJwtToken());
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/:personalPath"
        element={<AllRollingPapers setGetUrlFlag={setFlag} />}
      />
    </Routes>
  );
}

export default App;
