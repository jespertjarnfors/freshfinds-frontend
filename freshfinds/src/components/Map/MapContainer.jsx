import ProducerMap from "../Google Maps/ProducerMap";

const MapContainer = () => {
    return (
        <div className="flex flex-col mx-auto md:ml-0 w-max xl:w-2/3 xl:mx-10 xl:p-5 rounded-xl justify-center" style={{ height: "75svh" }}>
                   <p className="text-center text-xl md:text-3xl font-medium text-gray-700 mb-5" style={{
            fontFamily: 'General Sans, sans-serif'
        }}>Find your local producers.</p>
            <div className="bg-transparent shadow-xl mx-auto">
          <ProducerMap></ProducerMap>
          </div>
        </div>
    );
  };
  
  export default MapContainer;
  