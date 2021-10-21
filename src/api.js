import axios from "./utils/http";
export const baseUrl = process.env.NODE_ENV == "development" ? "/api" : ""; //http://www.storm-money.com
//登录
export async function signin(params) {
  let { data } = await axios.post(baseUrl + "/user/signin", { ...params });
  return data;
}

export async function signup(params) {
  let { data } = await axios.post(baseUrl + "/user/signup", { ...params });
  return data;
}

export async function usecode(params) {
  let { data } = await axios.post(baseUrl + "/user/usecode", { ...params });
  return data;
}
export async function usecodeself(params) {
  let { data } = await axios.post(baseUrl + "/user/usecodeself", { ...params });
  return data;
}

//获取用户消息
export async function userInfo(params) {
  let { data } = await axios.get(baseUrl + "/user/info", { ...params });
  return data.data;
}

export async function shops(params) {
  let { data } = await axios.get(baseUrl + "/shop/list", { params });
  return data.data;
}

export async function shop({ id }) {
  let { data } = await axios.get(baseUrl + "/shop/shop/" + id);
  return data.data;
}

export async function getWebConfig() {
  let { data } = await axios.get(baseUrl + "/web/config");
  return data.data;
}

export async function setPassword(params) {
  let { data } = await axios.post(baseUrl + "/user/setpassword", { ...params });
  return data;
}

export async function getPhoto(params) {
  let { data } = await axios.get(baseUrl + "/core/photo", { params });
  return data;
}

export async function sendCode(params) {
  let { data } = await axios.get(baseUrl + "/core/sendcode", { params });
  return data;
}
