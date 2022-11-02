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
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      type="button"
      onClick={onClickSignIn()}
    >
      롤링페이퍼 만들기
    </button>
  );
};
export default GoogleLoginButton;
