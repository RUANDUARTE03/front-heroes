import { ThreatProps } from "src/context/threats";
import { AxiosAdapter } from "../../core/adapters";
import { HttpClient } from "../../core/types/Http";

export class ThreatService {
  async createThreat({ dangerLevel, monster }: ThreatProps) {
    const baseUrl = process.env.REACT_APP_HOST;
    const httpClient: HttpClient = new AxiosAdapter();

    const url = `${baseUrl}/threat/create`;

    const body = {
      dangerLevel,
      name: monster.name,
      url: monster.url,
      isCombat: false,
      heroe: "",
      timeDuration: null,
    };

    const response = await httpClient.request({
      method: "post",
      body,
      url,
    });

    return response;
  }

  async getAll() {
    const baseUrl = process.env.REACT_APP_HOST;
    const httpClient: HttpClient = new AxiosAdapter();

    const url = `${baseUrl}/threat/getAll`;

    const response = await httpClient.request({
      method: "get",
      url,
    });

    return response;
  }
}
