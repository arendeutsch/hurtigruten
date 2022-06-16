import React, { useState, useEffect, useCallback } from 'react';
import BikeMap from './components/BikeMap/BikeMap';

import { Availability, Station, StationData } from './models';
import './App.css';


function App() {
  const [data, setData] = useState<StationData[]>([]);
  const [offline, setOffline] = useState(!navigator.onLine);

  window.addEventListener('offline', () => {
    setOffline(true);
  });

  window.addEventListener('online', () => {
    setOffline(false);
  });

  const fetchData = useCallback(async () => {
    const stationData: StationData[] = [];
    const fetchStations = fetch('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json').then(res => res.json());
    const fetchAvailability = fetch('https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json').then(res => res.json());

    const apiData = Promise.all([fetchStations, fetchAvailability]);
    await apiData.then(response => {
        const stations: Station[] = response[0].data.stations;
        const availability: Availability[] = response[1].data.stations;

        stations.forEach((station: Station, index: number) => {
            stationData.push({
                address: station.address,
                capacity: station.capacity,
                lat: station.lat,
                lon: station.lon,
                name: station.name,
                num_bikes_available: availability[index].num_bikes_available,
                num_docks_available: availability[index].num_docks_available,
            });
        });
    });
    setData(stationData);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='App'>
      <header className='App-header'>
        <span className='title'>
          Oslo Bikes
        </span>
        {offline ? <i className='material-icons offline-icon'>signal_wifi_off</i> : null}
      </header>
      <BikeMap
        center={[59.9139, 10.7522]}
        stations={data}
      />
    </div>
  );
}

export default App;
