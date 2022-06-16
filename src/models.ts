export type Station = {
    address: string;
    capacity: number;
    lat: number;
    lon: number;
    name: string;
}

export type Availability = {
    num_bikes_available: number;
    num_docks_available: number;
}

export type StationData = Station & Availability;
