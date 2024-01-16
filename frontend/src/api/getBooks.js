import axios from "axios";

const getBooks = async (setData, setError, setLoading) => {
  try {
    const res = await axios.get("http://localhost:5009/books/get-books", {
      withCredentials: true,
    });

    if (res.status !== 200) {
      throw new Error(`Failed to fetch data with status: ${res.status}`);
    } else {
      setData(res.data.result);
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
export default getBooks;
