import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps'

const App = () => {
  const mapElement = useRef()
  const [map, setMap] = useState({})
  const [longitude, setLongitude] = useState(-97.5164)
  const [latitude, setLatitude] = useState(35.4676)

  useEffect(() => {
    
    let map = tt.map({
      key: process.env.REACT_APP_TOM_TOM_API_KEY,
      container: mapElement.current,
      stylesVisibility: {
        trafficFlow: true,
        trafficIncidents: true
      },
      center: [longitude, latitude],
      zoom: 14
    })

    setMap(map)

    const addMarker = () => {

      const element = document.createElement('div')
      element.className = 'marker'
      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
    }

    return () => map.remove()
  }, [longitude, latitude])

  return (
    <div className='app'>
      <div ref={mapElement} className="map" />
      <div className='search=-bar'>
        <h1>Where to?</h1>
        <input
          type="text"
          id="longitude"
          className='longitude'
          placeholder='Put in Longitude'
          onChange={(e) => {setLongitude(e.target.value)}}
        />
        <input
          type="text"
          id="latitude"
          className='latitude'
          placeholder='Put in latitude'
          onChange={(e) => {setLatitude(e.target.value)}}        
        />
      </div>
    </div>
  )
}

export default App;
