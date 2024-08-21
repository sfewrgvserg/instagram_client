"use client";

import Link from "next/link";
import Image from "next/image";

import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import fetching_data from "./fetching_data.js";

const Profile = ({ url, date, profileName, mainUser, large, userId }) => {
  const created_by_user_id = process.env.NEXT_PUBLIC_MY_USER_ID;
  const SERVER = process.env.NEXT_PUBLIC_SERVER;
  const [userProfile, setUserProfile] = useState(null);

  const calculateTimeDifference = (postDatetime) => {
    // Parse the MySQL datetime string into a JavaScript Date object
    const postDate = new Date(postDatetime);

    // Get the current time in milliseconds
    const now = Date.now();

    // Calculate the difference in milliseconds
    const differenceInMs = now - postDate.getTime();

    // Convert the difference to seconds
    const differenceInSeconds = Math.floor(differenceInMs / 1000);

    // Define thresholds and corresponding text
    const thresholds = [
      { limit: 60, text: "just now" },
      { limit: 3600, text: "a minute ago" }, // Up to 1 hour
      { limit: 3600 * 24, text: (hours) => `${hours} hours ago` }, // Up to 1 day
      { limit: 3600 * 24 * 2, text: "yesterday" }, // 2 days ago
    ];

    // Find the matching threshold
    for (const threshold of thresholds) {
      if (differenceInSeconds < threshold.limit) {
        return threshold.text;
      }
    }

    // Handle cases beyond thresholds (e.g., dates)
    const daysAgo = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    return `${daysAgo} days ago`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetching_data({
        url: `${SERVER}/${userId}`,
      });
      setUserProfile(data);
    };
    fetchData();
  }, [SERVER, userId]);

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

  return (
    <Link href={`/${profileName}/${userId}`}>
      <div className={`flex items-center space-x-3 ${mainUser ? "py-10" : ""}`}>
        <Image
          alt="user logo"
          src={url}
          width={large ? 100 : 40}
          height={large ? 100 : 40}
          className="rounded-full"
        />

        <div
          className={`${
            mainUser ? "flex" : "hidden"
          } items-center space-x-2 text-stone-600 w-[20rem]`}
        >
          <p className="text-white">{profileName}</p>
          <button className="text-stone-600 p-5 text-sm">Lop out</button>
        </div>

        <div
          className={`justify-between w-full ${mainUser ? "hidden" : "flex"}`}
        >
          <div className="flex items-center space-x-2 text-stone-600">
            <p className="text-white">{profileName}</p>
            <FaStar size={5} />
            <p>{calculateTimeDifference(date)}</p>
          </div>

          <div>
            {/* <button className="text-sky-700 text-sm p-3" onClick={handleFollow}>
              Follow
            </button> */}

            {userId === process.env.NEXT_PUBLIC_MY_USER_ID ? (
              <button className="px-3 py-1 bg-sky-500 font-medium">
                Edit Profile
              </button>
            ) : (
              <button
                className="px-3 py-1 bg-sky-500 font-medium"
                onClick={handleFollow}
              >
                {userProfile?.following?.some(
                  (following) =>
                    following.follower_id === process.env.NEXT_PUBLIC_MY_USER_ID
                )
                  ? "Following"
                  : "Follow"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Profile;
