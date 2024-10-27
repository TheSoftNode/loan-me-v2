"use client"

import React, { useState } from 'react';
import { Menu, ChevronDown, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import
    {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu"
import { User } from '@/lib/type';

const Navbar = () =>
{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const navs = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Products', path: '/products' },
        { name: 'Contact', path: '/contact' }
    ];

    const handleLogout = async () =>
    {
        // Implement your logout logic here
        window.location.href = '/Login';
    };

    const AuthSection = () =>
    {
        if (loading)
        {
            return (
                <div className="h-8 w-24 bg-white/20 animate-pulse rounded-full" />
            );
        }

        if (user)
        {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <motion.button
                            className="flex items-center space-x-3 bg-white/10 px-3 py-2 rounded-full hover:bg-white/20"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                {user?.photoURL ? (
                                    <img
                                        src={user?.photoURL}
                                        alt={user?.firstName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-purple-600 flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">
                                            {user.firstName?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <span className="text-white font-medium">{user.firstName}</span>
                            <ChevronDown className="w-4 h-4 text-white" />
                        </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-white/90 backdrop-blur-md">
                        <DropdownMenuItem className="cursor-pointer">
                            <Link href="/profile" className="flex items-center w-full">
                                Profile Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer text-red-600"
                            onClick={handleLogout}
                        >
                            <span className="flex items-center w-full">
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }

        return (
            <div className="hidden md:flex items-center space-x-4">
                <motion.button
                    className="text-white relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link href="/Login">Login</Link>
                    <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-white/90 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                    />
                </motion.button>
                <motion.button
                    className="bg-white text-cyan-600 px-4 py-2 rounded-full hover:bg-purple-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link href="/Register">Register</Link>
                </motion.button>
            </div>
        );
    };

    return (
        <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-cyan-600 to-purple-600 backdrop-blur-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <motion.div
                        className="flex items-center space-x-2"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.a
                            href="/"
                            className="bg-white rounded-full w-8 h-8 flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                        >
                            <span className="text-cyan-600 font-bold text-xl">L</span>
                        </motion.a>
                        <span className="text-2xl font-bold text-white">LoanMe</span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {navs.map((item) => (
                            <motion.a
                                key={item.name}
                                href={item.path}
                                className="text-white relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                {item.name}
                                <motion.span
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-white/90 rounded-full"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.a>
                        ))}
                    </div>

                    {/* Auth Section */}
                    <AuthSection />

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Menu className="h-6 w-6" />
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <motion.div
                    className="md:hidden absolute top-16 left-0 right-0 bg-gradient-to-r from-cyan-600 to-purple-600 shadow-lg"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                        opacity: isMenuOpen ? 1 : 0,
                        height: isMenuOpen ? 'auto' : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: 'hidden' }}
                >
                    <div className="px-4 py-2 space-y-3">
                        {navs.map((item) => (
                            <motion.a
                                key={item.name}
                                href={item.path}
                                className="block text-white relative overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1"
                                whileHover={{ x: 8 }}
                                transition={{ duration: 0.2 }}
                            >
                                {item.name}
                                <motion.span
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-white/90"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </motion.a>
                        ))}
                        {user ? (
                            <div className="border-t border-white/10 pt-2 pb-4 space-y-3">
                                <Link href="/profile">
                                    <motion.button
                                        className="block w-full text-white relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1"
                                        whileHover={{ x: 8 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        Profile Settings
                                    </motion.button>
                                </Link>
                                <motion.button
                                    className="block w-full bg-white text-red-600 px-4 py-2 rounded-full hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </motion.button>
                            </div>
                        ) : (
                            <div className="border-t border-white/10 pt-2 pb-4 space-y-3">
                                <Link href="/Login">
                                    <motion.button
                                        className="block w-full text-white relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-lg px-2 py-1"
                                        whileHover={{ x: 8 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        Login
                                    </motion.button>
                                </Link>

                                <Link href="/Register">
                                    <motion.button
                                        className="block w-full bg-white text-cyan-600 px-4 py-2 rounded-full hover:bg-purple-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        Register
                                    </motion.button>
                                </Link>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </nav>
    );
};

export default Navbar;