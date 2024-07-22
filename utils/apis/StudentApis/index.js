import axios from "axios";
// const apiUrl = "http://192.168.1.131:5000/v1";
// const apiUrl = "http://192.168.68.115:3000/v1";
const apiUrl = "http://192.46.208.52:5000/v1";
// const apiUrl = "http://192.168.1.144:5000/v1";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const get = async (url) => {
  try {
    const response = await axios.get(`${apiUrl}/${url}`, config);
    console.log(`GetFunctionResponse`, response?.data);
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const post = async (url, data) => {
  try {
    // const response = await axios.post(`${apiUrl}/${url}`, config, data);
    const response = await axios({
      method: "POST",
      url: `${apiUrl}/${url}`,
      ...config,
      data: data,
    });
    return response?.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
