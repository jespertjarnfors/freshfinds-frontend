import ProducerMap from "../Google Maps/ProducerMap";

const MapContainer = () => {
    return (
        <div className="flex flex-col w-2/3 mx-10 p-5 rounded-xl justify-center" style={{ height: "85vh" }}>
                   <p className="text-center text-3xl font-medium text-gray-700 mb-5" style={{
            fontFamily: 'General Sans, sans-serif'
        }}>Find your local producers.</p>
            <div className="bg-transparent shadow-xl mx-auto">
          <ProducerMap></ProducerMap>
          </div>
        </div>
    );
  };
  
  export default MapContainer;
  