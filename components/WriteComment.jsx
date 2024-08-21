"use client";

import { useState } from "react";

import styles from "../public/css/main.module.css";

import "dotenv/config";
import axios from "axios";

const WriteComment = ({ media_id }) => {
  const [comment, setComment] = useState(""); // State for input value
  const created_by_user_id = process.env.NEXT_PUBLIC_MY_USER_ID;
  const SERVER = process.env.NEXT_PUBLIC_SERVER;

  const handleEnter = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      try {
        await axios.post(`${SERVER}/post/comment`, {
          media_id: media_id,
          comment: comment,
          created_by_user_id: created_by_user_id,
        });

        setComment("");
      } catch (error) {
        console.error("Error posting comment:", error);
        alert(
          `There was an error posting your comment. Please try again later. ${error.message}`
        );
      }
    }
  };

  const handleChange = (event) => {
    setComment(event.target.value); // Update state on input change
  };

  return (
    <div className="flex relative">
      <input
        className={`${styles.comment_input} outline-none placeholder:text-stone-700`}
        type="text"
        placeholder="Add a comment..."
        value={comment} // Set input value from state
        onChange={handleChange} // Handle input changes
        onKeyDown={handleEnter} // Handle Enter key press
      />
      <button className="absolute bottom-0 right-0 py-[10px] px-3 text-sm text-sky-700">
        Post
      </button>
    </div>
  );
};

export default WriteComment;
