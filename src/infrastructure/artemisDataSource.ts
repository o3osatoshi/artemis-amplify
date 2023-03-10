import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { P3Artifacts, P3Player } from "../domain/model/type";

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
    return axios(config);
  }

  async putP3Players(p3Player: P3Player): Promise<P3Artifacts> {
    const url = `/api/p3/players/${p3Player.walletAddress}`;
    const data = { p3Player: p3Player };
    return this._call("PUT", url, {}, data).then(
      (response: AxiosResponse<PutP3PlayersRes>) => {
        return response.data.artifacts;
      }
    );
  }
}

interface PutP3PlayersRes {
  artifacts: P3Artifacts;
}
