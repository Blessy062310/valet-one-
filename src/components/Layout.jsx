import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Wallet, Send, ShieldAlert, Code, LogOut, FileBadge } from 'lucide-react';

export default function Layout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    onLogout();
    navigate('/login');
  };

  const authEmail = localStorage.getItem('userEmail') || 'Chakra User';
  const initial = authEmail.charAt(0).toUpperCase();

  return (
    <div className="app-container">
      <div className="sidebar">
        <div style={{ padding: '0 24px', marginBottom: '32px' }} className="flex-col">
          <h2 className="text-gradient" style={{ fontSize: '24px' }}>Valet One</h2>
          <span className="text-muted" style={{ fontSize: '12px' }}>All-in-One Wallet & Legacy</span>
        </div>
        
        <div className="nav-links">
          <NavLink to="/" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink to="/wallets" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Wallet size={20} /> Wallets
          </NavLink>
          <NavLink to="/transfer" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Send size={20} /> Transfer
          </NavLink>
          <NavLink to="/legacy" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <ShieldAlert size={20} /> Nominee (Legacy)
          </NavLink>
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', margin: '16px 0' }} />
          <NavLink to="/tech" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
            <Code size={20} /> Tech Stack Info
          </NavLink>
          <NavLink to="/admin" className="nav-item text-muted">
            <FileBadge size={20} /> Setup Claim/Admin
          </NavLink>
        </div>

        <div style={{ marginTop: 'auto', padding: '0 16px' }}>
          <button onClick={handleLogout} className="nav-item" style={{ width: '100%', border: 'none', background: 'transparent' }}>
            <LogOut size={20} color="#e11d48" /> <span style={{ color: '#e11d48' }}>Logout</span>
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="top-navbar">
          <div></div>
          <div className="flex-row" style={{ gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
              {initial}
            </div>
            <span style={{ fontWeight: '500' }}>{authEmail}</span>
          </div>
        </div>

        <div className="page-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
