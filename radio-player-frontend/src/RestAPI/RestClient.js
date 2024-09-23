import axios from "axios";

export const getRequest = (url = "", config = {}) => {
  return axios
    .get(url, {
      "Content-Type": "application/json",
      ...config,
    })
    .then((res) => res)
    .catch((err) => err.response);
};

export const postRequest = (url = "", data = {}, config = {}) => {
  return axios
    .post(url, data, {
      "Content-Type": "application/json",
      ...config,
    })
    .then((res) => res)
    .catch((err) => err.response);
};

export default { getRequest, postRequest };
