export interface City {
    id: string; // unique id
    name: string; // editable name label 
    lat: number; // latitude coordinate
    lon: number; // longitude coordinate
    temperature?: number; // filled from the API if available
    forecast?: string; // filled from the API if available
}
