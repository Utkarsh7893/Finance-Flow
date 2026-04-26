import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api, useStore } from '../store';
import { ArrowRight, UserCircle, Mail, Lock, Eye, EyeOff, Zap, Shield, Target, FileText } from 'lucide-react';
import Background3D from '../components/Background3D';

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [showGoogleInput, setShowGoogleInput] = useState(false);
  
  // Terms checkbox
  const [termsAccepted, setTermsAccepted] = useState(false);

  const login = useStore(state => state.login);

  // Load remembered email
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
    // Auto-trigger guest mode if ?guest=true
    if (searchParams.get('guest') === 'true') {
      handleGuest();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError('Please accept the Terms & Conditions to proceed.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const { data } = await api.post(endpoint, { email, password });
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      login(data.user, data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = async () => {
    if (!termsAccepted) {
      setError('Please accept the Terms & Conditions to proceed.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/guest');
      login(data.user, data.token);
    } catch (err) {
      setError('Guest login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!showGoogleInput) {
      setShowGoogleInput(true);
      return;
    }
    if (!termsAccepted) {
      setError('Please accept the Terms & Conditions to proceed.');
      return;
    }
    if (!googleEmail || !googleEmail.includes('@')) {
      setError('Please enter a valid email for Google sign-in.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/google', { email: googleEmail });
      login(data.user, data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  // Custom checkbox component
  const TermsCheckbox = ({ checked, onChange, children }) => (
    <label className="flex items-start gap-3 cursor-pointer group">
      <div className="relative flex items-center justify-center mt-0.5 shrink-0">
        <input 
          type="checkbox" 
          className="peer appearance-none w-[18px] h-[18px] border-2 border-gray-600 rounded bg-[#0a0b10] checked:bg-primary checked:border-primary transition-all cursor-pointer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <svg className="absolute top-[2px] left-[2px] w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors leading-relaxed">
        {children}
      </span>
    </label>
  );

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      <Background3D />

      {/* Left Side — Hero Branding (Desktop Only) */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center px-12 relative z-10">
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(230,36,41,0.5)]">F</div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#fbc02d]">Finance Flow</span>
          </div>

          <h1 className="text-4xl font-black text-white mb-4 leading-tight">
            Your money.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#fbc02d]">Your superpower.</span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Track expenses, set savings goals, and build financial stability — all with a superhero-level interface designed for students.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <Shield size={16} className="text-primary" />
              </div>
              <span className="text-sm">Secure & encrypted financial tracking</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-8 h-8 rounded-lg bg-[#0b4a99]/20 flex items-center justify-center shrink-0">
                <Target size={16} className="text-[#0b4a99]" />
              </div>
              <span className="text-sm">Smart savings goals with rewards</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <div className="w-8 h-8 rounded-lg bg-[#fbc02d]/20 flex items-center justify-center shrink-0">
                <Zap size={16} className="text-[#fbc02d]" />
              </div>
              <span className="text-sm">Lightning-fast expense logging</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side — Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="glass-panel w-full max-w-md p-8 md:p-10 relative">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(230,36,41,0.5)]">F</div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#fbc02d]">Finance Flow</span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">{isLogin ? 'Welcome back, Hero' : 'Join the Squad'}</h2>
          <p className="text-gray-400 mb-6 text-sm">{isLogin ? 'Sign in to continue your financial journey.' : 'Create an account to start tracking.'}</p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4 animate-fade-in">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4 mb-5">
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type="email" 
                placeholder="Email address" 
                className="input-field !pl-12" 
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                required 
              />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="Password" 
                className="input-field !pl-12 !pr-12" 
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                required 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="peer appearance-none w-5 h-5 border-2 border-gray-600 rounded bg-[#0a0b10] checked:bg-primary checked:border-primary transition-all cursor-pointer"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <svg className="absolute top-0.5 left-0.5 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
            </label>

            {/* Terms & Conditions Checkboxes */}
            <div className="bg-[#1a1c29]/60 border border-gray-700/40 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <FileText size={14} className="text-gray-500" />
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Required Agreement</span>
              </div>
              
              <TermsCheckbox checked={termsAccepted} onChange={setTermsAccepted}>
                I agree to the{' '}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); navigate('/terms-view'); }}
                  className="text-primary hover:text-primary-dark underline underline-offset-2 transition-colors font-medium"
                >
                  Terms & Conditions
                </button>
                {' '}and accept responsibility for my financial decisions.
              </TermsCheckbox>

              {!termsAccepted && (
                <p className="text-[11px] text-gray-600 mt-1 pl-1 flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-yellow-500/60"></span>
                  Agreement must be accepted to continue
                </p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading || !termsAccepted} 
              className={`w-full flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all ${
                termsAccepted 
                  ? 'btn-primary' 
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              } disabled:opacity-50`}
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          <div className="flex w-full items-center mb-5">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="px-3 text-xs text-gray-500 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Google Sign-In */}
          <div className="space-y-3 mb-5">
            {showGoogleInput && (
              <div className="relative animate-fade-in">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your Google email"
                  className="input-field !pl-12"
                  value={googleEmail}
                  onChange={e => { setGoogleEmail(e.target.value); setError(''); }}
                />
              </div>
            )}
            <button 
              onClick={handleGoogleSignIn}
              disabled={loading || (showGoogleInput && !termsAccepted)}
              className={`w-full border font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 ${
                termsAccepted || !showGoogleInput
                  ? 'bg-white/5 border-gray-600 hover:bg-white/10 text-white'
                  : 'bg-gray-800/50 border-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {showGoogleInput ? 'Continue with Google' : 'Sign in with Google'}
            </button>

            <button 
              onClick={handleGuest}
              disabled={loading || !termsAccepted}
              className={`w-full border font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
                termsAccepted
                  ? 'bg-transparent border-gray-700 hover:bg-gray-800/50 text-gray-300 hover:text-white'
                  : 'bg-gray-800/30 border-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <UserCircle className="w-5 h-5" />
              Continue as Guest
            </button>
          </div>

          <p className="text-sm text-center text-gray-400 cursor-pointer hover:text-primary transition-colors" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </p>
        </div>
      </div>
    </div>
  );
}
