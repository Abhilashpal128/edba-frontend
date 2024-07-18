import axios from "axios";

// const apiUrl = "http://192.168.1.131:5000/v1";
// const apiUrl = "http://192.168.68.115:3000/v1";
const apiUrl = "http://192.46.208.52:5000/v1";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// export const RegisterUser = async (userData) => {
//   console.log(`userData`, userData);
//   try {
//     const response = await axios.post(apiUrl, config, userData);
//     console.log(`response`, response);
//     return response.json();
//   } catch (error) {
//     console.log(`errorerror`, error);
//   }
// };
// export const EventsAndNotices = async (url) => {
//   console.log(`hiiii`);
//   try {
//     const response = await axios.get(`${apiUrl}/${url}`, config);

//     // console.log(response);
//     // const responseJson = await response.json();
//     console.log(`responseJsonresponseJson`, response?.data);
//     return response?.data;
//   } catch (error) {
//     console.log(`error`, error);
//   }
// };

// export const todaysClasses = async () => {
//   try {
//     x;
//     const response = await axios.get(apitimetableUrl, config);
//     console.log(response?.status);
//     return response?.data;
//   } catch (error) {}
// };

export const get = async (url) => {
  try {
    console.log(`${apiUrl}/${url}`);
    const response = await axios.get(`${apiUrl}/${url}`, config);
    console.log(`GetFunctionResponse`, response?.data);
    return response?.data;
  } catch (error) {
    console.log(error?.message);
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

export const Delete = async (url) => {
  try {
    const response = await axios({
      method: "DELETE",
      url: `${apiUrl}/${url}`,
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
