// import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
// import { useState, useCallback, useEffect } from "react";
// import { useUser } from "../../hooks/useUser";

// const containerStyle = {
//   width: '1000px',
//   height: '600px'
// };

// const ProducerMap = () => {
//     const { user } = useUser();
//     const [map, setMap] = useState(null);
//     const [producers, setProducers] = useState([]);
//     const [selectedProducer, setSelectedProducer] = useState(null);

//     useEffect(() => {
//         const fetchProducers = async () => {
//             try {
//                 const response = await fetch("http://localhost:3000/api/users/producers");
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
//                 const data = await response.json();
//                 console.log("Fetched producers data:", data); // Debugging log
//                 setProducers(data.data); // Use data.data to access the array
//             } catch (error) {
//                 console.error("Failed to fetch producers:", error);
//             }
//         };
    
//         fetchProducers();
//     }, []);

//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
//     });

//     // Default center
//     const defaultCenter = {
//         lat: -10.805109387808187,
//         lng: 92.75040048152385
//     };

//     // User's center (if available)
//     const userCenter = user && user.latitude && user.longitude ? {
//       lat: parseFloat(user.latitude),
//       lng: parseFloat(user.longitude)
//     } : defaultCenter;

//     const onLoad = useCallback((map) => {
//         setMap(map);
//     }, []);

//     const onUnmount = useCallback((map) => {
//         setMap(null);
//     }, []);

//     return isLoaded ? (
//         <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={userCenter}
//             zoom={12}
//             onLoad={onLoad}
//             onUnmount={onUnmount}
//         >
//             {producers && Array.isArray(producers) && producers.map(producer => (
//                 <Marker 
//                     key={producer._id}
//                     position={{ lat: parseFloat(producer.latitude), lng: parseFloat(producer.longitude) }}
//                     onClick={() => setSelectedProducer(producer)}
//                 />
//             ))}

//             {selectedProducer && (
//                 <InfoWindow
//                     position={{ lat: parseFloat(selectedProducer.latitude), lng: parseFloat(selectedProducer.longitude) }}
//                     onCloseClick={() => setSelectedProducer(null)}
//                 >
//                     <div>
//                         <h3>{selectedProducer.username}</h3>
//                     </div>
//                 </InfoWindow>
//             )}
//         </GoogleMap>
//     ) : <></>;
// }

// export default ProducerMap;
