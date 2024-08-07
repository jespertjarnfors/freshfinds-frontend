/* eslint-disable no-unused-vars */

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, useCallback, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import "./Mapstyles.css";

const containerStyle = {
  width: 'max',
  height: 'max'
};

const ProducerMap = () => {
    const { user } = useUser();
    const [ map, setMap] = useState(null);
    const [producers, setProducers] = useState([]);
    const [selectedProducer, setSelectedProducer] = useState(null);

      // Fetch producers data for display on the map
    useEffect(() => {
        const fetchProducers = async () => {
            try {
                const response = await fetch("https://freshfinds-backend.vercel.app/api/users/producers");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setProducers(data.data);
            } catch (error) {
                console.error("Failed to fetch producers:", error);
            }
        };
    
        fetchProducers();
    }, []);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    });

     // Default center coordinates for the map
    const defaultCenter = {
        lat: -10.805109387808187,
        lng: 92.75040048152385
    };

    // Determine the center of the map based on user's location or default center
    const userCenter = user && user.latitude && user.longitude ? {
      lat: parseFloat(user.latitude),
      lng: parseFloat(user.longitude)
    } : defaultCenter;

    // Callback to handle the map load event
    const onLoad = useCallback((map) => {
        setMap(map);
    }, []);

    // Callback to handle the map unmount event
    const onUnmount = useCallback((map) => {
        setMap(null);
    }, []);

    return isLoaded ? (
        <div className="map-container justify-center">
        <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={userCenter}
            zoom={11}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {producers && Array.isArray(producers) && producers.map(producer => {
                
                return (
                    <Marker 
                        key={producer._id}
                        position={{ lat: parseFloat(producer.latitude), lng: parseFloat(producer.longitude) }}
                        onClick={() => setSelectedProducer(producer)}
                        title={producer.username}
                    />
                );
            })}

            {selectedProducer && (
                <InfoWindow
                    position={{ lat: parseFloat(selectedProducer.latitude), lng: parseFloat(selectedProducer.longitude) }}
                    onCloseClick={() => setSelectedProducer(null)}
                >
                    <div>
                        <h3>{selectedProducer.username}</h3>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
        </div>
    ) : <></>;
}

export default ProducerMap;
