import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";

const GoogleSignIn = () => {
  function onClickSignIn() {
    return () =>
      Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google,
      });
  }

  return (
    <button onClick={onClickSignIn()}>
      <img
        alt="google login"
        src="https://user-images.githubusercontent.com/1531669/41761606-83b5bd42-762a-11e8-811a-b78fdf68bc04.png"
      />
    </button>
  );
};
export default GoogleSignIn;
