import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api, useStore } from '../store';
import { ArrowRight, UserCircle, Mail, Lock, Eye, EyeOff, Zap, Shield, Target, FileText } from 'lucide-react';
import Background3D from '../components/Background3D';

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Sign-in state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');

  // Sign-up state
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regTermsAccepted, setRegTermsAccepted] = useState(false);
  const [regError, setRegError] = useState('');

  // Flip & shared
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleEmail, setGoogleEmail] = useState('');
  const [showGoogleInput, setShowGoogleInput] = useState(false);

  const login = useStore(state => state.login);

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) { setEmail(savedEmail); setRememberMe(true); }
    if (searchParams.get('guest') === 'true') handleGuest();
  }, []);

  const handleFlip = () => {
    setIsFlipped(f => !f);
    setError('');
    setRegError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) { setError('Please accept the Terms & Conditions to proceed.'); return; }
    setError(''); setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (rememberMe) localStorage.setItem('rememberedEmail', email);
      else localStorage.removeItem('rememberedEmail');
      login(data.user, data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed. Please try again.');
    } finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!regTermsAccepted) { setRegError('Please accept the Terms & Conditions to proceed.'); return; }
    setRegError(''); setLoading(true);
    try {
      const { data } = await api.post('/auth/register', { email: regEmail, password: regPassword });
      login(data.user, data.token);
    } catch (err) {
      setRegError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  const handleGuest = async () => {
    if (!termsAccepted) { setError('Please accept the Terms & Conditions to proceed.'); return; }
    setError(''); setLoading(true);
    try {
      const { data } = await api.post('/auth/guest');
      login(data.user, data.token);
    } catch (err) {
      setError('Guest login failed. Please try again.');
    } finally { setLoading(false); }
  };

  const handleGoogleSignIn = async () => {
    if (!showGoogleInput) { setShowGoogleInput(true); return; }
    if (!termsAccepted) { setError('Please accept the Terms & Conditions to proceed.'); return; }
    if (!googleEmail || !googleEmail.includes('@')) { setError('Please enter a valid email for Google sign-in.'); return; }
    setError(''); setLoading(true);
    try {
      const { data } = await api.post('/auth/google', { email: googleEmail });
      login(data.user, data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'Google sign-in failed.');
    } finally { setLoading(false); }
  };

  // Reusable checkbox
  const Checkbox = ({ checked, onChange }) => (
    <div className="relative shrink-0 mt-0.5">
      <input
        type="checkbox"
        className="peer appearance-none w-[18px] h-[18px] border-2 border-gray-600 rounded bg-[#0a0b10] checked:bg-primary checked:border-primary transition-all cursor-pointer"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <svg className="absolute top-[2px] left-[2px] w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  const TermsBlock = ({ accepted, onChange }) => (
    <div className="bg-[#1a1c29]/60 border border-gray-700/40 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <FileText size={13} className="text-gray-500" />
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Required Agreement</span>
      </div>
      <label className="flex items-start gap-3 cursor-pointer group">
        <Checkbox checked={accepted} onChange={onChange} />
        <span className="text-xs text-gray-400 group-hover:text-gray-300 leading-relaxed">
          I agree to the{' '}
          <button type="button" onClick={e => { e.stopPropagation(); navigate('/terms-view'); }}
            className="text-primary hover:text-primary-dark underline underline-offset-2 transition-colors font-medium">
            Terms & Conditions
          </button>
          {' '}and accept responsibility for my financial decisions.
        </span>
      </label>
    </div>
  );

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      <Background3D />

      {/* Left — Hero Branding (desktop only) */}
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
            {[
              { icon: <Shield size={16} className="text-primary" />, bg: 'bg-primary/20', text: 'Secure & encrypted financial tracking' },
              { icon: <Target size={16} className="text-[#0b4a99]" />, bg: 'bg-[#0b4a99]/20', text: 'Smart savings goals with rewards' },
              { icon: <Zap size={16} className="text-[#fbc02d]" />, bg: 'bg-[#fbc02d]/20', text: 'Lightning-fast expense logging' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-300">
                <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>{item.icon}</div>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Flip Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="flip-container w-full max-w-md">
          <div className={`flip-inner ${isFlipped ? 'flipped' : ''}`}>

            {/* ── FRONT: Sign In ─────────────────────── */}
            <div className="flip-front glass-panel w-full p-8 md:p-10">
              {/* Mobile logo */}
              <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(230,36,41,0.5)]">F</div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#fbc02d]">Finance Flow</span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-1">Welcome back, Hero</h2>
              <p className="text-gray-400 mb-6 text-sm">Sign in to continue your financial journey.</p>

              {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4 animate-fade-in">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-4 mb-5">
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="email" placeholder="Email address" className="input-field !pl-12"
                    value={email} onChange={e => { setEmail(e.target.value); setError(''); }} required />
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="input-field !pl-12 !pr-12"
                    value={password} onChange={e => { setPassword(e.target.value); setError(''); }} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox checked={rememberMe} onChange={setRememberMe} />
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                </label>

                <TermsBlock accepted={termsAccepted} onChange={setTermsAccepted} />

                <button type="submit" disabled={loading || !termsAccepted}
                  className={`w-full flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50 ${termsAccepted ? 'btn-primary' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}>
                  {loading ? 'Please wait...' : 'Sign In'}{!loading && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>

              <div className="flex w-full items-center mb-4">
                <div className="flex-1 h-px bg-gray-700" /><span className="px-3 text-xs text-gray-500 font-medium">OR</span><div className="flex-1 h-px bg-gray-700" />
              </div>

              <div className="space-y-3 mb-5">
                {showGoogleInput && (
                  <div className="relative animate-fade-in">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="email" placeholder="Enter your Google email" className="input-field !pl-12"
                      value={googleEmail} onChange={e => { setGoogleEmail(e.target.value); setError(''); }} />
                  </div>
                )}
                <button onClick={handleGoogleSignIn} disabled={loading || (showGoogleInput && !termsAccepted)}
                  className={`w-full border font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 ${termsAccepted || !showGoogleInput ? 'bg-white/5 border-gray-600 hover:bg-white/10 text-white' : 'bg-gray-800/50 border-gray-700 text-gray-500 cursor-not-allowed'}`}>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {showGoogleInput ? 'Continue with Google' : 'Sign in with Google'}
                </button>

                <button onClick={handleGuest} disabled={loading || !termsAccepted}
                  className={`w-full border font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${termsAccepted ? 'bg-transparent border-gray-700 hover:bg-gray-800/50 text-gray-300 hover:text-white' : 'bg-gray-800/30 border-gray-700 text-gray-500 cursor-not-allowed'}`}>
                  <UserCircle className="w-5 h-5" /> Continue as Guest
                </button>
              </div>

              <p className="text-sm text-center text-gray-400 cursor-pointer" onClick={handleFlip}>
                Don't have an account?{' '}
                <span className="text-primary font-semibold hover:text-primary-dark transition-colors">Sign Up →</span>
              </p>
            </div>

            {/* ── BACK: Sign Up ──────────────────────── */}
            <div className="flip-back glass-panel w-full p-8 md:p-10">
              {/* Mobile logo */}
              <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(230,36,41,0.5)]">F</div>
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#fbc02d]">Finance Flow</span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-1">Join the Squad 🦸</h2>
              <p className="text-gray-400 mb-6 text-sm">Create your account and start your journey.</p>

              {regError && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4 animate-fade-in">{regError}</div>}

              <form onSubmit={handleRegister} className="space-y-4 mb-5">
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="email" placeholder="Email address" className="input-field !pl-12"
                    value={regEmail} onChange={e => { setRegEmail(e.target.value); setRegError(''); }} required />
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type={showRegPassword ? 'text' : 'password'} placeholder="Create a password" className="input-field !pl-12 !pr-12"
                    value={regPassword} onChange={e => { setRegPassword(e.target.value); setRegError(''); }} required />
                  <button type="button" onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                    {showRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <TermsBlock accepted={regTermsAccepted} onChange={setRegTermsAccepted} />

                <button type="submit" disabled={loading || !regTermsAccepted}
                  className={`w-full flex items-center justify-center gap-2 font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50 ${regTermsAccepted ? 'btn-primary' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}>
                  {loading ? 'Creating Account...' : 'Create Account'}{!loading && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>

              <p className="text-sm text-center text-gray-400 cursor-pointer" onClick={handleFlip}>
                Already have an account?{' '}
                <span className="text-primary font-semibold hover:text-primary-dark transition-colors">← Sign In</span>
              </p>
            </div>

          </div>{/* /flip-inner */}
        </div>{/* /flip-container */}
      </div>
    </div>
  );
}
