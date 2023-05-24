import axios, { AxiosResponse, AxiosError } from 'axios';
import { HttpClient, HttpRequest, HttpReponse, HttpStatusCode } from '../../types/Http';

export class AxiosAdapter implements HttpClient {
  async request({ timeout = 10000, url, method, body, headers }: HttpRequest): Promise<HttpReponse<any>> {
    let httpResponse: AxiosResponse<any> | null = null;
    let error: AxiosError | null = null;
    try {
      httpResponse = await axios.request({
        timeout,
        url,
        method,
        data: body,
        headers: {
          'Content-Type': 'application/json',
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
