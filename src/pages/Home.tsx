import GoogleLoginButton from "../components/GoogleLoginButton";

const Home = () => {
  return (
    <>
      <div className="relative h-screen w-screen text-center">
        <img
          className="absolute left-0 top-0 h-full w-full -z-50"
          src={`${process.env.PUBLIC_URL}/img/newbackground.png`}
          alt="bg"
        />
        <div className="bg-black absolute left-0 top-0 h-full w-full opacity-30" />
        <GoogleLoginButton />
      </div>
    </>
  );
};

export default Home;
