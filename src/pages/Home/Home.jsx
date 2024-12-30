import React, { useState } from "react";
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import { IoClose } from "react-icons/io5";

const Home = () => {
  const [authToggle, setAuthToggle] = useState(false);
  const [loginToggle, setLoginToggle] = useState(false);
  const d = new Date();

  const authToggleHandle = () => {
    setAuthToggle((prev) => !prev);
  };

  return (
    <>
      <div className="h-screen flex justify-center relative items-center">
        <div className="w-full flex h-full flex-col justify-between items-center py-10">
          {authToggle && (
            <div className="h-screen w-full transition-all delay-700 ease-linear absolute backdrop-blur-lg bg-white/5 top-0 z-10">
              <button
                onClick={(prev) => setAuthToggle(!prev)}
                className="rounded-sm absolute top-[6rem] md:top-[4rem] sm:top-16 right-8 sm:right-20 text-black"
              >
                <IoClose className="text-4xl sm:text-5xl text-white font-semibold" />
              </button>
              {loginToggle ? (
                <Login loginToggle={setLoginToggle} />
              ) : (
                <Signup loginToggle={setLoginToggle} />
              )}
            </div>
          )}

          <div className="px-[2rem] sm:px-[4rem] pt-[10rem] flex flex-col md:flex-row justify-center items-center gap-5">
            <div className="right flex items-center justify-start md:justify-center w-full">
              <img
                className="md:max-w-[20rem] max-w-[2.6rem] sm:max-w-[5rem]"
                src="/images/padlock.png"
                alt="padlock-image"
              />
            </div>
            <div className="left w-full flex flex-col gap-5 px-2">
              <h1 className="sm:text-6xl text-4xl font-sans font-bold">
                Let's Authenticate
              </h1>
              <img
                className="w-12 sm:w-16"
                src="/images/shield.png"
                alt="shield-image"
              />
              <span className="pt-4">
                <div className="Btn text-black">
                  <div className="py-4">
                    <div className="relative group">
                      <button
                        title="Login/Signup"
                        onClick={authToggleHandle}
                        className="relative animate-bounce inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                      >
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

                        <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                          <div className="relative z-10 flex items-center space-x-2">
                            <span className="transition-all duration-500 group-hover:translate-x-1">
                              Let's get started
                            </span>
                            <svg
                              className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                              data-slot="icon"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                clipRule="evenodd"
                                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                fillRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          </div>
          <div className="text-[12px] font-Popins absolute bottom-8 z-1 flex flex-col items-center justify-center">
            <h1>Developed by Hemant kumar</h1>
            <p>{`@${d.getFullYear()}`}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
