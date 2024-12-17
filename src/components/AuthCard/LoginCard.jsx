import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUID } from "../../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { Link } from "react-router-dom";

const LoginCard = ({ loginToggle }) => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState("password");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(userData),
        credentials: "include",
      });
      const response = await data.json();
      console.log(response);
      if (response.uid) {
        dispatch(setUID(response.uid));
        navigate("/u/profile");
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
      }
      setUserData({ email: "", password: "" });
      setIsLoading(false);
    } catch (err) {
      console.error("Error Function Works", err);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
          <form className="flex flex-col">
            <input
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              value={userData.email}
              type="email"
              className={`bg-gray-100 text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150`}
              placeholder="Email address"
            />
            <input
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              value={userData.password}
              type={showPassword}
              className={`bg-gray-100 text-gray-900 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150`}
              placeholder="Password"
            />
            <div className="flex items-center justify-between flex-wrap">
              <label
                htmlFor="remember-me"
                className="text-sm text-gray-900 cursor-pointer"
              >
                <input
                  type="checkbox"
                  onChange={() =>
                    showPassword === "password"
                      ? setShowPassword("text")
                      : setShowPassword("password")
                  }
                  id="remember-me"
                  className="mr-2"
                />
                Show password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-500 hover:underline mb-0.5"
              >
                Forgot password?
              </Link>
              <p className="text-gray-900 mt-4">
                {" "}
                Don't have an account?{" "}
                <a
                  onClick={() => loginToggle(false)}
                  className="text-sm text-blue-500 -200 hover:underline mt-4"
                >
                  Signup
                </a>
              </p>
            </div>
            {isLoading ? (
              <div className="bg-gradient-to-r from-gray-500 cursor-not-allowed to-gray-500 py-2 px-4 rounded-md mt-4">
                <div className="w-6 h-6 mx-auto border-4 border-t-cyan-600 border-gray-300 rounded-full animate-spin"></div>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                type="submit"
                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              >
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
