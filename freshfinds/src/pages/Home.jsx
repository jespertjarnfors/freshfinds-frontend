import ButtonBar from "../components/Home/ButtonBar";
import CopyRight from "../components/Home/CopyRight";
import HeroAnimation from "../components/Home/HeroAnimation";
import HeroText from "../components/Home/HeroText";
import HomeNavBar from "../components/Home/HomeNavBar";

const Home = () => {
  return (
    <div>
    <HomeNavBar></HomeNavBar>
    <div className="flex justify-center items-center flex-col-reverse lg:flex-row"
    style={{
      minHeight: "85svh",
    }}
    >
      <div id="hero-left" className="flex flex-col mb-auto md:mb-0">
        <HeroText></HeroText>
        <ButtonBar></ButtonBar>
      </div>
      <div id="hero-right" className="flex justify-center md:w-full max-w-xl">
        <HeroAnimation></HeroAnimation>
      </div>
    </div>
    <CopyRight></CopyRight>
    </div>
  );
};

export default Home;
