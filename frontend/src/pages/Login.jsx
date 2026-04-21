import React, { useState } from 'react';
import { api, useStore } from '../store';
import { Sparkles, ArrowRight, UserCircle } from 'lucide-react';
import ReactThreeBackground from '../components/Background3D';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const login = useStore(state => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const { data } = await api.post(endpoint, { email, password });
      login(data.user, data.token);
    } catch (err) {
      alert(err.response?.data?.error || 'Authentication Failed');
    }
  };

  const handleGuest = async () => {
    try {
      const { data } = await api.post('/auth/guest');
      login(data.user, data.token);
    } catch (err) {
      alert('Guest login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <ReactThreeBackground />
      
      <div className="glass-panel w-full max-w-md p-8 relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Finance Flow</h2>
        <p className="text-gray-400 mb-8 text-center text-sm">Take control of your student budget with cutting-edge analytics.</p>
        
        <form onSubmit={handleSubmit} className="w-full mb-4">
          <div className="mb-4">
            <input 
              type="email" 
              placeholder="Email address" 
              className="input-field" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="mb-6">
            <input 
              type="password" 
              placeholder="Password" 
              className="input-field" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            {isLogin ? 'Sign In' : 'Create Account'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="flex w-full items-center mb-4">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-3 text-xs text-gray-500 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        <button 
          onClick={handleGuest} 
          className="w-full bg-transparent border border-gray-600 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 mb-4"
        >
          <UserCircle className="w-5 h-5" />
          Continue as Guest
        </button>

        <p className="text-sm text-gray-400 cursor-pointer hover:text-primary transition-colors" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
        </p>
      </div>
    </div>
  );
}
