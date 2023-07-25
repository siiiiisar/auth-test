import client from "./authClient";

export const signUp = (params) => {
  return client.post("auth", params);
}