import React from 'react';

import TrustSection from './TrustSection';
import CTASection from './CTASection';
import HeroSection from './Hero';
import FeaturesSection from './FeatureSection';
import NewsLetter from './NewsLetter';

const LandingPage: React.FC = () =>
{
    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-100">
            <HeroSection />
            <FeaturesSection />
            <TrustSection />
            <CTASection />
            <NewsLetter />
        </div>
    );
};

export default LandingPage;