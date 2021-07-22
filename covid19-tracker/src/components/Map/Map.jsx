import React from 'react';
import './map.scss';
import {Map as LeafletMap, TileLayer} from 'react-leaflet';
import { showDataMap } from "../Utils/util";

export default function Map({ countries, casesType, center, zoom }) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataMap(countries, casesType)}
            </LeafletMap>
        </div>
    )
}
