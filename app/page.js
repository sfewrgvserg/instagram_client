import Aside from "@/components/Aside";
import fetching_data from "@/components/fetching_data.js";
import Post from "@/components/Post";
import CountLikeComment from "@/components/CountLikeComment";
import Profile from "@/components/Profile";
import ShowComment from "@/components/ShowComment";
import WriteComment from "@/components/WriteComment";

import "dotenv/config";

export default async function Home() {
  const SERVER = process.env.NEXT_PUBLIC_SERVER;

  const data = await fetching_data({ url: `${SERVER}/posts` });
  const userProfile = await fetching_data({
    url: `${SERVER}/${process.env.NEXT_PUBLIC_MY_USER_ID}`,
  });

  return (
    <main className="flex justify-between">
      <div className="sticky top-0 left-0">
        <Aside />
      </div>

      <div className="overflow-scroll no-scrollbar h-screen w-full py-3 flex flex-col items-center">
        {data.map((item, index) => (
          <div key={index} className="px-5 pb-5">
            <Profile
              url={item.created_by_user.profile_image}
              date={item.createdAt}
              profileName={item.created_by_user.profile_name}
              mainUser={false}
              userId={item.created_by_user.id}
              large={false}
            />

            <div>
              <Post
                mediaUrl={item.Post_Media[0].media_file}
                profileName={item.created_by_user.profile_name}
                postId={item.id}
              />
            </div>

            <CountLikeComment
              countLike={item.Like.length}
              countComment={item.Comment.length}
              post_id={item.id}
            />

            {item.Comment.filter((comment, index) => {
              return index === 0;
            }).map((item, index) => (
              <div key={index}>
                <ShowComment
                  comment={item.comment}
                  date={item.createdAt}
                  profileName={item.created_by_user.profile_name}
                  url={item.created_by_user.profile_image}
                />
              </div>
            ))}

            <WriteComment media_id={item.id} />
          </div>
        ))}
      </div>

      <div>
        <Profile
          mainUser={true}
          profileName={userProfile.profile_name}
          url={userProfile.profile_image}
          large={true}
        />
      </div>
    </main>
  );
}
