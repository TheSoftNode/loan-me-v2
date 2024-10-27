import React from 'react';
import { Clock, Shield, DollarSign } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection: React.FC = () =>
{
    const features: FeatureProps[] = [
        {
            icon: <Clock />,
            title: "Quick Approval",
            description: "Get loan approval in as fast as 24 hours",
            delay: "delay-0"
        },
        {
            icon: <Shield />,
            title: "Secure Process",
            description: "Bank-grade security for your peace of mind",
            delay: "delay-100"
        },
        {
            icon: <DollarSign />,
            title: "Competitive Rates",
            description: "Transparent pricing with no hidden fees",
            delay: "delay-200"
        }
    ];

    return (
        <section className="py-16 bg-white/50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;