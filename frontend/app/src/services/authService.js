import client from "./authClient";

export const signUp = (params) => {
  return client.post("auth", params);
}

export const signIn = (params) => {
  return client.post("auth/sign_in", params);
}