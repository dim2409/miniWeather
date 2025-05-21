import { City } from '../models/city.model';

/**
 * hardcoded list of 10 US cities with their coordinates to initialize the app. 
 * Temperature and forecast will be filled from the API in runtime if they are availabe for their respective coordinates.
 */

export const INITIAL_CITIES: City[] = [
    { id: '1', name: 'New York', lat: 40.7128, lon: -74.0060, temperature: undefined, forecast: undefined },
    { id: '2', name: 'Los Angeles', lat: 34.0522, lon: -118.2437, temperature: undefined, forecast: undefined },
    { id: '3', name: 'Chicago', lat: 41.8781, lon: -87.6298, temperature: undefined, forecast: undefined },
    { id: '4', name: 'Houston', lat: 29.7604, lon: -95.3698, temperature: undefined, forecast: undefined },
    { id: '5', name: 'Phoenix', lat: 33.4484, lon: -112.0740, temperature: undefined, forecast: undefined },
    { id: '6', name: 'Philadelphia', lat: 39.9526, lon: -75.1652, temperature: undefined, forecast: undefined },
    { id: '7', name: 'San Antonio', lat: 29.4241, lon: -98.4936, temperature: undefined, forecast: undefined },
    { id: '8', name: 'San Diego', lat: 32.7157, lon: -117.1611, temperature: undefined, forecast: undefined },
    { id: '9', name: 'Dallas', lat: 32.7767, lon: -96.7970, temperature: undefined, forecast: undefined },
    { id: '10', name: 'San Jose', lat: 37.3382, lon: -121.8863, temperature: undefined, forecast: undefined },
];
