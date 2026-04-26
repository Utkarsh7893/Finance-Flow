import React from 'react';
import { useStore } from '../store';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useStore();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${
        isDark ? 'bg-gray-600' : 'bg-slate-300'
      }`}
      aria-label="Toggle Theme"
    >
      <span
        className={`flex h-6 w-6 items-center justify-center transform rounded-full bg-white transition-transform ${
          isDark ? 'translate-x-7' : 'translate-x-1'
        } shadow-sm`}
      >
        {isDark ? (
          <Moon size={16} className="text-slate-900" />
        ) : (
          <Sun size={16} className="text-amber-600" />
        )}
      </span>
    </button>
  );
}
