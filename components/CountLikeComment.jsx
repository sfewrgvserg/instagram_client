"use client"; // Add this line to indicate that this is a Client Component

import { CiHeart } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa6";
import "dotenv/config";
import axios from "axios";

const CountLikeComment = ({ countLike, countComment, post_id }) => {
  const created_by_user_id = process.env.NEXT_PUBLIC_MY_USER_ID;
  const SERVER = process.env.NEXT_PUBLIC_SERVER;

  const handleLike = async () => {
    try {
      await axios.post(`${SERVER}/post/like`, {
        user_id: created_by_user_id,
        post_id: post_id,
      });
    } catch (error) {
      console.error("Error posting like:", error);
      alert(
        `There was an error liking the post. Please try again later. ${error.message}`
      );
    }
  };

  return (
    <div>
      <div className="flex space-x-5">
        <div
          onClick={handleLike} // Correct function call
          className="flex flex-col items-center cursor-pointer"
        >
          <CiHeart size={25} />
          <p className="text-sm">
            {countLike} {countLike > 0 ? "Likes" : "Like"}
          </p>
        </div>

        <div className="flex flex-col items-center cursor-pointer">
          <FaRegCommentDots size={25} />
          <p className="text-sm">{countComment}</p>
        </div>
      </div>
    </div>
  );
};

export default CountLikeComment;
