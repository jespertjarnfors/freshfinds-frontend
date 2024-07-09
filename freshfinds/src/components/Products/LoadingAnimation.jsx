import Lottie from 'lottie-react';
import Loading from '../../assets/Loading.json';

const LoadingAnimation = () => {
    return (
        <>
            <Lottie animationData={Loading}/>
        </>
    );
};

export default LoadingAnimation;