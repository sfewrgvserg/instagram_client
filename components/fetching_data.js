import axios from "axios";

const fetching_data = async ({ url }) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
};

export default fetching_data;
