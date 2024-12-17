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
        <ShowImage imageUrl={localUser.imageUrl} setOpenImage={setOpenImage} />
      )}

      <div className="card-container h-screen flex justify-center items-center">
        <div className="card relative px-8 py-12 rounded-2xl bg-black flex flex-col items-center gap-5 justify-center">
          <div
            className={`absolute w-[28.5rem] ${
              editBtn ? "h-[37rem]" : "h-[35rem]"
            } rounded-lg bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 blur opacity-25 -z-10 -top-3`}
          ></div>
          <button
            onClick={() => setDeleteAccToggle((prev) => !prev)}
            className="absolute top-3 right-4 outline-none"
          >
            <BsThreeDotsVertical className="text-4xl hover:bg-zinc-800 rounded-full py-1" />
          </button>
          {deleteAccToggle && (
            <div className="options flex flex-col gap-4 absolute z-10 bg-zinc-900 px-4 py-4 rounded-md top-14 right-6">
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

          <ProfileImage
            imageUrl={localUser.imageUrl}
            gender={localUser.gender}
            setOpenImage={setOpenImage}
          />

          <h1 className="text-4xl sm:text-6xl capitalize text-center tracking-wider">
            {localUser?.username}
            <p
              title={localUser?.email}
              className="text-[12px] px-2 sm:px-0 sm:text-[14px] cursor-pointer tracking-normal sm:py-[4px] lowercase text-gray-300 bg-zinc-900 mt-3 rounded-full"
            >
              {localUser?.email}
            </p>
          </h1>

          <div className="userInfo w-full capitalize text-2xl py-2 flex flex-col gap-4">
            <div className="w-full pb-2 border-b border-gray-800 flex justify-between items-center">
              <p className="">Username</p>
              {isEditUsername ? (
                <>
                  <input
                    type="text"
                    autoFocus
                    className="px-2 w-[12rem] outline outline-blue-500 outline-2 rounded-md"
                    value={updatedValue.username}
                    onChange={(e) =>
                      setUpdatedValue({
                        ...updatedValue,
                        username: e.target.value,
                      })
                    }
                  />
                  <button onClick={() => setIsEditUsername((prev) => !prev)}>
                    <LiaSave className="text-green-500" />
                  </button>
                </>
              ) : (
                <>
                  <span className="bg-zinc-900 px-8 rounded-md">
                    {updatedValue?.username}
                  </span>
                  <button onClick={() => setIsEditUsername((prev) => !prev)}>
                    <FaEdit />
                  </button>
                </>
              )}
            </div>
            <div className="w-full flex pb-2 border-b border-gray-800 justify-between items-center">
              Gender{" "}
              {isEditGender ? (
                <>
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
                    className="px-2 text-[1.3rem] outline outline-blue-500 outline-2 h-[2rem] w-[12rem] rounded-md"
                  >
                    <option value="">select an option</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <button onClick={() => setIsEditGender((prev) => !prev)}>
                    <LiaSave className="text-green-500" />
                  </button>
                </>
              ) : (
                <>
                  <p className="bg-zinc-900 ml-8 px-8 rounded-md">
                    {updatedValue.gender}
                  </p>
                  <button onClick={() => setIsEditGender((prev) => !prev)}>
                    <FaEdit />
                  </button>
                </>
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
                    className="bg-blue-700 hover:bg-blue-600 px-8 py-2 rounded-md text-xl active:scale-[0.916]"
                  >
                    Update
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
