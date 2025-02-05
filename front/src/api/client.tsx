import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"
import Cookies from "js-cookie";

const options = {
  ignoreHeaders: true
}

const client = applyCaseMiddleware(
  axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  }), options)

client.interceptors.request.use(
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

client.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["access-token"];
    const newClient = response.headers["client"];
    const newUid = response.headers["uid"];

    if (newAccessToken && newClient && newUid) {
      Cookies.set("_access_token", newAccessToken, { secure: true, sameSite: "Lax" });
      Cookies.set("_client", newClient, { secure: true, sameSite: "Lax" });
      Cookies.set("_uid", newUid, { secure: true, sameSite: "Lax" });

      client.defaults.headers["access-token"] = newAccessToken;
      client.defaults.headers["client"] = newClient;
      client.defaults.headers["uid"] = newUid;
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client
