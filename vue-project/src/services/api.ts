/* eslint-disable camelcase */
import { NotFoundById, Resources, SwapApiData, SwapApiResponce } from '@/models/SwapApi/resources'
import { apiSwapiInstance } from './axios_service'
export class SwapiApi {
  static async getPeoples (group: Resources, page: number) {
    const res = await apiSwapiInstance.get<SwapApiResponce>(
      `/${group}?page=${page}`
    )
    return {
      status: res.status,
      data: res.data
    }
  }
  static async getItemById (group: Resources, id: number | string) {
    const res = await apiSwapiInstance.get<SwapApiData | NotFoundById>(
      `/${group}/${id}`
    )
    return {
      status: res.status,
      data: res.data
    }
  }
  static async search (group: Resources, item: string) {
    const res = await apiSwapiInstance.get<SwapApiResponce>(
      `${group}/?search=${item}`
    )
    return {
      status: res.status,
      data: res.data
    }
  }
}
