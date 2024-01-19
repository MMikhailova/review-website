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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUserInfo();
          dispatch({
            type: "LOGIN",
            payload: {
              id: user?._id,
              isGoogleAuth: user?.password === false,
              firstName: user?.firstName,
              lastName: user?.lastName,
            },
          });
        
      } catch (error) {
          dispatch({
            type: "LOGOUT"
          })
      }
    };
    fetchData();
  },[])
  
      
    console.log('AuthContext state:', state);
    return <AuthContext.Provider value={{ ...state, dispatch }}>
        {children}
    </AuthContext.Provider>
 }
