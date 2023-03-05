import axios, {
  Method,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios';
import {API_GATEWAY_BASE_URL, API_GATEWAY_KEY} from '@env';

export default class ArtemisDataSource {
  baseURL: string;
  apiKey: string;

  constructor() {
    this.baseURL = `${API_GATEWAY_BASE_URL}`;
    this.apiKey = `${API_GATEWAY_KEY}`;
  }

  async _call(
    method: Method = 'GET',
    url: string = '',
    headers: AxiosRequestHeaders = {},
    data: object | null = null,
  ): Promise<any> {
    Object.assign(headers, {'x-api-key': this.apiKey});
    const config: AxiosRequestConfig = {
      method: method,
      baseURL: this.baseURL,
      url: url,
      headers: headers,
      data: data,
    };
    console.log(config);
    return axios(config);
  }

  async getP3Players(): Promise<object> {
    return this._call('GET', '/api/p3/players/0xde0').then(
      (response: AxiosResponse) => {
        console.log(response.data);
        return response.data;
      },
    );
  }
}
