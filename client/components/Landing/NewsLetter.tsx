import React from 'react';

const NewsLetter = () =>
{
    return (
        <section className="bg-gradient-to-r from-white to-teal-50 py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent mb-6">
                        Stay Updated with LoanMe
                    </h2>
                    <p className="text-slate-900 mb-8 text-lg">
                        Subscribe to our newsletter for exclusive offers, financial tips, and latest updates on our loan products.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-cyan-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                        />
                        <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                            Subscribe Now
                        </button>
                    </div>
                    <p className="text-gray-500 text-sm mt-5">
                        By subscribing, you agree to our Privacy Policy and Terms of Service
                    </p>
                </div>
            </div>
        </section>
    );
};

export default NewsLetter;