import { MdOutlineEdit } from "react-icons/md";
import { Bounce, toast } from "react-toastify";
import { useState } from "react";

const validTypes = ["image/jpg", "image/jpeg", "image/png"];

const ProfileImage = ({ imageUrl, setOpenImage }) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageChangeToggle, setIsImageToggle] = useState(false);

  const createFormData = (objects) => {
    const data = new FormData();
    data.append("file", file);
    return data;
  };

  const handleImageChage = async (e) => {
    e.preventDefault();
    setIsImageToggle((prev) => !prev);
    const myfile = e.target.files[0];
    setFile(e.target.files[0]);
    // Verify Image Type
    if (!validTypes.find((type) => type === myfile.type))
      return toast.error("Invalid Image Format", {
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
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const uploadStart = await fetch(
        `${import.meta.env.VITE_BASE_URL}/${JSON.parse(
          localStorage.getItem("uid")
        )}/upload-image`,
        {
          method: "POST",
          body: createFormData(file),
        }
      );
      const response = await uploadStart.json();
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
      setIsLoading(false);
      setIsImageToggle(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="profile-image relative p-1 rounded-full bg-gradient-to-tl from-pink-500 to-blue-500">
      {isLoading ? (
        <h1 className="px-4">Updating image...</h1>
      ) : (
        <>
          <img
            loading="lazy"
            onClick={() => setOpenImage((prev) => !prev)}
            src={file ? URL.createObjectURL(file) : imageUrl}
            alt="profile-image"
            className="rounded-full relative hover:scale-[1.050] cursor-pointer w-[5rem] sm:w-[10rem] h-[5rem] sm:h-[10rem] transition-all ease-in-out delay-100 object-cover object-center"
          />
          <label title="change profile image" htmlFor="upload-image">
            <MdOutlineEdit className="text-2xl sm:text-4xl absolute bottom-0 right-0 sm:right-4 bg-zinc-100 text-black cursor-pointer rounded-full p-1" />
          </label>
          <form method="POST" encType="multipart/form-data">
            <input
              type="file"
              onChange={handleImageChage}
              className="hidden"
              id="upload-image"
              name="file"
            />
          </form>
          {imageChangeToggle && (
            <div className="absolute right-0 w-full mt-2 flex items-center justify-center gap-5">
              <button
                onClick={handleUpload}
                className=" bg-blue-600 px-4 rounded-md"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setFile(null);
                  setIsImageToggle((prev) => !prev);
                }}
                className="bg-zinc-800 px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileImage;
