import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wallet, PiggyBank, HandCoins, LogOut } from 'lucide-react';
import { useStore } from '../store';

export default function Sidebar() {
  const logout = useStore(state => state.logout);

  const links = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Expenses', path: '/expenses', icon: <Wallet size={20} /> },
    { name: 'Savings', path: '/savings', icon: <PiggyBank size={20} /> },
    { name: 'Borrowed', path: '/borrowed', icon: <HandCoins size={20} /> },
  ];

  return (
    <div className="w-64 border-r border-gray-800 bg-[#0b0f19]/90 backdrop-blur-xl h-screen fixed left-0 top-0 flex flex-col pt-8 z-50">
      <div className="px-6 mb-10 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold">F</div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-300">Finance Flow</h1>
      </div>
      
      <nav className="flex-1 px-4 flex flex-col gap-2">
        {links.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive ? 'bg-primary/10 text-primary border border-primary/20 shadow-[inset_0_0_15px_rgba(16,185,129,0.1)]' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`
            }
          >
            {link.icon}
            <span className="font-medium font-sans">{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800 hidden lg:block">
        <button onClick={logout} className="flex items-center gap-2 text-gray-400 hover:text-red-400 p-3 w-full rounded-xl hover:bg-red-400/10 transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
