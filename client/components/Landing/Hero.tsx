import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const HeroSection: React.FC = () =>
{
    return (
        <section className="pt-32 pb-16 px-4">
            <div className="container mx-auto text-center max-w-4xl animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                    Welcome to LoanMe
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8">
                    Fast, secure, and hassle-free loans at your fingertips
                </p>
                <button className="group bg-gradient-to-r from-cyan-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold inline-flex items-center hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                    <Link href="/Dashboard">Get Started</Link>
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </section>
    );
};

export default HeroSection;