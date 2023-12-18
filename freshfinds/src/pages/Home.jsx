import ButtonBar from "../components/Home/ButtonBar";
import HeroAnimation from "../components/Home/HeroAnimation";
import HeroText from "../components/Home/HeroText";
import HomeNavBar from "../components/Home/HomeNavBar";

const Home = () => {
  return (
    <div>
    <HomeNavBar></HomeNavBar>
    <div className="flex justify-center items-center h-screen">
      <div id="hero-left" className="flex flex-col">
        <HeroText></HeroText>
        <ButtonBar></ButtonBar>
      </div>
      <div id="hero-right" className="w-full max-w-xl">
        <HeroAnimation></HeroAnimation>
      </div>
    </div>
    </div>
  );
};

export default Home;
