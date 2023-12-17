import ButtonBar from "../components/Home/ButtonBar";
import HeroAnimation from "../components/Home/HeroAnimation";
import HeroLogo from "../components/Home/HeroLogo";
import HeroText from "../components/Home/HeroText";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div id="hero-left" className="flex flex-col items-center">
        <HeroLogo></HeroLogo>
        <HeroText></HeroText>
        <ButtonBar></ButtonBar>
      </div>
      <div id="hero-right" className="w-full max-w-lg">
        <HeroAnimation></HeroAnimation>
      </div>
    </div>
  );
};

export default Home;
