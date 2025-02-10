import axios from 'axios';
import Cookies from "js-cookie";
import applyCaseMiddleware from "axios-case-converter"

const options = {
  ignoreHeaders: true
}

const api = applyCaseMiddleware(axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}), options);

api.interceptors.request.use(
  (config) => {
    config.headers["access-token"] = Cookies.get("_access_token") || "";
    config.headers["client"] = Cookies.get("_client") || "";
    config.headers["uid"] = Cookies.get("_uid") || "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["access-token"];
    const newClient = response.headers["client"];
    const newUid = response.headers["uid"];

    if (newAccessToken && newClient && newUid) {
      Cookies.set("_access_token", newAccessToken, { secure: true, sameSite: "Lax" });
      Cookies.set("_client", newClient, { secure: true, sameSite: "Lax" });
      Cookies.set("_uid", newUid, { secure: true, sameSite: "Lax" });

      api.defaults.headers.common["access-token"] = newAccessToken;
      api.defaults.headers.common["client"] = newClient;
      api.defaults.headers.common["uid"] = newUid;
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
