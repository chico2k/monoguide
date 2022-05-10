import FeatureSection from './FeatureSection';
import HeroSection from './HeroSection';

const LandingPageComponent = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto min-h-screen pt-32">
        <HeroSection />
        <FeatureSection />
      </div>
    </div>
  );
};

export default LandingPageComponent;
