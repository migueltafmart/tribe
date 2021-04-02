import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.scss";
import { STORE } from "../../Redux/store";
import { setLocation } from "../../Redux/actions";
import "./Marker/Marker.scss";

const Map = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  useEffect(() => {
    navigator.geolocation.watchPosition(({ coords }) => {
      STORE.dispatch(setLocation([coords.longitude, coords.latitude]));
      const map = new mapboxgl.Map({
        container: "map",
        center: STORE.getState().user.location,
        zoom: 16,
      });
      const Marker = document.createElement("div");
      Marker.classList.add("Marker");
      new mapboxgl.Marker(Marker)
        .setLngLat(STORE.getState().user.location)
        .addTo(map);
    });

    // eslint-disable-next-line
  }, []);
  window.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  return <div id="map"></div>;
};

export default Map;
