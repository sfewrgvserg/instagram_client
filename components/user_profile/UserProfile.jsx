"use client";

import React, { useEffect, useState } from "react";
import fetching_data from "@/components/fetching_data.js";
import BottonBorder from "./BottonBorder";
import Image from "next/image";
import axios from "axios";

const UserProfile = ({ user_id }) => {
  const [userProfile, setUserProfile] = useState(null);
  const SERVER = process.env.NEXT_PUBLIC_SERVER;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetching_data({
        url: `${SERVER}/${user_id}`,
      });
      setUserProfile(data);
    };
    fetchData();
  }, [SERVER, user_id]);

  const handleFollow = async () => {
    try {
      await axios.post(`${SERVER}/post/follow`, {
        user_follower_id: process.env.NEXT_PUBLIC_MY_USER_ID,
        user_following_id: user_id,
      });

      if (
        userProfile.following?.some(
          (following) =>
            following.follower_id === process.env.NEXT_PUBLIC_MY_USER_ID
        )
      ) {
        // Unfollow logic here
        // Remove the follower from the following array
        const newFollowing = userProfile.following.filter(
          (following) =>
            following.follower_id !== process.env.NEXT_PUBLIC_MY_USER_ID
        );
        setUserProfile({ ...userProfile, following: newFollowing });
      } else {
        // Follow logic here
        // Add the follower to the following array
        const newFollowing = [
          ...userProfile.following,
          { follower_id: process.env.NEXT_PUBLIC_MY_USER_ID },
        ];
        setUserProfile({ ...userProfile, following: newFollowing });
      }
    } catch (error) {
      console.error("Error posting like:", error);
      alert(
        `There was an error liking the post. Please try again later. ${error.message}`
      );
    }
  };

  if (!userProfile) {
    return <div></div>;
  }

  return (
    <div className="">
      <div className="flex items-center justify-center space-x-5 text-sm">
        <Image
          alt="user logo"
          src={userProfile.profile_image}
          width={100}
          height={100}
          className="rounded-full"
        />

        <div className="space-y-1">
          <div className="flex space-x-5 items-center">
            <p>{userProfile.profile_name}</p>
            {userProfile.id === process.env.NEXT_PUBLIC_MY_USER_ID ? (
              <button className="px-3 py-1 bg-sky-500 font-medium">
                Edit Profile
              </button>
            ) : (
              <button
                className="px-3 py-1 bg-sky-500 font-medium"
                onClick={handleFollow}
              >
                {userProfile.following?.some(
                  (following) =>
                    following.follower_id === process.env.NEXT_PUBLIC_MY_USER_ID
                )
                  ? "Following"
                  : "Follow"}
              </button>
            )}
          </div>

          <div>
            <p>
              {userProfile.first_name} {userProfile.last_name}
            </p>
          </div>

          <div className="flex space-x-5">
            <p>{userProfile.Post.length} posts</p>
            <p>{userProfile.follower.length} followers</p>
            <p>{userProfile.following.length} following</p>
          </div>

          <div>
            <p>ddddddddddd</p>
          </div>
        </div>
      </div>

      <div className="pt-10">
        <BottonBorder id={user_id} />
      </div>
    </div>
  );
};

export default UserProfile;
