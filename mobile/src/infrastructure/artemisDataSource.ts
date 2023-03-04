import axios, {
  Method,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios';
import {ARTEMIS_BASE_URL} from '@env';

export default class ArtemisDataSource {
  baseURL: string;

  constructor() {
    this.baseURL = `${ARTEMIS_BASE_URL}`;
  }

  async _call(
    method: Method = 'GET',
    url: string = '',
    headers: AxiosRequestHeaders = {},
    data: object | null = null,
  ): Promise<any> {
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
    return this._call('GET', '/api/p3/players/test_from_mobile6').then(
      (response: AxiosResponse) => {
        console.log(response.data);
        return response.data;
      },
    );
  }
}
