import { resources } from "@/models/SwapApi/resources";

export function defineGroup(url: string) {
  return url?.split("/").filter((i) => resources.includes(i))[0];
}
export function isValidUrl(string: string) {
  try {
    const a = new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

export function defineId(url: string) {
  if (url.slice(-1) === "/") url = url.slice(0, -1);
  if (!url) throw new Error("defineId: 'URL' is undef");
  const id = url.split("/").slice(-1)[0];
  if (typeof +id !== "number") throw new Error("defineId: ID is not correct");
  return url.split("/").slice(-1)[0];
}

export function getValidPath(url: string) {
  if (!url) throw new Error("no 'URL' in getValidPAth");
  return url.split("https://swapi.dev/api/")[1];
}
