import React, { useState, useEffect } from 'react';
import { FileBadge, Check, X, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
export default function AdminVault() {
  const [claims, setClaims] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const { data, error } = await supabase.from('claims').select('*');
        if (error) throw error;
        if (data) {
          const mappedData = data.map(claim => ({
            ...claim,
            status: claim.status === 'Pending' ? 'Pending Verification' : 
                    claim.status === 'Approved' ? 'Verified & Executed' : 
                    claim.status
          }));
          setClaims(mappedData);
        }
      } catch (err) {
        console.error('Error fetching claims:', err.message);
      }
    };
    fetchClaims();
  }, []);

  const handleVerify = async (id, status) => {
    try {
      const dbStatus = status === 'Verified & Executed' ? 'Approved' : 'Rejected';
      const { error } = await supabase.from('claims').update({ status: dbStatus }).eq('id', id);
      if (error) throw error;

      const updated = claims.map(c => {
        if (c.id === id) return { ...c, status };
        return c;
      });
      setClaims(updated);
    } catch (err) {
      console.error('Error verifying claim:', err.message);
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-color)', width: '100vw', padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div className="flex-row" style={{ gap: '12px' }}>
          <FileBadge size={32} color="#f59e0b" />
          <h1 className="text-gradient" style={{ background: 'linear-gradient(90deg, #f59e0b, #e11d48)' }}>Verifiers Vault (Simulation)</h1>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={() => navigate('/claim')} className="btn-secondary">Go to Claim Portal</button>
          <button onClick={() => navigate('/login')} className="btn-secondary">Back to App Login</button>
        </div>
      </div>
      
      <p className="text-muted" style={{ marginBottom: '32px' }}>
        This is a mock admin interface demonstrating how the backend system (or a decentralized oracle consensus) would verify the provided Death Certificate and execute the smart contract.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {claims.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '48px' }}>
            <ShieldCheck size={48} color="#64748b" style={{ margin: '0 auto 16px' }} />
            <h3>No pending claims</h3>
            <p className="text-muted">When a nominee uploads a certificate, it will appear here.</p>
          </div>
        ) : (
          claims.map(claim => (
            <div key={claim.id} className="glass-panel flex-between">
              <div>
                <h3 style={{ fontSize: '18px' }}>Claim {claim.id}</h3>
                <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                  <span className="text-muted" style={{ fontSize: '14px' }}>Nominee: {claim.nomineeEmail}</span>
                  <span className="text-muted" style={{ fontSize: '14px' }}>File: {claim.fileName}</span>
                  <span className="text-muted" style={{ fontSize: '14px' }}>Date: {claim.date}</span>
                </div>
              </div>

              <div className="flex-row" style={{ gap: '16px' }}>
                <div style={{ 
                  padding: '6px 12px', 
                  borderRadius: '20px', 
                  fontSize: '14px',
                  fontWeight: '600',
                  background: claim.status === 'Verified & Executed' ? 'rgba(16, 185, 129, 0.1)' : 
                              claim.status === 'Rejected' ? 'rgba(225, 29, 72, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                  color: claim.status === 'Verified & Executed' ? '#10b981' : 
                         claim.status === 'Rejected' ? '#e11d48' : '#f59e0b'
                }}>
                  {claim.status}
                </div>

                {claim.status === 'Pending Verification' && (
                  <div className="flex-row" style={{ gap: '8px' }}>
                    <button 
                      onClick={() => handleVerify(claim.id, 'Verified & Executed')}
                      className="flex-row" 
                      style={{ padding: '8px 16px', background: '#10b981', color: '#fff', borderRadius: '8px', gap: '8px' }}>
                      <Check size={16} /> Approve & Transfer
                    </button>
                    <button 
                      onClick={() => handleVerify(claim.id, 'Rejected')}
                      className="flex-row" 
                      style={{ padding: '8px 16px', background: '#e11d48', color: '#fff', borderRadius: '8px', gap: '8px' }}>
                      <X size={16} /> Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
