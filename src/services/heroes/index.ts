import { AxiosAdapter } from "../../core/adapters";
import { HttpClient } from "../../core/types/Http";
import jwt_decode from "jwt-decode";
type listAllHeroesProps = {
  token: string;
};

export class HeroesService {
  async listAllHeroes({ token }: listAllHeroesProps) {
    const baseUrl = process.env.REACT_APP_HOST;
    const httpClient: HttpClient = new AxiosAdapter();

    const decoded: any = await jwt_decode(token);

    const userId = decoded.id;

    const url = `${baseUrl}/heroe/list/${userId}`;

    const response = await httpClient.request({
      method: "get",
      url,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return response;
  }
}
