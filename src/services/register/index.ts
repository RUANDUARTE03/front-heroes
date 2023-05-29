import { AxiosAdapter } from "../../core/adapters";
import { HttpClient } from "../../core/types/Http";

type RegisterProps = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export class RegisterService {
  async create({ email, password, firstName, lastName }: RegisterProps) {
    const baseUrl = process.env.REACT_APP_HOST;
    const httpClient: HttpClient = new AxiosAdapter();

    const url = `${baseUrl}/client/create`;

    const response = await httpClient.request({
      method: "post",
      url,
      body: {
        email,
        password,
        firstName,
        lastName,
        role: 'admin'
      },
    });

    return response;
  }
}
