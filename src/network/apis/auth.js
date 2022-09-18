import axiosPublic from "../axiosPublic";

export async function getToken(email, password) {
  const res = await axiosPublic.post("/auth/token", {
    email: email,
    password: password,
  });
  return res.data;
}
