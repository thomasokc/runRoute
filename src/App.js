import './App.css';
import React from 'react';

// Leaflet Imports
import {
  MapContainer,
  TileLayer,
  useMap,
} from 'react-leaflet'

function App() {
  return (
    <MapContainer center={[35.467560,-97.516426]} zoom={12}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default App;
