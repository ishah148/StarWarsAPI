import { resources } from '@/models/SwapApi/resources'

export function defineGroup (url: string) {
  return url?.split('/').filter((i) => resources.includes(i))[0]
}
export function isValidUrl (string: string) {
  try {
    const a = new URL(string)
    return true
  } catch (err) {
    return false
  }
}
