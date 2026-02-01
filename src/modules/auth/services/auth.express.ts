import { expressClient } from "../../../shared/services/expressClient";

export const authExpress = {
  login: (email: string, password: string) =>
    expressClient
      .post("/auth/login", { email, password })
      .then((res) => res.data),

  register: (email: string, password: string) =>
    expressClient
      .post("/auth/register", { email, password })
      .then((res) => res.data),

  logout: () => expressClient.post("/auth/logout").then((res) => res.data),
};
