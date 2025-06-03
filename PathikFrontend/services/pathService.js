import {apiDelete, apiPost, apiPut, apiGet} from './apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createPath = async (PathInsertDTO) => {
  try{
    const response = await apiPost("path/create", PathInsertDTO);
    if(response.success){
        console.log("response is : " + JSON.stringify(response.data, null, 2));
        return response.data;
    }else{
        console.log("response is : " + response.error.message);
        console.log("response is : " + response.error.details);
    }
  }catch(error){
    console.error(error);
    throw new Error(error);
  }
};


export const getPaths = async (num) => {
  try{
    const token = await AsyncStorage.getItem("token");
    const requestBody = {
      token: token,
      isComplete: num,
    };
    const response = await apiPost("path/get", requestBody);
    if(response.success){
        console.log("response is : " + JSON.stringify(response.data, null, 2));
        return response.data;
    }else{
        console.log("response is : " + response.error.message);
        console.log("response is : " + response.error.details);
    }
  }catch(error){
    console.error(error);
    throw new Error(error);
  }
};

export const getPath = async (id) => {
  try{
    const response = await apiPost("path/getWithId", { id });
    if(response.success){
        console.log("response is : " + JSON.stringify(response.data, null, 2));
        return response.data;
    }else{
        console.log("response is : " + response.error.message);
        console.log("response is : " + response.error.details);
    }
  }catch(error){
    console.error(error);
    throw new Error(error);
  }
};

export const deletePathById = async (id) => {
  try {
    const response = await apiDelete("path/delete", id);

    if (response.success) {
      console.log("response is : " + JSON.stringify(response.data, null, 2));
      return response.data;
    } else {
      console.log("response error message: " + response.error.message);
      console.log("response error details: " + response.error.details);
    }
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const updatePathIsComplete = async (id, isComplete) => {
  try {
    const response = await apiPut(`path/complete/${id}`, null, { isComplete });

    if (response.success) {
      console.log("Updated path successfully:", response.data);
      return response.data;
    } else {
      console.error("Update error message:", response.error.message);
      console.error("Update error details:", response.error.details);
      throw new Error(response.error.message);
    }
  } catch (error) {
    console.error("Exception in updatePathIsComplete:", error);
    throw new Error("Failed to update path completion status.");
  }
};


export const getAllPaths = async () => {
  try{
    const response = await apiGet("path/all");
    if(response.success){
        console.log("response is : " + JSON.stringify(response.data, null, 2));
        return response.data;
    }else{
        console.log("response is : " + response.error.message);
        console.log("response is : " + response.error.details);
    }
  }catch(error){
    console.error(error);
    throw new Error(error);
  }
};

