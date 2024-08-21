import Image from "next/image";

import CountLikeComment from "@/components/CountLikeComment";
import fetching_data from "@/components/fetching_data.js";
import WriteComment from "@/components/WriteComment";
import PostMedia from "@/components/PostMedia";
import Profile from "@/components/Profile";

const page = async (id) => {
  const SERVER = process.env.NEXT_PUBLIC_SERVER;
  const userProfile = await fetching_data({
    url: `${SERVER}/posts/${id.params.id}`,
  });

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

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <PostMedia mediaUrl={userProfile.Post_Media[0].media_file} />
      </div>

      <div className="flex flex-col justify-between pl-10">
        <div>
          <div>
            <Profile
              large={false}
              url={userProfile.created_by_user.profile_image}
              profileName={userProfile.created_by_user.profile_name}
              userId={userProfile.created_by_user.id}
              mainUser={true}
            />
          </div>

          <div className="border-t-[1px] border-stone-500 overflow-y-scroll h-[35rem] no-scrollbar">
            {userProfile.Comment.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-center space-x-2 py-3"
              >
                <div className="flex items-center space-x-2 py-3">
                  <Image
                    alt="user logo"
                    src={item.created_by_user.profile_image}
                    width={30}
                    height={30}
                    className="rounded-full"
                  />

                  <div>
                    <div className="flex pl-2">
                      <div>
                        <p className="text-sky-700 text-sm">
                          {item.created_by_user.profile_name}
                        </p>
                      </div>

                      <div className="flex items-center text-stone-600">
                        <p className="text-white text-base pl-1">
                          {item.comment}
                        </p>
                      </div>
                    </div>

                    {/* <div>
                      <p className="text-xs">
                        {calculateTimeDifference(item.createdAt)}
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div>
            <div className="pb-1">
              <CountLikeComment
                countComment={userProfile.Comment.length}
                countLike={userProfile.Like.length}
                post_id={userProfile.id}
              />
            </div>

            <div>
              <p className="text-xs text-stone-500">
                {calculateTimeDifference(userProfile.createdAt)}
              </p>
            </div>
          </div>

          <div>
            <WriteComment media_id={userProfile.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
