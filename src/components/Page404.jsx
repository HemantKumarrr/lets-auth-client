import React from "react";

const Page404 = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-[15rem] relative py-4 text-center">404</h1>
        <p className="bg-orange-600 rotate-[-20deg] text-2xl absolute px-4 py-1">
          Page Not Found
        </p>
      </div>
    </div>
  );
};

export default Page404;
