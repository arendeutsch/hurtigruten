import React from 'react';
import { LayersControl, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MarkerClusterGroup from 'react-leaflet-cluster';

import './BikeMap.css';

import { StationData } from '../../models';

interface Props {
    center: L.LatLngExpression,
    stations: StationData[]
}

export default function BikeMap({ center, stations }: Props) {
    const { BaseLayer } = LayersControl;

    const DefaultIcon: L.Icon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    function renderPopUp(name: string, address: string, capacity: number, bikes_available: number, docks_available: number) {
        return (
            <div className='popup-container'>
                <>
                    <span className='popup-name'>{name}</span>
                    <span className='popup-address'>{address}</span>
                </>
                <br />
                <>
                    <span>Capacity: {capacity}</span>
                    <div>
                        Available bikes:
                        <span
                            style={{
                                marginLeft: 5,
                                color: bikes_available === 0 ? '#cc0000' : '#007e33',
                                fontWeight: 600,
                                fontSize: '1.2em',
                            }}
                        >
                            {bikes_available}
                        </span>
                    </div>
                    <span>Docks: {docks_available}</span>
                </>
            </div>
        );
    }

    function renderMarkers() {
        return stations?.map((station: StationData) => {
            return (
                <Marker key={station.name} position={[station.lat, station.lon]}>
                    <Popup>
                        {renderPopUp(station.name, station.address, station.capacity, station.num_bikes_available, station.num_docks_available)}
                    </Popup>
                </Marker>
            );
        })
    }

    return (
        <MapContainer center={center} zoom={12} scrollWheelZoom={true}>
            <LayersControl>
                <BaseLayer checked={true} name={'Open street map'}>
                    <TileLayer
                        url={'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
                        attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
                    />
                </BaseLayer>
                <BaseLayer name={'Dark mode'}>
                    <TileLayer
                        url={'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'}
                        attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
                    />
                </BaseLayer>
                <BaseLayer name={'Google earth'}>
                    <TileLayer
                        url={'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'}
                        maxZoom={20}
                        subdomains={['mt1', 'mt2', 'mt3']}
                    />
                </BaseLayer>
            </LayersControl>
            <MarkerClusterGroup>
                {renderMarkers()}
            </MarkerClusterGroup>
        </MapContainer>
    );
}