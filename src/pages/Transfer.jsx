import React, { useState } from 'react';
import { Send, ArrowDownUp } from 'lucide-react';

export default function Transfer() {
  const [amount, setAmount] = useState('');

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Transfer Assets</h1>
        <p className="text-muted">Send money instantly across the globe</p>
      </div>

      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="text-muted" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>From Asset</label>
            <select>
              <option>USD Wallet ($45,250.00)</option>
              <option>BTC Wallet (0.845 BTC)</option>
              <option>ETH Wallet (12.4 ETH)</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '-8px 0' }}>
            <div style={{ background: 'rgba(0,0,0,0.05)', padding: '8px', borderRadius: '50%' }}>
              <ArrowDownUp size={20} color="#3b82f6" />
            </div>
          </div>

          <div>
            <label className="text-muted" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>To Address / Email</label>
            <input type="text" placeholder="Enter recipient's address or email" />
          </div>
        </div>

        <div>
          <label className="text-muted" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Amount</label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '16px', top: '14px', fontSize: '18px', color: '#64748b' }}>$</span>
            <input 
              type="number" 
              placeholder="0.00" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ fontSize: '24px', paddingLeft: '32px' }} 
            />
          </div>
        </div>

        <button className="btn-primary flex-row" style={{ justifyContent: 'center', gap: '8px', marginTop: '8px', padding: '16px' }}>
          <Send size={20} /> Review Transfer
        </button>
      </div>
    </div>
  );
}
