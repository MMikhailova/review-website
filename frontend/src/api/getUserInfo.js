import axios from "axios";

const getUserInfo = async (id) => {
console.log(id);
  if (id) {

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_PROD_BASE_URL}/getUser/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.status !== 200) {
        throw new Error(`Failed to fetch data with status: ${res.status}`);
      } else {
        return res.data.existingUser

      }
    } catch (err) {
      console.log(err);
    }
  } else {
    return 
  }
};
export default getUserInfo;
