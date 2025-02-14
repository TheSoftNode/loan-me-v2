"use client"

import React, { useState } from 'react';
import { Menu, ChevronDown, LogOut, Home, Info, Package, Phone, UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from '@/lib/type';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const navs = [
        { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
        { name: 'About', path: '/about', icon: <Info className="w-4 h-4" /> },
        { name: 'Products', path: '/product', icon: <Package className="w-4 h-4" /> },
        { name: 'Contact', path: '/contact', icon: <Phone className="w-4 h-4" /> }
    ];

    const handleLogout = async () => {
        // Implement your logout logic here
        window.location.href = '/login';
    };

    const AuthSection = () => {
        if (loading) {
            return (
                <div className="h-10 w-28 bg-white/10 animate-pulse rounded-xl" />
            );
        }

        if (user) {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <motion.button
                            className="flex items-center space-x-3 bg-white/10 px-4 py-2.5 rounded-xl hover:bg-white/15 border border-white/10"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                                {user?.photoURL ? (
                                    <img
                                        src={user?.photoURL}
                                        alt={user?.firstName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">
                                            {user.firstName?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <span className="text-white font-medium">{user.firstName}</span>
                            <ChevronDown className="w-4 h-4 text-white/70" />
                        </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white/95 backdrop-blur-lg border-white/20">
                        <DropdownMenuItem className="cursor-pointer focus:bg-gray-100">
                            <Link href="/profile" className="flex items-center w-full">
                                Profile Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer focus:bg-gray-100">
                            <Link href="/user-dashboard" className="flex items-center w-full">
                                Go to dashboard
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="cursor-pointer text-red-600 focus:bg-red-50"
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
                    className="text-white relative overflow-hidden group px-4 py-2 rounded-xl hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link href="/login" className="relative z-10">Login</Link>
                    <motion.div
                        className="absolute inset-0 bg-white/10 rounded-xl"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.button>
                <motion.button
                    className="bg-white text-cyan-600 px-5 py-2 rounded-xl hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 font-medium shadow-lg shadow-white/10"
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link href="/signup">Register</Link>
                </motion.button>
            </div>
        );
    };

    return (
        <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-cyan-600 to-teal-600 shadow-lg shadow-cyan-900/10 backdrop-blur-md">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-20">
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
                            <span className="text-purple-700 font-bold text-xl">L</span>
                        </motion.a>
                        <span className="text-2xl font-bold text-white">LoanMe</span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-1">
                        {navs.map((item) => (
                            <motion.a
                                key={item.name}
                                href={item.path}
                                className="text-white/90 hover:text-white flex items-center space-x-2 relative overflow-hidden rounded-xl px-4 py-2 group"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <span className="relative z-10 flex items-center">
                                    {item.icon}
                                    <span className="ml-2">{item.name}</span>
                                </span>
                                <motion.div
                                    className="absolute inset-0 bg-white/10 rounded-xl"
                                    initial={{ scale: 0 }}
                                    whileHover={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.a>
                        ))}
                    </div>

                    {/* Auth Section */}
                    <AuthSection />

                    {/* Mobile Menu Button */}
                    <motion.button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 text-white rounded-xl hover:bg-white/10 border border-white/10"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Menu className="h-6 w-6" />
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="md:hidden absolute top-20 left-0 right-0 bg-gradient-to-r from-cyan-600 to-teal-600 border-t border-white/10 backdrop-blur-lg"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="px-6 py-4 space-y-4">
                                {navs.map((item, index) => (
                                    <motion.a
                                        key={item.name}
                                        href={item.path}
                                        className="flex items-center space-x-3 text-white/90 hover:text-white group rounded-xl p-2"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <span className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20">
                                            {item.icon}
                                        </span>
                                        <span>{item.name}</span>
                                    </motion.a>
                                ))}
                                {user ? (
                                    <div className="border-t border-white/10 pt-4 space-y-4">
                                        <Link href="/profile">
                                            <motion.button
                                                className="flex items-center space-x-3 text-white/90 hover:text-white group rounded-xl p-2 w-full"
                                                whileHover={{ x: 4 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <span className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20">
                                                    <UserIcon className="w-4 h-4" />
                                                </span>
                                                <span>Profile Settings</span>
                                            </motion.button>
                                        </Link>
                                        <motion.button
                                            className="w-full bg-white/10 text-white hover:bg-white/15 rounded-xl p-3 border border-white/10"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleLogout}
                                        >
                                            <span className="flex items-center justify-center">
                                                <LogOut className="w-4 h-4 mr-2" />
                                                Logout
                                            </span>
                                        </motion.button>
                                    </div>
                                ) : (
                                    <div className="border-t border-white/10 pt-4 space-y-4">
                                        <Link href="/login" className="block">
                                            <motion.button
                                                className="w-full bg-white/10 text-white hover:bg-white/15 rounded-xl p-3 border border-white/10"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Login
                                            </motion.button>
                                        </Link>
                                        <Link href="/signup" className="block">
                                            <motion.button
                                                className="w-full bg-white text-cyan-600 hover:bg-white/90 rounded-xl p-3 font-medium shadow-lg shadow-black/10"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Register
                                            </motion.button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;