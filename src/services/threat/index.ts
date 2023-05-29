import { DangerLevelProps, MonsterProps } from "src/context/threats";
import { updateCounter } from "src/utils/updateCounter";
import { AxiosAdapter } from "../../core/adapters";
import { HttpClient } from "../../core/types/Http";

type SendHeroeProps = {
  heroeId: string;
  timeDuration: Date;
  monster: MonsterProps;
  dangerLevel: DangerLevelProps;
  exactDuration: Date;
};
export class ThreatService {
  async createThreat({
    dangerLevel,
    monster,
    heroeId,
    timeDuration,
    exactDuration,
  }: SendHeroeProps) {
    const baseUrl = process.env.REACT_APP_HOST;
    const httpClient: HttpClient = new AxiosAdapter();

    const url = `${baseUrl}/threat/create`;

    const body = {
      dangerLevel,
      name: monster.name,
      url: monster.url,
      isCombat: true,
      heroeId,
      timeDuration,
      exactDuration,
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
