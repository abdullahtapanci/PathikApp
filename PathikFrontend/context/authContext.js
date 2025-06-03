import React, { createContext, useState, useContext } from "react";
import { signup, signin, logout, isAuthenticated } from "../services/authService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'
import { Alert } from "react-native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSignup = async (name, surname, username, email, password) => {
    try{
      const response = await signup(name, surname, username, email, password);
      if(response.success){
          await AsyncStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          //console.error(response.data.token);
          router.replace("/(auth)/verifyEmail")
      }else{
        Alert.alert(response.error.message);
      }
    }catch(error){
      throw new Error(error);
    }
  };

  const handleSignin = async (email, password) => {
    try{
      const response = await signin(email, password);
      if(response.success){
          await AsyncStorage.setItem("token", response.data.token);
          setToken(response.data.token);
          router.replace("/(tabs)/(details)")
      }else{
        Alert.alert(response.error.message);
      }
    }catch(error){
      throw new Error(error);
    }
  };

  const handleLogout = () => {
    logout();
    setToken(null);
    router.replace("/login")
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        handleSignup,
        handleSignin,
        handleLogout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);