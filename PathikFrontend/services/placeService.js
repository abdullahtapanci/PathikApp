import {apiGet} from './apiService';

export const searchPlace = async (searchQuery) => {
  try{
    const response = await apiGet(`place/search?searchQuery=${encodeURIComponent(searchQuery)}`);
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


export const searchPlaceWithID = async (id) => {
  try{
    const response = await apiGet(`place/searchWithId?searchId=${encodeURIComponent(id)}`);
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


export const getNearbyLocations = async (latitude, longitude, category) => {
  try{
    const response = await apiGet(`place/searchNearby?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}&category=${encodeURIComponent(category)}`);
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