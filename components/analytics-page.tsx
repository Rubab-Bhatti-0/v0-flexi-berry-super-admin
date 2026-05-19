'use client'

import React, { useState } from 'react'
import { TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign, Activity, BarChart3, LineChart, PieChart, ArrowUpRight, ArrowDownRight, Zap, Clock, AlertCircle, CheckCircle, Download, RefreshCw, Filter, Calendar } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string | number
  change: number
  trend: 'up' | 'down'
  icon: React.ReactNode
  color: string
  bgColor: string
}

interface ChartDataPoint {
  name: string
  value: number
  fill?: string
}

interface TabItem {
  id: string
  label: string
  icon: React.ReactNode
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, change, trend, icon, color, bgColor }) => (
  <div className={`glass-card p-6 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${trend === 'up' ? 'bg-green-100 dark:bg-green-500/10' : 'bg-red-100 dark:bg-red-500/10'}`}>
        {trend === 'up' ? (
          <ArrowUpRight size={14} className="text-green-600 dark:text-green-400" />
        ) : (
          <ArrowDownRight size={14} className="text-red-600 dark:text-red-400" />
        )}
        <span className={`text-xs font-bold ${trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {Math.abs(change)}%
        </span>
      </div>
    </div>
    <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">{label}</h3>
    <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
  </div>
)

const AnalyticsChart: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }> = ({ title, subtitle, children }) => (
  <div className="glass-card p-6 rounded-2xl">
    <div className="flex items-start justify-between mb-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>
        {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
    {children}
  </div>
)

const ProgressBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div className="mb-4">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</span>
      <span className="text-sm font-bold text-gray-900 dark:text-white">{value}%</span>
    </div>
    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div className={`h-full ${color} transition-all duration-500`} style={{ width: `${value}%` }}></div>
    </div>
  </div>
)

const StatItem: React.FC<{ icon: React.ReactNode; label: string; value: string; color: string }> = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
    <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-sm font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
)

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [dateRange, setDateRange] = useState('30days')
  const [selectedVendor, setSelectedVendor] = useState('all')

  const tabs: TabItem[] = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={18} /> },
    { id: 'vendors', label: 'Vendors', icon: <ShoppingBag size={18} /> },
    { id: 'revenue', label: 'Revenue', icon: <DollarSign size={18} /> },
    { id: 'traffic', label: 'Traffic', icon: <Activity size={18} /> },
    { id: 'health', label: 'System Health', icon: <Zap size={18} /> },
  ]

  // Mock data
  const vendorGrowthData = [
    { name: 'Jan', value: 240, fill: '#3b82f6' },
    { name: 'Feb', value: 380, fill: '#3b82f6' },
    { name: 'Mar', value: 290, fill: '#3b82f6' },
    { name: 'Apr', value: 450, fill: '#8b5cf6' },
    { name: 'May', value: 520, fill: '#8b5cf6' },
    { name: 'Jun', value: 680, fill: '#8b5cf6' },
  ]

  const revenueData = [
    { name: 'Electronics', value: 2400, fill: '#3b82f6' },
    { name: 'Fashion', value: 1800, fill: '#8b5cf6' },
    { name: 'Home', value: 1200, fill: '#ec4899' },
    { name: 'Sports', value: 800, fill: '#f59e0b' },
  ]

  const trafficData = [
    { name: 'Mobile', value: 65, fill: '#3b82f6' },
    { name: 'Desktop', value: 25, fill: '#8b5cf6' },
    { name: 'Tablet', value: 10, fill: '#f59e0b' },
  ]

  const userInteractionData = [
    { name: 'Views', value: 8500, change: 12, trend: 'up' },
    { name: 'Clicks', value: 3200, change: 8, trend: 'up' },
    { name: 'Conversions', value: 1450, change: -3, trend: 'down' },
    { name: 'Cart Adds', value: 2100, change: 15, trend: 'up' },
  ]

  const systemHealthMetrics = [
    { label: 'API Uptime', value: 99.98, unit: '%', status: 'excellent' },
    { label: 'Response Time', value: 145, unit: 'ms', status: 'good' },
    { label: 'Error Rate', value: 0.02, unit: '%', status: 'excellent' },
    { label: 'Database Load', value: 45, unit: '%', status: 'good' },
  ]

  const topVendors = [
    { name: 'TechZone', revenue: 125000, growth: 28, orders: 1245 },
    { name: 'Fashion Forward', revenue: 98000, growth: 15, orders: 892 },
    { name: 'Home Essentials', revenue: 76500, growth: 22, orders: 654 },
    { name: 'Sports Hub', revenue: 54200, growth: 18, orders: 423 },
  ]

  const conversionFunnel = [
    { stage: 'Visitors', count: 50000, percentage: 100 },
    { stage: 'Browsers', count: 35000, percentage: 70 },
    { stage: 'Cart Adds', count: 12000, percentage: 24 },
    { stage: 'Checkouts', count: 4500, percentage: 9 },
    { stage: 'Completed', count: 3600, percentage: 7.2 },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Real-time insights into your platform performance</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            <RefreshCw size={16} /> Refresh
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
            <Download size={16} /> Export
          </button>
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold outline-none border-none cursor-pointer hover:shadow-lg transition-all">
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">This Year</option>
          </select>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 p-1 bg-gray-100 dark:bg-gray-800/50 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              label="Total Vendors"
              value="1,247"
              change={28}
              trend="up"
              icon={<ShoppingBag size={24} className="text-blue-600 dark:text-blue-400" />}
              color="text-blue-600 dark:text-blue-400"
              bgColor="bg-blue-100 dark:bg-blue-500/10"
            />
            <MetricCard
              label="Monthly Revenue"
              value="Rs 8.4M"
              change={35}
              trend="up"
              icon={<DollarSign size={24} className="text-green-600 dark:text-green-400" />}
              color="text-green-600 dark:text-green-400"
              bgColor="bg-green-100 dark:bg-green-500/10"
            />
            <MetricCard
              label="Active Users"
              value="24,582"
              change={12}
              trend="up"
              icon={<Users size={24} className="text-purple-600 dark:text-purple-400" />}
              color="text-purple-600 dark:text-purple-400"
              bgColor="bg-purple-100 dark:bg-purple-500/10"
            />
            <MetricCard
              label="Conversion Rate"
              value="7.2%"
              change={5}
              trend="up"
              icon={<TrendingUp size={24} className="text-amber-600 dark:text-amber-400" />}
              color="text-amber-600 dark:text-amber-400"
              bgColor="bg-amber-100 dark:bg-amber-500/10"
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vendor Growth Chart */}
            <AnalyticsChart title="Vendor Growth Trend" subtitle="New vendors added over time">
              <div className="h-64 flex items-end justify-between gap-2">
                {vendorGrowthData.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-full relative flex items-end justify-center h-48">
                      <div
                        className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-300 group-hover:shadow-lg group-hover:from-blue-700 group-hover:to-blue-500"
                        style={{ height: `${(item.value / 680) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{item.name}</span>
                  </div>
                ))}
              </div>
            </AnalyticsChart>

            {/* User Interaction Metrics */}
            <AnalyticsChart title="User Interactions" subtitle="Engagement metrics overview">
              <div className="space-y-4">
                {userInteractionData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.value.toLocaleString()} interactions</p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${item.trend === 'up' ? 'bg-green-100 dark:bg-green-500/10' : 'bg-red-100 dark:bg-red-500/10'}`}>
                      {item.trend === 'up' ? (
                        <TrendingUp size={14} className="text-green-600 dark:text-green-400" />
                      ) : (
                        <TrendingDown size={14} className="text-red-600 dark:text-red-400" />
                      )}
                      <span className={`text-xs font-bold ${item.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {item.change}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsChart>
          </div>

          {/* Revenue & Traffic */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue by Category */}
            <AnalyticsChart title="Revenue by Category" subtitle="Distribution across categories">
              <div className="space-y-4">
                {revenueData.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.name}</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">Rs {(item.value / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500" style={{ width: `${(item.value / 2400) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsChart>

            {/* Traffic by Device */}
            <AnalyticsChart title="Traffic by Device" subtitle="User device distribution">
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="3"></circle>
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-blue-600" strokeWidth="3" strokeDasharray="37.2 100" strokeDashoffset="0"></circle>
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-purple-600" strokeWidth="3" strokeDasharray="9 100" strokeDashoffset="-37.2"></circle>
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-amber-600" strokeWidth="3" strokeDasharray="3.6 100" strokeDashoffset="-46.2"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">8.4k</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">sessions</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-500/10">
                  <div className="text-sm font-bold text-blue-600 dark:text-blue-400">65%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Mobile</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-purple-50 dark:bg-purple-500/10">
                  <div className="text-sm font-bold text-purple-600 dark:text-purple-400">25%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Desktop</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10">
                  <div className="text-sm font-bold text-amber-600 dark:text-amber-400">10%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Tablet</div>
                </div>
              </div>
            </AnalyticsChart>

            {/* Conversion Funnel */}
            <AnalyticsChart title="Conversion Funnel" subtitle="User journey analysis">
              <div className="space-y-3">
                {conversionFunnel.map((stage, idx) => (
                  <div key={idx} className="group cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{stage.stage}</span>
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{stage.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 group-hover:shadow-lg"
                        style={{ width: `${stage.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsChart>
          </div>
        </div>
      )}

      {/* Vendors Tab */}
      {activeTab === 'vendors' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              label="Active Vendors"
              value="1,247"
              change={28}
              trend="up"
              icon={<ShoppingBag size={24} className="text-blue-600 dark:text-blue-400" />}
              color="text-blue-600 dark:text-blue-400"
              bgColor="bg-blue-100 dark:bg-blue-500/10"
            />
            <MetricCard
              label="Avg Orders/Vendor"
              value="245"
              change={15}
              trend="up"
              icon={<Activity size={24} className="text-green-600 dark:text-green-400" />}
              color="text-green-600 dark:text-green-400"
              bgColor="bg-green-100 dark:bg-green-500/10"
            />
            <MetricCard
              label="Vendor Growth"
              value="+285"
              change={42}
              trend="up"
              icon={<TrendingUp size={24} className="text-purple-600 dark:text-purple-400" />}
              color="text-purple-600 dark:text-purple-400"
              bgColor="bg-purple-100 dark:bg-purple-500/10"
            />
            <MetricCard
              label="Avg Rating"
              value="4.6/5"
              change={8}
              trend="up"
              icon={<BarChart3 size={24} className="text-amber-600 dark:text-amber-400" />}
              color="text-amber-600 dark:text-amber-400"
              bgColor="bg-amber-100 dark:bg-amber-500/10"
            />
          </div>

          <AnalyticsChart title="Top Performing Vendors" subtitle="Ranked by revenue and growth">
            <div className="space-y-4">
              {topVendors.map((vendor, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all group cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{vendor.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{vendor.orders} orders</p>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-100 dark:bg-green-500/10">
                      <TrendingUp size={14} className="text-green-600 dark:text-green-400" />
                      <span className="text-xs font-bold text-green-600 dark:text-green-400">{vendor.growth}%</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600" style={{ width: `${(vendor.revenue / 125000) * 100}%` }}></div>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Rs {(vendor.revenue / 1000).toFixed(0)}k</span>
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{((vendor.revenue / 125000) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </AnalyticsChart>
        </div>
      )}

      {/* Revenue Tab */}
      {activeTab === 'revenue' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              label="Total Revenue"
              value="Rs 8.4M"
              change={35}
              trend="up"
              icon={<DollarSign size={24} className="text-green-600 dark:text-green-400" />}
              color="text-green-600 dark:text-green-400"
              bgColor="bg-green-100 dark:bg-green-500/10"
            />
            <MetricCard
              label="Avg Order Value"
              value="Rs 2,340"
              change={12}
              trend="up"
              icon={<ShoppingBag size={24} className="text-blue-600 dark:text-blue-400" />}
              color="text-blue-600 dark:text-blue-400"
              bgColor="bg-blue-100 dark:bg-blue-500/10"
            />
            <MetricCard
              label="Profit Margin"
              value="28.5%"
              change={5}
              trend="up"
              icon={<TrendingUp size={24} className="text-purple-600 dark:text-purple-400" />}
              color="text-purple-600 dark:text-purple-400"
              bgColor="bg-purple-100 dark:bg-purple-500/10"
            />
            <MetricCard
              label="Payment Success"
              value="99.2%"
              change={2}
              trend="up"
              icon={<CheckCircle size={24} className="text-amber-600 dark:text-amber-400" />}
              color="text-amber-600 dark:text-amber-400"
              bgColor="bg-amber-100 dark:bg-amber-500/10"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsChart title="Revenue Trend" subtitle="Monthly revenue progression">
              <div className="h-64 flex items-end justify-between gap-2">
                {vendorGrowthData.map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-full relative flex items-end justify-center h-48">
                      <div
                        className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all duration-300 group-hover:shadow-lg group-hover:from-green-700 group-hover:to-green-500"
                        style={{ height: `${(item.value / 680) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{item.name}</span>
                  </div>
                ))}
              </div>
            </AnalyticsChart>

            <AnalyticsChart title="Payment Methods" subtitle="Revenue by payment type">
              <div className="space-y-4">
                <ProgressBar label="Credit Card" value={45} color="bg-blue-600" />
                <ProgressBar label="Debit Card" value={28} color="bg-purple-600" />
                <ProgressBar label="Digital Wallet" value={18} color="bg-green-600" />
                <ProgressBar label="Bank Transfer" value={9} color="bg-amber-600" />
              </div>
            </AnalyticsChart>
          </div>
        </div>
      )}

      {/* Traffic Tab */}
      {activeTab === 'traffic' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              label="Total Sessions"
              value="24,582"
              change={18}
              trend="up"
              icon={<Activity size={24} className="text-blue-600 dark:text-blue-400" />}
              color="text-blue-600 dark:text-blue-400"
              bgColor="bg-blue-100 dark:bg-blue-500/10"
            />
            <MetricCard
              label="Avg Session Duration"
              value="4m 32s"
              change={22}
              trend="up"
              icon={<Clock size={24} className="text-green-600 dark:text-green-400" />}
              color="text-green-600 dark:text-green-400"
              bgColor="bg-green-100 dark:bg-green-500/10"
            />
            <MetricCard
              label="Bounce Rate"
              value="32.5%"
              change={-8}
              trend="down"
              icon={<TrendingDown size={24} className="text-purple-600 dark:text-purple-400" />}
              color="text-purple-600 dark:text-purple-400"
              bgColor="bg-purple-100 dark:bg-purple-500/10"
            />
            <MetricCard
              label="Page Views"
              value="156,420"
              change={25}
              trend="up"
              icon={<BarChart3 size={24} className="text-amber-600 dark:text-amber-400" />}
              color="text-amber-600 dark:text-amber-400"
              bgColor="bg-amber-100 dark:bg-amber-500/10"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsChart title="Traffic Sources" subtitle="Where your users come from">
              <div className="space-y-4">
                <ProgressBar label="Direct" value={35} color="bg-blue-600" />
                <ProgressBar label="Organic Search" value={28} color="bg-green-600" />
                <ProgressBar label="Social Media" value={22} color="bg-purple-600" />
                <ProgressBar label="Referral" value={15} color="bg-amber-600" />
              </div>
            </AnalyticsChart>

            <AnalyticsChart title="Top Pages" subtitle="Most visited pages">
              <div className="space-y-3">
                {[
                  { name: 'Home', views: 8500, percentage: 100 },
                  { name: 'Products', views: 6200, percentage: 73 },
                  { name: 'Category', views: 4100, percentage: 48 },
                  { name: 'Checkout', views: 2800, percentage: 33 },
                ].map((page, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{page.name}</span>
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{page.views.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600" style={{ width: `${page.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </AnalyticsChart>
          </div>
        </div>
      )}

      {/* System Health Tab */}
      {activeTab === 'health' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemHealthMetrics.map((metric, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{metric.label}</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-2">
                      {metric.value}{metric.unit}
                    </p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    metric.status === 'excellent' ? 'bg-green-100 dark:bg-green-500/10' : 'bg-blue-100 dark:bg-blue-500/10'
                  }`}>
                    {metric.status === 'excellent' ? (
                      <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                    ) : (
                      <Zap size={20} className="text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full ${metric.status === 'excellent' ? 'bg-green-600' : 'bg-blue-600'}`} style={{ width: `${metric.status === 'excellent' ? 99 : 85}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsChart title="Server Status" subtitle="Real-time server health">
              <div className="space-y-4">
                <StatItem
                  icon={<CheckCircle size={16} className="text-green-600 dark:text-green-400" />}
                  label="Primary Server"
                  value="Operational"
                  color="bg-green-100 dark:bg-green-500/10"
                />
                <StatItem
                  icon={<CheckCircle size={16} className="text-green-600 dark:text-green-400" />}
                  label="Database"
                  value="Operational"
                  color="bg-green-100 dark:bg-green-500/10"
                />
                <StatItem
                  icon={<CheckCircle size={16} className="text-green-600 dark:text-green-400" />}
                  label="Cache Server"
                  value="Operational"
                  color="bg-green-100 dark:bg-green-500/10"
                />
                <StatItem
                  icon={<AlertCircle size={16} className="text-amber-600 dark:text-amber-400" />}
                  label="Backup Server"
                  value="Maintenance"
                  color="bg-amber-100 dark:bg-amber-500/10"
                />
              </div>
            </AnalyticsChart>

            <AnalyticsChart title="Performance Metrics" subtitle="System performance indicators">
              <div className="space-y-4">
                <ProgressBar label="CPU Usage" value={35} color="bg-blue-600" />
                <ProgressBar label="Memory Usage" value={62} color="bg-purple-600" />
                <ProgressBar label="Disk Usage" value={48} color="bg-green-600" />
                <ProgressBar label="Network I/O" value={28} color="bg-amber-600" />
              </div>
            </AnalyticsChart>
          </div>
        </div>
      )}
    </div>
  )
}
