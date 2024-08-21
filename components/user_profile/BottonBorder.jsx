"use client";

import { useState } from "react";
import Link from "next/link";
import { CiHeart, CiBookmark } from "react-icons/ci";
import { FaTableCells } from "react-icons/fa6";

import Posts from "./Posts";
import Save from "./Save";
import Liked from "./Liked";

function BottomNavigation({ id }) {
  const [activeTab, setActiveTab] = useState("posts");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="">
      <ul className="flex w-full items-center justify-center space-x-10">
        <li>
          <Link
            href=""
            className={`flex space-x-1 justify-center items-center w-[15rem] pb-3 font-semibold border-b-2 border-gray-700 hover:border-rose-600 hover:text-rose-600 duration-200
              ${
                activeTab === "posts"
                  ? "border-b-2 border-rose-600 text-rose-600"
                  : ""
              }`}
            onClick={() => handleTabChange("posts")}
          >
            <FaTableCells />
            Posts
          </Link>
        </li>
        <li>
          <Link
            href=""
            className={`flex space-x-1 justify-center items-center w-[15rem] pb-3 font-semibold border-b-2 border-gray-700 hover:border-rose-600 hover:text-rose-600 duration-200
              ${
                activeTab === "saved"
                  ? "border-b-2 border-rose-600 text-rose-600"
                  : ""
              }`}
            onClick={() => handleTabChange("saved")}
          >
            <CiBookmark />
            Saved
          </Link>
        </li>
        <li>
          <Link
            href=""
            className={`flex space-x-1 justify-center items-center w-[15rem] pb-3 font-semibold border-b-2 border-gray-700 hover:border-rose-600 hover:text-rose-600 duration-200
              ${
                activeTab === "liked"
                  ? "border-b-2 border-rose-600 text-rose-600"
                  : ""
              }`}
            onClick={() => handleTabChange("liked")}
          >
            <CiHeart />
            Likes
          </Link>
        </li>
      </ul>

      <div className="">
        {activeTab === "posts" && <Posts id={id} />}
        {activeTab === "saved" && <Save id={id} />}
        {activeTab === "liked" && <Liked id={id} />}
      </div>
    </div>
  );
}

export default BottomNavigation;
