import axios, { AxiosError } from 'axios'
export const API_URL = 'https://swapi.dev/api/'

export const apiSwapiInstance = axios.create({
  // withCredentials: true,
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})
apiSwapiInstance.interceptors.response.use(
  (config) => {
    return config
  },
  async (error: AxiosError) => {
    return error.response
  }
)
