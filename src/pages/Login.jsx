import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    if (isSignUp) {
      // ==== SIGN UP MODE ====
      // 1. Create user in Supabase Authentication
      const { error: authError } = await supabase.auth.signUp({ email, password });
      if (authError) {
        console.error("Auth Sign Up Error:", authError);
      }

      // 2. Save user directly to your custom "users" table so you can see it in your database!
      const { error: dbError } = await supabase.from('users').insert([{ email, password }]);
      
      if (dbError) {
        console.error("Database Save Error:", dbError);
        alert("Could not save to database. Maybe this email is already taken?");
      } else {
        alert("Account created successfully! You can now log in.");
        setIsSignUp(false); // Switch back to login view
        setPassword('');
      }

    } else {
      // ==== LOGIN MODE ====
      try {
        // Try real Supabase Auth
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        
        if (error) {
          // If auth fails, try checking our custom 'users' table 
          const { data } = await supabase.from('users').select('*').eq('email', email).eq('password', password).single();
          if (!data) {
            alert("Invalid email or password!");
            return;
          }
        }
      } catch (err) {
        console.error("Connection error:", err.message);
      }

      // Successfully logged in
      localStorage.setItem('userEmail', email);
      onLogin();
      navigate('/');
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel animate-fade-in" style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ textAlign: 'center' }} className="flex-col animate-fade-in">
          <Shield size={48} color="#3b82f6" style={{ margin: '0 auto 16px' }} />
          <h1 className="text-gradient">Valet One</h1>
          <p className="text-muted" style={{ marginTop: '8px' }}>
            {isSignUp ? "Create a new account" : "Login to your all-in-one financial hub"}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="text-muted" style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>Email</label>
            <input 
              type="email" 
              placeholder="user@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div>
            <label className="text-muted" style={{ fontSize: '14px', marginBottom: '8px', display: 'block' }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="btn-primary" style={{ marginTop: '16px' }}>
            {isSignUp ? "Create Account" : "Access Vault"}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <p className="text-muted" style={{ fontSize: '14px' }}>
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <span 
              onClick={() => setIsSignUp(!isSignUp)} 
              style={{ color: '#3b82f6', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {isSignUp ? "Log In here" : "Sign Up here"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
