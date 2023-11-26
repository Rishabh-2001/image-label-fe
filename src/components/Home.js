import React from "react";
import bgimg from "../assets/header-40.png";

import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center ">
      <div className="bg-gray-200 w-[60%] mx-auto px-12 py-8 text-center">
        <p className="text-4xl font-medium  text-center">
          Welcome to Image Labeling Services !
        </p>

        <Link to="/vendor">
          <button className="bg-blue-600 px-8 py-3 rounded-xl text-xl text-white my-4">
            Let's Explore ..!
          </button>
        </Link>
        <div className="w-full h-fit mt-6">
          <img
            src={bgimg}
            className="max-h-[100%] max-w-[100%] block "
            alt="bg"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
