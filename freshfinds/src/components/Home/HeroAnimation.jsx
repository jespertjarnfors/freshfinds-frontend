import Lottie from 'lottie-react';
import AppleHarvest from '../../assets/AppleHarvest.json';

const HeroAnimation = () => {
    return (
        <>
            <Lottie animationData={AppleHarvest} className='w-full' />
        </>
    );
};

export default HeroAnimation;
