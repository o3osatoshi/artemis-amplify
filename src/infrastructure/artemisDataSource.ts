import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

export default class ArtemisDataSource {
  private readonly env: string;
  private readonly baseURL: string;
  private readonly apiKey: string;

  constructor() {
    this.env = process.env.REACT_APP_ENV || "";
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
    if (this.env === "local") {
      const xApigatewayHeader = encodeURIComponent(JSON.stringify(data));
      console.log(xApigatewayHeader);
      Object.assign(headers, {
        "x-apigateway-event": xApigatewayHeader,
        "x-apigateway-context": xApigatewayHeader,
      });
    }
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
    return this._call("GET", "/api/p3/players/0xde3").then(
      (response: AxiosResponse) => {
        console.log(response.data);
        return response.data;
      }
    );
  }
}
