import { useState } from "react";
import { useAuthContext } from "./useAuthContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${import.meta.env.VITE_PROD_BASE_URL}/signin`, formData, {
        withCredentials: true,
      });

      if (res.status !== 200) {
        setIsLoading(false);
        setError(res.message);
      }
      if (res.data) {
        setIsLoading(false);
        const user = res.data.userData;
  
        //update the auth state
        dispatch({
          type: "LOGIN",
          payload: {
            id: user.id,
            token: user.token,
            isGoogleAuth: user.isGoogleAuth,
            firstName: user.firstName,
            lastName: user.lastName
          },
        });
        setIsLoading(false);
        navigate("/");
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const googleSignUp = (user) => {
    setIsLoading(true);
    if (user.isGoogleAuth) {
      //update the auth state
      dispatch({
        type: "LOGIN",
        payload: {
          id: user.id,
          token: user.token,
          isGoogleAuth: user.isGoogleAuth,
          firstName: user.firstName,
          lastName:user.lastName
        },
      });
      setIsLoading(false);
    } else {
      throw new Error("Google Auth failed");
    }
  };

  const signup = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_PROD_BASE_URL}/signup`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.status !== 201) {
        isLoading(false);
        setError(res.message);
      }
      if (res.data) {
        const user = res.data.newUser;
    
        dispatch({
          type: "LOGIN",
          payload: {
            id: user.id,
            token: user.token,
            isGoogleAuth: user.isGoogleAuth,
            firstName: user.firstName,
            lastName: user.lastName
          },
        });
        setIsLoading(false);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return { login, googleSignUp, signup, isLoading, error };
};
