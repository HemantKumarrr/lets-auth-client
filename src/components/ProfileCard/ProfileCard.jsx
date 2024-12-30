import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut, setCredentials } from "../../store/features/authSlice";
import { Bounce, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { LiaSave } from "react-icons/lia";
import { useState } from "react";
import ShowImage from "./ShowImage";
import ProfileImage from "./ProfileImage";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";

const ProfileCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toBeUpdated = {};

  // Getting User From LocalStorage
  const localUser = JSON.parse(localStorage.getItem("user"));

  const [updateLoading, setUpdatedLoading] = useState(false);
  const [isEditUsername, setIsEditUsername] = useState(false);
  const [isEditGender, setIsEditGender] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [deleteAccToggle, setDeleteAccToggle] = useState(false);
  const [updatedValue, setUpdatedValue] = useState(localUser);

  // Check Whether there is any update or not
  const editBtn =
    updatedValue.username !== localUser.username ||
    updatedValue.gender !== localUser.gender ||
    JSON.parse(localStorage.getItem("imageToggle")) === true;

  const profileImage = localUser.imageUrl
    ? localUser.imageUrl
    : `/images/${localUser.gender}.png`;

  const handleDeleteAccount = async () => {
    try {
      const req = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${JSON.parse(
          localStorage.getItem("uid")
        )}/delete-account`,
        {
          headers: { "Content-type": "application/json" },
          method: "DELETE",
          credentials: "include",
        }
      );
      const response = await req.json();
      if (!response.message) {
        toast.error(response.error, {
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
      }
      localStorage.clear();
      toast.success(response.message, {
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/logout`, {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        credentials: "include",
      });
      if (response.status !== 200) {
        return toast.error("something wrong", {
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
      }
      dispatch(logOut());
      toast.success("Logged Out Successfully", {
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    setIsEditUsername(false);
    setIsEditGender(false);

    if (updatedValue.username !== localUser.username) {
      toBeUpdated["username"] = updatedValue.username;
    } else if (updatedValue.gender !== localUser.gender) {
      toBeUpdated["gender"] = updatedValue.gender;
    }
    if (toBeUpdated["gender"] === "") {
      toBeUpdated["gender"] = localUser.gender;
      return alert("please select gender category");
    }
    console.log("To be Updated: ", toBeUpdated);
    console.log("Updated Value: ", updatedValue);

    try {
      setUpdatedLoading(true);
      const data = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${JSON.parse(
          localStorage.getItem("uid")
        )}/update-profile`,
        {
          headers: { "Content-Type": "application/json" },
          method: "PUT",
          body: JSON.stringify(toBeUpdated),
          credentials: "include",
        }
      );
      const response = await data.json();
      if (data.status !== 200) {
        return toast.error("something wrong", {
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
      }
      dispatch(setCredentials(response.user));
      setUpdatedLoading(false);
      toast.success("updated successfully", {
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {openImage && (
        <ShowImage imageUrl={profileImage} setOpenImage={setOpenImage} />
      )}

      <div className="card-container h-screen px-[1.5rem] md:px-[10rem] flex justify-center items-center">
        <div className="card relative w-[90%] md:w-[40%] px-12 py-12 rounded-2xl bg-white text-black flex flex-col items-center gap-2 md:gap-5 justify-center">
          <button
            onClick={() => setDeleteAccToggle((prev) => !prev)}
            className="absolute top-3 right-4 outline-none"
          >
            <BsThreeDotsVertical className="text-4xl hover:bg-gray-300 rounded-full py-1" />
          </button>
          {deleteAccToggle && (
            <div className="options text-white flex flex-col gap-4 absolute z-10 bg-zinc-300 px-4 py-4 rounded-md top-14 right-6">
              <button
                onClick={handleDeleteAccount}
                className="bg-zinc-900 hover:bg-zinc-800 hover:text-red-500 rounded-sm px-2 flex justify-between items-center gap-2 py-1 capitalize"
              >
                <p>delete account</p>
                <MdDeleteForever className="text-xl" />
              </button>
              <button
                title="logout"
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-500 rounded-sm px-2 flex justify-between items-center gap-2 py-1"
              >
                <p>Logout</p>
                <LuLogOut className="text-xl" />
              </button>
            </div>
          )}
          <div>
            <ProfileImage
              imageUrl={profileImage}
              gender={localUser.gender}
              setOpenImage={setOpenImage}
            />
          </div>

          <h1 className="text-2xl md:text-4xl capitalize text-center font-Popins font-semibold">
            {localUser?.username}
            <p
              title={localUser?.email}
              className="text-[10px] sm:text-[14px] cursor-pointer tracking-wider lowercase text-gray-700"
            >
              {localUser?.email}
            </p>
          </h1>
          <div className="userInfo w-full font-Popins capitalize text-xl md:text-2xl py-4 flex flex-col md:gap-6">
            <div className="w-full py-2">
              <div className="w-full pb-2 border-b border-gray-800 flex flex-col md:flex-row justify-between gap-2 md:gap-10 mb-4 items-center">
                <p className="text-center md:text-start">Username</p>
                {isEditUsername ? (
                  <div className="w-full flex justify-between gap-2 items-center">
                    <input
                      type="text"
                      autoFocus
                      className="px-2 w-full bg-white outline outline-blue-500 outline-2 rounded-md"
                      value={updatedValue.username}
                      onChange={(e) =>
                        setUpdatedValue({
                          ...updatedValue,
                          username: e.target.value,
                        })
                      }
                    />
                    <button onClick={() => setIsEditUsername((prev) => !prev)}>
                      <LiaSave className="text-green-500 text-2xl" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full flex justify-between items-center">
                    <span className="">{updatedValue?.username}</span>
                    <button onClick={() => setIsEditUsername((prev) => !prev)}>
                      <FaEdit />
                    </button>
                  </div>
                )}
              </div>
              <div className="w-full flex flex-col gap-2 md:gap-0 md:flex-row pb-2 border-b border-gray-800 justify-between items-center">
                <p className="w-full text-center md:text-start">Gender </p>
                {isEditGender ? (
                  <div className="w-full flex justify-between items-center gap-2">
                    {" "}
                    <select
                      onChange={(e) =>
                        setUpdatedValue({
                          ...updatedValue,
                          gender: e.target.value,
                        })
                      }
                      defaultValue={""}
                      name="gender"
                      id="gender"
                      className="px-2 text-sm bg-white outline outline-blue-500 outline-2 h-[2rem] w-full rounded-md"
                    >
                      <option value="">select an option</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    <button onClick={() => setIsEditGender((prev) => !prev)}>
                      <LiaSave className="text-green-500" />
                    </button>
                  </div>
                ) : (
                  <div className="w-full flex justify-between items-center">
                    <p className="">{updatedValue.gender}</p>
                    <button onClick={() => setIsEditGender((prev) => !prev)}>
                      <FaEdit />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div>
              {updateLoading ? (
                <div className="bg-blue-600 cursor-not-allowed px-12 py-2 rounded-md text-xl">
                  <div className="w-6 h-6 mx-auto border-4 border-t-cyan-600 border-gray-300 rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  {editBtn && (
                    <button
                      onClick={handleUpdate}
                      title="update profile"
                      className="bg-blue-700 w-full text-white mx-auto hover:bg-blue-600 px-8 py-2 rounded-md text-xl active:scale-[0.916]"
                    >
                      Update
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
