import Axios from "axios";

const apiClient = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

function getHeaders() {
  return {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
      "Accept-Language": localStorage.getItem("language"),
    },
  };
}

export default {
  async post<T>(url: string, body: T) {
    return apiClient.post(url, body, getHeaders());
  },
  async get(url: string) {
    return apiClient.get(url, getHeaders());
  },
  async put<T>(url: string, body: T) {
    return apiClient.put(url, body, getHeaders());
  },
  async delete(url: string) {
    return apiClient.delete(url, getHeaders());
  },
};
