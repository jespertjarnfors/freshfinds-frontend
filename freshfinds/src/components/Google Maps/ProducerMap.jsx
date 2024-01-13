import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useState, useCallback } from "react";
import { useUser } from "../../hooks/useUser"; // Import useUser hook

const containerStyle = {
  width: '1000px',
  height: '600px'
};

const ProducerMap = () => {
    const { user } = useUser(); // Access user data from UserContext
    const [map, setMap] = useState(null);
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

    // Default center
    const defaultCenter = {
        lat: -10.805109387808187,
        lng: 92.75040048152385
      };

    // User's center (if available)
    const userCenter = user && user.latitude && user.longitude ? {
      lat: parseFloat(user.longitude),
      lng: parseFloat(user.latitude)
    } : defaultCenter;

    // Log the userCenter coordinates
    console.log("User Center:", userCenter);

    const onLoad = useCallback(function callback(map) {
        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={userCenter}
            zoom={12}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {/* Add markers or other components here */}
        </GoogleMap>
    ) : <></>;
}

export default ProducerMap;
