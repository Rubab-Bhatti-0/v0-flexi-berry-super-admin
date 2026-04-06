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
    setShops(shops.map(s => s.id === showEditShopModal ? { ...s, ...newShop, revenue: parseInt(newShop.revenue) || 0 } : s))
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
      <div className="min-h-screen bg-[#F0F2F9] dark:bg-[#0A0E1A] flex items-center justify-center p-4">
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
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-500/30">Sign In</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#F0F2F9] dark:bg-[#0A0E1A]">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-screen w-64 flex flex-col sidebar-bg z-50 transition-transform duration-300 md:translate-x-0 ${!sidebarOpen ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className="px-6 py-8">
          <Logo />
        </div>
        
        <div className="px-4 mb-6">
          <div className="bg-[#2A2D45] rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">TZ</div>
            <div>
              <div className="text-sm font-bold text-white">TechZone</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                <span className="text-[10px] text-green-500 font-bold">Active · Verified</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-8">
          {navSections.map(section => (
            <div key={section.title}>
              <h3 className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">{section.title}</h3>
              <div className="space-y-1">
                {section.items.map(item => (
                  <button key={item.label} onClick={() => { setCurrentPage(item.id); setCurrentPageNum(1); setSearchTerm(''); }} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${currentPage === item.id ? 'sidebar-item-active' : 'sidebar-item-inactive'}`}>
                    <div className="flex items-center gap-3">{item.icon}{item.label}</div>
                    {item.badge && <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-gradient-to-br from-[#2A2D45] to-[#1A1C2E] rounded-2xl p-4 border border-white/5">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <Zap size={16} fill="currentColor" />
              <span className="text-xs font-bold uppercase tracking-wider">Pro Features</span>
            </div>
            <p className="text-[10px] text-gray-400 mb-4 leading-relaxed">Unlock advanced analytics, bulk uploads & priority support</p>
            <button className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-all">Upgrade Plan</button>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut size={18} />Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0A0E1A]/80 backdrop-blur-xl h-16 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
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
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold">TZ</div>
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
                    <input type="text" placeholder="Search orders..." className="pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all w-64" />
                  </div>
                  <button className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                    <Plus size={16} /> Add Product
                  </button>
                  <button className="p-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-blue-600 transition-all">
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, i) => (
                  <div key={i} className={`${card.bgColor} p-6 rounded-3xl relative overflow-hidden group`}>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white/80 dark:bg-white/5 flex items-center justify-center shadow-sm">
                          {card.icon}
                        </div>
                        <div className={`px-2 py-1 rounded-lg bg-white/50 dark:bg-white/5 text-[10px] font-bold ${card.color} flex items-center gap-1`}>
                          <TrendingUp size={10} /> {card.change}
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{card.value}</h3>
                      <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{card.label}</p>
                      <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-gray-400">
                        vs last month <ChevronRight size={10} />
                      </div>
                    </div>
                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                      {card.icon}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Overview */}
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
                      <button className="p-4 rounded-2xl bg-blue-600 text-white flex flex-col items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
                        <ShoppingBag size={20} />
                        <span className="text-[10px] font-bold">Add Product</span>
                      </button>
                      <button className="p-4 rounded-2xl bg-purple-600 text-white flex flex-col items-center justify-center gap-2 hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/20">
                        <ShieldCheck size={20} />
                        <span className="text-[10px] font-bold">Review KYC</span>
                      </button>
                      <button className="p-4 rounded-2xl bg-green-600 text-white flex flex-col items-center justify-center gap-2 hover:bg-green-700 transition-all shadow-lg shadow-green-500/20">
                        <Users size={20} />
                        <span className="text-[10px] font-bold">View Buyers</span>
                      </button>
                      <button className="p-4 rounded-2xl bg-amber-600 text-white flex flex-col items-center justify-center gap-2 hover:bg-amber-700 transition-all shadow-lg shadow-amber-500/20">
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
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
                  <p className="text-xs text-gray-400 mt-1">Comprehensive insights into your platform performance</p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300 flex items-center gap-2">
                    <Download size={16} /> Export Report
                  </button>
                  <select className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold outline-none">
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                    <option>This Year</option>
                  </select>
                </div>
              </div>

              {/* Analytics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Revenue Chart */}
                  <div className="glass-card p-8 rounded-3xl">
                    <div className="flex items-center justify-between mb-8">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Revenue Growth</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                          <span className="text-[10px] font-bold text-gray-500">Revenue</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                          <span className="text-[10px] font-bold text-gray-500">Profit</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-72 flex items-end justify-between gap-2">
                      {[40, 55, 45, 70, 60, 85, 75, 90, 80, 95, 85, 100].map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                          <div className="w-full relative flex items-end justify-center gap-0.5 h-56">
                            <div className="w-full bg-purple-100 dark:bg-purple-900/20 rounded-t-md transition-all group-hover:bg-purple-200" style={{ height: `${val * 0.6}%` }}></div>
                            <div className="w-full bg-blue-600 rounded-t-md transition-all group-hover:bg-blue-700" style={{ height: `${val}%` }}></div>
                          </div>
                          <span className="text-[9px] font-bold text-gray-400">{'JFMAMJJASOND'[i]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* User Activity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="glass-card p-6 rounded-3xl">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6">User Acquisition</h3>
                      <div className="space-y-4">
                        {[
                          { label: 'Direct', val: 45, color: 'bg-blue-500' },
                          { label: 'Social Media', val: 25, color: 'bg-purple-500' },
                          { label: 'Referral', val: 20, color: 'bg-green-500' },
                          { label: 'Others', val: 10, color: 'bg-amber-500' },
                        ].map((item, i) => (
                          <div key={i}>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-bold text-gray-500">{item.label}</span>
                              <span className="text-[10px] font-bold text-gray-900 dark:text-white">{item.val}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                              <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="glass-card p-6 rounded-3xl">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6">Device Usage</h3>
                      <div className="flex items-center justify-center h-32">
                        <div className="relative w-32 h-32">
                          <svg className="w-full h-full" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-blue-500" strokeWidth="4" strokeDasharray="60 100"></circle>
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-purple-500" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="-60"></circle>
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-amber-500" strokeWidth="4" strokeDasharray="10 100" strokeDashoffset="-90"></circle>
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xs font-bold text-gray-900 dark:text-white">8.4k</span>
                            <span className="text-[8px] text-gray-400">Total</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-blue-500">60%</div>
                          <div className="text-[8px] text-gray-400">Mobile</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-purple-500">30%</div>
                          <div className="text-[8px] text-gray-400">Desktop</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-amber-500">10%</div>
                          <div className="text-[8px] text-gray-400">Tablet</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Top Products */}
                  <div className="glass-card p-6 rounded-3xl">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6">Top Performing Shops</h3>
                    <div className="space-y-6">
                      {shops.map((shop, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-blue-600 font-bold text-xs">
                              {shop.name.charAt(0)}
                            </div>
                            <div>
                              <div className="text-[11px] font-bold text-gray-900 dark:text-white">{shop.name}</div>
                              <div className="text-[9px] text-gray-400">{shop.owner}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[11px] font-bold text-gray-900 dark:text-white">Rs {(shop.revenue / 1000).toFixed(1)}k</div>
                            <div className="text-[9px] text-green-500 font-bold">+12%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-6 py-2.5 rounded-xl border border-gray-100 dark:border-gray-700 text-[10px] font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">View All Shops</button>
                  </div>

                  {/* Recent Activity */}
                  <div className="glass-card p-6 rounded-3xl">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h3>
                    <div className="space-y-6">
                      {[
                        { user: 'Alex Taylor', action: 'New Order', time: '2 mins ago', icon: <ShoppingCart size={14} />, color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-500/10' },
                        { user: 'Emma Wilson', action: 'KYC Verified', time: '15 mins ago', icon: <ShieldCheck size={14} />, color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-500/10' },
                        { user: 'John Doe', action: 'Payment Received', time: '1 hour ago', icon: <DollarSign size={14} />, color: 'text-amber-500', bgColor: 'bg-amber-50 dark:bg-amber-500/10' },
                        { user: 'Sarah Davis', action: 'Shop Approved', time: '3 hours ago', icon: <Check size={14} />, color: 'text-purple-500', bgColor: 'bg-purple-50 dark:bg-purple-500/10' },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-3">
                          <div className={`w-8 h-8 rounded-lg ${item.bgColor} ${item.color} flex items-center justify-center shrink-0`}>
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-gray-900 dark:text-white">{item.user} <span className="font-medium text-gray-400">{item.action}</span></div>
                            <div className="text-[9px] text-gray-400 mt-0.5">{item.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
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
              <button onClick={() => setCurrentPage(PAGES.DASHBOARD)} className="mt-8 px-6 py-3 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">Back to Dashboard</button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
