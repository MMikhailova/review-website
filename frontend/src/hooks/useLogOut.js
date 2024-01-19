import { useAuthContext } from "./useAuthContext.js"
import Cookies from "js-cookie";
import axios from 'axios'
 export const useLogout = () => {

 const { dispatch } = useAuthContext();
    //remove user from storage
    const logout = async () => {
       try {
          const res = await axios.get(`${import.meta.env.VITE_PROD_BASE_URL}/logout`, {
             withCredentials: true
          });
          if (res.status !== 200) {
             throw new Error('Failed to log out');
          } else {
             await dispatch({ type: "LOGOUT" });
          }
       } catch (err) {
          console.log(err)
           
       }
    }
 return {logout}
}
