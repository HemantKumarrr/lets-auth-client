import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUID } from "../../store/features/authSlice";
import { useNavigate } from "react-router-dom";

const SignupCard = ({ loginToggle }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
  });
  const [showPassword, setShowPassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userData.username === "" ||
      userData.email === "" ||
      userData.password === "" ||
      userData.gender === ""
    )
      return toast.error("Fill all fields".toLowerCase(), {
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
    try {
      setIsLoading(true);
      const data = await fetch(`${import.meta.env.VITE_BASE_URL}/signup`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(userData),
        credentials: "include",
      });
      const response = await data.json();
      if (response.uid) {
        dispatch(setUID(response.uid));
        navigate("/u/profile");
        setIsLoading(false);
      } else {
        toast.error(response.error.toLowerCase(), {
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
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="">
        <div className="max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h2>
          <form className="flex flex-col">
            <input
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
              type="text"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Username"
            />
            <input
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              type="email"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Email address"
            />
            <input
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              type={showPassword}
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Password"
            />
            <div className="text-black w-full flex items-center justify-between ">
              <p className="font-Popins text-gray-800 py-2 w-full">Gender</p>
              <div className="w-[50%] flex flex-col sm:flex-row items-center justify-between">
                <div className="w-[10rem] text-white font-Popins">
                  <select
                    name="gender"
                    id="gender"
                    defaultValue={""}
                    className="w-full text-sm px-[0.8rem] py-1 text-black rounded-md outline-none bg-gray-300 cursor-pointer"
                    onChange={(e) =>
                      setUserData({ ...userData, gender: e.target.value })
                    }
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between flex-wrap">
              <label
                htmlFor="remember-me"
                className="text-sm text-gray-900 cursor-pointer"
              >
                <input
                  onChange={() =>
                    showPassword === "password"
                      ? setShowPassword("text")
                      : setShowPassword("password")
                  }
                  type="checkbox"
                  id="remember-me"
                  className="mr-2 checked:bg-cyan-800"
                />
                Show password
              </label>
              <a
                href="#"
                className="text-sm invisible text-blue-500 hover:underline mb-0.5"
              >
                Forgot password?
              </a>
              <p className="text-gray-900 mt-4">
                {" "}
                Already have an account?{" "}
                <a
                  onClick={() => loginToggle(true)}
                  className="text-sm text-blue-500 -200 hover:underline mt-4"
                >
                  Login
                </a>
              </p>
            </div>
            {isLoading ? (
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 py-2 px-4 rounded-md mt-4">
                <div className="w-6 h-6 mx-auto border-4 border-t-blue-800 border-gray-400 rounded-full animate-spin"></div>
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              >
                Signup
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupCard;
