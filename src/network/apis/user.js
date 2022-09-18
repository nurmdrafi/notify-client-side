import instance from "../AxiosInterceptor";

// create new user
export async function createNewUser(userInfo) {
  const res = await instance.post("/user/post", userInfo);
  return res.data;
}
