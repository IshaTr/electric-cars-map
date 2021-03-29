const fetchCarData = async () => {

  const carData = await fetch('https://api.openchargemap.io/v3/poi/?output=json&countrycode=DE&maxresults=10&compact=true&verbose=false&latitude=52.520008&longitude=13.404954&distance=10&distanceunit=KM', {
    method: 'get',
    headers: new Headers({
      'X-API-Key': 'e8570975-f1a9-45b8-83c2-cf93e4631356',
      'Content-Type': 'application/json'
    })
  }).then((response) => response.json())
  .then((data) => {
    return data
  })

// to convert the data format to geoJson format
  const newFeaturesList = carData.map(car => {
    const lat = car.AddressInfo.Latitude
    const lng = car.AddressInfo.Longitude
    const locationName = `${car.AddressInfo.AddressLine1 || ''}, ${car.AddressInfo.AddressLine2 || '' }`
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      },
      properties: {
        id: car.ID,
        name: `${locationName}`,
        description: `${car.AddressInfo.AccessComments || ''}`
      }
    }
  })

  return Promise.resolve({
    type: 'FeatureCollection',
    features: newFeaturesList
  })
}

export default fetchCarData
