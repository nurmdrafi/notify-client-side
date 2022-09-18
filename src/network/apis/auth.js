import axiosPublic from "../axiosPublic";

export async function getToken(userInfo) {
  const res = await axiosPublic.post("/auth/token", userInfo);
  return res.data;
}
