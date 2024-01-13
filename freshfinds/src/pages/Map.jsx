import MapContainer from '../components/Map Page/MapContainer';
import UserNavBar from '../components/UserNavBar';

const Map = () => {
    return (
        <div>
            <UserNavBar />
            <div className='flex justify-center'>
            <MapContainer></MapContainer>
            {/* Your map component content */}
            </div>
        </div>
    );
};

export default Map;
