import axios from "axios";

const getUserInfo = async () => {

      const res = await axios.get(
        `${import.meta.env.VITE_PROD_BASE_URL}/getUser`,
        {
          withCredentials: true,
        }
      );

      if (res.status !== 200) {
        throw new Error(`Failed to fetch data with status: ${res.status}`);
      } else {
        console.log(res.data.existingUser);
        return res.data.existingUser

      }
};
export default getUserInfo;
