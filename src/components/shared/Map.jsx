import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export const Map = ({
  mOrigin,
  mDestination,
  driverLocation = null,
  mode = "full",
  height = "500px",
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const hasFitBounds = useRef(false);
  const currentLocationMarker = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const mapConfig = {
    full: {
      showStore: true,
      showClient: true,
      showDriver: true,
      showRouteToStore: true,
      showRouteToClient: true,
    },
    delivery: {
      showStore: true,
      showClient: true,
      showDriver: true,
      showRouteToStore: false,
      showRouteToClient: true,
    },
    toclient: {
      showStore: false,
      showClient: true,
      showDriver: true,
      showRouteToStore: false,
      showRouteToClient: true,
    },
  };

  const config = mapConfig[mode] || mapConfig.full;

  useEffect(() => {
    if (map.current) return;

    const origin = mOrigin;
    const destination = mDestination;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/standard",
      center: origin,
      zoom: 13,
    });

    map.current.on("load", () => {
      if (config.showStore) {
        const storeEl = document.createElement("div");
        storeEl.style.backgroundImage = "url(/icons/store.svg)";
        storeEl.style.width = "40px";
        storeEl.style.height = "40px";
        storeEl.style.backgroundSize = "cover";

        new mapboxgl.Marker(storeEl)
          .setLngLat(origin)
          .setPopup(new mapboxgl.Popup().setHTML("<h3>Tienda</h3>"))
          .addTo(map.current);
      }

      if (config.showClient) {
        const clientEl = document.createElement("div");
        clientEl.style.backgroundImage = "url(/icons/client.svg)";
        clientEl.style.width = "40px";
        clientEl.style.height = "40px";
        clientEl.style.backgroundSize = "cover";

        new mapboxgl.Marker(clientEl)
          .setLngLat(destination)
          .setPopup(new mapboxgl.Popup().setHTML("<h3>Cliente</h3>"))
          .addTo(map.current);
      }

      if (config.showRouteToClient) {
        getRoute(origin, destination, "route-blue", "#3b82f6");
      }

      if (config.showDriver) {
        if (driverLocation) {
          setCurrentLocation(driverLocation);

          const driverEl = document.createElement("div");
          driverEl.style.backgroundImage = "url(/icons/driver.svg)";
          driverEl.style.width = "40px";
          driverEl.style.height = "40px";
          driverEl.style.backgroundSize = "cover";

          currentLocationMarker.current = new mapboxgl.Marker(driverEl)
            .setLngLat(driverLocation)
            .setPopup(new mapboxgl.Popup().setHTML("<h3>Motorizado</h3>"))
            .addTo(map.current);

          if (config.showRouteToStore) {
            getRoute(driverLocation, origin, "route-orange", "#f97316");
          }
        } else {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const userLocation = [
                  position.coords.longitude,
                  position.coords.latitude,
                ];
                setCurrentLocation(userLocation);

                const driverEl = document.createElement("div");
                driverEl.style.backgroundImage = "url(/icons/driver.svg)";
                driverEl.style.width = "40px";
                driverEl.style.height = "40px";
                driverEl.style.backgroundSize = "cover";

                currentLocationMarker.current = new mapboxgl.Marker(driverEl)
                  .setLngLat(userLocation)
                  .setPopup(
                    new mapboxgl.Popup().setHTML("<h3>Tu ubicación</h3>")
                  )
                  .addTo(map.current);

                if (config.showRouteToStore) {
                  getRoute(userLocation, origin, "route-orange", "#f97316");
                }
              },
              (error) => {
                console.error("Error obteniendo ubicación:", error);
              }
            );
          }
        }
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current || driverLocation) return;

    const watchId = navigator.geolocation?.watchPosition(
      (position) => {
        const userLocation = [
          position.coords.longitude,
          position.coords.latitude,
        ];
        setCurrentLocation(userLocation);

        if (currentLocationMarker.current) {
          currentLocationMarker.current.setLngLat(userLocation);
        }

        if (config.showRouteToStore) {
          const origin = mOrigin;
          getRoute(userLocation, origin, "route-orange", "#f97316");
        }
      },
      (error) => {
        console.error("Error actualizando ubicación:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [config.showRouteToStore, mOrigin, driverLocation]);

  const getRoute = async (start, end, routeId, color) => {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: "GET" }
    );
    const json = await query.json();
    const data = json.routes[0];
    const route = data.geometry.coordinates;

    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };

    if (map.current.getSource(routeId)) {
      map.current.getSource(routeId).setData(geojson);
    } else {
      map.current.addLayer({
        id: routeId,
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": color,
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }

    if (!hasFitBounds.current) {
      const bounds = new mapboxgl.LngLatBounds();
      route.forEach((coord) => bounds.extend(coord));
      map.current.fitBounds(bounds, { padding: 50 });
      hasFitBounds.current = true;
    }
  };

  return <div ref={mapContainer} style={{ width: "100%", height }} />;
};
