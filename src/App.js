import React, { useState, useEffect } from 'react';
import MapContainer from './components/MapContainer';
import SideBar from './components/SideBar';

export function App() {
  const maximumMemoizationPlaces = 100;
  const locationFetchInterval = 10000;

  let [latitude, setLatitude] = useState(39.397);
  let [longitude, setLongitude] = useState(-119.644);
  let [locationTimeStamp, setLocationTimeStamp] = useState(null);
  let [previousPlaces, setPreviousPlaces] = useState([]);
  let [previousID, setPreviousID] = useState(0);

  function getISSLocation() {
    fetch('http://api.open-notify.org/iss-now.json')
      .then(response => response.json())
      .then(ISSInformation => {
        if (ISSInformation.message === 'success') {

          setLatitude(ISSInformation.iss_position.latitude);
          setLongitude(ISSInformation.iss_position.longitude);
          setLocationTimeStamp(ISSInformation.timestamp);

        }
      }).catch((e) => console.log('Something went wrong getting the position: ', e));
  }

  // Adds a prevous place to the map and push to the array.
  function addPreviousPlace(latitude, longitude) {
    if (previousPlaces.length > 0 && (
      latitude === previousPlaces[previousPlaces.length - 1].lat ||
      longitude === previousPlaces[previousPlaces.length - 1].lng)
    ) {
      return;
    }

    previousPlaces.push({ id: previousID, name: 'ISSwasAboveHere', lat: latitude, lng: longitude })
    setPreviousPlaces(previousPlaces);
    setPreviousID(++previousID);

    if (previousPlaces.length > maximumMemoizationPlaces) {
      previousPlaces.shift();
      setPreviousPlaces(previousPlaces);
    }
  };

  useEffect(() => {
    setInterval(getISSLocation, locationFetchInterval);
  }, []);

  useEffect(() => {
    addPreviousPlace(latitude, longitude);
  }, [latitude, longitude, locationTimeStamp]);

  return (
    <React.StrictMode>
      <div className='tc'>
        <h2 className='shadow-2 white-70'>{'Greetings! This site tracks the last known location that the International Space Station was above.'}</h2>
      </div>
      <div className='fl w-10'>
        <SideBar
          locationTimeStamp={locationTimeStamp}
          maximumPreviousPlaces={maximumMemoizationPlaces}
          locationUpdateInterval={locationFetchInterval / 1000}
        />
      </div>
      <div className='fl'>
        <MapContainer
          currentPosition={{ latitude: latitude, longitude: longitude }}
          previousPlaces={previousPlaces}
        />
      </div>
    </React.StrictMode>
  );
}


export default App;