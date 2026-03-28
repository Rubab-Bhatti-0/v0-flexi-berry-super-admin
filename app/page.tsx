'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun, LogOut, Bell, Search, Plus, Edit2, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTheme } from 'next-themes'

const PAGES = {
  DASHBOARD: 'dashboard',
  SHOPS: 'shops',
  ADMINS: 'admins',
  USERS: 'users',
  VERIFICATION: 'verification',
  PRODUCTS: 'products',
  CATEGORIES: 'categories',
  INSTALLMENTS: 'installments',
  RECOVERY: 'recovery',
  ANALYTICS: 'analytics',
  SETTINGS: 'settings',
}

export default function Dashboard() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentPage, setCurrentPage] = useState(PAGES.DASHBOARD)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPageNum, setCurrentPageNum] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock data
  const shops = [
    { id: 1, name: 'Electronics Store', owner: 'John Doe', revenue: 45000, status: 'active', date: '2024-01-15' },
    { id: 2, name: 'Fashion Hub', owner: 'Jane Smith', revenue: 32000, status: 'active', date: '2024-01-16' },
    { id: 3, name: 'Home Goods', owner: 'Mike Johnson', revenue: 28000, status: 'suspended', date: '2024-01-17' },
    { id: 4, name: 'Tech Solutions', owner: 'Sarah Davis', revenue: 56000, status: 'active', date: '2024-01-18' },
  ]

  const users = [
    { id: 1, name: 'Alex Taylor', email: 'alex@email.com', phone: '+1-555-0001', status: 'active', joined: '2024-01-10' },
    { id: 2, name: 'Emma Wilson', email: 'emma@email.com', phone: '+1-555-0002', status: 'active', joined: '2024-01-12' },
    { id: 3, name: 'David Brown', email: 'david@email.com', phone: '+1-555-0003', status: 'suspended', joined: '2024-01-08' },
    { id: 4, name: 'Lisa Anderson', email: 'lisa@email.com', phone: '+1-555-0004', status: 'active', joined: '2024-01-14' },
  ]

  const admins = [
    { id: 1, name: 'Admin User', email: 'admin@flexiberry.com', role: 'Super Admin', status: 'active' },
    { id: 2, name: 'Support Lead', email: 'support@flexiberry.com', role: 'Admin', status: 'active' },
  ]

  const products = [
    { id: 1, name: 'Wireless Headphones', sku: 'WH-001', category: 'Electronics', price: 79.99, stock: 250, status: 'active' },
    { id: 2, name: 'Running Shoes', sku: 'RS-002', category: 'Sports', price: 129.99, stock: 180, status: 'active' },
    { id: 3, name: 'Coffee Maker', sku: 'CM-003', category: 'Home', price: 199.99, stock: 45, status: 'low-stock' },
  ]

  const kyc = [
    { id: 1, name: 'John Doe', type: 'Individual', docs: 'ID, Selfie', status: 'pending', date: '2024-01-20' },
    { id: 2, name: 'Tech Company', type: 'Business', docs: 'Certificate', status: 'approved', date: '2024-01-19' },
  ]

  const statCards = [
    { label: 'Total Revenue', value: '$2.4M', change: '+12.5%', type: 'up', icon: '💰', color: 'from-teal-500 to-teal-600' },
    { label: 'Active Shops', value: '1,234', change: '+5.2%', type: 'up', icon: '🏪', color: 'from-blue-500 to-blue-600' },
    { label: 'Total Users', value: '5,678', change: '+8.1%', type: 'up', icon: '👥', color: 'from-purple-500 to-purple-600' },
    { label: 'Pending KYC', value: '23', change: '-2.4%', type: 'down', icon: '✓', color: 'from-amber-500 to-amber-600' },
    { label: 'Active Orders', value: '834', change: '+15.3%', type: 'up', icon: '📦', color: 'from-green-500 to-green-600' },
    { label: 'Support Tickets', value: '45', change: '+3.2%', type: 'up', icon: '🎫', color: 'from-red-500 to-red-600' },
  ]

  const navSections = [
    {
      title: 'DASHBOARD',
      items: [
        { id: PAGES.DASHBOARD, label: 'Dashboard', icon: '📊' },
        { id: PAGES.ANALYTICS, label: 'Analytics', icon: '📈' },
      ],
    },
    {
      title: 'MANAGEMENT',
      items: [
        { id: PAGES.SHOPS, label: 'Shops', icon: '🏪' },
        { id: PAGES.ADMINS, label: 'Admins', icon: '🔐' },
        { id: PAGES.USERS, label: 'Users', icon: '👥' },
      ],
    },
    {
      title: 'OPERATIONS',
      items: [
        { id: PAGES.VERIFICATION, label: 'KYC Verification', icon: '✓', badge: 23 },
        { id: PAGES.PRODUCTS, label: 'Products', icon: '📦' },
        { id: PAGES.CATEGORIES, label: 'Categories', icon: '🏷️' },
        { id: PAGES.INSTALLMENTS, label: 'Installments', icon: '💳' },
        { id: PAGES.RECOVERY, label: 'Recovery', icon: '🔄' },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { id: PAGES.SETTINGS, label: 'Settings', icon: '⚙️' },
      ],
    },
  ]

  const filteredShops = shops.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getFilteredData = () => {
    switch (currentPage) {
      case PAGES.SHOPS:
        return filteredShops
      case PAGES.USERS:
        return filteredUsers
      case PAGES.PRODUCTS:
        return filteredProducts
      default:
        return []
    }
  }

  const filteredData = getFilteredData()
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPageNum - 1) * itemsPerPage, currentPageNum * itemsPerPage)

  if (!mounted) return null

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0A0E1A] text-gray-900 dark:text-[#E8EDF5]">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-60 flex flex-col bg-white dark:bg-[#0F1522] border-r border-gray-200 dark:border-[rgba(255,255,255,0.07)] z-50 transition-transform duration-300 md:translate-x-0 ${!sidebarOpen ? '-translate-x-full' : 'translate-x-0'}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-gray-200 dark:border-[rgba(255,255,255,0.07)]">
          <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">FB</div>
          <div>
            <div className="text-sm font-bold text-gray-900 dark:text-[#E8EDF5]">FlexiBerry</div>
            <div className="text-xs font-semibold text-teal-600 dark:text-[#00D4C8] uppercase tracking-wider">Admin</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {navSections.map((section) => (
            <div key={section.title}>
              <div className="px-4 py-3 text-xs font-bold text-gray-500 dark:text-[#5A6478] uppercase tracking-wider">{section.title}</div>
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id)
                    setCurrentPageNum(1)
                    setSearchTerm('')
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 m-1 rounded-lg transition-all duration-150 text-sm font-medium ${
                    currentPage === item.id
                      ? 'bg-teal-100 dark:bg-[rgba(0,212,200,0.08)] text-teal-600 dark:text-[#00D4C8]'
                      : 'text-gray-600 dark:text-[#8A94A8] hover:bg-gray-100 dark:hover:bg-[#1C2438]'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">JD</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-gray-900 dark:text-[#E8EDF5] truncate">John Doe</div>
              <div className="text-xs text-gray-500 dark:text-[#5A6478] truncate">john@admin.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:ml-60 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-40 bg-white dark:bg-[#0F1522] border-b border-gray-200 dark:border-[rgba(255,255,255,0.07)] px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden w-9 h-9 rounded-lg bg-gray-100 dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] flex items-center justify-center cursor-pointer text-gray-600 dark:text-[#8A94A8] hover:text-gray-900 dark:hover:text-[#E8EDF5]"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-lg font-bold text-gray-900 dark:text-[#E8EDF5] hidden md:block">
              {navSections.flatMap(s => s.items).find(i => i.id === currentPage)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg px-3 h-9 w-56">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPageNum(1)
                }}
                className="w-full bg-transparent border-none outline-none text-sm text-gray-900 dark:text-[#E8EDF5]"
              />
            </div>
            <button className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] flex items-center justify-center cursor-pointer text-gray-600 dark:text-[#8A94A8] hover:text-gray-900 dark:hover:text-[#E8EDF5] relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white dark:border-[#0F1522]"></span>
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] flex items-center justify-center cursor-pointer text-gray-600 dark:text-[#8A94A8] hover:text-gray-900 dark:hover:text-[#E8EDF5]"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] flex items-center justify-center cursor-pointer text-gray-600 dark:text-[#8A94A8] hover:text-gray-900 dark:hover:text-[#E8EDF5]">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {/* Dashboard Page */}
          {currentPage === PAGES.DASHBOARD && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {statCards.map((card, idx) => (
                  <div key={idx} className={`bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors`}>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-3 bg-gradient-to-br ${card.color} text-white`}>{card.icon}</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-[#E8EDF5] mb-1 font-mono">{card.value}</div>
                    <div className="text-xs text-gray-600 dark:text-[#8A94A8] font-medium mb-2">{card.label}</div>
                    <div className={`text-xs font-semibold ${card.type === 'up' ? 'text-green-600 dark:text-[#22C55E]' : 'text-red-600 dark:text-[#EF4444]'}`}>
                      {card.type === 'up' ? '↑' : '↓'} {card.change}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-[#E8EDF5] mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex gap-3 pb-3 border-b border-gray-200 dark:border-[rgba(255,255,255,0.07)] last:border-b-0">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold">U</div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-[#E8EDF5]">New shop registered</div>
                          <div className="text-xs text-gray-500 dark:text-[#5A6478]">2 hours ago</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-[#E8EDF5] mb-4">Top Categories</h3>
                  <div className="space-y-3">
                    {[{ name: 'Electronics', icon: '🔌', items: 234 }, { name: 'Fashion', icon: '👗', items: 456 }, { name: 'Home', icon: '🏠', items: 189 }, { name: 'Sports', icon: '⚽', items: 123 }].map((cat, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{cat.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white text-sm">{cat.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{cat.items} items</div>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-teal-600 dark:text-teal-400">{cat.items}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shops Page */}
          {currentPage === PAGES.SHOPS && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Shops</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Control and monitor all shops</p>
                </div>
                <button className="w-full md:w-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-[#00D4C8] dark:hover:bg-[#00A89E] text-white font-semibold text-sm transition-colors">
                  <Plus size={18} /> Add Shop
                </button>
              </div>

              <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-gray-200 dark:border-[rgba(255,255,255,0.07)]">
                  <div className="w-full md:w-56 flex items-center gap-2 bg-gray-100 dark:bg-[#0F1522] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg px-3 h-9">
                    <Search size={16} className="text-gray-400" />
                    <input type="text" placeholder="Search shops..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPageNum(1); }} className="w-full bg-transparent border-none outline-none text-sm text-gray-900 dark:text-[#E8EDF5]" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-[#0F1522]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Shop</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Owner</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Revenue</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.length > 0 ? paginatedData.map(shop => (
                        <tr key={shop.id} className="border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)] hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.02)]">
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-[#E8EDF5]">{shop.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{shop.owner}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-green-600 dark:text-green-400">${shop.revenue.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm"><span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${shop.status === 'active' ? 'bg-green-100 dark:bg-[rgba(34,197,94,0.08)] text-green-700 dark:text-[#22C55E]' : 'bg-red-100 dark:bg-[rgba(239,68,68,0.08)] text-red-700 dark:text-[#EF4444]'}`}><span className="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>{shop.status}</span></td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{shop.date}</td>
                          <td className="px-4 py-3 text-sm flex items-center gap-1"><button className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer text-xs transition-all duration-150 bg-transparent text-gray-500 dark:text-[#5A6478] hover:bg-gray-100 dark:hover:bg-[#1C2438] hover:text-gray-700 dark:hover:text-[#E8EDF5]"><Eye size={16} /></button></td>
                        </tr>
                      )) : <tr><td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">No shops found</td></tr>}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)]">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Page {currentPageNum} of {totalPages}</div>
                    <div className="flex gap-2"><button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#1C2438] dark:hover:bg-[#252E42] text-gray-900 dark:text-[#E8EDF5] text-sm font-semibold cursor-pointer border border-gray-200 dark:border-[rgba(255,255,255,0.12)] transition-all disabled:opacity-50" onClick={() => setCurrentPageNum(Math.max(1, currentPageNum - 1))} disabled={currentPageNum === 1}><ChevronLeft size={16} /></button><button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#1C2438] dark:hover:bg-[#252E42] text-gray-900 dark:text-[#E8EDF5] text-sm font-semibold cursor-pointer border border-gray-200 dark:border-[rgba(255,255,255,0.12)] transition-all disabled:opacity-50" onClick={() => setCurrentPageNum(Math.min(totalPages, currentPageNum + 1))} disabled={currentPageNum === totalPages}><ChevronRight size={16} /></button></div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Users Page */}
          {currentPage === PAGES.USERS && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Users</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monitor and manage user accounts</p>
                </div>
                <button className="w-full md:w-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-[#00D4C8] dark:hover:bg-[#00A89E] text-white font-semibold text-sm transition-colors"><Plus size={18} /> Add User</button>
              </div>

              <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-gray-200 dark:border-[rgba(255,255,255,0.07)]">
                  <div className="w-full md:w-56 flex items-center gap-2 bg-gray-100 dark:bg-[#0F1522] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg px-3 h-9"><Search size={16} className="text-gray-400" /><input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPageNum(1); }} className="w-full bg-transparent border-none outline-none text-sm text-gray-900 dark:text-[#E8EDF5]" /></div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-[#0F1522]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Joined</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.length > 0 ? paginatedData.map(user => (
                        <tr key={user.id} className="border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)] hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.02)]">
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-[#E8EDF5]">{user.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{user.email}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{user.phone}</td>
                          <td className="px-4 py-3 text-sm"><span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${user.status === 'active' ? 'bg-green-100 dark:bg-[rgba(34,197,94,0.08)] text-green-700 dark:text-[#22C55E]' : 'bg-red-100 dark:bg-[rgba(239,68,68,0.08)] text-red-700 dark:text-[#EF4444]'}`}><span className="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>{user.status}</span></td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{user.joined}</td>
                          <td className="px-4 py-3 text-sm flex items-center gap-1"><button className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer text-xs transition-all duration-150 bg-transparent text-gray-500 dark:text-[#5A6478] hover:bg-gray-100 dark:hover:bg-[#1C2438] hover:text-gray-700 dark:hover:text-[#E8EDF5]"><Eye size={16} /></button></td>
                        </tr>
                      )) : <tr><td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">No users found</td></tr>}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)]">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Page {currentPageNum} of {totalPages}</div>
                    <div className="flex gap-2"><button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#1C2438] dark:hover:bg-[#252E42] text-gray-900 dark:text-[#E8EDF5] text-sm font-semibold cursor-pointer border border-gray-200 dark:border-[rgba(255,255,255,0.12)] transition-all disabled:opacity-50" onClick={() => setCurrentPageNum(Math.max(1, currentPageNum - 1))} disabled={currentPageNum === 1}><ChevronLeft size={16} /></button><button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#1C2438] dark:hover:bg-[#252E42] text-gray-900 dark:text-[#E8EDF5] text-sm font-semibold cursor-pointer border border-gray-200 dark:border-[rgba(255,255,255,0.12)] transition-all disabled:opacity-50" onClick={() => setCurrentPageNum(Math.min(totalPages, currentPageNum + 1))} disabled={currentPageNum === totalPages}><ChevronRight size={16} /></button></div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Admins Page */}
          {currentPage === PAGES.ADMINS && (
            <div className="space-y-4">
              <div><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Admins</h2><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Control admin access and permissions</p></div>
              <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-[#0F1522]"><tr><th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Name</th><th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Email</th><th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Role</th><th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Status</th></tr></thead>
                    <tbody>{admins.map(admin => (<tr key={admin.id} className="border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)] hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.02)]"><td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-[#E8EDF5]">{admin.name}</td><td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{admin.email}</td><td className="px-4 py-3 text-sm"><span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-[rgba(59,130,246,0.08)] text-blue-700 dark:text-[#3B82F6]"><span className="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>{admin.role}</span></td><td className="px-4 py-3 text-sm"><span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${admin.status === 'active' ? 'bg-green-100 dark:bg-[rgba(34,197,94,0.08)] text-green-700 dark:text-[#22C55E]' : 'bg-red-100 dark:bg-[rgba(239,68,68,0.08)] text-red-700 dark:text-[#EF4444]'}`}><span className="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>{admin.status}</span></td></tr>))}</tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Products Page */}
          {currentPage === PAGES.PRODUCTS && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"><div><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Products</h2><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Control and monitor all products</p></div><button className="w-full md:w-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-[#00D4C8] dark:hover:bg-[#00A89E] text-white font-semibold text-sm transition-colors"><Plus size={18} /> Add Product</button></div>
              <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-gray-200 dark:border-[rgba(255,255,255,0.07)]"><div className="w-full md:w-56 flex items-center gap-2 bg-gray-100 dark:bg-[#0F1522] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg px-3 h-9"><Search size={16} className="text-gray-400" /><input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPageNum(1); }} className="w-full bg-transparent border-none outline-none text-sm text-gray-900 dark:text-[#E8EDF5]" /></div></div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-[#0F1522]"><tr><th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Product</th><th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">SKU</th><th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Category</th><th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Price</th><th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Stock</th><th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Status</th></tr></thead>
                    <tbody>{paginatedData.length > 0 ? paginatedData.map(product => (<tr key={product.id} className="border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)] hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.02)]"><td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-[#E8EDF5]">{product.name}</td><td className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-[#8A94A8]">{product.sku}</td><td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{product.category}</td><td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-[#E8EDF5]">${product.price}</td><td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{product.stock}</td><td className="px-4 py-3 text-sm"><span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${product.status === 'active' ? 'bg-green-100 dark:bg-[rgba(34,197,94,0.08)] text-green-700 dark:text-[#22C55E]' : 'bg-amber-100 dark:bg-[rgba(245,158,11,0.08)] text-amber-700 dark:text-[#F59E0B]'}`}><span className="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>{product.status}</span></td></tr>)) : <tr><td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">No products found</td></tr>}</tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)]"><div className="text-sm text-gray-600 dark:text-gray-400">Page {currentPageNum} of {totalPages}</div><div className="flex gap-2"><button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#1C2438] dark:hover:bg-[#252E42] text-gray-900 dark:text-[#E8EDF5] text-sm font-semibold cursor-pointer border border-gray-200 dark:border-[rgba(255,255,255,0.12)] transition-all disabled:opacity-50" onClick={() => setCurrentPageNum(Math.max(1, currentPageNum - 1))} disabled={currentPageNum === 1}><ChevronLeft size={16} /></button><button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#1C2438] dark:hover:bg-[#252E42] text-gray-900 dark:text-[#E8EDF5] text-sm font-semibold cursor-pointer border border-gray-200 dark:border-[rgba(255,255,255,0.12)] transition-all disabled:opacity-50" onClick={() => setCurrentPageNum(Math.min(totalPages, currentPageNum + 1))} disabled={currentPageNum === totalPages}><ChevronRight size={16} /></button></div></div>
                )}
              </div>
            </div>
          )}

          {/* Other Pages */}
          {[PAGES.VERIFICATION, PAGES.CATEGORIES, PAGES.INSTALLMENTS, PAGES.RECOVERY, PAGES.ANALYTICS, PAGES.SETTINGS].includes(currentPage) && (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Coming Soon</h2>
              <p className="text-gray-500 dark:text-gray-400">This page is under development</p>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>}
    </div>
  )
}
