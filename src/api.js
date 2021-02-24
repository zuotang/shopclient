import axios from "./uitls/http";
export const baseUrl = process.env.NODE_ENV == "development" ? "http://192.168.50.186:3001" : "";
//登录
export async function signin(params) {
  let { data } = await axios.post(baseUrl + "/user/signin", { ...params });
  return data.data;
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
