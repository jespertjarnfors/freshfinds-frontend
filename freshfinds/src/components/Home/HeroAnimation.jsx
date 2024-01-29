import Lottie from 'lottie-react';
import AppleHarvest from '../../assets/AppleHarvest.json';

const HeroAnimation = () => {
    return (
        <>
            <Lottie animationData={AppleHarvest} className='md:w-full' />
        </>
    );
};

export default HeroAnimation;
