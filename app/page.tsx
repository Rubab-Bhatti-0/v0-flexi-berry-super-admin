'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Moon, Sun, LogOut, Bell, Search, Plus, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, Download, FileText, Check, AlertCircle, Lock, User, Mail, ShieldCheck, ShoppingBag, Pause, Play, Save, XCircle, TrendingUp, BarChart3, Users, ShoppingCart, DollarSign, Activity } from 'lucide-react'
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
    lastWeekSales: [45, 52, 48, 61, 55, 70, 85],
    orderFulfillment: 94,
    kycApprovalRate: 78,
    customerSatisfaction: 88,
  }

  const statCards = [
    { label: 'Total Products', value: '284', change: '+8%', type: 'up', icon: '📦', color: 'from-green-400 to-emerald-500', bgColor: 'glass-card-light' },
    { label: 'Orders Received', value: '847', change: '+23%', type: 'up', icon: '🛒', color: 'from-blue-400 to-indigo-500', bgColor: 'glass-card-blue' },
    { label: 'Active Installments', value: '612', change: '+15%', type: 'up', icon: '💳', color: 'from-purple-400 to-violet-500', bgColor: 'glass-card-purple' },
    { label: 'Monthly Revenue', value: 'Rs 8.4M', change: '+28%', type: 'up', icon: '💰', color: 'from-amber-400 to-yellow-500', bgColor: 'glass-card-amber' },
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

  // Shops handlers
  const handleAddShop = () => {
    if (newShop.name && newShop.owner) {
      setShops([...shops, { id: shops.length + 1, ...newShop, revenue: parseInt(newShop.revenue) || 0, date: new Date().toISOString().split('T')[0] }])
      setNewShop({ name: '', owner: '', revenue: '', status: 'active' })
      setShowAddShopModal(false)
    }
  }

  const handleEditShop = (shop: any) => {
    setNewShop(shop)
    setShowEditShopModal(shop.id)
  }

  const handleSaveEditShop = () => {
    setShops(shops.map(s => s.id === showEditShopModal ? { ...s, ...newShop } : s))
    setNewShop({ name: '', owner: '', revenue: '', status: 'active' })
    setShowEditShopModal(null)
  }

  const handleDeleteShop = (id: number) => {
    setShops(shops.filter(s => s.id !== id))
  }

  const handleToggleShopStatus = (id: number) => {
    setShops(shops.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'suspended' : 'active' } : s))
  }

  // Admins handlers
  const handleAddAdmin = () => {
    if (newAdmin.name && newAdmin.email) {
      setAdmins([...admins, { id: admins.length + 1, ...newAdmin, status: 'active', lastLogin: 'Never' }])
      setNewAdmin({ name: '', email: '', role: 'Admin' })
      setShowAddAdminModal(false)
    }
  }

  const handleEditAdmin = (admin: any) => {
    setNewAdmin(admin)
    setShowEditAdminModal(admin.id)
  }

  const handleSaveEditAdmin = () => {
    setAdmins(admins.map(a => a.id === showEditAdminModal ? { ...a, ...newAdmin } : a))
    setNewAdmin({ name: '', email: '', role: 'Admin' })
    setShowEditAdminModal(null)
  }

  const handleDeleteAdmin = (id: number) => {
    setAdmins(admins.filter(a => a.id !== id))
  }

  const handleToggleAdminStatus = (id: number) => {
    setAdmins(admins.map(a => a.id === id ? { ...a, status: a.status === 'active' ? 'inactive' : 'active' } : a))
  }

  // Users handlers
  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { id: users.length + 1, ...newUser, joined: new Date().toISOString().split('T')[0] }])
      setNewUser({ name: '', email: '', phone: '', status: 'active' })
      setShowAddUserModal(false)
    }
  }

  const handleEditUser = (user: any) => {
    setNewUser(user)
    setShowEditUserModal(user.id)
  }

  const handleSaveEditUser = () => {
    setUsers(users.map(u => u.id === showEditUserModal ? { ...u, ...newUser } : u))
    setNewUser({ name: '', email: '', phone: '', status: 'active' })
    setShowEditUserModal(null)
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id))
  }

  const handleToggleUserStatus = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u))
  }

  // Categories handlers
  const handleAddCategory = () => {
    if (newCategory.name && newCategory.icon) {
      setCategories([...categories, { id: categories.length + 1, ...newCategory, items: 0, status: 'active' }])
      setNewCategory({ name: '', icon: '' })
      setShowAddCategoryModal(false)
    }
  }

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(c => c.id !== id))
  }

  const handleToggleCategoryStatus = (id: number) => {
    setCategories(categories.map(c => c.id === id ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c))
  }

  // KYC handlers
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

  // Installments handlers
  const handleMarkInstallmentPaid = (id: number) => {
    setInstallments(installments.map(inst => inst.id === id && inst.paid < inst.total ? { ...inst, paid: inst.paid + 1 } : inst))
  }

  const handleSendReminder = (id: number) => {
    alert('Reminder sent to customer for Order ' + installments.find(i => i.id === id)?.order)
  }

  // Recovery handlers
  const handleSendRecoveryLink = (id: number) => {
    setRecoveryRequests(recoveryRequests.map(req => req.id === id ? { ...req, status: 'verified' } : req))
  }

  const handleCloseRecoveryRequest = (id: number) => {
    setRecoveryRequests(recoveryRequests.filter(req => req.id !== id))
  }

  // Settings handlers
  const handleSaveSettings = () => {
    alert('Settings saved successfully!')
  }

  const filteredShops = shops.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredAdmins = admins.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredInstallments = installments.filter(i => i.order.toLowerCase().includes(searchTerm.toLowerCase()))
  const filteredRecovery = recoveryRequests.filter(r => r.email.toLowerCase().includes(searchTerm.toLowerCase()))

  const getFilteredData = () => {
    switch (currentPage) {
      case PAGES.SHOPS: return filteredShops
      case PAGES.USERS: return filteredUsers
      case PAGES.ADMINS: return filteredAdmins
      case PAGES.INSTALLMENTS: return filteredInstallments
      case PAGES.RECOVERY: return filteredRecovery
      default: return []
    }
  }

  const filteredData = getFilteredData()
  const paginatedData = filteredData.slice((currentPageNum - 1) * itemsPerPage, currentPageNum * itemsPerPage)

  if (!mounted) return null

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8f9fc] to-[#f0f2f7] dark:from-[#0a0e1a] dark:to-[#0f1522] flex items-center justify-center p-4">
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
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/30">Sign In</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f8f9fc] to-[#f0f2f7] dark:from-[#0a0e1a] dark:to-[#0f1522]">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-64 flex flex-col bg-gradient-to-b from-gray-900 to-gray-950 dark:from-gray-900 dark:to-gray-950 z-50 transition-transform duration-300 md:translate-x-0 ${!sidebarOpen ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className="px-6 py-8 border-b border-gray-700">
          <Logo />
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
          {navSections.map(section => (
            <div key={section.title}>
              <h3 className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">{section.title}</h3>
              <div className="space-y-1">
                {section.items.map(item => (
                  <button key={item.id} onClick={() => { setCurrentPage(item.id); setCurrentPageNum(1); setSearchTerm(''); }} className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${currentPage === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
                    <div className="flex items-center gap-3"><span className="text-lg">{item.icon}</span>{item.label}</div>
                    {item.badge && <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut size={18} />Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        <header className="sticky top-0 z-40 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 h-16 flex items-center justify-between px-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-4">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white"><User size={20} /></div>
              <div className="hidden sm:block">
                <div className="text-sm font-bold text-gray-900 dark:text-white leading-none">Super Admin</div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">Full Access</div>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Dashboard */}
          {currentPage === PAGES.DASHBOARD && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">Good morning, <span className="text-blue-600">FlexiBerry</span> 👋</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Friday, March 13, 2026 · Here's your store overview</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 rounded-lg bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>Live
                  </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, i) => (
                  <div key={i} className={`${card.bgColor} p-6 rounded-2xl backdrop-blur-xl border border-white/20 dark:border-white/5`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-xl shadow-lg`}>{card.icon}</div>
                    </div>
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">{card.label}</p>
                    <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">{card.value}</h3>
                    <p className="text-xs font-semibold text-green-600 dark:text-green-400">↑ {card.change} <span className="text-gray-500 dark:text-gray-400 font-medium">vs last month</span></p>
                  </div>
                ))}
              </div>

              {/* Sales Overview & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-card p-8 rounded-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sales Overview</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Last 7 days performance</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-extrabold text-gray-900 dark:text-white">Rs 2.1M</p>
                      <p className="text-xs font-semibold text-green-600 dark:text-green-400 mt-1">↑ +18.4% vs last week</p>
                    </div>
                  </div>
                  
                  {/* Bar Chart */}
                  <div className="flex items-end justify-between h-48 gap-2">
                    {analyticsData.salesTrend.map((value, idx) => {
                      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                      const maxValue = Math.max(...analyticsData.salesTrend)
                      const height = (value / maxValue) * 100
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg" style={{ height: `${height}%` }}></div>
                          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{days[idx]}</span>
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-400"></div>
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">This Week <span className="text-gray-900 dark:text-white font-bold">Rs 2.1M</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-900 dark:to-blue-800"></div>
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Last Week <span className="text-gray-900 dark:text-white font-bold">Rs 1.77M</span></span>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-8 rounded-2xl">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white font-bold text-sm hover:shadow-lg transition-all flex flex-col items-center justify-center gap-2 h-24">
                      <Plus size={24} />
                      <span>Add Product</span>
                    </button>
                    <button className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white font-bold text-sm hover:shadow-lg transition-all flex flex-col items-center justify-center gap-2 h-24">
                      <ShieldCheck size={24} />
                      <span>Review KYC</span>
                    </button>
                    <button className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-white font-bold text-sm hover:shadow-lg transition-all flex flex-col items-center justify-center gap-2 h-24">
                      <Users size={24} />
                      <span>View Buyers</span>
                    </button>
                    <button className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold text-sm hover:shadow-lg transition-all flex flex-col items-center justify-center gap-2 h-24">
                      <ShoppingCart size={24} />
                      <span>All Orders</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Order Fulfillment</span>
                      <span className="text-lg font-bold text-teal-600 dark:text-teal-400">{analyticsData.orderFulfillment}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-500 to-teal-400" style={{ width: `${analyticsData.orderFulfillment}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">KYC Approval Rate</span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{analyticsData.kycApprovalRate}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400" style={{ width: `${analyticsData.kycApprovalRate}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Customer Satisfaction</span>
                      <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{analyticsData.customerSatisfaction}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400" style={{ width: `${analyticsData.customerSatisfaction}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Page */}
          {currentPage === PAGES.ANALYTICS && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Analytics Dashboard</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Comprehensive insights into your platform performance</p>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white"><ShoppingCart size={24} /></div>
                    <TrendingUp size={20} className="text-green-500" />
                  </div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Total Orders</p>
                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">847</h3>
                  <p className="text-xs font-semibold text-green-600 dark:text-green-400">↑ +23% from last month</p>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white"><Users size={24} /></div>
                    <TrendingUp size={20} className="text-green-500" />
                  </div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Active Users</p>
                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">5,678</h3>
                  <p className="text-xs font-semibold text-green-600 dark:text-green-400">↑ +15% from last month</p>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white"><DollarSign size={24} /></div>
                    <TrendingUp size={20} className="text-green-500" />
                  </div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Total Revenue</p>
                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Rs 2.4M</h3>
                  <p className="text-xs font-semibold text-green-600 dark:text-green-400">↑ +12.5% from last month</p>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white"><Activity size={24} /></div>
                    <TrendingUp size={20} className="text-green-500" />
                  </div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Conversion Rate</p>
                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">3.2%</h3>
                  <p className="text-xs font-semibold text-green-600 dark:text-green-400">↑ +0.8% from last month</p>
                </div>
              </div>

              {/* Sales Trend Chart */}
              <div className="glass-card p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Sales Trend (30 Days)</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Daily revenue performance</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
                    <Download size={16} /> Export
                  </button>
                </div>
                
                <div className="flex items-end justify-between h-64 gap-1">
                  {Array.from({ length: 30 }).map((_, idx) => {
                    const value = Math.floor(Math.random() * 100) + 50
                    const maxValue = 150
                    const height = (value / maxValue) * 100
                    return (
                      <div key={idx} className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg hover:from-blue-700 hover:to-blue-500 transition-all cursor-pointer" style={{ height: `${height}%` }} title={`Day ${idx + 1}: Rs ${value}K`}></div>
                    )
                  })}
                </div>
              </div>

              {/* KYC Verification Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card p-8 rounded-2xl">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">User KYC Verification</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Approved</span>
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">234</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Pending</span>
                        <span className="text-lg font-bold text-amber-600 dark:text-amber-400">45</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Rejected</span>
                        <span className="text-lg font-bold text-red-600 dark:text-red-400">12</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-red-400" style={{ width: '7%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 rounded-2xl">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Vendor KYC Verification</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Approved</span>
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">189</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-green-400" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Pending</span>
                        <span className="text-lg font-bold text-amber-600 dark:text-amber-400">28</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Rejected</span>
                        <span className="text-lg font-bold text-red-600 dark:text-red-400">5</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-red-500 to-red-400" style={{ width: '5%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Installment Analytics */}
              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Installment Payment Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-2">612</div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Active Plans</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-green-600 dark:text-green-400 mb-2">478</div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">On Schedule</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 mb-2">89</div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Due Soon</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold text-red-600 dark:text-red-400 mb-2">45</div>
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Overdue</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shops Page */}
          {currentPage === PAGES.SHOPS && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Manage Shops</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monitor and manage all vendor shops</p>
                </div>
                <button onClick={() => setShowAddShopModal(true)} className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/30">
                  <Plus size={18} /> Add Shop
                </button>
              </div>

              <div className="glass-card overflow-hidden rounded-2xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="w-full md:w-56 flex items-center gap-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 h-9">
                    <Search size={16} className="text-gray-400" />
                    <input type="text" placeholder="Search shops..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPageNum(1); }} className="w-full bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Shop Name</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Owner</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {paginatedData.map(shop => (
                        <tr key={shop.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{shop.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{shop.owner}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">${shop.revenue.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wide ${shop.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                              <span className="w-1 h-1 rounded-full bg-current"></span>{shop.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleEditShop(shop)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all"><Edit2 size={16} /></button>
                              <button onClick={() => handleToggleShopStatus(shop.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all">{shop.status === 'active' ? <Pause size={16} /> : <Play size={16} />}</button>
                              <button onClick={() => handleDeleteShop(shop.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Shop Modal */}
              {showAddShopModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="glass-card w-full max-w-md overflow-hidden rounded-3xl">
                    <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Add New Shop</h3>
                      <button onClick={() => setShowAddShopModal(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><X size={20} /></button>
                    </div>
                    <div className="p-8 space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Shop Name</label>
                        <input type="text" value={newShop.name} onChange={(e) => setNewShop({ ...newShop, name: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Owner Name</label>
                        <input type="text" value={newShop.owner} onChange={(e) => setNewShop({ ...newShop, owner: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Revenue</label>
                        <input type="number" value={newShop.revenue} onChange={(e) => setNewShop({ ...newShop, revenue: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button onClick={handleAddShop} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/30">Create Shop</button>
                        <button onClick={() => setShowAddShopModal(false)} className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white font-bold py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Shop Modal */}
              {showEditShopModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="glass-card w-full max-w-md overflow-hidden rounded-3xl">
                    <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Edit Shop</h3>
                      <button onClick={() => setShowEditShopModal(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><X size={20} /></button>
                    </div>
                    <div className="p-8 space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Shop Name</label>
                        <input type="text" value={newShop.name} onChange={(e) => setNewShop({ ...newShop, name: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Owner Name</label>
                        <input type="text" value={newShop.owner} onChange={(e) => setNewShop({ ...newShop, owner: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Revenue</label>
                        <input type="number" value={newShop.revenue} onChange={(e) => setNewShop({ ...newShop, revenue: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button onClick={handleSaveEditShop} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/30">Save Changes</button>
                        <button onClick={() => setShowEditShopModal(null)} className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white font-bold py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Admins Page */}
          {currentPage === PAGES.ADMINS && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">System Administrators</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage platform administrators and their access levels</p>
                </div>
                <button onClick={() => setShowAddAdminModal(true)} className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/30">
                  <Plus size={18} /> Add Admin
                </button>
              </div>

              <div className="glass-card overflow-hidden rounded-2xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="w-full md:w-56 flex items-center gap-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 h-9">
                    <Search size={16} className="text-gray-400" />
                    <input type="text" placeholder="Search admins..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPageNum(1); }} className="w-full bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Login</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {paginatedData.map(admin => (
                        <tr key={admin.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{admin.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{admin.email}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                              {admin.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wide ${admin.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                              <span className="w-1 h-1 rounded-full bg-current"></span>
                              {admin.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{admin.lastLogin}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleEditAdmin(admin)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all"><Edit2 size={16} /></button>
                              <button onClick={() => handleToggleAdminStatus(admin.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all">{admin.status === 'active' ? <Pause size={16} /> : <Play size={16} />}</button>
                              <button onClick={() => handleDeleteAdmin(admin.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Admin Modal */}
              {showAddAdminModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="glass-card w-full max-w-md overflow-hidden rounded-3xl">
                    <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Add New Admin</h3>
                      <button onClick={() => setShowAddAdminModal(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><X size={20} /></button>
                    </div>
                    <div className="p-8 space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                        <input type="text" value={newAdmin.name} onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                        <input type="email" value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Access Role</label>
                        <select value={newAdmin.role} onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none">
                          <option>Admin</option>
                          <option>Manager</option>
                          <option>Support</option>
                        </select>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button onClick={handleAddAdmin} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/30">Create Admin</button>
                        <button onClick={() => setShowAddAdminModal(false)} className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white font-bold py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Admin Modal */}
              {showEditAdminModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="glass-card w-full max-w-md overflow-hidden rounded-3xl">
                    <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Edit Admin</h3>
                      <button onClick={() => setShowEditAdminModal(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><X size={20} /></button>
                    </div>
                    <div className="p-8 space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                        <input type="text" value={newAdmin.name} onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                        <input type="email" value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Access Role</label>
                        <select value={newAdmin.role} onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none">
                          <option>Admin</option>
                          <option>Manager</option>
                          <option>Support</option>
                        </select>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button onClick={handleSaveEditAdmin} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/30">Save Changes</button>
                        <button onClick={() => setShowEditAdminModal(null)} className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white font-bold py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Users Page */}
          {currentPage === PAGES.USERS && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Manage Users</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monitor and manage platform users</p>
                </div>
                <button onClick={() => setShowAddUserModal(true)} className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/30">
                  <Plus size={18} /> Add User
                </button>
              </div>

              <div className="glass-card overflow-hidden rounded-2xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="w-full md:w-56 flex items-center gap-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 h-9">
                    <Search size={16} className="text-gray-400" />
                    <input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPageNum(1); }} className="w-full bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {paginatedData.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{user.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.phone}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wide ${user.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                              <span className="w-1 h-1 rounded-full bg-current"></span>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.joined}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleEditUser(user)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all"><Edit2 size={16} /></button>
                              <button onClick={() => handleToggleUserStatus(user.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-all">{user.status === 'active' ? <Pause size={16} /> : <Play size={16} />}</button>
                              <button onClick={() => handleDeleteUser(user.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add User Modal */}
              {showAddUserModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="glass-card w-full max-w-md overflow-hidden rounded-3xl">
                    <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Add New User</h3>
                      <button onClick={() => setShowAddUserModal(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><X size={20} /></button>
                    </div>
                    <div className="p-8 space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                        <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                        <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                        <input type="tel" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button onClick={handleAddUser} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/30">Create User</button>
                        <button onClick={() => setShowAddUserModal(false)} className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white font-bold py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit User Modal */}
              {showEditUserModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="glass-card w-full max-w-md overflow-hidden rounded-3xl">
                    <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Edit User</h3>
                      <button onClick={() => setShowEditUserModal(null)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><X size={20} /></button>
                    </div>
                    <div className="p-8 space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                        <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Email Address</label>
                        <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                        <input type="tel" value={newUser.phone} onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button onClick={handleSaveEditUser} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/30">Save Changes</button>
                        <button onClick={() => setShowEditUserModal(null)} className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white font-bold py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User KYC Verification Page */}
          {currentPage === PAGES.USER_VERIFICATION && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">User KYC Verification</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review and manage user identity verification requests</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {userVerifications.map(item => (
                  <div key={item.id} className="glass-card p-6 rounded-2xl hover:border-blue-500/30 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xl text-white">👤</div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.name}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Email: {item.email} • Submitted: {item.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${item.status === 'approved' ? 'badge-success' : item.status === 'rejected' ? 'badge-error' : 'badge-pending'}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>{item.status}
                        </span>
                        <button onClick={() => setViewDocModal({ open: true, item, type: 'user' })} className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">View Documents</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {viewDocModal.open && viewDocModal.item && viewDocModal.type === 'user' && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="glass-card w-full max-w-2xl overflow-hidden rounded-3xl">
                    <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Review User Documents</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{viewDocModal.item.name}</p>
                      </div>
                      <button onClick={() => setViewDocModal({ open: false, item: null, type: 'user' })} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><X size={20} /></button>
                    </div>
                    <div className="p-8">
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {viewDocModal.item.docs.map((doc: string, idx: number) => (
                          <div key={idx} className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 group hover:border-blue-500/50 transition-all cursor-pointer">
                            <FileText size={32} className="text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{doc}</span>
                          </div>
                        ))}
                      </div>
                      {viewDocModal.item.status === 'pending' && (
                        <div className="flex gap-4">
                          <button onClick={() => handleApproveKYC(viewDocModal.item.id, 'user')} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-green-500/30"><Check size={20} /> Approve</button>
                          <button onClick={() => handleRejectKYC(viewDocModal.item.id, 'user')} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-red-500/30"><AlertCircle size={20} /> Reject</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Vendor KYC Verification Page */}
          {currentPage === PAGES.VENDOR_VERIFICATION && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Vendor KYC Verification</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Review and manage vendor verification requests</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {vendorVerifications.map(item => (
                  <div key={item.id} className="glass-card p-6 rounded-2xl hover:border-blue-500/30 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-xl text-white">🏪</div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{item.shopName}</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Owner: {item.owner} • Submitted: {item.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${item.status === 'approved' ? 'badge-success' : item.status === 'rejected' ? 'badge-error' : 'badge-pending'}`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>{item.status}
                        </span>
                        <button onClick={() => setViewDocModal({ open: true, item, type: 'vendor' })} className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">View Documents</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {viewDocModal.open && viewDocModal.item && viewDocModal.type === 'vendor' && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="glass-card w-full max-w-2xl overflow-hidden rounded-3xl">
                    <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Review Vendor Documents</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{viewDocModal.item.shopName}</p>
                      </div>
                      <button onClick={() => setViewDocModal({ open: false, item: null, type: 'user' })} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><X size={20} /></button>
                    </div>
                    <div className="p-8">
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        {viewDocModal.item.docs.map((doc: string, idx: number) => (
                          <div key={idx} className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 group hover:border-blue-500/50 transition-all cursor-pointer">
                            <FileText size={32} className="text-gray-400 group-hover:text-blue-500 mb-2 transition-colors" />
                            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{doc}</span>
                          </div>
                        ))}
                      </div>
                      {viewDocModal.item.status === 'pending' && (
                        <div className="flex gap-4">
                          <button onClick={() => handleApproveKYC(viewDocModal.item.id, 'vendor')} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-green-500/30"><Check size={20} /> Approve</button>
                          <button onClick={() => handleRejectKYC(viewDocModal.item.id, 'vendor')} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-red-500/30"><AlertCircle size={20} /> Reject</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Categories Page */}
          {currentPage === PAGES.CATEGORIES && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Manage Categories</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Organize and manage product categories</p>
                </div>
                <button onClick={() => setShowAddCategoryModal(true)} className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-sm transition-all shadow-lg shadow-blue-500/30">
                  <Plus size={18} /> Add Category
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(cat => (
                  <div key={cat.id} className="glass-card p-6 rounded-2xl hover:border-blue-500/30 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl">{cat.icon}</div>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wide ${cat.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                        <span className="w-1 h-1 rounded-full bg-current"></span>{cat.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{cat.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{cat.items} products</p>
                    <div className="flex gap-2">
                      <button onClick={() => handleToggleCategoryStatus(cat.id)} className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white text-xs font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        {cat.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button onClick={() => handleDeleteCategory(cat.id)} className="flex-1 px-3 py-2 rounded-lg bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-xs font-bold hover:bg-red-200 dark:hover:bg-red-500/20 transition-colors">Delete</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Category Modal */}
              {showAddCategoryModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
                  <div className="glass-card w-full max-w-md overflow-hidden rounded-3xl">
                    <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                      <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Add New Category</h3>
                      <button onClick={() => setShowAddCategoryModal(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><X size={20} /></button>
                    </div>
                    <div className="p-8 space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Category Name</label>
                        <input type="text" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Icon/Emoji</label>
                        <input type="text" value={newCategory.icon} onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })} placeholder="e.g., 🔌" className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <button onClick={handleAddCategory} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/30">Create Category</button>
                        <button onClick={() => setShowAddCategoryModal(false)} className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white font-bold py-3 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Installments Page */}
          {currentPage === PAGES.INSTALLMENTS && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Payment Installments</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monitor and manage payment plans and installment schedules</p>
              </div>

              <div className="glass-card overflow-hidden rounded-2xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="w-full md:w-56 flex items-center gap-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 h-9">
                    <Search size={16} className="text-gray-400" />
                    <input type="text" placeholder="Search orders..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPageNum(1); }} className="w-full bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Plan</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Progress</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Next Due</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {paginatedData.map(inst => (
                        <tr key={inst.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <td className="px-6 py-4 text-sm font-mono text-gray-900 dark:text-white">{inst.order}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{inst.customer}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-teal-600 dark:text-teal-400">${inst.amount}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{inst.plan}</td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-teal-500" style={{ width: `${(inst.paid / inst.total) * 100}%` }}></div>
                              </div>
                              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{inst.paid}/{inst.total}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{inst.nextDue}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wide ${inst.status === 'active' ? 'badge-info' : inst.status === 'completed' ? 'badge-success' : 'badge-error'}`}>
                              <span className="w-1 h-1 rounded-full bg-current"></span>{inst.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleMarkInstallmentPaid(inst.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 transition-all" title="Mark as Paid"><Check size={16} /></button>
                              <button onClick={() => handleSendReminder(inst.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all" title="Send Reminder"><Bell size={16} /></button>
                            </div>
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
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Account Recovery Requests</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Process user account recovery and password reset requests</p>
              </div>

              <div className="glass-card overflow-hidden rounded-2xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="w-full md:w-56 flex items-center gap-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 h-9">
                    <Search size={16} className="text-gray-400" />
                    <input type="text" placeholder="Search recovery..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPageNum(1); }} className="w-full bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Username</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Method</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Requested</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Expires</th>
                        <th className="px-6 py-4 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {paginatedData.map(req => (
                        <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">{req.email}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{req.username}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{req.method}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wide ${req.status === 'completed' || req.status === 'verified' ? 'badge-success' : 'badge-pending'}`}>
                              <span className="w-1 h-1 rounded-full bg-current"></span>{req.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{req.date}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{req.expiresAt}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleSendRecoveryLink(req.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 transition-all" title="Send Recovery Link"><Check size={16} /></button>
                              <button onClick={() => handleCloseRecoveryRequest(req.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all" title="Close Request"><XCircle size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Settings Page */}
          {currentPage === PAGES.SETTINGS && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Platform Settings</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Configure platform-wide settings and policies</p>
              </div>

              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">General Settings</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Platform Name</label>
                    <input type="text" value={platformSettings.platformName} onChange={(e) => setPlatformSettings({ ...platformSettings, platformName: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Support Email</label>
                    <input type="email" value={platformSettings.supportEmail} onChange={(e) => setPlatformSettings({ ...platformSettings, supportEmail: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Contact Number</label>
                    <input type="tel" value={platformSettings.contactNumber} onChange={(e) => setPlatformSettings({ ...platformSettings, contactNumber: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 rounded-2xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Commerce Settings</h3>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">Commission Rate</label>
                      <input type="text" value={platformSettings.commissionRate} onChange={(e) => setPlatformSettings({ ...platformSettings, commissionRate: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-
