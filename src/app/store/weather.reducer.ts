import { createReducer, on } from '@ngrx/store';
import { loadWeatherPage, loadWeatherSuccess, loadWeatherFailure, setPage, selectCity, editCityName, addCity, } from './weather.actions';
import { WeatherState, initialWeatherState } from './weather.state';

// return updated city object. Only the fields in `partial` are updated. Unchanged fields are kept as is
function updateCity(
    state: WeatherState,
    cityId: string,
    partial: Partial<WeatherState['cities'][number]>,
) {
    // cycle through all cities and update onnly the altered fields of the one with the matching id 
    return state.cities.map((c) =>
        c.id === cityId ? { ...c, ...partial } : c
    );
}

// weather reducer function. takes action type and returns a new state object
export const weatherReducer = createReducer(
    initialWeatherState,
    // load weather for given page with page param
    on(loadWeatherPage, (state, { page }) => {
        // extract city ids for the current page. if page is 1 then start from  0 - 4 , if page is 2 then start from 5 - 10...etc
        const start = (page - 1) * state.pageSize;
        const pageCities = state.cities.slice(start, start + state.pageSize);

        // collect ids that need to be loaded if temp or forecast are undefined
        const idsToLoad = pageCities.filter((c) => c.temperature === undefined || c.forecast === undefined).map((c) => c.id);

        // return new state
        return {
            ...state,
            currentPage: page,
            loadingCityIds: idsToLoad,
        };
    }),

    // update the city object with the new temperature and forecast
    on(loadWeatherSuccess, (state, { cityId, temperature, forecast }) =>
        ({ ...state, cities: updateCity(state, cityId, { temperature, forecast }), loadingCityIds: state.loadingCityIds.filter((id) => id !== cityId) })
    ),

    // remove the city id from the loading list because call failed.
    on(loadWeatherFailure, (state, { cityId }) =>
        ({ ...state, loadingCityIds: state.loadingCityIds.filter((id) => id !== cityId) })
    ),

    // set page number. if page is less than 1 then set to 1, if page is greater than the max page then set to max page
    on(setPage, (state, { page }) =>
        ({ ...state, currentPage: page })
    ),

    // select a city for the suggestion form. set the selectedCityId to the id of the selected city
    on(selectCity, (state, { cityId }) =>
        ({ ...state, selectedCityId: cityId })
    ),


    // inline edit of a city name
    on(editCityName, (state, { cityId, newName }) =>
        ({ ...state, cities: updateCity(state, cityId, { name: newName }) })
    ),

    // add custom city to the list of cities
    on(addCity, (state, { city }) =>
        ({ ...state, cities: [...state.cities, city] })
    )

);
