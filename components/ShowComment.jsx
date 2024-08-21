import Image from "next/image";

const ShowComment = ({ url, date, profileName, comment }) => {
  const truncateComment = (text, maxLength = 255) => {
    if (text.length <= maxLength) {
      return text;
    }

    return `${text.slice(0, maxLength)}...`;
  };

  return (
    <div>
      <div>
        <div className="flex items-center space-x-2 py-3">
          <Image
            alt="user logo"
            src={url}
            width={30}
            height={30}
            className="rounded-full"
          />
          <div className="flex items-center space-x-1 text-stone-600">
            <p className="text-white text-sm">{profileName}</p>
          </div>

          <div>
            <p className="text-sky-700 text-sm p-3">
              {truncateComment(comment)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowComment;
