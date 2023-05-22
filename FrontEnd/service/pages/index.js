import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Record from "./components/RecordSection";
import Care from "./components/customerCare";
import Navbar from "./components/navbar";
import ServiceSlider from "./components/serviceSlider";

export default function Home() {
  return (
    <div>
      <div className="relative">
        <HeroSection />
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar className="sticky top-0" />
        </div>
      </div>
      <br />
      <ServiceSlider />
      <Record/>
      <Care />
      <Footer />
    </div>
  );
}

