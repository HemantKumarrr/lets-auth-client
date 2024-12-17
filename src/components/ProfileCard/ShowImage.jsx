import { IoClose } from "react-icons/io5";

const ShowImage = ({ imageUrl, setOpenImage }) => {
  return (
    <div className="bg-black px-8 bg-opacity-20 backdrop-blur-lg border-white/30 absolute flex flex-col items-center justify-center z-10 w-full h-full">
      <div className="relative">
        <img
          loading="lazy"
          className="w-full h-[80vh] object-contain object-center"
          src={imageUrl}
          alt="full-image"
        />
        <div className="absolute top-0 right-0">
          <IoClose
            onClick={() => setOpenImage((prev) => !prev)}
            className="cursor-pointer bg-gray-900 hover:bg-gray-800 rounded-full p-1 text-5xl sm:text-5xl text-white font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default ShowImage;
