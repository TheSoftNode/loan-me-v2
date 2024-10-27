import React from 'react';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-cyan-600 to-purple-600">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8 text-white/90">Join thousands of satisfied customers who trust LoanMe</p>
          <button className="bg-white text-cyan-600 px-8 py-4 rounded-full font-semibold inline-flex items-center hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
            Apply Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
