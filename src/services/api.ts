/* eslint-disable camelcase */
import { PeopleResponse } from '@/models/SwapApi/people'
import { Resources } from '@/models/SwapApi/resources'
import { apiSwapiInstance } from './axios_service'
export class SwapiApi {
  static async getPeoples (page: number) {
    const res = await apiSwapiInstance.get<PeopleResponse>(
      `/people?page=${page}`
    )
    return {
      status: res.status,
      data: res.data
    }
  }

  static async search (group: Resources, item: string) {
    const res = await apiSwapiInstance.get<PeopleResponse>(
      `${group}/?search=${item}`
    )
    return {
      status: res.status,
      data: res.data
    }
  }
}
