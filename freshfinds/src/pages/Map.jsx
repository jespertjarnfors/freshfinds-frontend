import MapContainer from '../components/Map/MapContainer';
import UserNavBar from '../components/UserNavBar';

const Map = () => {
    return (
        <div>
            <UserNavBar />
            <div className='flex xl:justify-center'>
            <MapContainer></MapContainer>
            </div>
        </div>
    );
};

export default Map;
