import UserProfile from "@/components/user_profile/UserProfile";

import "dotenv/config";

const page = async (id) => {
  return (
    <div className="pt-16">
      <UserProfile user_id={id.params.id} />
    </div>
  );
};

export default page;
