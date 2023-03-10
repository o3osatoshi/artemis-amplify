import React, { useEffect } from "react";
import { useGeolocated } from "react-geolocated";

export default function GetCoordinates(props: IProps) {
  const [coordinates, setCoordinates] =
    React.useState<GeolocationCoordinates>();

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (isGeolocationAvailable && isGeolocationEnabled) {
      if (coords !== undefined) {
        if (coordinates === coords) return;
        setCoordinates(coords);
        props.setCoordinates(coords);
      }
    }
  }, [
    isGeolocationAvailable,
    isGeolocationEnabled,
    coords,
    coordinates,
    props,
  ]);

  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords ? (
    <table>
      <tbody>
        <tr>
          <td>latitude</td>
          <td>{coords.latitude}</td>
        </tr>
        <tr>
          <td>longitude</td>
          <td>{coords.longitude}</td>
        </tr>
        <tr>
          <td>altitude</td>
          <td>{coords.altitude}</td>
        </tr>
        <tr>
          <td>heading</td>
          <td>{coords.heading}</td>
        </tr>
        <tr>
          <td>speed</td>
          <td>{coords.speed}</td>
        </tr>
      </tbody>
    </table>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
}

interface IProps {
  setCoordinates: (coordinates: GeolocationCoordinates) => void;
}
