import React, { useState, useEffect } from 'react';
import { ShieldAlert, UserPlus, Save, Lock, Trash2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function LegacySetup() {
  const [nominees, setNominees] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [relationship, setRelationship] = useState('');
  const [allocation, setAllocation] = useState('');

  useEffect(() => {
    fetchNominees();
  }, []);

  const fetchNominees = async () => {
    const { data, error } = await supabase.from('nominees').select('*');
    if (error) {
      console.error('Error fetching nominees:', error);
    } else {
      setNominees(data || []);
    }
  };

  const addNominee = async (e) => {
    e.preventDefault();
    if (!name || !email || !allocation) return;
    
    // Convert allocation to a number
    const allocationNum = parseInt(allocation);

    // Insert into Supabase database
    const { data, error } = await supabase
      .from('nominees')
      .insert([{ name, email, relationship, allocation: allocationNum }])
      .select();

    if (error) {
      console.error('Error adding nominee:', error);
      alert('Failed to save to database!');
      return;
    }
    
    // Update local list with the database record
    if (data) {
      setNominees([...nominees, ...data]);
    }
    
    setName(''); setEmail(''); setRelationship(''); setAllocation('');
  };

  const deleteNominee = async (id) => {
    // Delete from Supabase database
    const { error } = await supabase.from('nominees').delete().eq('id', id);
    
    if (error) {
      console.error('Error deleting nominee:', error);
      alert('Failed to delete from database!');
      return;
    }

    // Remove from local list
    const updated = nominees.filter(n => n.id !== id);
    setNominees(updated);
  };

  const totalAllocated = nominees.reduce((sum, n) => sum + n.allocation, 0);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
      <div>
        <h1 className="flex-row" style={{ fontSize: '32px', marginBottom: '8px', gap: '12px' }}>
          <ShieldAlert color="#e11d48" /> Legacy / Nominee Setup
        </h1>
        <p className="text-muted">Secure your wealth for the next generation. If you pass away, verified nominees can claim these assets.</p>
      </div>

      <div className="glass-panel" style={{ borderLeft: '4px solid #e11d48' }}>
        <h3>Important Notice</h3>
        <p className="text-muted" style={{ marginTop: '8px', lineHeight: '1.6' }}>
          By adding a nominee, you authorize Valet One to transfer your specified balance upon the presentation and successful verification of a formal Government Death Certificate.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Form */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 className="flex-row" style={{ gap: '8px' }}><UserPlus size={20} /> Add Beneficiary</h2>
          <form onSubmit={addNominee} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label className="text-muted" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" required />
            </div>
            <div>
              <label className="text-muted" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jane@example.com" required />
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label className="text-muted" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Relationship</label>
                <input type="text" value={relationship} onChange={e => setRelationship(e.target.value)} placeholder="Spouse" />
              </div>
              <div style={{ flex: 1 }}>
                <label className="text-muted" style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Allocation (%)</label>
                <input type="number" value={allocation} onChange={e => setAllocation(e.target.value)} max="100" placeholder="100" required />
              </div>
            </div>
            <button className="btn-primary flex-row" style={{ justifyContent: 'center', gap: '8px', marginTop: '8px' }} disabled={totalAllocated >= 100}>
              <Save size={18} /> Save Nominee
            </button>
            {totalAllocated >= 100 && <p style={{ color: '#e11d48', fontSize: '12px' }}>100% of assets allocated.</p>}
          </form>
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2>Current Nominees</h2>
          {nominees.length === 0 ? (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '40px 20px' }}>
              <p className="text-muted">No nominees added yet.</p>
            </div>
          ) : (
            nominees.map(n => (
              <div key={n.id} className="glass-panel flex-between" style={{ padding: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '16px' }}>{n.name}</h4>
                  <span className="text-muted" style={{ fontSize: '12px' }}>{n.relationship} • {n.email}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="text-gradient" style={{ fontSize: '20px', fontWeight: 'bold' }}>{n.allocation}%</div>
                  <div className="flex-row" style={{ gap: '12px', justifyContent: 'flex-end', marginTop: '4px' }}>
                    <span className="flex-row" style={{ color: '#10b981', fontSize: '12px', gap: '4px' }}><Lock size={12} /> Locked</span>
                    <button 
                      onClick={() => deleteNominee(n.id)} 
                      style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', padding: 0, display: 'flex' }}
                      title="Delete Nominee"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
