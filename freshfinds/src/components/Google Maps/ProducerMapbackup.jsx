// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
// import { useState, useEffect, useCallback } from "react";
// import { useUser } from "../../hooks/useUser";

// const containerStyle = {
//   width: '1000px',
//   height: '700px'
// };

// const ProducerMapBackup = () => {
//   const [map, setMap] = useState(null);
//   const { user } = useUser();

//   const { isLoaded } = useJsApiLoader({
//     id: 'google-map-script',
//     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
//   });

//   // Set up a default center point
//   const [center, setCenter] = useState({
//     lat: -41.29228680000001,
//     lng: 174.788848
//   });

//   useEffect(() => {
//     // Check if user's coordinates are available and update the center point
//     if (user && user.latitude && user.longitude) {
//       setCenter({
//         lat: parseFloat(user.latitude),
//         lng: parseFloat(user.longitude)
//       });
//     }
//   }, [user]);

//   const onLoad = useCallback(function callback(map) {
//     setMap(map);
//   }, []);

//   const onUnmount = useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       {/* Add markers or other components here */}
//     </GoogleMap>
//   ) : <></>;
// }

// export default ProducerMapBackup;
