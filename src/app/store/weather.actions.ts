import { createAction, props } from '@ngrx/store';
import { City } from '../models/city.model';


// load cities for the current page.
export const loadWeatherPage = createAction(
  '[Weather] load cities for the current page',
  props<{ page: number }>()
);

// api returned data successfully
export const loadWeatherSuccess = createAction(
  '[Weather] api call returned data successfully',
  props<{
    cityId: string;
    temperature: number;
    forecast: string;
  }>()
);

// api returned data unsuccessfully. also return error
export const loadWeatherFailure = createAction(
  '[Weather] api call returned data unsuccessfully',
  props<{ cityId: string; error: any }>()
);

// pagination to prev/next page. payload the target page number
export const setPage = createAction(
  '[Weather] set page',
  props<{ page: number }>()
);


// select a city for the suggestion form. payload the id
export const selectCity = createAction(
  '[Weather] select city',
  props<{ cityId: string }>()
);

// edit city name. payload the city id and new name
export const editCityName = createAction(
  '[Weather] edit city name',
  props<{ cityId: string; newName: string }>()
);

// add custom city. payload the new city object
export const addCity = createAction(
  '[Weather] add city',
  props<{ city: City }>()
);
