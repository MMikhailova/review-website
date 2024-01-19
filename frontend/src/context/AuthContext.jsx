import { createContext, useEffect, useReducer } from 'react'
import getUserInfo from '../api/getUserInfo.js';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
     
            return {
              id: action.payload.id,
              isGoogleAuth: action.payload.isGoogleAuth,
              firstName: action.payload.firstName,
              lastName: action.payload.lastName
            };
        case 'LOGOUT':
            return {
                id: null,
                isGoogleAuth: false,
                firstName: '',
                lastName: ''

            };
        default:
            return state
    }
} 
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
      id: null,
      isGoogleAuth: false,
      firstName: "",
      lastName: "",
    });

  
      const fetchData = async () => {
        try {
          const user = await getUserInfo();
          if (user?.status !== 200) {
           return
          } else {
            dispatch({
              type: "LOGIN",
              payload: {
                id: user?._id,
                isGoogleAuth: user?.password === false,
                firstName: user?.firstName,
                lastName: user?.lastName,
              },
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
            fetchData();
//         let userId = "";
// console.log(`cookie:${Cookies.get("token")}`);
//         if (Cookies.get("token")) {
//           const match = Cookies.get("id").match(/"([^"]+)"/);

//           if (match) {
//             userId = match[1];
//           } else {
//             userId = Cookies.get("id");
//           }

    //       const existingInitials = await getUserInfo(userId);

    // dispatch({
    //         type: "LOGIN",
    //         payload: {
    //           id: userId,
    //           token: Cookies.get("token"),
    //           isGoogleAuth: Cookies.get("isGoogleAuth"),
    //           firstName: existingInitials && existingInitials.firstName,
    //           lastName: existingInitials && existingInitials.lastName,
    //         },
    //       });
    //     } else {
    //       return;
    //     }
    //   };
  
      
    console.log('AuthContext state:', state);
    return <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
    </AuthContext.Provider>
 }
