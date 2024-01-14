/* eslint-disable no-unused-vars */

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, useCallback, useEffect } from "react";
import { useUser } from "../../hooks/useUser";

const containerStyle = {
  width: '1020px',
  height: '500px'
};

const ProducerMap = () => {
    const { user } = useUser();
    const [ map, setMap] = useState(null);
    const [producers, setProducers] = useState([]);
    const [selectedProducer, setSelectedProducer] = useState(null);

    useEffect(() => {
        const fetchProducers = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/users/producers");
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

    // Default center
    const defaultCenter = {
        lat: -10.805109387808187,
        lng: 92.75040048152385
    };

    // User's center (if available)
    const userCenter = user && user.latitude && user.longitude ? {
      lat: parseFloat(user.latitude),
      lng: parseFloat(user.longitude)
    } : defaultCenter;

    // Log user center
    console.log("User Center:", userCenter);

    const onLoad = useCallback((map) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback((map) => {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
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
    ) : <></>;
}

export default ProducerMap;
