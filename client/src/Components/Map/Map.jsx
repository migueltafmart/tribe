import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.scss";
import { STORE } from "../../Redux/store";
import { setLocation } from "../../Redux/actions";
const Map = () => {
  const usersNearBy = [
    [-4.016652, 40.563679],
    [-4.015932, 40.563038],
    [-4.017163, 40.563156],
  ];

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  useEffect(() => {
    navigator.geolocation.watchPosition(({ coords }) => {
      STORE.dispatch(
        setLocation({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [coords.longitude, coords.latitude],
          },
          properties: { color: STORE.getState().color },
        })
      );
      const map = new mapboxgl.Map({
        container: "map",
        /* style:'mapbox://styles/mapbox/streets-v11', */
        center: STORE.getState().user.location.geometry.coordinates,
        zoom: 17.5,
      });
      if (document.querySelectorAll("div.Marker")) {
        document.querySelectorAll("div.Marker").forEach((el) => el.remove());
      }
      usersNearBy.forEach((location) => {
        const Marker = document.createElement("div");
        Marker.classList.add("Marker");
        new mapboxgl.Marker(Marker).setLngLat(location).addTo(map);
      });
    });


    // eslint-disable-next-line
  }, []);
  window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  return <div id="map"></div>;
};

export default Map;
