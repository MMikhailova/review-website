import axios from "axios";

const addReview = async (bookId, review, setError, setLoading) => {
    console.log(review);
    try {
        const res=  await axios.put(
           `http://localhost:5009/books/add-review/${bookId}`,review,
           {
               withCredentials: true,
               
           }
          );
         if (res.status !== 200) {
           throw new Error(`Failed to fetch data with status: ${res.status}`);
         } else {
         return
         }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
}

export default addReview;
