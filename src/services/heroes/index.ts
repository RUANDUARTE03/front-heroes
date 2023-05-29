import { AxiosAdapter } from "../../core/adapters";
import { HttpClient } from "../../core/types/Http";
import jwt_decode from "jwt-decode";

type updatetHeroeByIdProps = {
  id: string;
};

type getHeroeByIdProps = {
  id: string;
};

type listAllHeroesProps = {
  token: string;
};

type heroeProps = {
  name: string;
  typeHeroe: string;
  classHeroe: string;
};

export class HeroesService {
  async createHeroe({ classHeroe, name, typeHeroe }: heroeProps) {
    const baseUrl = process.env.REACT_APP_HOST;
    const httpClient: HttpClient = new AxiosAdapter();

    const url = `${baseUrl}/heroe/create`;

    const body = {
      name,
      classHeroe,
      typeHeroe,
    };

    const response = await httpClient.request({
      method: "post",
      body,
      url,
    });

    return response;
  }

  async getHeroeById({ id }: getHeroeByIdProps) {
    const baseUrl = process.env.REACT_APP_HOST;
    const httpClient: HttpClient = new AxiosAdapter();

    const url = `${baseUrl}/heroe/getById/${id}`;

    const response = await httpClient.request({
      method: "get",
      url,
    });

    return response;
  }

  async removeHeroeById({ id }: getHeroeByIdProps) {
    const baseUrl = process.env.REACT_APP_HOST;
    const httpClient: HttpClient = new AxiosAdapter();

    const url = `${baseUrl}/heroe/remove/${id}`;

    const response = await httpClient.request({
      method: "delete",
      url,
    });

    return response;
  }

  async updateHeroeById({
    id,
    classHeroe,
    name,
    typeHeroe,
  }: updatetHeroeByIdProps & heroeProps) {
    const baseUrl = process.env.REACT_APP_HOST;
    const httpClient: HttpClient = new AxiosAdapter();

    const url = `${baseUrl}/heroe/update/${id}`;

    const data = {
      classHeroe,
      name,
      typeHeroe,
    };

    const response = await httpClient.request({
      method: "post",
      body: data,
      url,
    });

    return response;
  }

  async listAllHeroes({ token }: listAllHeroesProps) {
    const baseUrl = process.env.REACT_APP_HOST;
    const httpClient: HttpClient = new AxiosAdapter();

    const decoded: any = await jwt_decode(token);

    const userId = decoded.id;

    const url = `${baseUrl}/heroe/list/${userId}`;

    const response = await httpClient.request({
      method: "get",
      url,
    });

    return response;
  }

  async removeToBatle({ id }: { id: string }) {
    const baseUrl = process.env.REACT_APP_HOST;
    const httpClient: HttpClient = new AxiosAdapter();

    const url = `${baseUrl}/heroe/removeTobatle/${id}`;

    const response = await httpClient.request({
      method: "post",
      url,
    });

    return response;
  }
}
