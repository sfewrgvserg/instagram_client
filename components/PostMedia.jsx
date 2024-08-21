import Link from "next/link";

const PostMedia = ({ mediaUrl, profileName, postId }) => {
  return (
    <div>
      {profileName && postId ? (
        <Link href={`/${profileName}/video/${postId}`}>
          <video
            controls
            preload="none"
            loop
            autoPlay
            aria-label="Video player"
            muted
            className="h-[50rem] w-[30rem] rounded-xl py-5"
          >
            <source src={mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Link>
      ) : (
        <video
          controls
          preload="none"
          loop
          autoPlay
          aria-label="Video player"
          muted
          className="h-[50rem] w-[30rem] rounded-xl py-5"
        >
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default PostMedia;
