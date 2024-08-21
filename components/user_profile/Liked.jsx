import "dotenv/config";
import Link from "next/link.js";

import fetching_data from "../fetching_data.js";

const Liked = async ({ id }) => {
  const SERVER = process.env.NEXT_PUBLIC_SERVER;
  const userProfile = await fetching_data({
    url: `${SERVER}/${id}`,
  });

  return (
    <div className="flex items-center flex-col justify-center ">
      <div className="grid grid-cols-3 w-[50em] justify-items-center">
        {userProfile.Like.map((item, index) => (
          <Link
            href={`/${item.post.created_by_user.profile_name}/video/${item.post.id}`}
          >
            <video
              key={index}
              controls
              preload="none"
              loop
              autoPlay
              aria-label="Video player"
              muted
              className="rounded-xl pb-2 h-[30rem] w-[15rem]"
            >
              <source
                src={item.post.Post_Media[0].media_file}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Liked;
