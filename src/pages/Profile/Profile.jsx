import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);

  const fetchUser = async () => {
    try {
      const data = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${JSON.parse(
          localStorage.getItem("uid")
        )}/get-user`,
        {
          headers: { "Content-Type": "application/json" },
          method: "GET",
          credentials: "include",
        }
      );
      const response = await data.json();
      if (response.error) {
        toast.error("session expires", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        navigate("/");
        return;
      }
      dispatch(setCredentials(response.user));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return <div>{user && <ProfileCard />}</div>;
};

export default Profile;
