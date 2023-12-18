import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState, useCallback } from "react";

const containerStyle = {
  width: '600px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        setMap(map)
    }, [])
    
    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])
    
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
        </GoogleMap>
    ) : <></>
}

export default Map;