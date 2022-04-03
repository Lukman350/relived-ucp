import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

interface CallAPIProps extends AxiosRequestConfig {
  token?: boolean;
  serverToken?: string;
}

export default async function callAPI({
  url,
  method,
  data,
  token,
  serverToken,
}: CallAPIProps) {
  let headers = {};

  if (serverToken) {
    headers = {
      Authorization: `Bearer ${serverToken}`,
    };
  } else if (token) {
    const tokenCookies = Cookies.get("token");

    if (tokenCookies) {
      headers = {
        Authorization: `Bearer ${tokenCookies}`,
      };
    }
  }

  const response = await axios({
    url,
    method,
    data,
    headers,
  }).catch((error) => error.response);

  if (response.status > 300) {
    const res = {
      success: false,
      error: response.data.error,
      data: null,
    };
    return res;
  }

  const { length } = Object.keys(response.data);

  const res = {
    success: true,
    error: null,
    data: response.data.data,
  };

  return res;
}
