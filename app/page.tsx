'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun, LogOut, Bell, Search, Plus, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, Download, FileText, Check, AlertCircle, Lock, User, Mail, ShieldCheck, ShoppingBag } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Logo } from '@/components/logo'

const PAGES = {
  DASHBOARD: 'dashboard',
  SHOPS: 'shops',
  ADMINS: 'admins',
  USERS: 'users',
  USER_VERIFICATION: 'user_verification',
  VENDOR_VERIFICATION: 'vendor_verification',
  CATEGORIES: 'categories',
  INSTALLMENTS: 'installments',
  RECOVERY: 'recovery',
  ANALYTICS: 'analytics',
  SETTINGS: 'settings',
}

export default function Dashboard() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState(PAGES.DASHBOARD)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPageNum, setCurrentPageNum] = useState(1)
  const itemsPerPage = 8

  // Login form states
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Modal states
  const [showAddAdminModal, setShowAddAdminModal] = useState(false)
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [viewDocModal, setViewDocModal] = useState<{ open: boolean, item: any | null, type: 'user' | 'vendor' }>({ open: false, item: null, type: 'user' })

  // Form states
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'Admin' })
  const [newCategory, setNewCategory] = useState({ name: '', icon: '' })

  useEffect(() => {
    setMounted(true)
    const status = localStorage.getItem('isLoggedIn')
    if (status === 'true') setIsLoggedIn(true)
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

  const [admins, setAdmins] = useState([
    { id: 1, name: 'Admin User', email: 'admin@flexiberry.com', role: 'Super Admin', status: 'active', lastLogin: '2024-01-20 14:30' },
    { id: 2, name: 'Support Lead', email: 'support@flexiberry.com', role: 'Admin', status: 'active', lastLogin: '2024-01-20 10:15' },
    { id: 3, name: 'Manager', email: 'manager@flexiberry.com', role: 'Manager', status: 'inactive', lastLogin: '2024-01-19 09:00' },
  ])

  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', icon: '🔌', items: 234, status: 'active' },
    { id: 2, name: 'Fashion', icon: '👗', items: 456, status: 'active' },
    { id: 3, name: 'Home & Garden', icon: '🏠', items: 189, status: 'active' },
    { id: 4, name: 'Sports', icon: '⚽', items: 123, status: 'active' },
    { id: 5, name: 'Beauty', icon: '💄', items: 345, status: 'active' },
    { id: 6, name: 'Books', icon: '📚', items: 567, status: 'active' },
  ])

  const [userVerifications, setUserVerifications] = useState([
    { id: 1, name: 'Alex Taylor', email: 'alex@email.com', docs: ['CNIC Front', 'CNIC Back', 'Salary Slip', 'Bank Statement'], status: 'pending', date: '2024-01-21' },
    { id: 2, name: 'Emma Wilson', email: 'emma@email.com', docs: ['CNIC Front', 'CNIC Back', 'Salary Slip', 'Bank Statement'], status: 'approved', date: '2024-01-19' },
  ])

  const [vendorVerifications, setVendorVerifications] = useState([
    { id: 1, shopName: 'Tech Innovations', owner: 'John Doe', docs: ['Shop License'], status: 'pending', date: '2024-01-20' },
    { id: 2, shopName: 'Fashion Forward', owner: 'Jane Smith', docs: ['Shop License'], status: 'approved', date: '2024-01-19' },
  ])

  const installments = [
    { id: 1, order: 'ORD-001', customer: 'John Doe', amount: 1200, plan: '3 x $400', paid: 1, total: 3, nextDue: '2024-02-15', status: 'active' },
    { id: 2, order: 'ORD-002', customer: 'Jane Smith', amount: 850, plan: '2 x $425', paid: 2, total: 2, nextDue: 'Completed', status: 'completed' },
    { id: 3, order: 'ORD-003', customer: 'Mike Johnson', amount: 2500, plan: '5 x $500', paid: 2, total: 5, nextDue: '2024-01-25', status: 'overdue' },
    { id: 4, order: 'ORD-004', customer: 'Sarah Davis', amount: 1500, plan: '3 x $500', paid: 1, total: 3, nextDue: '2024-02-10', status: 'active' },
  ]

  const recoveryRequests = [
    { id: 1, email: 'user@email.com', username: 'user_123', method: 'Email', status: 'pending', date: '2024-01-20', expiresAt: '2024-01-22' },
    { id: 2, email: 'alex@email.com', username: 'alex_profile', method: 'Phone', status: 'verified', date: '2024-01-19', expiresAt: '2024-01-26' },
    { id: 3, email: 'emma@email.com', username: 'emma_store', method: 'Email', status: 'completed', date: '2024-01-18', expiresAt: 'N/A' },
  ]

  const statCards = [
    { label: 'Total Revenue', value: '$2.4M', change: '+12.5%', type: 'up', icon: '💰', color: 'from-teal-500 to-teal-600' },
    { label: 'Active Shops', value: '1,234', change: '+5.2%', type: 'up', icon: '🏪', color: 'from-blue-500 to-blue-600' },
    { label: 'Total Users', value: '5,678', change: '+8.1%', type: 'up', icon: '👥', color: 'from-purple-500 to-purple-600' },
    { label: 'Pending User KYC', value: '12', change: '-2.4%', type: 'down', icon: '👤', color: 'from-amber-500 to-amber-600' },
    { label: 'Pending Vendor KYC', value: '11', change: '+5.1%', type: 'up', icon: '🏪', color: 'from-blue-500 to-blue-600' },
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
        { id: PAGES.USER_VERIFICATION, label: 'User Verification', icon: '👤', badge: 12 },
        { id: PAGES.VENDOR_VERIFICATION, label: 'Vendor Verification', icon: '🏪', badge: 11 },
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginEmail && loginPassword) {
      setIsLoggedIn(true)
      localStorage.setItem('isLoggedIn', 'true')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
  }

  const filteredShops = shops.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredAdmins = admins.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getFilteredData = () => {
    switch (currentPage) {
      case PAGES.SHOPS: return filteredShops
      case PAGES.USERS: return filteredUsers
      case PAGES.ADMINS: return filteredAdmins
      default: return []
    }
  }

  const filteredData = getFilteredData()
  const paginatedData = filteredData.slice((currentPageNum - 1) * itemsPerPage, currentPageNum * itemsPerPage)

  const handleAddAdmin = () => {
    if (newAdmin.name && newAdmin.email) {
      setAdmins([...admins, { id: admins.length + 1, ...newAdmin, status: 'active', lastLogin: 'Never' }])
      setNewAdmin({ name: '', email: '', role: 'Admin' })
      setShowAddAdminModal(false)
    }
  }

  const handleApproveKYC = (id: number, type: 'user' | 'vendor') => {
    if (type === 'user') {
      setUserVerifications(userVerifications.map(item => item.id === id ? { ...item, status: 'approved' } : item))
    } else {
      setVendorVerifications(vendorVerifications.map(item => item.id === id ? { ...item, status: 'approved' } : item))
    }
    setViewDocModal({ open: false, item: null, type })
  }

  const handleRejectKYC = (id: number, type: 'user' | 'vendor') => {
    if (type === 'user') {
      setUserVerifications(userVerifications.map(item => item.id === id ? { ...item, status: 'rejected' } : item))
    } else {
      setVendorVerifications(vendorVerifications.map(item => item.id === id ? { ...item, status: 'rejected' } : item))
    }
    setViewDocModal({ open: false, item: null, type })
  }

  if (!mounted) return null

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0A0E1A] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-[#161C2D] rounded-2xl shadow-xl border border-gray-200 dark:border-[rgba(255,255,255,0.07)] p-8">
          <div className="flex justify-center mb-8">
            <Logo size={52} />
          </div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Sign In</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Enter your credentials to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-[#8A94A8] mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Mail size={18} /></div>
                <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full bg-gray-50 dark:bg-[#0F1522] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-[#E8EDF5] outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="admin@flexiberry.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-[#8A94A8] mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Lock size={18} /></div>
                <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full bg-gray-50 dark:bg-[#0F1522] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-[#E8EDF5] outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-500/20">Sign In</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-white dark:bg-[#0A0E1A] text-gray-900 dark:text-[#E8EDF5]">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-64 flex flex-col bg-white dark:bg-[#0F1522] border-r border-gray-200 dark:border-[rgba(255,255,255,0.07)] z-50 transition-transform duration-300 md:translate-x-0 ${!sidebarOpen ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className="px-6 py-8 border-b border-gray-200 dark:border-[rgba(255,255,255,0.07)]">
          <Logo />
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          {navSections.map(section => (
            <div key={section.title}>
              <h3 className="px-4 text-[11px] font-bold text-gray-400 dark:text-[#5A6478] uppercase tracking-widest mb-4">{section.title}</h3>
              <div className="space-y-1">
                {section.items.map(item => (
                  <button key={item.id} onClick={() => { setCurrentPage(item.id); setCurrentPageNum(1); setSearchTerm(''); }} className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${currentPage === item.id ? 'bg-blue-50 dark:bg-[rgba(37,99,235,0.1)] text-[#2563eb]' : 'text-gray-600 dark:text-[#8A94A8] hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.03)] hover:text-gray-900 dark:hover:text-[#E8EDF5]'}`}>
                    <div className="flex items-center gap-3"><span className="text-lg">{item.icon}</span>{item.label}</div>
                    {item.badge && <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-[rgba(255,255,255,0.07)]">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
            <LogOut size={18} />Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0A0E1A]/80 backdrop-blur-md border-b border-gray-200 dark:border-[rgba(255,255,255,0.07)] h-16 flex items-center justify-between px-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1C2438] transition-colors">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-4">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2.5 rounded-xl bg-gray-100 dark:bg-[#1C2438] text-gray-600 dark:text-[#8A94A8] hover:text-[#2563eb] transition-all">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="w-px h-6 bg-gray-200 dark:bg-[rgba(255,255,255,0.1)] mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-[#2563eb]"><User size={20} /></div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-gray-900 dark:text-white leading-none">Super Admin</div>
                <div className="text-[11px] text-gray-500 dark:text-[#5A6478] mt-1">Full Access</div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {currentPage === PAGES.DASHBOARD && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Dashboard Overview</h1>
                <p className="text-sm text-gray-500 dark:text-[#8A94A8] mt-2">Welcome back! Here's what's happening today.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((card, i) => (
                  <div key={i} className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-2xl p-6 relative overflow-hidden group">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-[0.03] group-hover:opacity-[0.07] transition-opacity -mr-8 -mt-8 rounded-full`}></div>
                    <div className="flex items-start justify-between relative z-10">
                      <div>
                        <p className="text-xs font-bold text-gray-500 dark:text-[#5A6478] uppercase tracking-wider mb-2">{card.label}</p>
                        <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{card.value}</h3>
                        <div className={`flex items-center gap-1 mt-2 text-xs font-bold ${card.type === 'up' ? 'text-green-500' : 'text-red-500'}`}>{card.type === 'up' ? '↑' : '↓'} {card.change}<span className="text-gray-400 dark:text-[#5A6478] font-medium ml-1">vs last month</span></div>
                      </div>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl shadow-lg shadow-black/5`}>{card.icon}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(currentPage === PAGES.USER_VERIFICATION || currentPage === PAGES.VENDOR_VERIFICATION) && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  {currentPage === PAGES.USER_VERIFICATION ? 'User KYC Verification' : 'Vendor KYC Verification'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-[#8A94A8] mt-1">Review and manage identity verification requests</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {(currentPage === PAGES.USER_VERIFICATION ? userVerifications : vendorVerifications).map(item => (
                  <div key={item.id} className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-2xl p-6 hover:border-blue-500/30 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-[#0F1522] flex items-center justify-center text-xl">
                          {currentPage === PAGES.USER_VERIFICATION ? '👤' : '🏪'}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            {'shopName' in item ? item.shopName : item.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-[#8A94A8] mt-1">
                            {currentPage === PAGES.USER_VERIFICATION ? `Email: ${item.email}` : `Owner: ${item.owner}`} • Submitted: {item.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${item.status === 'approved' ? 'bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400' : item.status === 'rejected' ? 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400' : 'bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400'}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>{item.status}
                        </span>
                        <button onClick={() => setViewDocModal({ open: true, item, type: currentPage === PAGES.USER_VERIFICATION ? 'user' : 'vendor' })} className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-[#1C2438] text-gray-700 dark:text-[#E8EDF5] text-xs font-bold hover:bg-gray-200 dark:hover:bg-[#252E42] transition-colors">View Documents</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {viewDocModal.open && viewDocModal.item && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="bg-white dark:bg-[#161C2D] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-[rgba(255,255,255,0.1)]">
                    <div className="px-8 py-6 border-b border-gray-100 dark:border-[rgba(255,255,255,0.07)] flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Review {viewDocModal.type === 'user' ? 'User' : 'Vendor'} Documents</h3>
                        <p className="text-sm text-gray-500 dark:text-[#8A94A8] mt-1">{'shopName' in viewDocModal.item ? viewDocModal.item.shopName : viewDocModal.item.name}</p>
                      </div>
                      <button onClick={() => setViewDocModal({ open: false, item: null, type: 'user' })} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1C2438] transition-colors"><X size={20} /></button>
                    </div>
                    <div className="p-8">
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {viewDocModal.item.docs.map((doc: string, idx: number) => (
                          <div key={idx} className="aspect-video bg-gray-100 dark:bg-[#0F1522] rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-[rgba(255,255,255,0.1)] group hover:border-blue-500/50 transition-all cursor-pointer">
                            <FileText size={32} className="text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                            <span className="text-xs font-bold text-gray-500 dark:text-[#5A6478]">{doc}</span>
                          </div>
                        ))}
                      </div>
                      {viewDocModal.item.status === 'pending' && (
                        <div className="flex gap-4">
                          <button onClick={() => handleApproveKYC(viewDocModal.item.id, viewDocModal.type)} className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-green-500/20"><Check size={20} /> Approve</button>
                          <button onClick={() => handleRejectKYC(viewDocModal.item.id, viewDocModal.type)} className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-red-500/20"><AlertCircle size={20} /> Reject</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Other Pages Fallback */}
          {![PAGES.DASHBOARD, PAGES.USER_VERIFICATION, PAGES.VENDOR_VERIFICATION].includes(currentPage) && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 rounded-3xl bg-gray-100 dark:bg-[#161C2D] flex items-center justify-center text-4xl mb-6">🚧</div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Under Construction</h2>
              <p className="text-sm text-gray-500 dark:text-[#8A94A8] mt-2 max-w-xs">The {currentPage} page is currently being updated.</p>
              <button onClick={() => setCurrentPage(PAGES.DASHBOARD)} className="mt-8 text-[#2563eb] font-bold hover:underline">Return to Dashboard</button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
