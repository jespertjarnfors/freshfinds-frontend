import ProducerMap from "../Google Maps/ProducerMap";

const MapContainer = () => {
    return (
        <div className="flex flex-row w-2/3 mx-10 p-5 rounded-xl justify-center" style={{ height: "85vh" }}>
            <div className="bg-transparent m-auto shadow-xl">
          <ProducerMap></ProducerMap>
          </div>
        </div>
    );
  };
  
  export default MapContainer;
  