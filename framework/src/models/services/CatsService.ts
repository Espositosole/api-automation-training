import { ServiceBase } from "../../base/ServiceBase.js";
import { ALLOWED_TEMPERAMENTS } from "../../utils/constants/temperaments.js";
import { CatsModel } from "../request/CatsModel";
import { UpdateCatsModel } from "../request/UpdateCatsModel.js";
import { type Response } from "../responses/Response.js";

export class CatsService extends ServiceBase {
  constructor() {
    super(`/cats`);
  }

  async addCats<T>(addCats: CatsModel): Promise<Response<T>> {
    return await this.post(this.url, addCats);
  }

  async getCats<T>(options?: {
    params?: URLSearchParams;
    isAdopted?: boolean;
    temperaments?: string | string[];
  }): Promise<Response<T>> {
    const params = options?.params ?? new URLSearchParams();

    if (options?.isAdopted !== undefined) {
      params.set("isAdopted", String(options.isAdopted));
    }

    if (options?.temperaments !== undefined) {
      const input = Array.isArray(options.temperaments)
        ? options.temperaments
        : [options.temperaments];

      const validTemperaments = input.filter((t) => ALLOWED_TEMPERAMENTS.includes(t));

      if (validTemperaments.length > 0) {
        params.set("temperaments", validTemperaments.join("|"));
      }
    }

    const queryString = params.toString() ? `?${params.toString()}` : "";
    return await this.get(`${this.url}/${queryString}`);
  }

  async getCatById<T>(id: number): Promise<Response<T>> {
    return await this.get(`${this.url}/${id}`);
  }

  async updateCatById<T>(id: number, addCats: CatsModel): Promise<Response<T>> {
    const url = `${this.url}/${id}`;
    console.log("updateCatById URL:", url);
    return await this.put(url, addCats);
  }

  async deleteCatById<T>(id: number): Promise<Response<T>> {
    return await this.delete(`${this.url}/${id}`);
  }

  async updateCatsStaffOrAdopter<T>(
    id: number,
    UpdateCatsModel: UpdateCatsModel,
  ): Promise<Response<T>> {
    return await this.patch(`${this.url}/${id}`, UpdateCatsModel);
  }
}
