/* eslint-disable camelcase */
import { NotFoundById, Resources, SwapApiData, SwapApiResponce } from '@/models/SwapApi/resources'
import { AxiosError } from 'axios'
import { apiSwapiInstance } from './axios_service'
export class SwapiApi {
  static async getPeoples (group: Resources, page: number) {
    const res = await apiSwapiInstance.get<SwapApiResponce>(
      `/${group}?page=${page}`
    )
    return {
      status: res.status,
      data: res.data,
      res,
    }
  }
  static async getItemById (group: Resources, id: number | string) {
    const res = await apiSwapiInstance.get<SwapApiData | NotFoundById>(
      `/${group}/${id}`
    )
    return {
      status: res.status,
      data: res.data,
      res
    }
  }
  static async search (group: Resources, item: string ,page: number) {
    const res = await apiSwapiInstance.get<SwapApiResponce >(
      `${group}/?search=${item}&page=${page}`
    )
    return {
      status: res.status,
      data: res.data,
      res
    }
  }
}
