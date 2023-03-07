import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

export default class ArtemisDataSource {
  baseURL: string;
  apiKey: string;

  constructor() {
    this.baseURL = process.env.REACT_APP_API_GATEWAY_BASE_URL || "";
    this.apiKey = process.env.REACT_APP_API_GATEWAY_KEY || "";
    if (!this.baseURL || !this.apiKey)
      throw new Error("Missing API Gateway configuration");
  }

  async _call(
    method: Method = "GET",
    url: string = "",
    headers: object = {},
    data: object | null = null
  ): Promise<any> {
    Object.assign(headers, { "x-api-key": this.apiKey });
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
    console.log("getP3Players");
    return this._call("GET", "/api/p3/players/0xde2").then(
      (response: AxiosResponse) => {
        console.log(response.data);
        return response.data;
      }
    );
  }
}
