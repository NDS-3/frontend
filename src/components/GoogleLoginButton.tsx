import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";

const GoogleLoginButton = () => {
  function onClickSignIn() {
    return () =>
      Auth.federatedSignIn({
        provider: CognitoHostedUIIdentityProvider.Google,
      });
  }

  return (
    <button
      className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
      type="button"
      onClick={onClickSignIn()}
    >
      Login with Google
    </button>
  );
};
export default GoogleLoginButton;
