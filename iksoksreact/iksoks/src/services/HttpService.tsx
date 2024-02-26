import axios from "axios";
import { User } from "../models/User";

export const getToken = (): string | null => {
  return localStorage.getItem("iksoks");
};

export const AuthService = {
  login: async (user: User): Promise<void> => {
    const { data }: any = await axios
      .post(`http://localhost:8000/auth/login/`, user)
      .catch((reason: any) => {
        throw reason;
      });
    const token = data.token;
    localStorage.setItem("iksoks", token);
    document.cookie += "sessionid=" + token;
  },
  tokenLogin: async (): Promise<any> => {
    const token = getToken();

    const { data } = await axios
      .get(`http://localhost:8000/auth/token-login/`, {
        headers: { Authorization: `${token}` },
      })
      .catch((reason: any) => {
        throw reason;
      });

    return data;
  },
};
