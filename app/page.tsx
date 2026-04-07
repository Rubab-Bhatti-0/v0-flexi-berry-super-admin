'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun, LogOut, Bell, Search, Plus, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, Download, FileText, Check, AlertCircle, Lock, User, Mail, ShieldCheck, ShoppingBag, Pause, Play, Save, XCircle, TrendingUp, BarChart3, Users, ShoppingCart, DollarSign, Activity, RefreshCw, Zap, PieChart, Calendar } from 'lucide-react'
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
  const [showAddShopModal, setShowAddShopModal] = useState(false)
  const [showAddAdminModal, setShowAddAdminModal] = useState(false)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [showEditShopModal, setShowEditShopModal] = useState<any>(null)
  const [showEditAdminModal, setShowEditAdminModal] = useState<any>(null)
  const [showEditUserModal, setShowEditUserModal] = useState<any>(null)
  const [viewDocModal, setViewDocModal] = useState<{ open: boolean, item: any | null, type: 'user' | 'vendor' }>({ open: false, item: null, type: 'user' })

  // Form states
  const [newShop, setNewShop] = useState({ name: '', owner: '', revenue: '', status: 'active' })
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'Admin' })
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', status: 'active' })
  const [newCategory, setNewCategory] = useState({ name: '', icon: '' })
  const [platformSettings, setPlatformSettings] = useState({
    platformName: 'FlexiBerry',
    supportEmail: 'support@flexiberry.com',
    contactNumber: '+92-300-1234567',
    commissionRate: '5%',
    taxRate: '17%',
    currency: 'PKR',
    maintenanceMode: false,
    twoFactorAuth: true,
  })

  useEffect(() => {
    setMounted(true)
    const status = localStorage.getItem('isLoggedIn')
    if (status === 'true') setIsLoggedIn(true)
  }, [])

  // Mock data
  const [shops, setShops] = useState([
    { id: 1, name: 'Electronics Store', owner: 'John Doe', revenue: 45000, status: 'active', date: '2024-01-15' },
    { id: 2, name: 'Fashion Hub', owner: 'Jane Smith', revenue: 32000, status: 'active', date: '2024-01-16' },
    { id: 3, name: 'Home Goods', owner: 'Mike Johnson', revenue: 28000, status: 'suspended', date: '2024-01-17' },
    { id: 4, name: 'Tech Solutions', owner: 'Sarah Davis', revenue: 56000, status: 'active', date: '2024-01-18' },
  ])

  const [users, setUsers] = useState([
    { id: 1, name: 'Alex Taylor', email: 'alex@email.com', phone: '+1-555-0001', status: 'active', joined: '2024-01-10' },
    { id: 2, name: 'Emma Wilson', email: 'emma@email.com', phone: '+1-555-0002', status: 'active', joined: '2024-01-12' },
    { id: 3, name: 'David Brown', email: 'david@email.com', phone: '+1-555-0003', status: 'suspended', joined: '2024-01-08' },
    { id: 4, name: 'Lisa Anderson', email: 'lisa@email.com', phone: '+1-555-0004', status: 'active', joined: '2024-01-14' },
  ])

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
  ])

  const [userVerifications, setUserVerifications] = useState([
    { id: 1, name: 'Alex Taylor', email: 'alex@email.com', docs: ['CNIC Front', 'CNIC Back', 'Salary Slip', 'Bank Statement'], status: 'pending', date: '2024-01-21' },
    { id: 2, name: 'Emma Wilson', email: 'emma@email.com', docs: ['CNIC Front', 'CNIC Back', 'Salary Slip', 'Bank Statement'], status: 'approved', date: '2024-01-19' },
  ])

  const [vendorVerifications, setVendorVerifications] = useState([
    { id: 1, shopName: 'Tech Innovations', owner: 'John Doe', docs: ['Shop License'], status: 'pending', date: '2024-01-20' },
    { id: 2, shopName: 'Fashion Forward', owner: 'Jane Smith', docs: ['Shop License'], status: 'approved', date: '2024-01-19' },
  ])

  const [installments, setInstallments] = useState([
    { id: 1, order: 'ORD-001', customer: 'John Doe', amount: 1200, plan: '3 x $400', paid: 1, total: 3, nextDue: '2024-02-15', status: 'active' },
    { id: 2, order: 'ORD-002', customer: 'Jane Smith', amount: 850, plan: '2 x $425', paid: 2, total: 2, nextDue: 'Completed', status: 'completed' },
    { id: 3, order: 'ORD-003', customer: 'Mike Johnson', amount: 2500, plan: '5 x $500', paid: 2, total: 5, nextDue: '2024-01-25', status: 'overdue' },
  ])

  const [recoveryRequests, setRecoveryRequests] = useState([
    { id: 1, email: 'user@email.com', username: 'user_123', method: 'Email', status: 'pending', date: '2024-01-20', expiresAt: '2024-01-22' },
    { id: 2, email: 'alex@email.com', username: 'alex_profile', method: 'Phone', status: 'verified', date: '2024-01-19', expiresAt: '2024-01-26' },
    { id: 3, email: 'emma@email.com', username: 'emma_store', method: 'Email', status: 'completed', date: '2024-01-18', expiresAt: 'N/A' },
  ])

  // Analytics data
  const analyticsData = {
    totalProducts: 284,
    totalOrders: 847,
    activeInstallments: 612,
    monthlyRevenue: 8400000,
    weeklyRevenue: 2100000,
    lastWeekRevenue: 1770000,
    salesTrend: [45, 52, 48, 61, 55, 70, 85],
    lastWeekSales: [35, 42, 38, 51, 45, 60, 75],
    orderFulfillment: 94,
    kycApprovalRate: 78,
    customerSatisfaction: 88,
  }

  const statCards = [
    { label: 'Total Products', value: '284', change: '+8%', type: 'up', icon: <ShoppingBag size={24} className="text-green-600" />, color: 'text-green-600', bgColor: 'glass-card-light' },
    { label: 'Orders Received', value: '847', change: '+23%', type: 'up', icon: <ShoppingCart size={24} className="text-blue-600" />, color: 'text-blue-600', bgColor: 'glass-card-blue' },
    { label: 'Active Installments', value: '612', change: '+15%', type: 'up', icon: <FileText size={24} className="text-purple-600" />, color: 'text-purple-600', bgColor: 'glass-card-purple' },
    { label: 'Monthly Revenue', value: 'Rs 8.4M', change: '+26%', type: 'up', icon: <DollarSign size={24} className="text-amber-600" />, color: 'text-amber-600', bgColor: 'glass-card-amber' },
  ]

  const navSections = [
    {
      title: 'MAIN MENU',
      items: [
        { id: PAGES.DASHBOARD, label: 'Dashboard', icon: <BarChart3 size={18} /> },
        { id: PAGES.SHOPS, label: 'Products', icon: <ShoppingBag size={18} />, badge: 284 },
        { id: PAGES.INSTALLMENTS, label: 'Orders', icon: <ShoppingCart size={18} />, badge: 4 },
        { id: PAGES.INSTALLMENTS, label: 'Installments', icon: <FileText size={18} /> },
        { id: PAGES.USERS, label: 'Buyers', icon: <Users size={18} /> },
        { id: PAGES.ANALYTICS, label: 'Analytics', icon: <Activity size={18} /> },
        { id: PAGES.USER_VERIFICATION, label: 'KYC', icon: <ShieldCheck size={18} />, badge: 2 },
        { id: PAGES.SETTINGS, label: 'Settings', icon: <Activity size={18} /> },
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

  if (!mounted) return null

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f0f4ff] dark:bg-[#0A0E1A] flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-card p-8">
          <div className="flex justify-center mb-8">
            <Logo size={52} />
          </div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Sign In</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Enter your credentials to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Mail size={18} /></div>
                <input type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="admin@flexiberry.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Lock size={18} /></div>
                <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/30">Sign In</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#f0f4ff] dark:bg-[#0A0E1A]">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-64 flex flex-col sidebar-bg z-50 transition-transform duration-300 md:translate-x-0 shadow-2xl ${!sidebarOpen ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className="px-6 py-8 border-b border-white/5 relative overflow-hidden">
          <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-blue-600/30 blur-[60px] pointer-events-none" />
          <Logo />
        </div>
        
        <div className="px-4 py-4 mb-2">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">TZ</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">TechZone</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span className="text-[10px] text-green-500 font-bold">Active · Verified</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-6 relative z-10">
          {navSections.map(section => (
            <div key={section.title}>
              <h3 className="px-4 text-[9px] font-bold text-white/30 uppercase tracking-[0.1em] mb-3">{section.title}</h3>
              <div className="space-y-1">
                {section.items.map(item => (
                  <button 
                    key={item.label} 
                    onClick={() => { setCurrentPage(item.id); setCurrentPageNum(1); setSearchTerm(''); }} 
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative ${currentPage === item.id ? 'sidebar-item-active' : 'sidebar-item-inactive'}`}
                  >
                    {currentPage === item.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gradient-to-b from-blue-600 to-purple-600" />}
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${currentPage === item.id ? 'bg-white/15' : 'bg-white/5'}`}>
                        {item.icon}
                      </div>
                      {item.label}
                    </div>
                    {item.badge && (
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${currentPage === item.id ? 'bg-white/25' : 'bg-red-500/80'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 space-y-4 relative z-10">
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-indigo-500/25 rounded-2xl p-4 relative overflow-hidden group">
            <div className="absolute top-[-20px] right-[-20px] w-20 h-20 rounded-full bg-purple-600/30 blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 text-white mb-2">
              <Zap size={14} className="text-amber-400" fill="currentColor" />
              <span className="text-xs font-bold">Pro Features</span>
            </div>
            <p className="text-[11px] text-white/55 mb-4 leading-relaxed">Unlock advanced analytics, bulk uploads & priority support</p>
            <button className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[11px] font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all">Upgrade Plan</button>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5 pt-6">
            <LogOut size={18} />Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0A0E1A]/80 backdrop-blur-xl h-16 flex items-center justify-between px-8 border-b border-gray-100 dark:border-white/5">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
              <ShoppingBag size={14} />
              <span>TechZone</span>
              <ChevronRight size={12} />
              <span className="text-gray-900 dark:text-white capitalize">{currentPage.replace('_', ' ')}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="px-4 py-1.5 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 text-[10px] font-bold flex items-center gap-2 border border-green-100 dark:border-green-500/20">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>Live
            </button>
            <button className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-blue-600 transition-all border border-gray-100 dark:border-gray-700">
              <Bell size={18} />
            </button>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-400 hover:text-blue-600 transition-all border border-gray-100 dark:border-gray-700">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-blue-500/20">TZ</div>
          </div>
        </header>

        <div className="p-8">
          {/* Dashboard */}
          {currentPage === PAGES.DASHBOARD && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-green-500 uppercase tracking-widest mb-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Live Dashboard
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Good morning, TechZone 👋</h1>
                  <p className="text-xs text-gray-400 mt-1">Friday, March 13, 2026 · Here's your store overview</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input type="text" placeholder="Search orders..." className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-blue-500 w-48 md:w-64" />
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all">
                    <Plus size={16} /> Add Product
                  </button>
                  <button className="p-2.5 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, i) => (
                  <div key={i} className={`p-6 rounded-3xl ${card.bgColor} relative overflow-hidden group hover:scale-[1.02] transition-all cursor-default shadow-sm border border-black/5`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-white/80 dark:bg-black/20 flex items-center justify-center shadow-sm`}>
                        {card.icon}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-lg bg-white/80 dark:bg-black/20 ${card.color}`}>{card.change}</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{card.value}</h3>
                      <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{card.label}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400">
                        vs last month <ChevronRight size={10} className="rotate-[-45deg]" />
                      </div>
                      <div className="h-8 w-24">
                        <svg viewBox="0 0 100 30" className="w-full h-full">
                          <path d="M0,25 Q25,10 50,20 T100,5" fill="none" stroke="currentColor" strokeWidth="2" className={card.color} />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card p-8 rounded-3xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sales Overview</h3>
                      <p className="text-[11px] text-gray-400 mt-1 font-medium">Last 7 days performance</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">Rs 2.1M</p>
                        <p className="text-[10px] font-bold text-green-500 flex items-center justify-end gap-1">
                          <TrendingUp size={12} /> +18.4% vs last week
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 border border-blue-100 dark:border-blue-500/20">
                        <Activity size={20} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-64 flex items-end justify-between gap-4 px-2">
                    {analyticsData.salesTrend.map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                        <div className="w-full relative flex items-end justify-center gap-1 h-48">
                          <div className="w-full bg-blue-100 dark:bg-blue-900/20 rounded-t-lg transition-all group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40" style={{ height: `${analyticsData.lastWeekSales[i]}%` }}></div>
                          <div className="w-full bg-blue-600 rounded-t-lg transition-all group-hover:bg-blue-700 shadow-lg shadow-blue-500/20" style={{ height: `${val}%` }}></div>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">This Week <span className="text-gray-900 dark:text-white ml-1">Rs 2.1M</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-100 dark:bg-blue-900/40"></span>
                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">Last Week <span className="text-gray-900 dark:text-white ml-1">Rs 1.77M</span></span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                      <BarChart3 size={14} /> Daily revenue
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div className="glass-card p-6 rounded-3xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">Quick Actions</h3>
                      <Zap size={14} className="text-amber-500" fill="currentColor" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white flex flex-col items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transition-all">
                        <ShoppingBag size={20} />
                        <span className="text-[10px] font-bold">Add Product</span>
                      </button>
                      <button className="p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 text-white flex flex-col items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
                        <ShieldCheck size={20} />
                        <span className="text-[10px] font-bold">Review KYC</span>
                      </button>
                      <button className="p-4 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 text-white flex flex-col items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/20 transition-all">
                        <Users size={20} />
                        <span className="text-[10px] font-bold">View Buyers</span>
                      </button>
                      <button className="p-4 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 text-white flex flex-col items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-500/20 transition-all">
                        <ShoppingCart size={20} />
                        <span className="text-[10px] font-bold">All Orders</span>
                      </button>
                    </div>
                  </div>

                  {/* Performance */}
                  <div className="glass-card p-6 rounded-3xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white">Performance</h3>
                      <span className="text-[10px] font-bold text-gray-400">This month</span>
                    </div>
                    <div className="space-y-6">
                      {[
                        { label: 'Order Fulfillment', val: 94, color: 'bg-green-500' },
                        { label: 'KYC Approval Rate', val: 78, color: 'bg-blue-500' },
                        { label: 'Customer Satisfaction', val: 88, color: 'bg-purple-500' },
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-full border-2 border-gray-100 dark:border-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-900 dark:text-white`}>{item.val}%</div>
                              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">{item.label}</span>
                            </div>
                          </div>
                          <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.val}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Page */}
          {currentPage === PAGES.ANALYTICS && (
            <div className="space-y-6">
              {/* Header with Export and Date Range */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Comprehensive insights into your platform performance</p>
                </div>
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-[#1C2438] dark:hover:bg-[#252E42] text-gray-900 dark:text-[#E8EDF5] font-semibold text-sm transition-colors border border-gray-200 dark:border-[rgba(255,255,255,0.12)]">
                    <span>📥</span> Export Report
                  </button>
                  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-300 hover:bg-blue-400 text-gray-900 font-semibold text-sm transition-colors">
                    Last 30 Days
                  </button>
                </div>
              </div>

              {/* Main Grid: Revenue Growth + Top Shops + Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Growth Chart - Spans 2 columns */}
                <div className="lg:col-span-2 bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Growth</h3>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                        <span className="text-gray-600 dark:text-gray-400">Revenue</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-purple-300"></div>
                        <span className="text-gray-600 dark:text-gray-400">Profit</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between h-64 gap-2">
                    {[45, 60, 40, 70, 50, 65, 75, 55, 80, 60, 85, 70].map((revenue, i) => {
                      const profit = revenue * 0.6;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div className="w-full flex flex-col items-center gap-0.5">
                            <div className="w-full bg-purple-300 rounded-t transition-opacity hover:opacity-80 cursor-pointer" style={{ height: `${profit}%` }}></div>
                            <div className="w-full bg-blue-300 rounded-b transition-opacity hover:opacity-80 cursor-pointer" style={{ height: `${revenue - profit}%` }}></div>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-[#5A6478] font-medium mt-2">{'JFMAMJJASOND'[i]}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Top Performing Shops */}
                <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Top Performing Shops</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Electronics Store', owner: 'John Doe', revenue: 45.0, change: '+12%', avatar: 'E', color: 'bg-blue-100 dark:bg-blue-900' },
                      { name: 'Fashion Hub', owner: 'Jane Smith', revenue: 32.0, change: '+8%', avatar: 'F', color: 'bg-pink-100 dark:bg-pink-900' },
                      { name: 'Home Goods', owner: 'Mike Johnson', revenue: 28.0, change: '+5%', avatar: 'H', color: 'bg-amber-100 dark:bg-amber-900' },
                      { name: 'Tech Solutions', owner: 'Sarah Davis', revenue: 56.0, change: '+15%', avatar: 'T', color: 'bg-purple-100 dark:bg-purple-900' },
                    ].map((shop, idx) => (
                      <div key={idx} className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <div className={`w-10 h-10 rounded-lg ${shop.color} flex items-center justify-center text-sm font-bold text-gray-900 dark:text-white flex-shrink-0`}>
                          {shop.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{shop.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{shop.owner}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-sm font-bold text-gray-900 dark:text-white">₨{shop.revenue}k</div>
                          <div className="text-xs text-green-600 dark:text-green-400">{shop.change}</div>
                        </div>
                      </div>
                    ))}
                    <button className="w-full mt-4 py-2 text-center text-sm font-semibold text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 border border-teal-200 dark:border-teal-900 rounded-lg">
                      View All Shops
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Grid: User Acquisition + Device Usage + Recent Activity */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* User Acquisition */}
                <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">User Acquisition</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Direct', percentage: 45, color: 'bg-blue-300' },
                      { label: 'Social Media', percentage: 25, color: 'bg-purple-300' },
                      { label: 'Referral', percentage: 20, color: 'bg-green-300' },
                      { label: 'Others', percentage: 10, color: 'bg-amber-300' },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{item.percentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-[#0F1522] rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Device Usage - Donut Chart */}
                <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Device Usage</h3>
                  <div className="flex flex-col items-center justify-center py-6">
                    <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 flex items-center justify-center">
                      <div className="w-28 h-28 rounded-full bg-white dark:bg-[#161C2D] flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 dark:text-white">8.4k</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 space-y-2 w-full">
                      {[
                        { label: 'Mobile', percentage: 60, color: 'bg-blue-300' },
                        { label: 'Desktop', percentage: 30, color: 'bg-purple-300' },
                        { label: 'Tablet', percentage: 10, color: 'bg-pink-300' },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                            <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                          </div>
                          <span className="font-semibold text-gray-900 dark:text-white">{item.percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-[#161C2D] border border-gray-200 dark:border-[rgba(255,255,255,0.07)] rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    {[
                      { icon: '🛒', user: 'Alex Taylor', action: 'New Order', time: '2 mins ago', color: 'bg-blue-100 dark:bg-blue-900' },
                      { icon: '✓', user: 'Emma Wilson', action: 'KYC Verified', time: '15 mins ago', color: 'bg-green-100 dark:bg-green-900' },
                      { icon: '💳', user: 'John Doe', action: 'Payment Received', time: '1 hour ago', color: 'bg-amber-100 dark:bg-amber-900' },
                      { icon: '✅', user: 'Sarah Davis', action: 'Shop Approved', time: '3 hours ago', color: 'bg-purple-100 dark:bg-purple-900' },
                    ].map((activity, idx) => (
                      <div key={idx} className="flex items-start gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                        <div className={`w-8 h-8 rounded-lg ${activity.color} flex items-center justify-center text-sm flex-shrink-0`}>
                          {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">{activity.user}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{activity.action}</div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 flex-shrink-0 whitespace-nowrap">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other pages would go here, following the same pattern */}
          {currentPage !== PAGES.DASHBOARD && currentPage !== PAGES.ANALYTICS && (
            <div className="glass-card p-8 rounded-3xl min-h-[600px] flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 mb-6">
                <Activity size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{currentPage.replace('_', ' ')} Page</h2>
              <p className="text-gray-400 mt-2 max-w-md">This page is currently being updated to match the new design system. Please check back soon!</p>
              <button onClick={() => setCurrentPage(PAGES.DASHBOARD)} className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all">Back to Dashboard</button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
