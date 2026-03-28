'use client';

import { useState } from 'react';

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', role: '', status: 'active' });

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'shops', label: 'Shops', icon: '🏪', badge: 3 },
    { id: 'admins', label: 'Admins', icon: '👥' },
    { id: 'users', label: 'Users', icon: '👤' },
    { id: 'verification', label: 'Verification', icon: '✓', badge: 12 },
    { id: 'products', label: 'Products', icon: '📦' },
    { id: 'categories', label: 'Categories', icon: '📂' },
    { id: 'installments', label: 'Installments', icon: '💳' },
    { id: 'recovery', label: 'Recovery', icon: '🔄', badge: 5 },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: '', email: '', role: '', status: 'active' });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleCloseModal();
  };

  // Mock data
  const shops = [
    { id: 1, name: 'Tech Haven', owner: 'Ahmed Ali', status: 'active', revenue: '$45,234' },
    { id: 2, name: 'Fashion Plus', owner: 'Fatima Khan', status: 'active', revenue: '$32,156' },
    { id: 3, name: 'Home Decor', owner: 'Omar Hassan', status: 'inactive', revenue: '$12,890' },
  ];

  const admins = [
    { id: 1, name: 'Sarah Admin', email: 'sarah@flexiberry.com', role: 'Super Admin', status: 'active' },
    { id: 2, name: 'John Manager', email: 'john@flexiberry.com', role: 'Manager', status: 'active' },
  ];

  const users = [
    { id: 1, name: 'Aisha Mohammed', email: 'aisha@mail.com', joined: '2024-01-15', status: 'active' },
    { id: 2, name: 'Hassan Khan', email: 'hassan@mail.com', joined: '2024-02-20', status: 'active' },
    { id: 3, name: 'Leila Ahmed', email: 'leila@mail.com', joined: '2024-03-10', status: 'suspended' },
  ];

  const verifications = [
    { id: 1, user: 'Mohammed Saad', type: 'KYC', document: 'ID Card', status: 'pending' },
    { id: 2, user: 'Noor Ibrahim', type: 'KYC', document: 'Passport', status: 'pending' },
    { id: 3, user: 'Zainab Malik', type: 'KYC', document: 'License', status: 'approved' },
  ];

  const products = [
    { id: 1, name: 'Wireless Headphones', sku: 'WH-001', stock: 45, price: '$89.99', status: 'active' },
    { id: 2, name: 'USB-C Cable', sku: 'UC-002', stock: 150, price: '$12.99', status: 'active' },
    { id: 3, name: 'Phone Case', sku: 'PC-003', stock: 8, price: '$24.99', status: 'low-stock' },
  ];

  const categories = [
    { id: 1, name: 'Electronics', products: 234, status: 'active' },
    { id: 2, name: 'Fashion', products: 567, status: 'active' },
    { id: 3, name: 'Home & Garden', products: 189, status: 'active' },
  ];

  const installments = [
    { id: 1, order: '#ORD-1234', user: 'Ahmed Samir', plan: '3 months', status: 'active', amount: '$450' },
    { id: 2, order: '#ORD-1235', user: 'Mariam Ali', plan: '6 months', status: 'pending', amount: '$890' },
  ];

  const filterData = (data, searchKey) => {
    if (!searchTerm) return data;
    return data.filter(item => 
      item[searchKey]?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sb-logo">
          <div className="sb-logo-icon">F</div>
          <div className="sb-logo-text">
            <div className="sb-logo-name">FlexiBerry</div>
            <div className="sb-logo-role">Admin</div>
          </div>
        </div>
        
        <div className="sb-nav">
          <div className="sb-section">Main</div>
          {navItems.slice(0, 5).map(item => (
            <div
              key={item.id}
              className={`sb-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => { setCurrentPage(item.id); setSearchTerm(''); }}
            >
              <span className="sb-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className="sb-badge">{item.badge}</span>}
            </div>
          ))}
          
          <div className="sb-section">Products</div>
          {navItems.slice(5, 8).map(item => (
            <div
              key={item.id}
              className={`sb-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => { setCurrentPage(item.id); setSearchTerm(''); }}
            >
              <span className="sb-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className="sb-badge">{item.badge}</span>}
            </div>
          ))}
          
          <div className="sb-section">Others</div>
          {navItems.slice(8).map(item => (
            <div
              key={item.id}
              className={`sb-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => { setCurrentPage(item.id); setSearchTerm(''); }}
            >
              <span className="sb-icon">{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className="sb-badge">{item.badge}</span>}
            </div>
          ))}
        </div>
        
        <div className="sb-footer">
          <div className="sb-user">
            <div className="sb-avatar">A</div>
            <div className="sb-user-info">
              <div className="sb-user-name">Admin User</div>
              <div className="sb-user-email">admin@flexiberry.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main">
        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-left">
            <div className="page-title">
              {navItems.find(i => i.id === currentPage)?.label}
            </div>
          </div>
          <div className="topbar-right">
            <div className="tb-search">
              <span>🔍</span>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="tb-btn">
              🔔
              <span className="notif-dot"></span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="content">
          {/* DASHBOARD PAGE */}
          {currentPage === 'dashboard' && (
            <div className="page active">
              <div className="stats-grid">
                <div className="stat-card teal">
                  <div className="stat-icon teal">📊</div>
                  <div className="stat-val">12.5K</div>
                  <div className="stat-lbl">Total Users</div>
                  <div className="stat-change up">↑ 12.5% from last month</div>
                </div>
                <div className="stat-card blue">
                  <div className="stat-icon blue">💰</div>
                  <div className="stat-val">$234K</div>
                  <div className="stat-lbl">Total Revenue</div>
                  <div className="stat-change up">↑ 8.2% from last month</div>
                </div>
                <div className="stat-card purple">
                  <div className="stat-icon purple">📦</div>
                  <div className="stat-val">5.2K</div>
                  <div className="stat-lbl">Orders</div>
                  <div className="stat-change up">↑ 23.1% from last month</div>
                </div>
                <div className="stat-card amber">
                  <div className="stat-icon amber">🏪</div>
                  <div className="stat-val">342</div>
                  <div className="stat-lbl">Active Shops</div>
                  <div className="stat-change up">↑ 4.3% from last month</div>
                </div>
                <div className="stat-card red">
                  <div className="stat-icon red">⚠️</div>
                  <div className="stat-val">23</div>
                  <div className="stat-lbl">Pending Reviews</div>
                  <div className="stat-change down">↓ 2.1% from last month</div>
                </div>
                <div className="stat-card green">
                  <div className="stat-icon green">✓</div>
                  <div className="stat-val">98.5%</div>
                  <div className="stat-lbl">Satisfaction Rate</div>
                  <div className="stat-change up">↑ 1.2% from last month</div>
                </div>
              </div>

              <div className="grid-2">
                <div className="card">
                  <div className="card-head">
                    <h3 className="sec-title">Recent Activity</h3>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--text2)', lineHeight: '1.8' }}>
                    <div style={{ marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                      <strong style={{ color: 'var(--text)' }}>New user registration</strong><br/>Mohammed Saad joined 2 hours ago
                    </div>
                    <div style={{ marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                      <strong style={{ color: 'var(--text)' }}>New shop created</strong><br/>Fashion Hub by Noor Ibrahim just now
                    </div>
                    <div style={{ marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
                      <strong style={{ color: 'var(--text)' }}>Large order placed</strong><br/>Order #1234 worth $5,890 10 minutes ago
                    </div>
                    <div>
                      <strong style={{ color: 'var(--text)' }}>Payment processed</strong><br/>$12,340 from multiple transactions
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-head">
                    <h3 className="sec-title">Revenue Chart</h3>
                  </div>
                  <div className="chart-bars">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => (
                      <div key={month} className="bar-wrap">
                        <div
                          className="bar"
                          style={{
                            background: `hsl(${175 + i * 15}, 100%, 45%)`,
                            height: `${30 + Math.random() * 70}%`,
                          }}
                        ></div>
                        <div className="bar-lbl">{month}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <div className="sec-head">
                  <div>
                    <h3 className="sec-title">Top Shops</h3>
                  </div>
                </div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Shop Name</th>
                        <th>Owner</th>
                        <th>Status</th>
                        <th>Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shops.map(shop => (
                        <tr key={shop.id}>
                          <td className="td-name">{shop.name}</td>
                          <td>{shop.owner}</td>
                          <td>
                            <span className={`badge ${shop.status === 'active' ? 'badge-green' : 'badge-red'}`}>
                              {shop.status}
                            </span>
                          </td>
                          <td className="td-mono">{shop.revenue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SHOPS PAGE */}
          {currentPage === 'shops' && (
            <div className="page active">
              <div className="sec-head" style={{ marginBottom: '24px' }}>
                <div>
                  <h3 className="sec-title">Shop Management</h3>
                  <div className="sec-sub">Manage all shops on the platform</div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleOpenModal('shop')}
                >
                  ➕ Add Shop
                </button>
              </div>

              <div className="table-wrap">
                <div className="table-toolbar">
                  <div className="table-search">
                    <span>🔍</span>
                    <input
                      type="text"
                      placeholder="Search shops..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Shop Name</th>
                      <th>Owner</th>
                      <th>Status</th>
                      <th>Revenue</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(shops, 'name').map(shop => (
                      <tr key={shop.id}>
                        <td className="td-name">{shop.name}</td>
                        <td>{shop.owner}</td>
                        <td>
                          <span className={`badge ${shop.status === 'active' ? 'badge-green' : 'badge-red'}`}>
                            {shop.status}
                          </span>
                        </td>
                        <td className="td-mono">{shop.revenue}</td>
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

          {/* ADMINS PAGE */}
          {currentPage === 'admins' && (
            <div className="page active">
              <div className="sec-head" style={{ marginBottom: '24px' }}>
                <div>
                  <h3 className="sec-title">Admin Management</h3>
                  <div className="sec-sub">Manage administrators</div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleOpenModal('admin')}
                >
                  ➕ Add Admin
                </button>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(admins, 'name').map(admin => (
                      <tr key={admin.id}>
                        <td className="td-name">{admin.name}</td>
                        <td>{admin.email}</td>
                        <td><span className="badge badge-blue">{admin.role}</span></td>
                        <td>
                          <span className={`badge ${admin.status === 'active' ? 'badge-green' : 'badge-red'}`}>
                            {admin.status}
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

          {/* USERS PAGE */}
          {currentPage === 'users' && (
            <div className="page active">
              <div className="sec-head" style={{ marginBottom: '24px' }}>
                <div>
                  <h3 className="sec-title">User Management</h3>
                  <div className="sec-sub">Manage platform users</div>
                </div>
              </div>

              <div className="table-wrap">
                <div className="table-toolbar">
                  <div className="table-search">
                    <span>🔍</span>
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Joined</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(users, 'name').map(user => (
                      <tr key={user.id}>
                        <td className="td-name">{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.joined}</td>
                        <td>
                          <span className={`badge ${user.status === 'active' ? 'badge-green' : user.status === 'suspended' ? 'badge-red' : 'badge-amber'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>
                          <div className="actions">
                            <button className="act-btn">👁️</button>
                            <button className="act-btn danger">🚫</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VERIFICATION PAGE */}
          {currentPage === 'verification' && (
            <div className="page active">
              <div className="sec-head" style={{ marginBottom: '24px' }}>
                <div>
                  <h3 className="sec-title">KYC Verification</h3>
                  <div className="sec-sub">Review and approve user verifications</div>
                </div>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Type</th>
                      <th>Document</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
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
