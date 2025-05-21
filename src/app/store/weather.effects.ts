import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { of, from } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import {
  loadWeatherPage,
  loadWeatherSuccess,
  loadWeatherFailure
} from './weather.actions';
import { selectWeatherState } from './weather.selectors';
import { WeatherState } from './weather.state';



@Injectable()
export class WeatherEffects {
    constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<WeatherState>
  ) {}

    loadWeatherPage$ = createEffect(() =>
        this.actions$.pipe(ofType(loadWeatherPage), // wait for the reducer to update loadingCityIds
            withLatestFrom(this.store.pipe(select(selectWeatherState))),
            mergeMap(([{ page }, state]) => {
                const citiesToLoad = state.cities
                    .filter(c => state.loadingCityIds.includes(c.id));

                // call the API for each city
                return from(citiesToLoad).pipe(
                    mergeMap(city =>
                        this.fetchForecast(city.lat, city.lon).pipe(
                            map(({ temperature, forecast }) =>
                                loadWeatherSuccess({
                                    cityId: city.id,
                                    temperature,
                                    forecast,
                                })
                            ), catchError(error => of(loadWeatherFailure({ cityId: city.id, error })))
                        )
                    )
                );
            })
        )
    );

    private fetchForecast(lat: number, lon: number) {
        // get the  endpoint to discover the grid forecast URL
        return this.http
            .get<{ properties: { forecast: string } }>(
                `https://api.weather.gov/points/${lat},${lon}`
            )
            .pipe(
                mergeMap((pt: any) =>
                    //  returned forecast URL
                    this.http.get<{ properties: { periods: any[] } }>(
                        pt.properties.forecast
                    )
                ),
                map((forecastRes: any) => {
                    const period = forecastRes.properties.periods[0];
                    return {
                        temperature: period.temperature,
                        forecast: period.shortForecast,
                    };
                })
            );
    }
}
