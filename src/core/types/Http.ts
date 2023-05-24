export type HttpMethod = 'post' | 'get' | 'put' | 'delete' | 'patch';

export type HttpHeaders = {
  [key: string]: string;
};

export type HttpRequest = {
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: HttpHeaders;
  timeout?: number;
};

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export type HttpReponse<T> = {
  statusCode: HttpStatusCode | string;
  body?: T;
};

export interface HttpClient<T = any> {
  request: (params: HttpRequest) => Promise<HttpReponse<T>>;
}
