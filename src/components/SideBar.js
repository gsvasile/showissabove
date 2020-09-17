import React from 'react';

export default function SideBar(props) {
    const locationTimeStamp = props.locationTimeStamp;
    const maximumPreviousPlaces = props.maximumPreviousPlaces;
    const locationUpdateInterval = props.locationUpdateInterval;

    const formatTime = function (unixTimestamp) {
        const dt = new Date(unixTimestamp * 1000);
        let isAmNow = true;

        let hours = dt.getHours();
        let minutes = dt.getMinutes();
        let seconds = dt.getSeconds();

        // the above dt.get...() functions return a single digit
        // so I prepend the zero here when needed
        if (hours < 10)
            hours = '0' + hours;

        if (minutes < 10)
            minutes = '0' + minutes;

        if (seconds < 10)
            seconds = '0' + seconds;

        if (hours > 12) {
            hours -= 12;
            isAmNow = false;
        }

        return hours + ":" + minutes + ":" + seconds + (isAmNow ? ' AM' : ' PM');
    }

    const timeStamp = formatTime(locationTimeStamp);

    return (
        <React.StrictMode>
            <div className='black-100 fw7 pt2 tc'>
                <p>{'On a new load, or refresh, the map will show a default location first.'}</p>
                <p>{'It will show the last'}
                    <div className='dark-green'>{maximumPreviousPlaces}</div>
                    {' places it was above as well!'}
                </p>
                <br />
            </div>
            <div className='tc black-70 fw5 bg'>
                <p>{'The map updates with a new marker where the last known ISS location every ' +
                    locationUpdateInterval +
                    ' seconds.'}</p>
                <p>{'The map was centered where the ISS was above as of: '}</p>
                <p>{timeStamp}</p>
            </div>
        </React.StrictMode>
    );
}
