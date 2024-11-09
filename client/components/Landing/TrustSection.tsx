import React from 'react';
import { CheckCircle, Users } from 'lucide-react';

interface TrustIndicator {
  icon?: React.ReactNode;
  text: string;
  prefix?: string;
}

const TrustSection: React.FC = () => {
  const trustIndicators: TrustIndicator[] = [
    {
      prefix: "★★★★★",
      text: "4.8/5"
    },
    {
      icon: <CheckCircle className="text-purple-500" />,
      text: "Licensed Lender"
    },
    {
      icon: <Users className="text-cyan-500" />,
      text: "10k+ Active Users"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Trusted by over 100,000 customers</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="bg-white rounded-full px-6 py-3 shadow-md flex items-center space-x-2">
                {indicator.prefix && <span className="text-teal-900">{indicator.prefix}</span>}
                {indicator.icon}
                <span className="text-gray-700">{indicator.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;