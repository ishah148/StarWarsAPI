import { Films } from "./films";
import { People } from "./people";
import { Planet } from "./planets";
import { Species } from "./species";
import { Starships } from "./starships";
import { Vehicles } from "./vehicles";

export type SwapApiData =
  | Planet
  | Vehicles
  | Species
  | Starships
  | People
  | Films;
export type SwapApiResponce = {
  count: number;
  next: string;
  previous: string;
  results: SwapApiData[];
};

export type NotFoundById = {
  detail: "Not found";
};

export type Resources =
  | "films"
  | "people"
  | "planets"
  | "species"
  | "starships"
  | "vehicles";

export const resources = [
  "films",
  "people",
  "planets",
  "species",
  "starships",
  "vehicles",
];
export const resourcesTitles = {
  films: "title",
  people: "name",
  vehicles: "name",
  species: "name",
  planets: "name",
  starships: "name",
};
