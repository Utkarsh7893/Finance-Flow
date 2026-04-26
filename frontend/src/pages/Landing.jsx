import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Zap, PiggyBank, Target, Sparkles, ArrowRight, SmartphoneNfc, BarChart3, Users, ChevronDown, Code, Lightbulb } from 'lucide-react';
import Background3D from '../components/Background3D';
import ideaImg from '../assets/financial_idea.png';
import creatorImg from '../assets/creator_avatar.png';
import logoImg from '../assets/logo.png';
import logoLightImg from '../assets/logo_light.png';
import ThemeToggle from '../components/ThemeToggle';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Background3D />

      {/* Floating Theme Toggle */}
      <div className="fixed top-20 right-4 sm:right-6 z-50 bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-full shadow-lg border border-gray-200 dark:border-gray-800">
        <ThemeToggle />
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-[#0a0b10]/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800/50 shadow-sm dark:shadow-none transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoLightImg} alt="Centsible Logo" className="w-9 h-9 rounded-full object-cover shadow-[0_0_10px_rgba(0,0,0,0.1)] border border-gray-200 block dark:hidden" />
            <img src={logoImg} alt="Centsible Logo" className="w-9 h-9 rounded-full object-cover shadow-[0_0_15px_rgba(230,36,41,0.4)] border border-white/10 hidden dark:block" />
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#fbc02d]">Centsible</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-2 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/login?mode=signup')}
              className="px-5 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-primary to-purple-600 hover:from-primary-dark hover:to-purple-700 text-white transition-all shadow-[0_0_15px_rgba(230,36,41,0.3)] hover:shadow-[0_0_20px_rgba(230,36,41,0.5)]"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 relative">
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-[#0b4a99]/15 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute top-[50%] left-[50%] w-48 h-48 bg-[#fbc02d]/8 blur-[80px] rounded-full pointer-events-none -translate-x-1/2" />

        <div className="animate-fade-in max-w-3xl mx-auto z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20 mb-8">
            <Sparkles size={14} /> Built for Students, Powered by Ambition
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#ff6b35] to-[#fbc02d]">ASSEMBLE</span>
            <br />
            <span className="text-gray-900 dark:text-white">YOUR WEALTH</span>
          </h1>
          
          <div className="bg-white/60 dark:bg-[#12141f]/60 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-sm max-w-xl mx-auto mb-10 inline-block">
            <p className="text-lg md:text-xl text-gray-800 dark:text-gray-300 leading-relaxed font-light hover:drop-shadow-[0_0_5px_rgba(0,0,0,0.4)] dark:hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all duration-300">
              The ultimate command center for students. Track expenses, set goals, and build your future like a hero.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => navigate('/login?mode=signup')}
              className="text-lg px-10 py-4 flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary-dark hover:to-purple-700 text-white font-bold transition-all shadow-[0_0_20px_rgba(230,36,41,0.4)] hover:shadow-[0_0_30px_rgba(230,36,41,0.6)] hover:-translate-y-1 w-full sm:w-auto"
            >
              Get Started Free <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <button
          onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:text-white transition-colors animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Everything You Need to <span className="text-primary">Win</span></h2>
            <p className="text-gray-700 dark:text-gray-400 max-w-xl mx-auto hover:drop-shadow-[0_0_5px_rgba(0,0,0,0.3)] dark:hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.4)] transition-all duration-300">Powerful tools designed to give students complete control over their finances.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<BarChart3 size={28} />}
              title="Smart Dashboard"
              desc="Real-time overview of your balance and expenses."
              color="#e62429"
              gradient="from-[#e62429] to-[#ff6b35]"
            />
            <FeatureCard
              icon={<Target size={28} />}
              title="Savings Goals"
              desc="Set targets and watch your wealth grow."
              color="#0b4a99"
              gradient="from-[#0b4a99] to-[#1e88e5]"
            />
            <FeatureCard
              icon={<PiggyBank size={28} />}
              title="Expense Tracking"
              desc="Categorize every rupee so you know where it goes."
              color="#fbc02d"
              gradient="from-[#fbc02d] to-[#ff8f00]"
            />
            <FeatureCard
              icon={<Users size={28} />}
              title="Borrow & Lend"
              desc="Never lose track of shared expenses with friends."
              color="#512da8"
              gradient="from-[#512da8] to-[#7c4dff]"
            />
            <FeatureCard
              icon={<SmartphoneNfc size={28} />}
              title="UPI Rewards"
              desc="Save using real-time UPI and earn rewards."
              color="#00796b"
              gradient="from-[#00796b] to-[#26a69a]"
            />
            <FeatureCard
              icon={<Shield size={28} />}
              title="Secure & Private"
              desc="Your data is protected by S.H.I.E.L.D. protocols."
              color="#c2185b"
              gradient="from-[#c2185b] to-[#e91e63]"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 relative">
        <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-black text-primary">100%</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Free to Use</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-[#0b4a99]">5+</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Tracking Categories</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-[#fbc02d]">∞</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Savings Goals</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-black text-[#512da8]">24/7</p>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Access Anywhere</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Idea Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto glass-panel p-8 md:p-12 border-t-4 border-t-primary">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
                <Lightbulb size={16} /> Our Philosophy
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                Not Just a Tracker, a <br/><span className="text-primary">Financial Fortress</span>
              </h2>
              <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed hover:drop-shadow-[0_0_5px_rgba(0,0,0,0.4)] dark:hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all duration-300">
                Centsible empowers you to tell your money where to go. We believe students shouldn't wait to master wealth.
              </p>
              <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed hover:drop-shadow-[0_0_5px_rgba(0,0,0,0.4)] dark:hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all duration-300">
                By gamifying savings and treating data securely, we are creating financially independent heroes.
              </p>
            </div>
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <img src={ideaImg} alt="Financial Idea" className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-2xl border-2 border-primary/20 hover:scale-[1.02] transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* The Creator Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto glass-panel p-8 md:p-12 border-b-4 border-b-primary">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12">
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full"></div>
              <img src={creatorImg} alt="Creator Avatar" className="relative z-10 w-full max-w-md mx-auto rounded-2xl shadow-2xl border-2 border-purple-500/20 hover:scale-[1.02] transition-transform duration-500" />
            </div>
            <div className="flex-1 space-y-6 text-right">
              <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-500 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/20 ml-auto">
                <Code size={16} /> Meet the Creator
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight">
                Built by a Student, <br/><span className="text-purple-500">For Students</span>
              </h2>
              <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed text-left md:text-right hover:drop-shadow-[0_0_5px_rgba(0,0,0,0.4)] dark:hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all duration-300">
                Hi, I'm Utkarsh, a Full Stack Developer at Lovely Professional University. I built this to motivate students to save!
              </p>
              <p className="text-lg text-gray-800 dark:text-gray-300 leading-relaxed text-left md:text-right hover:drop-shadow-[0_0_5px_rgba(0,0,0,0.4)] dark:hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] transition-all duration-300">
                Combining my passion for building scalable web apps with financial literacy, I engineered this platform. Let's assemble our wealth!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
            Ready to be a <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#fbc02d]">Financial Hero</span>?
          </h2>
          <p className="text-gray-700 dark:text-gray-400 mb-8 text-lg hover:drop-shadow-[0_0_5px_rgba(0,0,0,0.3)] dark:hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.4)] transition-all duration-300">Join now. It takes 10 seconds. No credit card required.</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-lg px-10 py-4 inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary-dark hover:to-purple-700 text-white font-bold transition-all shadow-[0_0_20px_rgba(230,36,41,0.4)] hover:shadow-[0_0_30px_rgba(230,36,41,0.6)] hover:-translate-y-1"
          >
            Start Your Journey <Zap size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8 px-4 bg-white/50 dark:bg-transparent">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center gap-2">
          <p className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-widest">Created and Engineered by Utkarsh</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Centsible © {new Date().getFullYear()}. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, color, gradient }) {
  return (
    <div className="glass-panel p-6 group hover:-translate-y-2 transition-all duration-300 hero-card-glow">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-gray-900 dark:text-white shadow-lg mb-5 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed group-hover:drop-shadow-[0_0_5px_rgba(0,0,0,0.3)] dark:group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.4)] transition-all duration-300">{desc}</p>
    </div>
  );
}
