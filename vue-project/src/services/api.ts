/* eslint-disable camelcase */
import {
  NotFoundById,
  Resources,
  SwapApiData,
  SwapApiResponce,
} from "@/models/SwapApi/resources";
import { AxiosError } from "axios";
import { apiSwapiInstance } from "./axios_service";
export class SwapiApi {
  static async getPeoples(group: Resources, page: number) {
    const responce = await apiSwapiInstance.get<SwapApiResponce>(
      `/${group}?page=${page}`
    );
    return {
      status: responce.status,
      data: responce.data,
      responce,
    };
  }
  static async getItemById(group: Resources, id: number | string) {
    const responce = await apiSwapiInstance.get<SwapApiData | NotFoundById>(
      `/${group}/${id}`
    );
    return {
      status: responce.status,
      data: responce.data,
      responce,
    };
  }
  static async search(group: Resources, query: string, page: number) {
    const responce = await apiSwapiInstance.get<SwapApiResponce>(
      `${group}/?search=${query}&page=${page}`
    );
    return {
      status: responce.status,
      data: responce.data,
      responce,
    };
  }
}
