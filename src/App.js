import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'

import * as tt from '@tomtom-international/web-sdk-maps'
import * as ttapi from '@tomtom-international/web-sdk-services'

const App = () => {
  const mapElement = useRef()
  const [map, setMap] = useState({})
  const [longitude, setLongitude] = useState(-97.5164)
  const [latitude, setLatitude] = useState(35.4676)

  const convertToPoints = (lngLat) => {
    return {
      point: {
        latitude: lngLat.lat,
        longitude: lngLat.lng
      }
    }
  }

  const addDeliveryMarker = (lngLat, map) => {
    const element = document.createElement('div')
    element.className = 'marker-delivery'
    new tt.Marker({
      element: element
    })
    .setLngLat(lngLat)
    .addTo(map)
  }

  useEffect(() => {
    const origin = {
      lng: longitude,
      lat: latitude
    }
    const destinations = []
    
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
      const popupOffset = {
        bottom: [0, -25]
      }
      const popup = new tt.Popup({offset: popupOffset}).setHTML('This is you!')
      const element = document.createElement('div')
      element.className = 'marker'
      const marker = new tt.Marker({
        draggable: true,
        element: element,
      })
      .setLngLat([longitude, latitude])
      .addTo(map)

      marker.on('dragend', () => {
        const lngLat = marker.getLngLat()
        setLongitude(lngLat.lng)
        setLatitude(lngLat.lat)
      })
      marker.setPopup(popup).togglePopup()
    }
    addMarker()

    // pointsForDestinations = locations.map

    // const callParameters = {
    //   key: process.env.REACT_APP_TOM_TOM_API_KEY,
    //   destinations: pointsForDestinations,
    //   origins: [convertToPoints(origin)]
    // }

    // return new Promise((resolve, reject) => {
    //   ttapi.services
    //   .matrixRouting(callParameters)
    // })

    
    map.on('click', (e) => {
      destinations.push(e.lngLat)
      addDeliveryMarker(e.lngLat, map)
    })

    return () => map.remove()
  }, [longitude, latitude])

  return (
    <>
    {map && <div className='app'>
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
    </div>}
    </>
  )
}

export default App;
