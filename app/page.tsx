'use client'

import { useState } from 'react'
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
  const [currentPageNum, setCurrentPageNum] = useState(1)
  const itemsPerPage = 10

  // Mock data
  const shops = [
    { id: 1, name: 'Electronics Store', owner: 'John Doe', revenue: 45000, status: 'active', date: '2024-01-15' },
    { id: 2, name: 'Fashion Hub', owner: 'Jane Smith', revenue: 32000, status: 'active', date: '2024-01-16' },
    { id: 3, name: 'Home Goods', owner: 'Mike Johnson', revenue: 28000, status: 'suspended', date: '2024-01-17' },
  ]

  const users = [
    { id: 1, name: 'Alex Taylor', email: 'alex@email.com', status: 'active', joined: '2024-01-10' },
    { id: 2, name: 'Emma Wilson', email: 'emma@email.com', status: 'active', joined: '2024-01-12' },
    { id: 3, name: 'David Brown', email: 'david@email.com', status: 'suspended', joined: '2024-01-08' },
  ]

  const admins = [
    { id: 1, name: 'Admin User', email: 'admin@flexiberry.com', role: 'Super Admin', status: 'active' },
    { id: 2, name: 'Support Lead', email: 'support@flexiberry.com', role: 'Admin', status: 'active' },
  ]

  const products = [
    { id: 1, name: 'Wireless Headphones', sku: 'WH-001', category: 'Electronics', price: 79.99, stock: 250, status: 'active' },
    { id: 2, name: 'Running Shoes', sku: 'RS-002', category: 'Sports', price: 129.99, stock: 180, status: 'active' },
  ]

  const kyc = [
    { id: 1, name: 'John Doe', type: 'Individual', status: 'pending' },
    { id: 2, name: 'Tech Company Inc', type: 'Business', status: 'approved' },
  ]

  const filteredShops = shops.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getPaginatedData = () => {
    let data = []
    if (currentPage === PAGES.SHOPS) data = filteredShops
    else if (currentPage === PAGES.USERS) data = filteredUsers
    else if (currentPage === PAGES.PRODUCTS) data = filteredProducts
    const start = (currentPageNum - 1) * itemsPerPage
    return data.slice(start, start + itemsPerPage)
  }

  const getTotalPages = () => {
    let total = 0
    if (currentPage === PAGES.SHOPS) total = filteredShops.length
    else if (currentPage === PAGES.USERS) total = filteredUsers.length
    else if (currentPage === PAGES.PRODUCTS) total = filteredProducts.length
    return Math.ceil(total / itemsPerPage)
  }

  const navItems = [
    { id: PAGES.DASHBOARD, label: 'Dashboard', icon: '📊', section: 'Main' },
    { id: PAGES.SHOPS, label: 'Shops', icon: '🏪', section: 'Management' },
    { id: PAGES.ADMINS, label: 'Admins', icon: '🔐', section: 'Management' },
    { id: PAGES.USERS, label: 'Users', icon: '👥', section: 'Management' },
    { id: PAGES.VERIFICATION, label: 'KYC Verification', icon: '✓', section: 'Operations', badge: 23 },
    { id: PAGES.PRODUCTS, label: 'Products', icon: '📦', section: 'Operations' },
    { id: PAGES.CATEGORIES, label: 'Categories', icon: '🏷️', section: 'Operations' },
    { id: PAGES.INSTALLMENTS, label: 'Installments', icon: '💳', section: 'Operations' },
    { id: PAGES.RECOVERY, label: 'Account Recovery', icon: '🔄', section: 'Operations' },
    { id: PAGES.ANALYTICS, label: 'Analytics', icon: '📈', section: 'System' },
    { id: PAGES.SETTINGS, label: 'Settings', icon: '⚙️', section: 'System' },
  ]

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0A0E1A]">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-60 flex flex-col bg-white dark:bg-[#0F1522] border-r border-gray-200 dark:border-gray-700 z-[100] transition-all ${!sidebarOpen ? '-translate-x-full' : 'translate-x-0'} md:translate-x-0`}>
        <div className="flex items-center gap-3 px-5 py-6 border-b border-gray-200 dark:border-gray-700">
          <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold">FB</div>
          <div>
            <div className="text-sm font-bold text-gray-900 dark:text-white">FlexiBerry</div>
            <div className="text-xs font-semibold text-teal-600 dark:text-teal-400">Admin</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {['Main', 'Management', 'Operations', 'System'].map(section => (
            <div key={section}>
              <div className="px-3 py-2 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{section}</div>
              {navItems.filter(i => i.section === section).map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id)
                    setCurrentPageNum(1)
                    setSearchTerm('')
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 m-0.5 rounded-lg text-sm font-medium transition-all ${currentPage === item.id ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  <span>{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">JD</div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-gray-900 dark:text-white truncate">John Doe</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">john@admin.com</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-60 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-40 bg-white dark:bg-[#0F1522] border-b border-gray-200 dark:border-gray-700 px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white hidden md:block">
              {navItems.find(i => i.id === currentPage)?.label}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 h-9 w-56">
              <Search size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPageNum(1)
                }}
                className="w-full bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white"
              />
            </div>
            <button className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </button>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {currentPage === PAGES.DASHBOARD && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: 'Total Revenue', value: '$2.4M', change: '+12.5%', icon: '💰' },
                  { label: 'Active Shops', value: '1,234', change: '+5.2%', icon: '🏪' },
                  { label: 'Total Users', value: '5,678', change: '+8.1%', icon: '👥' },
                  { label: 'Pending KYC', value: '23', change: '-2.4%', icon: '✓' },
                  { label: 'Active Orders', value: '834', change: '+15.3%', icon: '📦' },
                  { label: 'Support Tickets', value: '45', change: '+3.2%', icon: '🎫' },
                ].map((card, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    <div className="text-2xl mb-2">{card.icon}</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{card.label}</div>
                    <div className="text-xs font-semibold text-green-600">{card.change}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentPage === PAGES.SHOPS && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shops</h2>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold text-sm">
                  <Plus size={18} /> Add Shop
                </button>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 h-9 w-56">
                    <Search size={16} />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value)
                        setCurrentPageNum(1)
                      }}
                      className="w-full bg-transparent border-none outline-none text-sm"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Shop</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Owner</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Revenue</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getPaginatedData().map(shop => (
                        <tr key={shop.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-4 py-3 font-semibold">{shop.name}</td>
                          <td className="px-4 py-3">{shop.owner}</td>
                          <td className="px-4 py-3 font-semibold text-green-600">${shop.revenue.toLocaleString()}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${shop.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-current"></span>
                              {shop.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 flex gap-1">
                            <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600">
                              <Eye size={16} />
                            </button>
                            <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600">
                              <Edit2 size={16} />
                            </button>
                            <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/30">
                              <Trash2 size={16} className="text-red-600" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {getTotalPages() > 1 && (
                  <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm">Page {currentPageNum} of {getTotalPages()}</span>
                    <div className="flex gap-2">
                      <button onClick={() => setCurrentPageNum(Math.max(1, currentPageNum - 1))} disabled={currentPageNum === 1} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50">
                        <ChevronLeft size={18} />
                      </button>
                      <button onClick={() => setCurrentPageNum(Math.min(getTotalPages(), currentPageNum + 1))} disabled={currentPageNum === getTotalPages()} className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentPage === PAGES.USERS && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 h-9 w-56">
                    <Search size={16} />
                    <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPageNum(1) }} className="w-full bg-transparent border-none outline-none text-sm" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase">Joined</th>
                        <th className="px-4 py-3 text-left text-xs font-bold uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getPaginatedData().map(user => (
                        <tr key={user.id} className="border-t border-gray-200 dark:border-gray-700">
                          <td className="px-4 py-3 font-semibold">{user.name}</td>
                          <td className="px-4 py-3">{user.email}</td>
                          <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs font-bold ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{user.status}</span></td>
                          <td className="px-4 py-3">{user.joined}</td>
                          <td className="px-4 py-3 flex gap-1"><Eye size={16} className="cursor-pointer" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {currentPage === PAGES.ADMINS && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admins</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase">Role</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map(admin => (
                      <tr key={admin.id} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3">{admin.name}</td>
                        <td className="px-4 py-3">{admin.email}</td>
                        <td className="px-4 py-3 text-xs font-bold bg-blue-100 text-blue-700 w-fit px-2 py-1 rounded">{admin.role}</td>
                        <td className="px-4 py-3"><span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">{admin.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {currentPage === PAGES.VERIFICATION && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">KYC Verification</h2>
              {kyc.map(item => (
                <div key={item.id} className="bg-white dark:bg-gray-800 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.type}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'approved' ? 'bg-green-100 text-green-700' : item.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{item.status}</span>
                  </div>
                  {item.status === 'pending' && (
                    <div className="flex gap-2 mt-4">
                      <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold">Approve</button>
                      <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-semibold">Reject</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {currentPage === PAGES.PRODUCTS && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h2>
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase">SKU</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase">Price</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase">Stock</th>
                      <th className="px-4 py-3 text-left text-xs font-bold uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPaginatedData().map(product => (
                      <tr key={product.id} className="border-t border-gray-200 dark:border-gray-700">
                        <td className="px-4 py-3">{product.name}</td>
                        <td className="px-4 py-3 font-mono text-sm">{product.sku}</td>
                        <td className="px-4 py-3">${product.price}</td>
                        <td className="px-4 py-3">{product.stock}</td>
                        <td className="px-4 py-3"><span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">{product.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {currentPage === PAGES.CATEGORIES && <div className="text-center py-12"><h2 className="text-2xl font-bold">Categories</h2><p className="text-gray-600 dark:text-gray-400 mt-2">Category management coming soon</p></div>}
          {currentPage === PAGES.INSTALLMENTS && <div className="text-center py-12"><h2 className="text-2xl font-bold">Installments</h2><p className="text-gray-600 dark:text-gray-400 mt-2">Installment tracking coming soon</p></div>}
          {currentPage === PAGES.RECOVERY && <div className="text-center py-12"><h2 className="text-2xl font-bold">Account Recovery</h2><p className="text-gray-600 dark:text-gray-400 mt-2">Recovery requests coming soon</p></div>}
          {currentPage === PAGES.ANALYTICS && <div className="text-center py-12"><h2 className="text-2xl font-bold">Analytics</h2><p className="text-gray-600 dark:text-gray-400 mt-2">Analytics dashboard coming soon</p></div>}
          {currentPage === PAGES.SETTINGS && <div className="text-center py-12"><h2 className="text-2xl font-bold">Settings</h2><p className="text-gray-600 dark:text-gray-400 mt-2">Settings page coming soon</p></div>}
        </main>
      </div>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}
    </div>
  )
}
