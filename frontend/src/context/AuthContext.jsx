import { createContext, useEffect, useReducer } from 'react'
import Cookies from "js-cookie";
import getUserInfo from '../api/getUserInfo.js';

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
     
            return {
              id: action.payload.id,
              token: action.payload.token,
              isGoogleAuth: action.payload.isGoogleAuth,
              firstName: action.payload.firstName,
              lastName: action.payload.lastName,
              loading: false,
            };
        case 'LOGOUT':
            return {
                id: null,
                token:null,
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
      token: null,
      isGoogleAuth: false,
      firstName: "",
      lastName: "",
    });

    useEffect(() => {
      const fetchData = async () => {
        let userId = "";
        if (Cookies.get("token")) {
          const match = Cookies.get("id").match(/"([^"]+)"/);

          if (match) {
            userId = match[1];
          } else {
            userId = Cookies.get("id");
          }

          const existingInitials = await getUserInfo(userId);

          dispatch({
            type: "LOGIN",
            payload: {
              id: userId,
              token: Cookies.get("token"),
              isGoogleAuth: Cookies.get("isGoogleAuth"),
              firstName: existingInitials && existingInitials.firstName,
              lastName: existingInitials && existingInitials.lastName,
            },
          });
        } else {
          return;
        }
      };
      fetchData();
    }, []);
      
    console.log('AuthContext state:', state);
    return <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
    </AuthContext.Provider>
 }
