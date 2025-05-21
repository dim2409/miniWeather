import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from './weather.state';

// entire state of the weather
export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

// select all cities array
export const selectAllCities = createSelector(selectWeatherState, (state) => state.cities);

// select pageSize
export const selectPageSize = createSelector(  selectWeatherState,  state => state.pageSize);

// select the current page number
export const selectCurrentPage = createSelector(selectWeatherState, (state) => state.currentPage);

//caclulate total pages 
// page size = 5. refactor to retrieve it from the state 
export const selectTotalPages = createSelector(selectAllCities, selectPageSize, (cities, pageSize) => Math.ceil(cities.length / pageSize));

// select the cities for the current page
export const selectPageCities = createSelector(
    selectAllCities,
    selectCurrentPage,
    selectPageSize,
    (cities, page, pageSize) => {
        const start = (page - 1) * pageSize;
        return cities.slice(start, start + pageSize);
    }
);

// select ids of the cities currently loading
export const selectLoadingCityIds = createSelector(
    selectWeatherState,
    (state) => state.loadingCityIds
);

// 7) Select the array of “loading” flags for the page cities
export const selectPageLoadingFlags = createSelector(
    selectPageCities,
    selectLoadingCityIds,
    (pageCities, loadingIds) =>
        pageCities.map((c) => loadingIds.includes(c.id))
);

// 8) Select the ID of the selected city (for the form)
export const selectSelectedCityId = createSelector(
    selectWeatherState,
    (state) => state.selectedCityId
);

// 9) Select the full City object for the selected ID
export const selectSelectedCity = createSelector(
    selectAllCities,
    selectSelectedCityId,
    (cities, selectedId) =>
        cities.find((c) => c.id === selectedId) || null
);
