const PostImage = ({ mediaUrl }) => {
  return (
    <div>
      <img src={mediaUrl} alt="Post" width={100} height={150} />
    </div>
  );
};

export default PostImage;
