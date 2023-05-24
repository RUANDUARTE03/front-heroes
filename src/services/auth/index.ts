import { AxiosAdapter } from "../../core/adapters";
import { HttpClient } from "../../core/types/Http";

type LoginProps = {
  email: string;
  password: string;
};

export class AuthService {
  async login({ email, password }: LoginProps) {
    const baseUrl = process.env.REACT_APP_HOST;
    const httpClient: HttpClient = new AxiosAdapter();

    const url = `${baseUrl}/auth/login`;

    const response = await httpClient.request({
      method: "post",
      url,
      body: {
        email,
        password,
      },
    });

    return response;
  }
}
