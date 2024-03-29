import axios from "axios";

export const addToFavorites = async (userId,bookId) => {
    console.log(userId, bookId);
    try {
        const res=  await axios.put(
           `${import.meta.env.VITE_PROD_BASE_URL}/user/add-favorites`,{userId,bookId},
           {
               withCredentials: true,
               
           }
          );
         if (res.status !== 200) {
           throw new Error(`Failed add to favorites with status: ${res.status}`);
         } else {
         return res.data
         }
    } catch (err) {
      console.log(err);
   
}
}



export const deleteFromFavorites = async (userId,bookId) => {
    console.log(userId, bookId);
    try {
        const res = await axios.put(
          `${import.meta.env.VITE_PROD_BASE_URL}/user/remove-favorites`,
          { userId, bookId },
          {
            withCredentials: true,
          }
        );
         if (res.status !== 200) {
           throw new Error(`Failed add to favorites with status: ${res.status}`);
         } else {
         return res.data
         }
    } catch (err) {
      console.log(err);
   
}
}
export default deleteFromFavorites;