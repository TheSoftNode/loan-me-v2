import React from 'react';

import TrustSection from './TrustSection';
import CTASection from './CTASection';
import HeroSection from './Hero';
import FeaturesSection from './FeatureSection';

const LandingPage: React.FC = () =>
{
    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-purple-50">
            <HeroSection />
            <FeaturesSection />
            <TrustSection />
            <CTASection />
        </div>
    );
};

export default LandingPage;