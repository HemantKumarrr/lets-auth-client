import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdDoneAll } from "react-icons/io";
import { Bounce, toast } from "react-toastify";

const ResetPassword = () => {
  const [userPassword, setUserPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passChange, setPassChange] = useState(false);

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (userPassword.password === "" || userPassword.confirmPassword === "") {
      return toast.error("empty fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else if (userPassword.password === userPassword.confirmPassword) {
      return toast.success("password doesn't match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    setPassChange((prev) => !prev);
  };
  return (
    <div className="h-screen w-full flex items-center justify-center px-4 sm:px-0">
      <div className="card bg-white w-[28rem] text-black px-4 sm:px-8 py-12 rounded-lg flex flex-col gap-5">
        <div className="w-full">
          <h1 className="w-full text-center font-semibold text-2xl">
            Change Password!
          </h1>
        </div>
        {passChange ? (
          <div className="w-full text-center text-green-1000 text-2xl flex flex-col md:flex-row items-center justify-center gap-4 font-bold bg-green-400 py-12 rounded-md">
            <IoMdDoneAll className="text-xl md:text-4xl animate-ping" />
            Change Successfully
          </div>
        ) : (
          <form className="flex flex-col items-start w-full justify-center gap-2">
            <label
              htmlFor="email"
              className="text-xl font-semibold font-sans text-gray-800"
            >
              New Password
            </label>
            <input
              onChange={(e) =>
                setUserPassword({ ...userPassword, password: e.target.value })
              }
              value={userPassword.password}
              className="py-2 px-4 w-full rounded-md bg-white border border-black"
              type="password"
              placeholder="Enter your password"
            />
            <label
              htmlFor="email"
              className="text-xl mt-4 font-semibold font-sans text-gray-800"
            >
              Confirm New Password
            </label>
            <input
              onChange={(e) =>
                setPassChange({
                  ...userPassword,
                  confirmPassword: e.target.value,
                })
              }
              className="py-2 px-4 w-full rounded-md bg-white border border-black"
              type="password"
              placeholder="Enter your confirm password"
            />
            <button
              onClick={handleResetPassword}
              className="w-full mt-2 font-semibold bg-black text-white py-2 rounded-md hover:bg-[#171717] active:scale-[0.96]"
            >
              Change Password
            </button>
          </form>
        )}

        <div className="footer">
          <p className="w-full text-center">
            Back to Log in?{" "}
            <Link className="text-blue-500" to="/">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
