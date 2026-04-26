import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Wallet, PiggyBank, HandCoins, LogOut, Info, MoreHorizontal, X } from 'lucide-react';
import { useStore } from '../store';
import ThemeToggle from './ThemeToggle';
import logoImg from '../assets/logo.png';
import logoLightImg from '../assets/logo_light.png';

export default function Sidebar() {
  const logout = useStore(state => state.logout);
  const [moreOpen, setMoreOpen] = useState(false);
  const navigate = useNavigate();

  const allLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Expenses', path: '/expenses', icon: <Wallet size={20} /> },
    { name: 'Savings', path: '/savings', icon: <PiggyBank size={20} /> },
    { name: 'Borrowed', path: '/borrowed', icon: <HandCoins size={20} /> },
    { name: 'About', path: '/about', icon: <Info size={20} /> },
  ];

  const mobileMainLinks = allLinks.slice(0, 4);
  const mobileExtraLinks = allLinks.slice(4);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 border-r border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-[#0a0b10]/90 backdrop-blur-xl h-screen fixed left-0 top-0 flex-col pt-8 z-50 transition-colors">
        <div className="px-6 mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <img src={logoLightImg} alt="Centsible Logo" className="w-9 h-9 rounded-full object-cover shadow-[0_0_10px_rgba(0,0,0,0.1)] border border-gray-200 block dark:hidden" />
            <img src={logoImg} alt="Centsible Logo" className="w-9 h-9 rounded-full object-cover shadow-[0_0_15px_rgba(230,36,41,0.4)] border border-white/10 hidden dark:block" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#fbc02d]">Centsible</h1>
          </div>
        </div>
        
        <nav className="flex-1 px-4 flex flex-col gap-2 overflow-y-auto">
          {allLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive ? 'bg-primary/10 text-primary border border-primary/20 shadow-[inset_0_0_15px_rgba(99,102,241,0.1)] dark:shadow-[inset_0_0_15px_rgba(230,36,41,0.1)]' : 'text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800/50'
                }`
              }
            >
              {link.icon}
              <span className="font-medium font-sans">{link.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2">
          <div className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 dark:text-gray-400">
            <span>Theme</span>
            <ThemeToggle />
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-gray-700 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-3 w-full rounded-xl hover:bg-red-50 dark:hover:bg-red-400/10 transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-white/95 dark:bg-[#0a0b10]/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 flex items-center justify-around z-50 px-1 pb-1 transition-colors">
        {mobileMainLinks.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={() => setMoreOpen(false)}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full space-y-0.5 transition-all ${
                isActive ? 'text-primary' : 'text-gray-700 dark:text-gray-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {React.cloneElement(link.icon, { size: 22, className: isActive ? 'drop-shadow-[0_0_8px_rgba(230,36,41,0.8)]' : '' })}
                <span className="text-[9px] font-medium">{link.name}</span>
              </>
            )}
          </NavLink>
        ))}
        {/* More Button */}
        <button
          onClick={() => setMoreOpen(!moreOpen)}
          className={`flex flex-col items-center justify-center flex-1 h-full space-y-0.5 transition-all ${moreOpen ? 'text-primary' : 'text-gray-700 dark:text-gray-400'}`}
        >
          {moreOpen ? <X size={22} /> : <MoreHorizontal size={22} />}
          <span className="text-[9px] font-medium">More</span>
        </button>
      </div>

      {/* Mobile "More" Drawer */}
      {moreOpen && (
        <div className="md:hidden fixed inset-0 z-[60]" onClick={() => setMoreOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="absolute bottom-16 left-0 w-full bg-white dark:bg-[#0a0b10] border-t border-gray-200 dark:border-gray-800 rounded-t-2xl p-4 space-y-2 animate-slide-up transition-colors"
            onClick={e => e.stopPropagation()}
          >
            {mobileExtraLinks.map(link => (
              <button
                key={link.path}
                onClick={() => { navigate(link.path); setMoreOpen(false); }}
                className="flex items-center gap-4 px-4 py-4 w-full rounded-xl text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {React.cloneElement(link.icon, { size: 22 })}
                <span className="font-medium text-base">{link.name}</span>
              </button>
            ))}
            
            <div className="border-t border-gray-200 dark:border-gray-800 pt-2 mt-2">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="font-medium text-gray-700 dark:text-gray-300">Theme</span>
                <ThemeToggle />
              </div>
              <button
                onClick={() => { logout(); setMoreOpen(false); }}
                className="flex items-center gap-4 px-4 py-4 w-full rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/10 transition-colors"
              >
                <LogOut size={22} />
                <span className="font-medium text-base">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
