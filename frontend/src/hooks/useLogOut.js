import { useAuthContext } from "./useAuthContext.js"
import Cookies from "js-cookie";

 export const useLogout = () => {

 const { dispatch } = useAuthContext();
    //remove user from storage
   const logout = async () => {
      Cookies.remove("id");
      Cookies.remove("token");
      Cookies.remove("isGoogleAuth");
           await dispatch({ type: "LOGOUT" });
    }
    //dispatch logout
 return {logout}
}
