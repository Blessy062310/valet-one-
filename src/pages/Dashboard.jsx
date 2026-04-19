import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Wallet as WalletIcon, Coins, Bitcoin } from 'lucide-react';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 8500 },
];

export default function Dashboard() {
  const storedEmail = localStorage.getItem('userEmail') || 'guest@example.com';
  const namePart = storedEmail.split('@')[0];
  const displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Welcome, {displayName}</h1>
        <p className="text-muted">Here's your comprehensive asset overview.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
        <div className="glass-panel stat-card">
          <div className="flex-between">
            <span className="text-muted">Total Balance (USD)</span>
            <WalletIcon size={20} color="#3b82f6" />
          </div>
          <div className="stat-value text-gradient">$142,450.00</div>
          <div className="flex-row text-muted" style={{ fontSize: '14px', gap: '4px' }}>
            <ArrowUpRight size={16} color="#10b981" /> <span style={{ color: '#10b981' }}>+12.5%</span> this month
          </div>
        </div>
        
        <div className="glass-panel stat-card">
          <div className="flex-between">
            <span className="text-muted">Crypto Assets</span>
            <Bitcoin size={20} color="#f59e0b" />
          </div>
          <div className="stat-value">$85,200.00</div>
          <div className="flex-row text-muted" style={{ fontSize: '14px', gap: '4px' }}>
            <ArrowDownRight size={16} color="#e11d48" /> <span style={{ color: '#e11d48' }}>-2.4%</span> this week
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="flex-between">
            <span className="text-muted">Fiat Wallets</span>
            <Coins size={20} color="#10b981" />
          </div>
          <div className="stat-value">$57,250.00</div>
          <span className="text-muted" style={{ fontSize: '14px' }}>Across 3 currencies</span>
        </div>
      </div>

      <div className="glass-panel" style={{ height: '400px' }}>
        <h3 style={{ marginBottom: '24px' }}>Portfolio Growth</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '8px' }} />
            <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
