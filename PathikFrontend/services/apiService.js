import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = "http://192.168.93.180:8080"; //use local ip here

const getRequestHeaders = async () => {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Failed to get token from AsyncStorage:", error);
  }

  return headers;
};

export const apiPost = async (endpoint, data) => {
  try {
    const headers = await getRequestHeaders();

    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    //check if response is ok
    if (!response.ok) {
      throw new Error("Server error, response is not ok")
    }

    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error("Server error")
  }
};

export const apiGet = async (endpoint) => {
  try {
    const headers = await getRequestHeaders();
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "GET",
      headers: headers,
    });

    // Check if response is ok
    if (!response.ok) {
      console.error(response);
      throw new Error("Server error, response is not ok");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    throw new Error("Server error");
  }
};


export const apiDelete = async (endpoint, id) => {
  try {
    const headers = await getRequestHeaders();

    const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
      method: "DELETE",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Server error, response is not ok");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    throw new Error("Server error");
  }
};

export const apiPut = async (endpoint, data = null, params = {}) => {
  try {
    const headers = await getRequestHeaders();

    // Convert params object to URL query string
    const query = new URLSearchParams(params).toString();
    const url = `${BASE_URL}/${endpoint}${query ? `?${query}` : ''}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: headers,
      body: data ? JSON.stringify(data) : null, // If data is provided, send as body
    });

    if (!response.ok) {
      throw new Error("Server error, response is not ok");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
    throw new Error("Server error");
  }
};