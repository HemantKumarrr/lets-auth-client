import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const ForgotPassword = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center px-4 sm:px-0">
      <Link
        to="/"
        className="absolute flex items-center justify-center top-[20%] active:scale-[0.94] border px-12 py-2 rounded-full cursor-pointer"
      >
        <IoIosArrowBack className="absolute left-6" />
        Back
      </Link>
      <div className="card bg-white w-[25rem] text-black px-4 sm:px-8 py-12 rounded-lg flex flex-col gap-5">
        <div className="w-full">
          <h1 className="w-full text-center font-semibold text-2xl">
            Forgot Password
          </h1>
        </div>
        <form className="flex flex-col items-start w-full justify-center gap-2">
          <label
            htmlFor="email"
            className="text-xl font-semibold font-sans text-gray-800"
          >
            Email
          </label>
          <input
            className="py-2 px-4 w-full rounded-md bg-white border border-black"
            type="text"
            placeholder="Enter your email"
          />
          <button className="w-full mt-2 font-semibold bg-black text-white py-2 rounded-md hover:bg-[#171717] active:scale-[0.96]">
            Send Email
          </button>
        </form>
        <div className="footer">
          <p className="w-full text-center">
            Dont't have an account?{" "}
            <Link className="text-blue-500" to="/">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
