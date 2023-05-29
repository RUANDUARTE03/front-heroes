import axios, { AxiosResponse, AxiosError } from "axios";
import {
  HttpClient,
  HttpRequest,
  HttpReponse,
  HttpStatusCode,
} from "../../types/Http";
import jwt_decode from "jwt-decode";

export class AxiosAdapter implements HttpClient {
  async request({
    timeout = 10000,
    url,
    method,
    body,
    headers,
  }: HttpRequest): Promise<HttpReponse<any>> {
    const getToken = localStorage.getItem("@zrp/token");

    let userId;
    if (getToken?.length && getToken !== undefined) {
      const decoded: any = await jwt_decode(getToken);

      userId = decoded.id;
    }

    let httpResponse: AxiosResponse<any> | null = null;
    let error: AxiosError | null = null;

    try {
      httpResponse = await axios.request({
        timeout,
        url,
        method,
        data: {
          ...body,
          userId: userId,
        },
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getToken}`,
          ...headers,
        },
      });
    } catch (e) {
      const axiosError = e as AxiosError;
      if (axiosError.response) {
        httpResponse = axiosError.response;
      } else {
        error = axiosError;
      }
    }
    if (httpResponse) {
      return {
        statusCode: httpResponse.status,
        body: httpResponse.data,
      };
    }
    if (error) {
      return {
        statusCode: error.code || HttpStatusCode.serverError,
        body: error.message,
      };
    }
    return {
      statusCode: HttpStatusCode.serverError,
    };
  }
}
