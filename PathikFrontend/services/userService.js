import {apiGet, apiPost} from './apiService';

export const getUserInfo = async () => {
  try{
    const response = await apiGet("user/get");
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

export const updateUser = async (updateDTO) => {
  try{
    const response = await apiPost("user/update", updateDTO);
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

export const updateUserEmail = async (updateEmail) => {
  try{
    const response = await apiPost("user/updateEmail", updateEmail);
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

export const updateUserPassword = async (updatePassword) => {
  try{
    const response = await apiPost("user/updatePassword", updatePassword);
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