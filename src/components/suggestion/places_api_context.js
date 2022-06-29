import {createContext} from "react";
import {PlacesApi} from "./places_api";

export const PlacesApiContext = createContext(new PlacesApi());
