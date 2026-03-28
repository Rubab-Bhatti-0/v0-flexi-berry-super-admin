'use client'

import { useState, useMemo } from 'react'
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
  const [currentPage, setCurrentPage] = useState(PAGES.DASHBOARD)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeModal, setActiveModal] = useState(null)
  const [currentPageNum, setCurrentPageNum] = useState(1)
  const itemsPerPage = 10

  // Mock data
  const shops = [
    { id: 1, name: 'Electronics Store', owner: 'John Doe', revenue: 45000, status: 'active', date: '2024-01-15' },
    { id: 2, name: 'Fashion Hub', owner: 'Jane Smith', revenue: 32000, status: 'active', date: '2024-01-16' },
    { id: 3, name: 'Home Goods', owner: 'Mike Johnson', revenue: 28000, status: 'suspended', date: '2024-01-17' },
    { id: 4, name: 'Beauty Plus', owner: 'Sarah Williams', revenue: 51000, status: 'active', date: '2024-01-18' },
    { id: 5, name: 'Sports Zone', owner: 'Tom Brown', revenue: 22000, status: 'active', date: '2024-01-19' },
  ]

  const admins = [
    { id: 1, name: 'Admin User', email: 'admin@flexiberry.com', role: 'Super Admin', status: 'active', lastLogin: '2024-01-20' },
    { id: 2, name: 'Support Lead', email: 'support@flexiberry.com', role: 'Admin', status: 'active', lastLogin: '2024-01-20' },
    { id: 3, name: 'Analytics Team', email: 'analytics@flexiberry.com', role: 'Editor', status: 'inactive', lastLogin: '2024-01-18' },
  ]

  const users = [
    { id: 1, name: 'Alex Taylor', email: 'alex@email.com', phone: '+1-555-0001', status: 'active', joinDate: '2024-01-10' },
    { id: 2, name: 'Emma Wilson', email: 'emma@email.com', phone: '+1-555-0002', status: 'active', joinDate: '2024-01-12' },
    { id: 3, name: 'David Brown', email: 'david@email.com', phone: '+1-555-0003', status: 'suspended', joinDate: '2024-01-08' },
    { id: 4, name: 'Lisa Anderson', email: 'lisa@email.com', phone: '+1-555-0004', status: 'active', joinDate: '2024-01-14' },
    { id: 5, name: 'James Martinez', email: 'james@email.com', phone: '+1-555-0005', status: 'active', joinDate: '2024-01-11' },
  ]

  const kyc = [
    { id: 1, name: 'John Doe', type: 'Individual', documents: 'ID, Selfie', status: 'pending', submittedDate: '2024-01-20' },
    { id: 2, name: 'Tech Company Inc', type: 'Business', documents: 'Certificate, Bank Statement', status: 'approved', submittedDate: '2024-01-19' },
    { id: 3, name: 'Sarah Williams', type: 'Individual', documents: 'Passport, Utility Bill', status: 'rejected', submittedDate: '2024-01-18' },
  ]

  const products = [
    { id: 1, name: 'Wireless Headphones', sku: 'WH-001', category: 'Electronics', price: 79.99, stock: 250, status: 'active' },
    { id: 2, name: 'Running Shoes', sku: 'RS-002', category: 'Sports', price: 129.99, stock: 180, status: 'active' },
    { id: 3, name: 'Coffee Maker', sku: 'CM-003', category: 'Home', price: 199.99, stock: 45, status: 'low stock' },
    { id: 4, name: 'Summer Dress', sku: 'SD-004', category: 'Fashion', price: 49.99, stock: 0, status: 'out of stock' },
  ]

  const categories = [
    { id: 1, name: 'Electronics', items: 234, icon: '🔌' },
    { id: 2, name: 'Fashion', items: 456, icon: '👗' },
    { id: 3, name: 'Home & Garden', items: 189, icon: '🏠' },
    { id: 4, name: 'Sports', items: 123, icon: '⚽' },
    { id: 5, name: 'Beauty', items: 345, icon: '💄' },
  ]

  const installments = [
    { id: 1, order: 'ORD-001', customer: 'John Doe', amount: 1200, installments: '3 x $400', status: 'active' },
    { id: 2, order: 'ORD-002', customer: 'Jane Smith', amount: 850, installments: '2 x $425', status: 'completed' },
    { id: 3, order: 'ORD-003', customer: 'Mike Johnson', amount: 2500, installments: '5 x $500', status: 'overdue' },
  ]

  const recovery = [
    { id: 1, username: 'user_123', method: 'Email', status: 'pending', requestedDate: '2024-01-20' },
    { id: 2, username: 'alex_profile', method: 'Phone', status: 'verified', requestedDate: '2024-01-19' },
    { id: 3, username: 'emma_store', method: 'Email', status: 'completed', requestedDate: '2024-01-18' },
  ]

  const activity = [
    { id: 1, action: 'New shop registered', user: 'Beauty Plus', time: '2 hours ago' },
    { id: 2, action: 'User account suspended', user: 'David Brown', time: '5 hours ago' },
    { id: 3, action: 'KYC approved', user: 'Tech Company', time: '8 hours ago' },
    { id: 4, action: 'Payment processed', user: 'Order #1234', time: '1 day ago' },
  ]

  const statCards = [
    { label: 'Total Revenue', value: '$2.4M', change: '+12.5%', type: 'up', color: 'teal', icon: '💰' },
    { label: 'Active Shops', value: '1,234', change: '+5.2%', type: 'up', color: 'blue', icon: '🏪' },
    { label: 'Total Users', value: '5,678', change: '+8.1%', type: 'up', color: 'purple', icon: '👥' },
    { label: 'Pending KYC', value: '23', change: '-2.4%', type: 'down', color: 'amber', icon: '✓' },
    { label: 'Active Orders', value: '834', change: '+15.3%', type: 'up', color: 'green', icon: '📦' },
    { label: 'Support Tickets', value: '45', change: '+3.2%', type: 'up', color: 'red', icon: '🎫' },
  ]

  // Filtered data
  const filteredShops = shops.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.owner.toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase()))

  // Pagination
  const paginatedData = useMemo(() => {
    let data = []
    if (currentPage === PAGES.SHOPS) data = filteredShops
    else if (currentPage === PAGES.USERS) data = filteredUsers
    else if (currentPage === PAGES.PRODUCTS) data = filteredProducts
    const start = (currentPageNum - 1) * itemsPerPage
    return data.slice(start, start + itemsPerPage)
  }, [currentPage, currentPageNum, filteredShops, filteredUsers, filteredProducts])

  const totalPages = Math.ceil(
    (currentPage === PAGES.SHOPS ? filteredShops.length : 
     currentPage === PAGES.USERS ? filteredUsers.length :
     currentPage === PAGES.PRODUCTS ? filteredProducts.length : itemsPerPage) / itemsPerPage
  )

  const closeModal = () => setActiveModal(null)

  const navItems = [
    { id: PAGES.DASHBOARD, label: 'Dashboard', icon: '📊', section: 'Dashboard' },
    { id: PAGES.ANALYTICS, label: 'Analytics', icon: '📈', section: 'Dashboard' },
    { id: PAGES.SHOPS, label: 'Shops', icon: '🏪', section: 'Management' },
    { id: PAGES.ADMINS, label: 'Admins', icon: '🔐', section: 'Management' },
    { id: PAGES.USERS, label: 'Users', icon: '👥', section: 'Management' },
    { id: PAGES.VERIFICATION, label: 'KYC Verification', icon: '✓', section: 'Operations', badge: 23 },
    { id: PAGES.PRODUCTS, label: 'Products', icon: '📦', section: 'Operations' },
    { id: PAGES.CATEGORIES, label: 'Categories', icon: '🏷️', section: 'Operations' },
    { id: PAGES.INSTALLMENTS, label: 'Installments', icon: '💳', section: 'Operations' },
    { id: PAGES.RECOVERY, label: 'Account Recovery', icon: '🔄', section: 'Operations' },
    { id: PAGES.SETTINGS, label: 'Settings', icon: '⚙️', section: 'System' },
  ]

  const sections = ['Dashboard', 'Management', 'Operations', 'System']

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0A0E1A] transition-colors duration-200">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-60 flex flex-col bg-white dark:bg-[#0F1522] border-r border-gray-200 dark:border-[rgba(255,255,255,0.07)] z-[100] transition-all duration-300 ${!sidebarOpen ? '-translate-x-full' : 'translate-x-0'} md:translate-x-0`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b border-gray-200 dark:border-[rgba(255,255,255,0.07)]">
          <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-black text-lg flex-shrink-0">FB</div>
          <div className="flex flex-col">
            <div className="text-sm font-bold text-gray-900 dark:text-[#E8EDF5] tracking-tight">FlexiBerry</div>
            <div className="text-xs font-semibold text-teal-600 dark:text-[#00D4C8] uppercase tracking-widest">Admin</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {sections.map(section => (
            <div key={section}>
              <div className="px-4 py-3 text-xs font-bold text-gray-500 dark:text-[#5A6478] uppercase tracking-wider">
                {section}
              </div>
              {navItems.filter(item => item.section === section).map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id)
                    setCurrentPageNum(1)
                    setSearchTerm('')
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 m-1 rounded-lg cursor-pointer transition-all duration-150 text-sm font-medium relative ${
                    currentPage === item.id
                      ? 'bg-teal-50 dark:bg-[rgba(0,212,200,0.08)] text-teal-600 dark:text-[#00D4C8]'
                      : 'text-gray-600 dark:text-[#8A94A8] hover:bg-gray-100 dark:hover:bg-[#1C2438]'
                  }`}
                >
                  {currentPage === item.id && <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-5 bg-teal-600 dark:bg-[#00D4C8] rounded-r"></div>}
                  <span className="text-base">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">JD</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-gray-900 dark:text-[#E8EDF5] truncate">John Doe</div>
              <div className="text-xs text-gray-500 dark:text-[#5A6478] truncate">john@admin.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <div className="flex-1 ml-0 md:ml-60 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-40 bg-white dark:bg-[#0F1522] border-b border-gray-200 dark:border-[rgba(255,255,255,0.07)] px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden w-9 h-9 rounded-lg bg-gray-100 dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] flex items-center justify-center cursor-pointer text-gray-600 dark:text-[#8A94A8] hover:text-gray-900 dark:hover:text-[#E8EDF5] transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-lg font-bold text-gray-900 dark:text-[#E8EDF5] hidden md:block">
              {navItems.find(i => i.id === currentPage)?.label || 'Dashboard'}
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
            <button className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] flex items-center justify-center cursor-pointer text-gray-600 dark:text-[#8A94A8] hover:text-gray-900 dark:hover:text-[#E8EDF5] transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white dark:border-[#0F1522]"></span>
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] flex items-center justify-center cursor-pointer text-gray-600 dark:text-[#8A94A8] hover:text-gray-900 dark:hover:text-[#E8EDF5] transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] flex items-center justify-center cursor-pointer text-gray-600 dark:text-[#8A94A8] hover:text-gray-900 dark:hover:text-[#E8EDF5] transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {/* Dashboard Page */}
          {currentPage === PAGES.DASHBOARD && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {statCards.map((card, idx) => (
                  <div key={idx} className={`bg-white dark:bg-[#161C2D] border-l-4 border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors ${
                    card.color === 'teal' ? 'border-l-teal-500' :
                    card.color === 'blue' ? 'border-l-blue-500' :
                    card.color === 'purple' ? 'border-l-purple-500' :
                    card.color === 'amber' ? 'border-l-amber-500' :
                    card.color === 'green' ? 'border-l-green-500' :
                    'border-l-red-500'
                  }`}>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-3 ${
                      card.color === 'teal' ? 'bg-teal-100 dark:bg-[rgba(0,212,200,0.08)]' :
                      card.color === 'blue' ? 'bg-blue-100 dark:bg-[rgba(59,130,246,0.08)]' :
                      card.color === 'purple' ? 'bg-purple-100 dark:bg-[rgba(168,85,247,0.08)]' :
                      card.color === 'amber' ? 'bg-amber-100 dark:bg-[rgba(245,158,11,0.08)]' :
                      card.color === 'green' ? 'bg-green-100 dark:bg-[rgba(34,197,94,0.08)]' :
                      'bg-red-100 dark:bg-[rgba(239,68,68,0.08)]'
                    }`}>{card.icon}</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-[#E8EDF5] mb-1">{card.value}</div>
                    <div className="text-xs text-gray-600 dark:text-[#8A94A8] font-medium mb-2">{card.label}</div>
                    <div className={`text-xs font-semibold ${card.type === 'up' ? 'text-green-600 dark:text-[#22C55E]' : 'text-red-600 dark:text-[#EF4444]'}`}>
                      {card.type === 'up' ? '↑' : '↓'} {card.change}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg p-5">
                  <div className="text-lg font-bold text-gray-900 dark:text-[#E8EDF5] mb-6">Recent Activity</div>
                  {activity.map(item => (
                    <div key={item.id} className="flex gap-3 pb-4 mb-4 border-b border-gray-200 dark:border-[rgba(255,255,255,0.07)] last:border-b-0">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {item.user.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-[#E8EDF5]">{item.action}</div>
                        <div className="text-xs text-gray-500 dark:text-[#5A6478]">{item.user} · {item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg p-5">
                  <div className="text-lg font-bold text-gray-900 dark:text-[#E8EDF5] mb-6">Top Categories</div>
                  {categories.slice(0, 4).map(cat => (
                    <div key={cat.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
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
          )}

          {/* Shops Page */}
          {currentPage === PAGES.SHOPS && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Shops</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Control and monitor all shops on the platform</p>
                </div>
                <button className="w-full md:w-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-[#00D4C8] dark:hover:bg-[#00A89E] text-white font-semibold text-sm transition-colors">
                  <Plus size={18} /> Add Shop
                </button>
              </div>

              <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-gray-200 dark:border-[rgba(255,255,255,0.07)]">
                  <div className="w-full md:w-56 flex items-center gap-2 bg-gray-100 dark:bg-[#0F1522] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg px-3 h-9">
                    <Search size={16} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search shops..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPageNum(1)
                      }}
                      className="w-full bg-transparent border-none outline-none text-sm text-gray-900 dark:text-[#E8EDF5]"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-[#0F1522]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Shop Name</th>
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
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                              shop.status === 'active' 
                                ? 'bg-green-100 dark:bg-[rgba(34,197,94,0.08)] text-green-700 dark:text-[#22C55E]'
                                : 'bg-red-100 dark:bg-[rgba(239,68,68,0.08)] text-red-700 dark:text-[#EF4444]'
                            }`}>
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>
                              {shop.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{shop.date}</td>
                          <td className="px-4 py-3 text-sm flex items-center gap-1">
                            <button className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer text-xs transition-all duration-150 bg-transparent text-gray-500 dark:text-[#5A6478] hover:bg-gray-100 dark:hover:bg-[#1C2438] hover:text-gray-700 dark:hover:text-[#E8EDF5]">
                              <Eye size={16} />
                            </button>
                            <button className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer text-xs transition-all duration-150 bg-transparent text-gray-500 dark:text-[#5A6478] hover:bg-gray-100 dark:hover:bg-[#1C2438] hover:text-gray-700 dark:hover:text-[#E8EDF5]">
                              <Edit2 size={16} />
                            </button>
                            <button className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer text-xs transition-all duration-150 bg-transparent text-gray-500 dark:text-[#5A6478] hover:bg-red-100 dark:hover:bg-[rgba(239,68,68,0.08)] hover:text-red-600 dark:hover:text-[#EF4444]">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">No shops found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)]">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Page {currentPageNum} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#1C2438] dark:hover:bg-[#252E42] text-gray-900 dark:text-[#E8EDF5] text-sm font-semibold cursor-pointer border border-gray-200 dark:border-[rgba(255,255,255,0.12)] transition-all disabled:opacity-50"
                        onClick={() => setCurrentPageNum(Math.max(1, currentPageNum - 1))}
                        disabled={currentPageNum === 1}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#1C2438] dark:hover:bg-[#252E42] text-gray-900 dark:text-[#E8EDF5] text-sm font-semibold cursor-pointer border border-gray-200 dark:border-[rgba(255,255,255,0.12)] transition-all disabled:opacity-50"
                        onClick={() => setCurrentPageNum(Math.min(totalPages, currentPageNum + 1))}
                        disabled={currentPageNum === totalPages}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
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
                <button className="w-full md:w-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-[#00D4C8] dark:hover:bg-[#00A89E] text-white font-semibold text-sm transition-colors">
                  <Plus size={18} /> Add User
                </button>
              </div>

              <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-gray-200 dark:border-[rgba(255,255,255,0.07)]">
                  <div className="w-full md:w-56 flex items-center gap-2 bg-gray-100 dark:bg-[#0F1522] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg px-3 h-9">
                    <Search size={16} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPageNum(1)
                      }}
                      className="w-full bg-transparent border-none outline-none text-sm text-gray-900 dark:text-[#E8EDF5]"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-[#0F1522]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Join Date</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.length > 0 ? paginatedData.map(user => (
                        <tr key={user.id} className="border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)] hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.02)]">
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-[#E8EDF5]">{user.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{user.email}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{user.phone}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                              user.status === 'active' 
                                ? 'bg-green-100 dark:bg-[rgba(34,197,94,0.08)] text-green-700 dark:text-[#22C55E]'
                                : 'bg-red-100 dark:bg-[rgba(239,68,68,0.08)] text-red-700 dark:text-[#EF4444]'
                            }`}>
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{user.joinDate}</td>
                          <td className="px-4 py-3 text-sm flex items-center gap-1">
                            <button className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer text-xs transition-all duration-150 bg-transparent text-gray-500 dark:text-[#5A6478] hover:bg-gray-100 dark:hover:bg-[#1C2438] hover:text-gray-700 dark:hover:text-[#E8EDF5]">
                              <Eye size={16} />
                            </button>
                            <button className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer text-xs transition-all duration-150 bg-transparent text-gray-500 dark:text-[#5A6478] hover:bg-gray-100 dark:hover:bg-[#1C2438] hover:text-gray-700 dark:hover:text-[#E8EDF5]">
                              <Edit2 size={16} />
                            </button>
                            <button className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer text-xs transition-all duration-150 bg-transparent text-gray-500 dark:text-[#5A6478] hover:bg-red-100 dark:hover:bg-[rgba(239,68,68,0.08)] hover:text-red-600 dark:hover:text-[#EF4444]">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="6" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">No users found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)]">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Page {currentPageNum} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#1C2438] dark:hover:bg-[#252E42] text-gray-900 dark:text-[#E8EDF5] text-sm font-semibold cursor-pointer border border-gray-200 dark:border-[rgba(255,255,255,0.12)] transition-all disabled:opacity-50"
                        onClick={() => setCurrentPageNum(Math.max(1, currentPageNum - 1))}
                        disabled={currentPageNum === 1}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#1C2438] dark:hover:bg-[#252E42] text-gray-900 dark:text-[#E8EDF5] text-sm font-semibold cursor-pointer border border-gray-200 dark:border-[rgba(255,255,255,0.12)] transition-all disabled:opacity-50"
                        onClick={() => setCurrentPageNum(Math.min(totalPages, currentPageNum + 1))}
                        disabled={currentPageNum === totalPages}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Admins Page */}
          {currentPage === PAGES.ADMINS && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Admins</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Control admin access and permissions</p>
                </div>
                <button className="w-full md:w-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-[#00D4C8] dark:hover:bg-[#00A89E] text-white font-semibold text-sm transition-colors">
                  <Plus size={18} /> Add Admin
                </button>
              </div>

              <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-[#0F1522]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Role</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Last Login</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admins.map(admin => (
                        <tr key={admin.id} className="border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)] hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.02)]">
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-[#E8EDF5]">{admin.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{admin.email}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-[rgba(59,130,246,0.08)] text-blue-700 dark:text-[#3B82F6]">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>
                              {admin.role}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                              admin.status === 'active' 
                                ? 'bg-green-100 dark:bg-[rgba(34,197,94,0.08)] text-green-700 dark:text-[#22C55E]'
                                : 'bg-red-100 dark:bg-[rgba(239,68,68,0.08)] text-red-700 dark:text-[#EF4444]'
                            }`}>
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>
                              {admin.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{admin.lastLogin}</td>
                          <td className="px-4 py-3 text-sm flex items-center gap-1">
                            <button className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer text-xs transition-all duration-150 bg-transparent text-gray-500 dark:text-[#5A6478] hover:bg-gray-100 dark:hover:bg-[#1C2438] hover:text-gray-700 dark:hover:text-[#E8EDF5]">
                              <Edit2 size={16} />
                            </button>
                            <button className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer text-xs transition-all duration-150 bg-transparent text-gray-500 dark:text-[#5A6478] hover:bg-red-100 dark:hover:bg-[rgba(239,68,68,0.08)] hover:text-red-600 dark:hover:text-[#EF4444]">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* KYC Verification Page */}
          {currentPage === PAGES.VERIFICATION && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">KYC Verification</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review and approve user verification documents</p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {kyc.map(item => (
                  <div key={item.id} className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Type: {item.type} · Submitted: {item.submittedDate}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                        item.status === 'approved' 
                          ? 'bg-green-100 dark:bg-[rgba(34,197,94,0.08)] text-green-700 dark:text-[#22C55E]'
                          : item.status === 'rejected'
                          ? 'bg-red-100 dark:bg-[rgba(239,68,68,0.08)] text-red-700 dark:text-[#EF4444]'
                          : 'bg-amber-100 dark:bg-[rgba(245,158,11,0.08)] text-amber-700 dark:text-[#F59E0B]'
                      }`}>
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>
                        {item.status}
                      </span>
                    </div>
                    <div className="bg-gray-100 dark:bg-[#0F1522] rounded-lg p-4 mb-4 text-sm text-gray-700 dark:text-gray-300">
                      Documents: {item.documents}
                    </div>
                    {item.status === 'pending' && (
                      <div className="flex gap-2">
                        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-[#00D4C8] dark:hover:bg-[#00A89E] text-white font-semibold text-sm transition-colors">
                          Approve
                        </button>
                        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-[rgba(239,68,68,0.08)] dark:hover:bg-[rgba(239,68,68,0.15)] text-red-600 dark:text-[#EF4444] font-semibold text-sm transition-colors border border-red-200 dark:border-[rgba(239,68,68,0.2)]">
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Products Page */}
          {currentPage === PAGES.PRODUCTS && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Products</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Control and monitor all products</p>
                </div>
                <button className="w-full md:w-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-[#00D4C8] dark:hover:bg-[#00A89E] text-white font-semibold text-sm transition-colors">
                  <Plus size={18} /> Add Product
                </button>
              </div>

              <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-gray-200 dark:border-[rgba(255,255,255,0.07)]">
                  <div className="w-full md:w-56 flex items-center gap-2 bg-gray-100 dark:bg-[#0F1522] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg px-3 h-9">
                    <Search size={16} className="text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPageNum(1)
                      }}
                      className="w-full bg-transparent border-none outline-none text-sm text-gray-900 dark:text-[#E8EDF5]"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-[#0F1522]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">SKU</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Price</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Stock</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.length > 0 ? paginatedData.map(product => (
                        <tr key={product.id} className="border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)] hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.02)]">
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-[#E8EDF5]">{product.name}</td>
                          <td className="px-4 py-3 text-sm font-mono text-gray-600 dark:text-[#8A94A8]">{product.sku}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{product.category}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-[#E8EDF5]">${product.price}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{product.stock}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                              product.status === 'active' 
                                ? 'bg-green-100 dark:bg-[rgba(34,197,94,0.08)] text-green-700 dark:text-[#22C55E]'
                                : product.status === 'low stock'
                                ? 'bg-amber-100 dark:bg-[rgba(245,158,11,0.08)] text-amber-700 dark:text-[#F59E0B]'
                                : 'bg-red-100 dark:bg-[rgba(239,68,68,0.08)] text-red-700 dark:text-[#EF4444]'
                            }`}>
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>
                              {product.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm flex items-center gap-1">
                            <button className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer text-xs transition-all duration-150 bg-transparent text-gray-500 dark:text-[#5A6478] hover:bg-gray-100 dark:hover:bg-[#1C2438] hover:text-gray-700 dark:hover:text-[#E8EDF5]">
                              <Edit2 size={16} />
                            </button>
                            <button className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer text-xs transition-all duration-150 bg-transparent text-gray-500 dark:text-[#5A6478] hover:bg-red-100 dark:hover:bg-[rgba(239,68,68,0.08)] hover:text-red-600 dark:hover:text-[#EF4444]">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="7" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">No products found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)]">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Page {currentPageNum} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#1C2438] dark:hover:bg-[#252E42] text-gray-900 dark:text-[#E8EDF5] text-sm font-semibold cursor-pointer border border-gray-200 dark:border-[rgba(255,255,255,0.12)] transition-all disabled:opacity-50"
                        onClick={() => setCurrentPageNum(Math.max(1, currentPageNum - 1))}
                        disabled={currentPageNum === 1}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#1C2438] dark:hover:bg-[#252E42] text-gray-900 dark:text-[#E8EDF5] text-sm font-semibold cursor-pointer border border-gray-200 dark:border-[rgba(255,255,255,0.12)] transition-all disabled:opacity-50"
                        onClick={() => setCurrentPageNum(Math.min(totalPages, currentPageNum + 1))}
                        disabled={currentPageNum === totalPages}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Categories Page */}
          {currentPage === PAGES.CATEGORIES && (
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product Categories</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage product categories</p>
                </div>
                <button className="w-full md:w-auto inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-[#00D4C8] dark:hover:bg-[#00A89E] text-white font-semibold text-sm transition-colors">
                  <Plus size={18} /> Add Category
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(cat => (
                  <div key={cat.id} className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                    <div className="text-4xl mb-4">{cat.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{cat.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{cat.items} items</p>
                    <div className="flex gap-2">
                      <button className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#1C2438] dark:hover:bg-[#252E42] text-gray-900 dark:text-[#E8EDF5] text-sm font-semibold transition-colors border border-gray-200 dark:border-[rgba(255,255,255,0.12)]">
                        <Edit2 size={14} /> Edit
                      </button>
                      <button className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-[rgba(239,68,68,0.08)] dark:hover:bg-[rgba(239,68,68,0.15)] text-red-600 dark:text-[#EF4444] text-sm font-semibold transition-colors border border-red-200 dark:border-[rgba(239,68,68,0.2)]">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Installments Page */}
          {currentPage === PAGES.INSTALLMENTS && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Installments</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage payment plans</p>
              </div>

              <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-[#0F1522]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Order ID</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Customer</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Plan</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {installments.map(inst => (
                        <tr key={inst.id} className="border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)] hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.02)]">
                          <td className="px-4 py-3 text-sm font-mono text-gray-900 dark:text-[#E8EDF5]">{inst.order}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{inst.customer}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-teal-600 dark:text-teal-400">${inst.amount}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{inst.installments}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                              inst.status === 'active'
                                ? 'bg-blue-100 dark:bg-[rgba(59,130,246,0.08)] text-blue-700 dark:text-[#3B82F6]'
                                : inst.status === 'completed'
                                ? 'bg-green-100 dark:bg-[rgba(34,197,94,0.08)] text-green-700 dark:text-[#22C55E]'
                                : 'bg-red-100 dark:bg-[rgba(239,68,68,0.08)] text-red-700 dark:text-[#EF4444]'
                            }`}>
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>
                              {inst.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm flex items-center gap-1">
                            <button className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer text-xs transition-all duration-150 bg-transparent text-gray-500 dark:text-[#5A6478] hover:bg-gray-100 dark:hover:bg-[#1C2438] hover:text-gray-700 dark:hover:text-[#E8EDF5]">
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Recovery Page */}
          {currentPage === PAGES.RECOVERY && (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Recovery Requests</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Process user account recovery requests</p>
              </div>

              <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-[#0F1522]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Username</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Method</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Requested Date</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 dark:text-[#5A6478] uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recovery.map(req => (
                        <tr key={req.id} className="border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)] hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.02)]">
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-[#E8EDF5]">{req.username}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{req.method}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                              req.status === 'completed' || req.status === 'verified'
                                ? 'bg-green-100 dark:bg-[rgba(34,197,94,0.08)] text-green-700 dark:text-[#22C55E]'
                                : 'bg-amber-100 dark:bg-[rgba(245,158,11,0.08)] text-amber-700 dark:text-[#F59E0B]'
                            }`}>
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>
                              {req.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 dark:text-[#8A94A8]">{req.requestedDate}</td>
                          <td className="px-4 py-3 text-sm">
                            <button className="w-7 h-7 rounded-md flex items-center justify-center cursor-pointer text-xs transition-all duration-150 bg-transparent text-gray-500 dark:text-[#5A6478] hover:bg-gray-100 dark:hover:bg-[#1C2438] hover:text-gray-700 dark:hover:text-[#E8EDF5]">
                              🔄
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Page */}
          {currentPage === PAGES.ANALYTICS && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Reports</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Detailed platform analytics</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg p-5">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-6">Traffic Overview</h3>
                  <div className="flex items-end gap-2 h-32">
                    {[60, 80, 45, 90, 70, 85, 95].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-teal-500 dark:bg-teal-400 rounded-t transition-opacity hover:opacity-80 cursor-pointer" style={{ height: `${height}%` }}></div>
                        <div className="text-xs text-gray-500 dark:text-[#5A6478] font-medium">{'SMTWRFS'[i]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg p-5">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-6">Conversion Rate</h3>
                  <div className="text-4xl font-bold text-teal-600 dark:text-teal-400 mb-4">3.24%</div>
                  <div className="h-1.5 bg-gray-200 dark:bg-[#0F1522] rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 dark:bg-teal-400 rounded-full" style={{ width: '32.4%' }}></div>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg p-5">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-6">Avg. Order Value</h3>
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">$284</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-3">↑ 12.5% from last month</div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Page */}
          {currentPage === PAGES.SETTINGS && (
            <div className="space-y-4 max-w-2xl">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Platform Settings</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure platform-wide settings</p>
              </div>

              <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">General Settings</h3>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-[#8A94A8] mb-2">Platform Name</label>
                  <input type="text" defaultValue="FlexiBerry" className="w-full bg-gray-50 dark:bg-[#0F1522] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg px-3.5 py-2.5 text-sm text-gray-900 dark:text-[#E8EDF5] outline-none focus:border-teal-500 dark:focus:border-[#00D4C8]" />
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-[#8A94A8] mb-2">Commission Rate (%)</label>
                  <input type="number" defaultValue="5" className="w-full bg-gray-50 dark:bg-[#0F1522] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg px-3.5 py-2.5 text-sm text-gray-900 dark:text-[#E8EDF5] outline-none focus:border-teal-500 dark:focus:border-[#00D4C8]" />
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-[#8A94A8] mb-2">Support Email</label>
                  <input type="email" defaultValue="support@flexiberry.com" className="w-full bg-gray-50 dark:bg-[#0F1522] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg px-3.5 py-2.5 text-sm text-gray-900 dark:text-[#E8EDF5] outline-none focus:border-teal-500 dark:focus:border-[#00D4C8]" />
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-[#8A94A8] mb-2">Business Type</label>
                  <select className="w-full bg-gray-50 dark:bg-[#0F1522] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg px-3.5 py-2.5 text-sm text-gray-900 dark:text-[#E8EDF5] outline-none focus:border-teal-500 dark:focus:border-[#00D4C8] appearance-none cursor-pointer">
                    <option>E-commerce Platform</option>
                    <option>Marketplace</option>
                    <option>SaaS</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 dark:bg-[#00D4C8] dark:hover:bg-[#00A89E] text-white font-semibold text-sm transition-colors">
                    Save Changes
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#1C2438] dark:hover:bg-[#252E42] text-gray-900 dark:text-[#E8EDF5] font-semibold text-sm transition-colors border border-gray-200 dark:border-[rgba(255,255,255,0.12)]">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}
                  <tbody>
                    {filterData(verifications, 'user').map(verif => (
                      <tr key={verif.id}>
                        <td className="td-name">{verif.user}</td>
                        <td><span className="badge badge-teal">{verif.type}</span></td>
                        <td>{verif.document}</td>
                        <td>
                          <span className={`badge ${verif.status === 'approved' ? 'badge-green' : verif.status === 'pending' ? 'badge-amber' : 'badge-red'}`}>
                            {verif.status}
                          </span>
                        </td>
                        <td>
                          <div className="actions">
                            <button className="act-btn">👁️</button>
                            {verif.status === 'pending' && (
                              <>
                                <button className="act-btn" style={{ color: 'var(--green)' }}>✓</button>
                                <button className="act-btn danger">✕</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PRODUCTS PAGE */}
          {currentPage === 'products' && (
            <div className="page active">
              <div className="sec-head" style={{ marginBottom: '24px' }}>
                <div>
                  <h3 className="sec-title">Product Management</h3>
                  <div className="sec-sub">Manage all products</div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleOpenModal('product')}
                >
                  ➕ Add Product
                </button>
              </div>

              <div className="table-wrap">
                <div className="table-toolbar">
                  <div className="table-search">
                    <span>🔍</span>
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>SKU</th>
                      <th>Stock</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(products, 'name').map(product => (
                      <tr key={product.id}>
                        <td className="td-name">{product.name}</td>
                        <td className="td-mono">{product.sku}</td>
                        <td>{product.stock}</td>
                        <td className="td-mono">{product.price}</td>
                        <td>
                          <span className={`badge ${product.status === 'active' ? 'badge-green' : 'badge-amber'}`}>
                            {product.status}
                          </span>
                        </td>
                        <td>
                          <div className="actions">
                            <button className="act-btn">✏️</button>
                            <button className="act-btn danger">🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CATEGORIES PAGE */}
          {currentPage === 'categories' && (
            <div className="page active">
              <div className="sec-head" style={{ marginBottom: '24px' }}>
                <div>
                  <h3 className="sec-title">Category Management</h3>
                  <div className="sec-sub">Manage product categories</div>
                </div>
                <button className="btn btn-primary">
                  ➕ Add Category
                </button>
              </div>

              <div className="grid-3">
                {filterData(categories, 'name').map(cat => (
                  <div key={cat.id} className="card">
                    <div className="card-head">
                      <h3 className="sec-title">{cat.name}</h3>
                    </div>
                    <div style={{ fontSize: '13px', marginBottom: '12px', color: 'var(--text2)' }}>
                      {cat.products} products
                    </div>
                    <span className={`badge ${cat.status === 'active' ? 'badge-green' : 'badge-red'}`}>
                      {cat.status}
                    </span>
                    <div className="actions" style={{ marginTop: '12px' }}>
                      <button className="act-btn">✏️</button>
                      <button className="act-btn danger">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* INSTALLMENTS PAGE */}
          {currentPage === 'installments' && (
            <div className="page active">
              <div className="sec-head" style={{ marginBottom: '24px' }}>
                <div>
                  <h3 className="sec-title">Installment Plans</h3>
                  <div className="sec-sub">Manage payment installments</div>
                </div>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>User</th>
                      <th>Plan</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(installments, 'user').map(inst => (
                      <tr key={inst.id}>
                        <td className="td-mono">{inst.order}</td>
                        <td className="td-name">{inst.user}</td>
                        <td>{inst.plan}</td>
                        <td className="td-mono">{inst.amount}</td>
                        <td>
                          <span className={`badge ${inst.status === 'active' ? 'badge-green' : 'badge-amber'}`}>
                            {inst.status}
                          </span>
                        </td>
                        <td>
                          <div className="actions">
                            <button className="act-btn">👁️</button>
                            <button className="act-btn">⚙️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* RECOVERY PAGE */}
          {currentPage === 'recovery' && (
            <div className="page active">
              <div className="sec-head" style={{ marginBottom: '24px' }}>
                <div>
                  <h3 className="sec-title">Account Recovery</h3>
                  <div className="sec-sub">Manage account recovery requests</div>
                </div>
              </div>

              <div className="grid-2">
                <div className="card">
                  <div className="card-head">
                    <h3 className="sec-title">Recovery Requests</h3>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.8' }}>
                    <div style={{ marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                      <strong style={{ color: 'var(--text)' }}>Pending: 5 requests</strong><br/>Awaiting verification documents
                    </div>
                    <div style={{ marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                      <strong style={{ color: 'var(--text)' }}>Approved: 23 this month</strong><br/>Successfully recovered accounts
                    </div>
                    <div>
                      <strong style={{ color: 'var(--text)' }}>Denied: 2 requests</strong><br/>Failed verification attempts
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-head">
                    <h3 className="sec-title">Recent Recoveries</h3>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.8' }}>
                    <div style={{ marginBottom: '12px' }}>
                      <strong style={{ color: 'var(--text)' }}>Hassan Mohammed</strong><br/>
                      <span className="badge badge-green">Recovered</span> - 2 hours ago
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <strong style={{ color: 'var(--text)' }}>Noor Ibrahim</strong><br/>
                      <span className="badge badge-green">Recovered</span> - 5 hours ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ANALYTICS PAGE */}
          {currentPage === 'analytics' && (
            <div className="page active">
              <div className="sec-head" style={{ marginBottom: '24px' }}>
                <h3 className="sec-title">Platform Analytics</h3>
              </div>

              <div className="grid-2">
                <div className="card">
                  <div className="card-head">
                    <h3 className="sec-title">Traffic Overview</h3>
                  </div>
                  <div className="chart-bars" style={{ height: '150px' }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                      <div key={day} className="bar-wrap">
                        <div
                          className="bar"
                          style={{
                            background: `hsl(${175}, 100%, ${50 + (i % 3) * 10}%)`,
                            height: `${40 + Math.random() * 50}%`,
                          }}
                        ></div>
                        <div className="bar-lbl">{day}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card">
                  <div className="card-head">
                    <h3 className="sec-title">Conversion Rate</h3>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--teal)', marginBottom: '12px', fontFamily: 'JetBrains Mono' }}>3.24%</div>
                  <div style={{ fontSize: '13px', color: 'var(--text2)' }}>
                    <div style={{ marginBottom: '12px' }}>Desktop: 4.2%</div>
                    <div style={{ marginBottom: '12px' }}>Mobile: 2.8%</div>
                    <div>Tablet: 3.1%</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <div className="sec-head">
                  <h3 className="sec-title">Top Pages</h3>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Page</th>
                        <th>Views</th>
                        <th>Avg Time</th>
                        <th>Bounce Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="td-name">Home</td>
                        <td>45,230</td>
                        <td>3m 24s</td>
                        <td>28%</td>
                      </tr>
                      <tr>
                        <td className="td-name">Products</td>
                        <td>32,145</td>
                        <td>4m 12s</td>
                        <td>22%</td>
                      </tr>
                      <tr>
                        <td className="td-name">Shop</td>
                        <td>28,934</td>
                        <td>5m 01s</td>
                        <td>18%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS PAGE */}
          {currentPage === 'settings' && (
            <div className="page active">
              <div className="sec-head" style={{ marginBottom: '24px' }}>
                <h3 className="sec-title">Settings</h3>
              </div>

              <div className="grid-2">
                <div className="card">
                  <div className="card-head">
                    <h3 className="sec-title">General Settings</h3>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Platform Name</label>
                    <input type="text" className="form-input" value="FlexiBerry" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Support Email</label>
                    <input type="email" className="form-input" value="support@flexiberry.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Max Shop Count</label>
                    <input type="number" className="form-input" value="1000" />
                  </div>
                  <button className="btn btn-primary">Save Changes</button>
                </div>

                <div className="card">
                  <div className="card-head">
                    <h3 className="sec-title">Security Settings</h3>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Two-Factor Authentication</label>
                    <select className="form-select">
                      <option>Enabled</option>
                      <option>Disabled</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Session Timeout (minutes)</label>
                    <input type="number" className="form-input" value="30" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">API Rate Limit</label>
                    <input type="number" className="form-input" value="1000" />
                  </div>
                  <button className="btn btn-primary">Update Security</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <div className={`modal-overlay ${showModal ? 'open' : ''}`} onClick={handleCloseModal}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-head">
            <div className="modal-title">
              {modalType === 'shop' && 'Add New Shop'}
              {modalType === 'admin' && 'Add New Admin'}
              {modalType === 'product' && 'Add New Product'}
            </div>
            <button className="modal-close" onClick={handleCloseModal}>✕</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-input"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Enter name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Enter email"
                />
              </div>
              {modalType === 'admin' && (
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <select
                    className="form-select"
                    name="role"
                    value={formData.role}
                    onChange={handleFormChange}
                  >
                    <option value="">Select Role</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Manager">Manager</option>
                    <option value="Moderator">Moderator</option>
                  </select>
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-foot">
            <button className="btn btn-ghost" onClick={handleCloseModal}>Cancel</button>
            <button className="btn btn-primary" onClick={handleFormSubmit}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}
