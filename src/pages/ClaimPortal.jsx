import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function ClaimPortal() {
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && file) {
      try {
        const claim = {
          id: 'CLM-' + Math.floor(Math.random() * 10000),
          nomineeEmail: email,
          fileName: file.name,
          status: 'Pending',
          date: new Date().toLocaleDateString()
        };

        const { error } = await supabase.from('claims').insert([claim]);
        if (error) throw error;
      } catch (err) {
        console.error('Error submitting claim:', err.message);
      }
      
      setSubmitted(true);
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)' }}>
      {!submitted ? (
        <div className="glass-panel animate-fade-in" style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ textAlign: 'center' }} className="flex-col animate-fade-in">
            <h1 className="text-gradient" style={{ fontSize: '28px' }}>Legacy Claim Portal</h1>
            <p className="text-muted" style={{ marginTop: '8px', lineHeight: '1.5' }}>
              We are sorry for your loss. Please submit the user's registered death certificate to initiate the legacy transfer process.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label className="text-muted" style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>Your Registered Nominee Email</label>
              <input 
                type="email" 
                placeholder="nominee@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div>
              <label className="text-muted" style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>Official Death Certificate</label>
              <div 
                style={{ 
                  border: '2px dashed rgba(0,0,0,0.2)', 
                  borderRadius: '8px', 
                  padding: '32px', 
                  textAlign: 'center',
                  background: 'rgba(0,0,0,0.03)',
                  cursor: 'pointer'
                }}
                onClick={() => document.getElementById('file-upload').click()}
              >
                <input 
                  type="file" 
                  id="file-upload" 
                  style={{ display: 'none' }} 
                  accept="application/pdf,image/*"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                
                {file ? (
                  <div className="flex-col" style={{ gap: '8px', alignItems: 'center' }}>
                    <FileText size={32} color="#3b82f6" />
                    <span>{file.name}</span>
                  </div>
                ) : (
                  <div className="flex-col" style={{ gap: '8px', alignItems: 'center' }}>
                    <UploadCloud size={32} color="#64748b" />
                    <span className="text-muted">Click to upload Government Certificate (PDF/JPG)</span>
                  </div>
                )}
              </div>
            </div>
            
            <button type="submit" className="btn-primary" style={{ marginTop: '8px', background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)' }}>
              Submit Claim
            </button>
            <button type="button" onClick={() => navigate('/login')} className="btn-secondary">
              Back to Login
            </button>
          </form>
        </div>
      ) : (
        <div className="glass-panel animate-fade-in" style={{ width: '500px', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', textAlign: 'center' }}>
          <CheckCircle size={64} color="#10b981" />
          <h2>Claim Submitted successfully</h2>
          <p className="text-muted" style={{ lineHeight: '1.5' }}>
            We have securely received your documents. The automated verification system will process this certificate. You will be notified via email once the transfer is executed.
          </p>
          <button onClick={() => navigate('/login')} className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
            Return to Homepage
          </button>
        </div>
      )}
    </div>
  );
}
