import axios from "axios";
import CONSTANT from "./constant";
import API from "./URL";

// const logout = async () => {
//   await ClearAllStoredData();
// };

export const callApi = async ({
  endpoint,
  method,
  body,
  accessToken,
  fileToUpload,
}) => {
  // loader will add later
  try {
    let headers = {};
    let baseUrl = `${API.BASE_URL}${endpoint}`;
    if (accessToken) {
      headers["x-token"] = `bearer ${accessToken}`;
    }
    if (fileToUpload) {
      headers["Content-Type"] = "multipart/form-data";
    } else {
      headers["Content-Type"] = "application/json";
    }
    let config = {
      method: method,
      url: baseUrl,
      data: body,
      headers: headers,
    };
    console.log(config);
    console.log("API CALL >>>>>>>>>>>>>>>>>>> ", `${API.BASE_URL}${endpoint}`);
    let response = await axios(config);
    if (response) {
      return { response: response.data, type: "success" };
    }
  } catch (err) {
    console.log("ERROR >>>>>>>>>>>>>>>>>>> ", err);
    if (err?.response?.data) {
      if (err.response.status === 401) {
        return { response: err.response.data, type: "failure" };
      } else {
        return { response: err.response.data, type: "failure" };
      }
    } else {
      return { response: err, type: "failure" };
    }
  }
};
