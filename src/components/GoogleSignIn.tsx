import GoogleLoginButton from "./GoogleLoginButton";

const GoogleSignIn = () => {
  return (
    <div className="w-screen h-screen grid place-items-center bg-[#473466]">
      <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          로그인하여 롤링페이퍼를 만드세요
        </p>
        <GoogleLoginButton />
      </div>
    </div>
  );
};
export default GoogleSignIn;
