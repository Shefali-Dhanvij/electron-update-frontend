import axios from "axios";

function backendApi(url, payload) {
  if (payload) {
    return axios
      .post(url, payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  } else {
    return axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default backendApi;
