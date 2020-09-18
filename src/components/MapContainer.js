import React, { useState } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, } from 'google-maps-react';

//note: code formatted for ES6 here
export function MapContainer(props) {
    let latitude = props.currentPosition.latitude;
    let longitude = props.currentPosition.longitude;
    let previousPlaces = props.previousPlaces;
    let [showingInfoWindow, setShowingInfoWindow] = useState(false);//Hides or the shows the infoWindow
    let [activeMarker, setActiveMarker] = useState({}); //Shows the active marker upon click

    const onMarkerClick = (props, marker, e) => {
        setActiveMarker(marker);
    }

    const onClose = props => {
        if (showingInfoWindow) {
            setShowingInfoWindow(false);
            setActiveMarker(null);
        }
    }

    return (
        <React.StrictMode>
            <Map
                google={props.google}
                zoom={4}
                center={
                    {
                        lat: latitude,
                        lng: longitude
                    }
                }
                style={{ width: '90%', height: '92%' }}
                disableDefaultUI={true}
                fullscreenControl={true}
                mapTypeControl={true}
            >
                {previousPlaces.map((previousPlace) =>
                    <Marker
                        onClick={null}
                        key={previousPlace.id}
                        text={previousPlace.name}
                        lat={previousPlace.lat}
                        lng={previousPlace.lng}
                        title={'Last known area the ISS was above'}
                    />
                )}

                <InfoWindow
                    onClose={onClose}
                    marker={activeMarker}
                    visible={true}>
                    <div>
                        <h3 className=''>Last known area the ISS was above</h3>
                    </div>
                </InfoWindow>
            </Map>
        </React.StrictMode >
    )
}

export default GoogleApiWrapper({
    apiKey: 'HeyaHowsYOUDoin-?'
})(MapContainer);
