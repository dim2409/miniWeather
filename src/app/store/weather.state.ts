import { City } from '../models/city.model';
import { INITIAL_CITIES } from '../data/initial-cities';

export interface WeatherState {
    cities: City[];
    selectedCityId: string | null; // selected city for suggestions
    currentPage: number; // pagination 1-indexed
    loadingCityIds: string[]; // current batch of 5 city ids 
    pageSize: number;
}

// initial state of weather. Page 1, no city selected, no weather API calls initialized

export const initialWeatherState: WeatherState = {
    cities: INITIAL_CITIES,
    currentPage: 1,
    selectedCityId: null,
    loadingCityIds: [],
    pageSize: 5
};
