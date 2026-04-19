import React, { useState } from 'react';
import { Bitcoin, Coins, Plus, ArrowUpRight, ArrowDownRight, X } from 'lucide-react';
import { supabase } from '../supabaseClient';
export default function Wallets() {
  const [cryptoWallets, setCryptoWallets] = useState([
    { name: 'Bitcoin', symbol: 'BTC', balance: '0.845 BTC', value: '$54,200.00', change: '+2.4%', icon: <Bitcoin size={24} color="#f59e0b" /> },
    { name: 'Ethereum', symbol: 'ETH', balance: '12.4 ETH', value: '$31,000.00', change: '+5.1%', icon: <span style={{fontSize: '20px', color: '#627eea'}}>Ξ</span> }
  ]);

  const [fiatWallets, setFiatWallets] = useState([
    { name: 'US Dollar', symbol: 'USD', balance: '$45,250.00', change: '0.0%', icon: <span style={{fontSize: '20px', color: '#10b981'}}>$</span> },
    { name: 'Euro', symbol: 'EUR', balance: '€11,100.00', change: '-0.2%', icon: <span style={{fontSize: '20px', color: '#10b981'}}>€</span> }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assetType, setAssetType] = useState('crypto');
  const [newAsset, setNewAsset] = useState({ name: '', symbol: '', balance: '', value: '' });

  const handleAddAsset = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from('assets').insert([{
        name: newAsset.name,
        symbol: newAsset.symbol.toUpperCase(),
        balance: newAsset.balance,
        value: newAsset.value || 0,
        asset_type: assetType
      }]);
      if (error) throw error;
    } catch (err) {
      console.error('Error adding asset:', err.message);
    }

    if (assetType === 'crypto') {
      setCryptoWallets([...cryptoWallets, { 
         name: newAsset.name,
         symbol: newAsset.symbol.toUpperCase(),
         balance: `${parseFloat(newAsset.balance).toLocaleString()} ${newAsset.symbol.toUpperCase()}`,
         value: `$${parseFloat(newAsset.value || 0).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
         change: '+0.0%',
         icon: <span style={{fontSize: '20px', color: '#f59e0b', fontWeight: 'bold'}}>{newAsset.symbol[0]?.toUpperCase()}</span>
      }]);
    } else {
      setFiatWallets([...fiatWallets, { 
        name: newAsset.name,
        symbol: newAsset.symbol.toUpperCase(),
        balance: `${newAsset.symbol.toUpperCase() === 'EUR' ? '€' : '$'}${parseFloat(newAsset.balance).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
        change: '+0.0%',
        icon: <span style={{fontSize: '20px', color: '#10b981'}}>{newAsset.symbol[0]?.toUpperCase()}</span>
      }]);
    }
    setIsModalOpen(false);
    setNewAsset({ name: '', symbol: '', balance: '', value: '' });
  };

  return (
    <>
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
        <div className="flex-between">
          <div>
            <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Your Wallets</h1>
            <p className="text-muted">Manage your fiat and crypto portfolios.</p>
          </div>
          <button className="btn-primary flex-row" style={{ gap: '8px' }} onClick={() => setIsModalOpen(true)}>
            <Plus size={20} /> Add Wallet
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          
          {/* Crypto Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 className="flex-row" style={{ gap: '8px', fontSize: '20px' }}>
              <Bitcoin color="#f59e0b" /> Crypto Assets
            </h2>
            {cryptoWallets.map(w => (
              <div key={w.symbol + w.name} className="glass-panel flex-between">
                <div className="flex-row" style={{ gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {w.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px' }}>{w.name}</h3>
                    <span className="text-muted">{w.balance}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '18px', fontWeight: '600' }}>{w.value}</div>
                  <div className="flex-row" style={{ justifyContent: 'flex-end', color: '#10b981', fontSize: '14px', gap: '4px' }}>
                    <ArrowUpRight size={16} /> {w.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fiat Section */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 className="flex-row" style={{ gap: '8px', fontSize: '20px' }}>
              <Coins color="#10b981" /> Fiat Currencies
            </h2>
            {fiatWallets.map(w => (
              <div key={w.symbol + w.name} className="glass-panel flex-between">
                <div className="flex-row" style={{ gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {w.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px' }}>{w.name}</h3>
                    <span className="text-muted">{w.symbol}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '18px', fontWeight: '600' }}>{w.balance}</div>
                  {w.change.startsWith('-') ? (
                    <div className="flex-row" style={{ justifyContent: 'flex-end', color: '#e11d48', fontSize: '14px', gap: '4px' }}>
                      <ArrowDownRight size={16} /> {w.change}
                    </div>
                  ) : (
                    <div className="flex-row" style={{ justifyContent: 'flex-end', color: '#64748b', fontSize: '14px', gap: '4px' }}>
                      {w.change}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15,23,42,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, backdropFilter: 'blur(4px)'
        }}>
          <div className="glass-panel animate-fade-in" style={{ width: '400px', maxWidth: '90%', display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid var(--accent-color)' }}>
            <div className="flex-between">
              <h2 style={{ fontSize: '20px' }}>Add New Asset</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ color: 'var(--text-muted)' }}>
                <X size={24} />
              </button>
            </div>

            <div className="flex-row" style={{ gap: '10px' }}>
              <button 
                type="button"
                className={assetType === 'crypto' ? 'btn-primary' : 'btn-secondary'} 
                style={{ flex: 1 }}
                onClick={() => setAssetType('crypto')}
              > Crypto </button>
              <button 
                type="button"
                className={assetType === 'fiat' ? 'btn-primary' : 'btn-secondary'} 
                style={{ flex: 1 }}
                onClick={() => setAssetType('fiat')}
              > Fiat </button>
            </div>

            <form onSubmit={handleAddAsset} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Asset Name</label>
                <input required placeholder={assetType === 'crypto' ? "e.g. Solana" : "e.g. British Pound"} value={newAsset.name} onChange={e => setNewAsset({...newAsset, name: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Symbol</label>
                <input required placeholder={assetType === 'crypto' ? "e.g. SOL" : "e.g. GBP"} value={newAsset.symbol} onChange={e => setNewAsset({...newAsset, symbol: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Balance</label>
                <input required type="number" step="any" placeholder={assetType === 'crypto' ? "e.g. 15.5" : "e.g. 1000"} value={newAsset.balance} onChange={e => setNewAsset({...newAsset, balance: e.target.value})} />
              </div>
              {assetType === 'crypto' && (
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-muted)' }}>Total Value in USD ($)</label>
                  <input required type="number" step="any" placeholder="e.g. 2300" value={newAsset.value} onChange={e => setNewAsset({...newAsset, value: e.target.value})} />
                </div>
              )}
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>
                  Add Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
