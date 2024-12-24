import Nav from "../../Components/Nav";
import HomeHeroSection from "./HeroSection/HomeHeroSection";
import Section from "./OverviewSection/Section";
import ClientSection from "./ClientSection/ClientSection";
import LogoCarousel from "../../Components/LogoCarousel";

import StepsSection from "./WorkifyyStep/StepsSection";
import Footer from "../Home/Footers/Footer";
import { useEffect } from "react";
function Home() {
  useEffect(() => {
    document.title = "Home | Workifyy";
  }, []);

  return (
    <div>
      <div>
        <Nav>
          <HomeHeroSection />
        </Nav>
      </div>

      <div>
        <Section />
      </div>

      <div>
        <StepsSection />
      </div>

      <div>
        <ClientSection />
      </div>
      <div>
        <LogoCarousel/>
</div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
