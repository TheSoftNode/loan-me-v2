"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import
{
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
    AreaChart, Area, ScatterChart, Scatter
} from 'recharts';
import
{
    Users, CreditCard, TrendingUp, Clock, CheckCircle,
    XCircle, AlertCircle, Search, Filter, Download,
    SlidersHorizontal, RefreshCcw, ChevronDown
} from 'lucide-react';

const AdminDashboard = () =>
{
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [timeRange, setTimeRange] = useState('1M');
    const [isLoading, setIsLoading] = useState(false);

    // Simulated data for different tabs
    const overviewData = {
        loanPerformance: [
            { month: 'Jan', disbursed: 4500, repaid: 3800, defaulted: 700 },
            { month: 'Feb', disbursed: 5200, repaid: 4500, defaulted: 700 },
            { month: 'Mar', disbursed: 6100, repaid: 5400, defaulted: 700 },
            { month: 'Apr', disbursed: 5800, repaid: 5100, defaulted: 700 },
            { month: 'May', disbursed: 6500, repaid: 5800, defaulted: 700 },
            { month: 'Jun', disbursed: 7200, repaid: 6500, defaulted: 700 },
        ],
        userStatus: [
            { name: 'Active', value: 65, color: '#4ade80' },
            { name: 'Pending', value: 20, color: '#fbbf24' },
            { name: 'Suspended', value: 15, color: '#f87171' },
        ],
    };

    const userAnalytics = {
        registrations: [
            { date: '2024-01', users: 120, verified: 100 },
            { date: '2024-02', users: 150, verified: 130 },
            { date: '2024-03', users: 180, verified: 160 },
            { date: '2024-04', users: 220, verified: 190 },
            { date: '2024-05', users: 250, verified: 220 },
        ],
        demographics: [
            { age: '18-25', count: 450, risk: 'medium' },
            { age: '26-35', count: 720, risk: 'low' },
            { age: '36-45', count: 580, risk: 'low' },
            { age: '46-55', count: 340, risk: 'medium' },
            { age: '55+', count: 210, risk: 'high' },
        ],
    };

    const loanMetrics = {
        approvalRate: [
            { month: 'Jan', rate: 75 },
            { month: 'Feb', rate: 78 },
            { month: 'Mar', rate: 82 },
            { month: 'Apr', rate: 80 },
            { month: 'May', rate: 85 },
        ],
        amountDistribution: [
            { range: '0-1000', count: 145 },
            { range: '1001-5000', count: 384 },
            { range: '5001-10000', count: 278 },
            { range: '10001+', count: 156 },
        ],
    };

    const revenueData = {
        monthly: [
            { month: 'Jan', revenue: 45000, expenses: 32000 },
            { month: 'Feb', revenue: 52000, expenses: 35000 },
            { month: 'Mar', revenue: 61000, expenses: 38000 },
            { month: 'Apr', revenue: 58000, expenses: 36000 },
            { month: 'May', revenue: 65000, expenses: 40000 },
        ],
    };

    const handleRefresh = () =>
    {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1000);
    };

    const renderOverviewTab = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Loan Performance Overview</CardTitle>
                        <div className="flex items-center space-x-4">
                            <select
                                className="p-2 border rounded-lg"
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                            >
                                <option value="1M">Last Month</option>
                                <option value="3M">Last 3 Months</option>
                                <option value="6M">Last 6 Months</option>
                                <option value="1Y">Last Year</option>
                            </select>
                            <button
                                className="p-2 hover:bg-gray-100 rounded-full"
                                onClick={handleRefresh}
                            >
                                <RefreshCcw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={overviewData.loanPerformance}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Area type="monotone" dataKey="disbursed" stackId="1" stroke="#3b82f6" fill="#93c5fd" />
                                    <Area type="monotone" dataKey="repaid" stackId="2" stroke="#10b981" fill="#6ee7b7" />
                                    <Area type="monotone" dataKey="defaulted" stackId="3" stroke="#ef4444" fill="#fca5a5" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>User Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={overviewData.userStatus}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {overviewData.userStatus.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Revenue Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueData.monthly}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="revenue" fill="#3b82f6" />
                                    <Bar dataKey="expenses" fill="#ef4444" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

    );

    const renderUsersTab = () => (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        User Registration Trends
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={userAnalytics.registrations}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                                <Line type="monotone" dataKey="verified" stroke="#10b981" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>User Demographics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="age" />
                                <YAxis dataKey="count" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Users" data={userAnalytics.demographics} fill="#8884d8" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderLoansTab = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="bg-green-50">
                    <CardContent className="flex items-center p-4">
                        <CheckCircle className="w-8 h-8 text-green-500" />
                        <div className="ml-3">
                            <p className="text-sm text-gray-600">Approved</p>
                            <p className="text-xl font-bold">842</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-yellow-50">
                    <CardContent className="flex items-center p-4">
                        <Clock className="w-8 h-8 text-yellow-500" />
                        <div className="ml-3">
                            <p className="text-sm text-gray-600">Pending</p>
                            <p className="text-xl font-bold">156</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-red-50">
                    <CardContent className="flex items-center p-4">
                        <XCircle className="w-8 h-8 text-red-500" />
                        <div className="ml-3">
                            <p className="text-sm text-gray-600">Rejected</p>
                            <p className="text-xl font-bold">64</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Loan Approval Rate
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={loanMetrics.approvalRate}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="rate" stroke="#3b82f6" fill="#93c5fd" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Loan Amount Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={loanMetrics.amountDistribution}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="range" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#3b82f6">
                                    {loanMetrics.amountDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`#3b82f6${(index + 5) * 2}`} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );

    const renderReportsTab = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Generated Reports</h2>
                <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2" />
                            Revenue Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={revenueData.monthly}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
                                    <Line type="monotone" dataKey="expenses" stroke="#ef4444" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <CreditCard className="w-5 h-5 mr-2" />
                            Key Metrics Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                {
                                    label: 'Total Active Users',
                                    value: '2,453',
                                    change: '+12%',
                                    icon: <Users className="w-5 h-5 text-blue-500" />
                                },
                                {
                                    label: 'Average Loan Amount',
                                    value: '$3,789',
                                    change: '+8%',
                                    icon: <CreditCard className="w-5 h-5 text-green-500" />
                                },
                                {
                                    label: 'Approval Rate',
                                    value: '82%',
                                    change: '+5%',
                                    icon: <CheckCircle className="w-5 h-5 text-green-500" />
                                },
                                {
                                    label: 'Default Rate',
                                    value: '3.2%',
                                    change: '-1.5%',
                                    icon: <AlertCircle className="w-5 h-5 text-red-500" />
                                }
                            ].map((metric, index) => (
                                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                                    <div className="p-2 bg-white rounded-full">
                                        {metric.icon}
                                    </div>
                                    <div className="ml-3 flex-1">
                                        <span className="text-gray-600">{metric.label}</span>
                                        <div className="flex items-center justify-between">
                                            <div className="text-xl font-bold">{metric.value}</div>
                                            <div className={`text-sm ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                                                }`}>
                                                {metric.change}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 px-5 py-12">
            {/* Top Navigation */}
            <div className="flex flex-wrap gap-4 mb-6">
                {['overview', 'users', 'loans', 'reports'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${activeTab === tab
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
                        <Filter className="w-4 h-4 mr-2" />
                        <span>Filter</span>
                        <ChevronDown className="w-4 h-4 ml-2" />
                    </button>
                    <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                        <span>Sort</span>
                        <ChevronDown className="w-4 h-4 ml-2" />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="space-y-6">
                {activeTab === 'overview' && renderOverviewTab()}
                {activeTab === 'users' && renderUsersTab()}
                {activeTab === 'loans' && renderLoansTab()}
                {activeTab === 'reports' && renderReportsTab()}
            </div>
        </div>
    );
};

export default AdminDashboard;