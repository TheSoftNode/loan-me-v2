import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa6';

const Footer = () =>
{
    return (
        <footer className="bg-cyan-900 text-white">
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Company Info */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full w-10 h-10 flex items-center justify-center">
                                <span className="text-white font-bold text-xl">L</span>
                            </div>
                            <span className="text-2xl font-bold">LoanMe</span>
                        </div>
                        <p className="text-gray-200 leading-relaxed">
                            Making financial freedom accessible to everyone through quick, secure, and hassle-free loans.
                        </p>
                        <div className="flex space-x-5">
                            <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                                <FaFacebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                                <FaTwitter className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                                <FaInstagram className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                                <FaYoutube className="h-6 w-6" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-gray-200 hover:text-cyan-400 transition-colors inline-block">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-200 hover:text-cyan-400 transition-colors inline-block">
                                    How It Works
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-200 hover:text-cyan-400 transition-colors inline-block">
                                    Loan Products
                                </a>
                            </li>
                            <li>
                                <a href="/support" className="text-gray-200 hover:text-cyan-400 transition-colors inline-block">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="/Blog" className="text-gray-200 hover:text-cyan-400 transition-colors inline-block">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-cyan-400" />
                                <span className="text-gray-200">+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-cyan-400" />
                                <span className="text-gray-200">support@loanme.com</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5 text-cyan-400" />
                                <span className="text-gray-200">123 Finance Street, NY 10001</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <p className="text-gray-300 text-sm text-center md:text-left">
                            © 2024 LoanMe. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-end gap-6">
                            <a href="/PrivacyPolicy" className="text-gray-300 hover:text-cyan-400 text-sm transition-colors">
                                Privacy Policy
                            </a>
                            <a href="/TermsOfService" className="text-gray-300 hover:text-cyan-400 text-sm transition-colors">
                                Terms of Service
                            </a>
                            <a href="/LoanAgreement" className="text-gray-300 hover:text-cyan-400 text-sm transition-colors">
                                Loan Agreement
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;