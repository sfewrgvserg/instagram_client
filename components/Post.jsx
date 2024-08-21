import PostImage from "./PostImage";
import PostMedia from "./PostMedia";

const Post = ({ mediaUrl, profileName, postId }) => {
  const getMediaType = (url) => {
    const extension = url.split(".").pop().toLowerCase();
    if (extension === "mp4") {
      return "video";
    } else if (["jpg", "jpeg", "png"].includes(extension)) {
      return "image";
    }
    return "unknown";
  };

  const mediaType = getMediaType(mediaUrl);

  return (
    <div>
      {mediaType === "video" ? (
        <div>
          <PostMedia
            mediaUrl={mediaUrl}
            profileName={profileName}
            postId={postId}
          />
        </div>
      ) : mediaType === "image" ? (
        <div>
          <PostImage mediaUrl={mediaUrl} />
        </div>
      ) : (
        <div>Unsupported media type</div>
      )}
    </div>
  );
};

export default Post;
