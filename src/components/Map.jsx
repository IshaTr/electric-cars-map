import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import Flex from './common/Flex'
import Popup from './common/Popup'
import fetchCarData from './helper'

const MapContainer = styled.div`
  position: relative;
  right: 0;
  width: 700px;
  height: 500px;
`

const Wrapper = styled(Flex)`
  width: 100%;
  height: 800px;
`

const Header = styled.h1`
  color: #333;
  font-size: 56px;
  font-weight: 900;
`

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const Map = () => {
  const mapContainerRef = useRef(null)
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }))
  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [13.405, 52.52],
      zoom: 12.5
    })

    // navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

    map.on('load', async () => {
      const results = await fetchCarData()
      // data source for new a feature collection with no features
      map.addSource('car-points-data', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      })
      // layer and reference the data source above by name
      map.addLayer({
        id: 'car-points-layer',
        source: 'car-points-data',
        type: 'symbol',
        layout: {
          // referred from documentation: https://labs.mapbox.com/maki-icons
          'icon-image': 'car-15',
          'icon-padding': 0,
          'icon-size': 2,
          'icon-allow-overlap': true
        }
      })

      map.getSource('car-points-data').setData(results)
    })

    map.on('click', 'car-points-layer', (e) => {
      if (e.features.length) {
        const feature = e.features[0]
        // create popup node
        const popupNode = document.createElement('div')
        ReactDOM.render(<Popup feature={feature} />, popupNode)
        // set popup on map
        popUpRef.current
          .setLngLat(feature.geometry.coordinates)
          .setDOMContent(popupNode)
          .addTo(map)
      }
    })

    return () => map.remove()
  }, [])

  return (
    <Wrapper direction="column" justify="center" alignItems="center">
      <Header>Electric Cars in Berlin</Header>
      <MapContainer className="map-container" ref={mapContainerRef} />
    </Wrapper>
  )
}

export default Map
