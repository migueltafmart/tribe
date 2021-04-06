import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.scss";
import { STORE } from "../../Redux/store";
import { setLocation } from "../../Redux/actions";
const Map = () => {
  const usersNearBy = STORE.getState().nearby;
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  useEffect(() => {
    navigator.geolocation.watchPosition(({ coords }) => {
      const currentLocation = {
        type: "Point",
        coordinates: [coords.longitude, coords.latitude],
      };
      STORE.dispatch(setLocation(currentLocation));
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: STORE.getState().user.location.coordinates,
        zoom: 17.5,
      });
      if (document.querySelectorAll("div.Marker")) {
        document.querySelectorAll("div.Marker").forEach((el) => el.remove());
      }
      const Marker = document.createElement("div");
      Marker.classList.add("Marker");
      new mapboxgl.Marker(Marker)
        .setLngLat(STORE.getState().user.location.coordinates)
        .addTo(map);
      if (usersNearBy.length > 0) {
        usersNearBy.forEach(({ color, location }) => {
          if (color !== "black") {
            const Marker = document.createElement("div");
            Marker.classList.add("Marker");
            Marker.style.background = color;
            new mapboxgl.Marker(Marker)
              .setLngLat(location.coordinates)
              .addTo(map);
          }
        });
      }
    });

    // eslint-disable-next-line
  }, [usersNearBy]);
  window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  return <div id="map"></div>;
};

export default Map;
