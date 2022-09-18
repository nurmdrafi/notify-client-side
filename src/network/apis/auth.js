import instance from "../AxiosInterceptor";

export async function getToken(email, password) {
  const res = await instance.post("/auth/token", {
    email: email,
    password: password,
  });
  return res.data;
}
