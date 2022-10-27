import { resources } from "@/models/SwapApi/resources";

export function defineGroup(url: string | undefined) {
  if (!url) return "";
  return url?.split("/").filter((i) => resources.includes(i))[0];
}
export function isValidUrl(string: string) {
  try {
    const temp = new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export function defineId(url: string | undefined) {
  if (!url) return "";
  if (url.slice(-1) === "/") url = url.slice(0, -1);
  return url.split("/").slice(-1)[0];
}

export function getValidPath(url: string) {
  return url.split("https://swapi.dev/api/")[1];
}
