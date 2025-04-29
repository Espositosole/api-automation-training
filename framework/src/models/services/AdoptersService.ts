import { ServiceBase } from "../../base/ServiceBase.js";
import { AdoptersModel } from "../request/AdoptersModel.js";
import { type Response } from "../responses/Response.js";

export class AdoptersService extends ServiceBase {
  constructor() {
    super(`/adopters`);
  }

  async addAdopters<T>(addAdopters: AdoptersModel): Promise<Response<T>> {
    return await this.post(this.url, addAdopters);
  }

  async getAdopterById<T>(
    id: number,
    options?: { params?: URLSearchParams; includeCat?: boolean },
  ): Promise<Response<T>> {
    const params = options?.params ?? new URLSearchParams();

    if (options?.includeCat !== undefined) {
      params.set("includeCat", String(options.includeCat));
    }

    const queryString = params.toString() ? `?${params.toString()}` : "";
    return await this.get(`${this.url}/${id}${queryString}`);
  }

  async getAdopters<T>(): Promise<Response<T>> {
    return await this.get(this.url);
  }

  async deleteAdopterById<T>(id: number): Promise<Response<T>> {
    return await this.delete(`${this.url}/${id}`);
  }
}
