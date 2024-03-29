import axios from 'axios'

const getReviews = async (id, setError, setLoading) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_PROD_BASE_URL}/books/get-reviews/${id}`,
      {
        withCredentials: true,
      }
    );

    if (res.status !== 200) {
      throw new Error(`Failed to fetch data with status: ${res.status}`);
    } else {
      console.log(res.data.reviews);
      return res.data.reviews;
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
export default getReviews;