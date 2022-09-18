import axiosPublic from "../axiosPublic";

// create new user
export async function createNewUser(userInfo) {
  const res = await axiosPublic.post("/user/post", userInfo);
  return res.data;
}
