import React from "react";
import { Link } from "react-router-dom";

const GhostHome = () => {
  return (
    <>
      <div className="h-screen w-screen relative flex flex-col justify-evenly text-center">
        <img
          src={`${process.env.PUBLIC_URL}/img/ghost01.png`}
          alt="bg"
          className="absolute left-0 top-0 -z-50 h-full w-full bg-[#473466]"
        />
        <div className="mt-20">
          <Link
            to="/signin"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            로그인
          </Link>
        </div>
      </div>
    </>
  );
};

export default GhostHome;
