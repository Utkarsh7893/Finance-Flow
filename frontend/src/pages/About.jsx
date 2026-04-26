import React, { useState } from 'react';
import { Shield, Zap, Rocket, Target, Brain, Flame, Star, ChevronDown, ChevronUp } from 'lucide-react';

const heroCards = [
  {
    name: 'Iron Man',
    lesson: 'Build Your Financial Armor',
    quote: '"The suit and I are one." — Build a financial shield so strong that no unexpected expense can break through.',
    tip: 'Start tracking every expense, no matter how small. Knowledge is your greatest armor.',
    color: '#e62429',
    icon: <Flame size={28} />,
    gradient: 'from-[#e62429] to-[#ff6b35]',
  },
  {
    name: 'Captain America',
    lesson: 'Discipline Wins Wars',
    quote: '"I can do this all day." — Consistency in saving, even small amounts, is what builds real wealth.',
    tip: 'Set a fixed savings goal every month and never skip it. That\'s the super-soldier serum for your wallet.',
    color: '#0b4a99',
    icon: <Shield size={28} />,
    gradient: 'from-[#0b4a99] to-[#1e88e5]',
  },
  {
    name: 'Spider-Man',
    lesson: 'Great Power = Great Responsibility',
    quote: '"With great power comes great responsibility." — Your money is your superpower. Use it wisely.',
    tip: 'Before every purchase, ask: Is this a need or a want? Peter Parker knows the difference.',
    color: '#d32f2f',
    icon: <Target size={28} />,
    gradient: 'from-[#d32f2f] to-[#e62429]',
  },
  {
    name: 'Black Panther',
    lesson: 'Invest in Your Future',
    quote: '"In times of crisis, the wise build bridges." — Start investing early, even if it\'s just knowledge.',
    tip: 'Read one article about personal finance every week. Vibranium-level knowledge compounds over time.',
    color: '#512da8',
    icon: <Brain size={28} />,
    gradient: 'from-[#512da8] to-[#7c4dff]',
  },
  {
    name: 'Thor',
    lesson: 'Strike While The Iron Is Hot',
    quote: '"I\'m still worthy!" — You\'re worthy of financial freedom. Don\'t wait, start now.',
    tip: 'The best time to start saving was yesterday. The second best time is NOW. Be the God of Savings!',
    color: '#fbc02d',
    icon: <Zap size={28} />,
    gradient: 'from-[#fbc02d] to-[#ff8f00]',
  },
  {
    name: 'Doctor Strange',
    lesson: 'See Your Financial Future',
    quote: '"I\'ve seen 14 million futures." — In most of them, the ones who saved early won.',
    tip: 'Create a 6-month expense forecast. Knowing what\'s ahead helps you prepare like a Sorcerer Supreme.',
    color: '#00796b',
    icon: <Star size={28} />,
    gradient: 'from-[#00796b] to-[#26a69a]',
  },
];

// Each card is its own component with its own local state — fixes the bug
// where clicking one card affected others in the grid row
function HeroCard({ hero }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="glass-panel p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hero-card-glow border-l-4"
      style={{ borderLeftColor: hero.color }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${hero.gradient} flex items-center justify-center text-gray-900 dark:text-white shadow-lg`}
          >
            {hero.icon}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-base">{hero.name}</h3>
            <p className="text-xs font-medium" style={{ color: hero.color }}>{hero.lesson}</p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp size={18} className="text-gray-700 dark:text-gray-400 shrink-0" />
        ) : (
          <ChevronDown size={18} className="text-gray-700 dark:text-gray-400 shrink-0" />
        )}
      </div>
      
      {expanded && (
        <div className="animate-fade-in space-y-3 pt-3 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-700 dark:text-gray-300 italic leading-relaxed">{hero.quote}</p>
          <div className="bg-slate-100 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-300 dark:border-gray-700">
            <p className="text-xs text-gray-700 dark:text-gray-400">
              <span className="text-[#fbc02d] font-semibold">💰 Money Tip: </span>
              {hero.tip}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function About() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto z-10 relative mb-20 md:mb-0">
      {/* Hero Header */}
      <div className="glass-panel p-6 md:p-10 text-center relative overflow-hidden mb-8">
        <div className="absolute top-[-60px] right-[-60px] w-72 h-72 bg-primary/15 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[-40px] w-56 h-56 bg-[#0b4a99]/15 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute top-[30%] right-[20%] w-40 h-40 bg-[#fbc02d]/10 blur-[60px] rounded-full pointer-events-none" />
        
        <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-[#ff6b35] to-[#fbc02d] leading-tight">
          ASSEMBLE YOUR WEALTH
        </h1>
        
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed font-light max-w-2xl mx-auto">
          Welcome to <strong className="text-gray-900 dark:text-white">Centsible</strong> — the ultimate financial command center for students.
          Stop letting your money snap out of existence. Take control, track expenses, and build savings like a superhero building their arsenal.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
            <Shield size={16} /> Track Expenses
          </div>
          <div className="flex items-center gap-2 bg-[#0b4a99]/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium border border-[#0b4a99]/20">
            <Target size={16} /> Set Goals
          </div>
          <div className="flex items-center gap-2 bg-[#fbc02d]/10 text-[#fbc02d] px-4 py-2 rounded-full text-sm font-medium border border-[#fbc02d]/20">
            <Rocket size={16} /> Save Money
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        <div className="glass-panel p-5 md:p-6 hover:border-primary/50 transition-colors group hero-card-glow">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Shield className="text-primary" size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Secure Tracking</h3>
          <p className="text-sm text-gray-700 dark:text-gray-400">Keep your expenses guarded with vibranium-level precision. Every rupee accounted for.</p>
        </div>
        
        <div className="glass-panel p-5 md:p-6 hover:border-blue-500/50 transition-colors group hero-card-glow">
          <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Zap className="text-blue-400" size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Lightning Fast</h3>
          <p className="text-sm text-gray-700 dark:text-gray-400">Log expenses and savings with the speed of Quicksilver. No complex forms, just action.</p>
        </div>
        
        <div className="glass-panel p-5 md:p-6 hover:border-[#fbc02d]/50 transition-colors group hero-card-glow">
          <div className="w-12 h-12 bg-[#fbc02d]/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Rocket className="text-[#fbc02d]" size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Future Ready</h3>
          <p className="text-sm text-gray-700 dark:text-gray-400">Build your savings goals and watch them soar. Your endgame is financial freedom.</p>
        </div>
      </div>

      {/* Superhero Financial Wisdom Section */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold inline-block bg-white/60 dark:bg-[#12141f]/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-sm">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#fbc02d]">Superhero Financial Wisdom</span>
          </h2>
        </div>
        <p className="text-center text-gray-700 dark:text-gray-400 mb-8 text-sm md:text-base">Tap on any hero to reveal their secret financial lesson 💡</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {heroCards.map((hero, idx) => (
            <HeroCard key={idx} hero={hero} />
          ))}
        </div>
      </div>

      {/* Bottom Motivational Banner */}
      <div className="glass-panel p-6 md:p-8 text-center bg-gradient-to-r from-primary/10 via-[#512da8]/10 to-[#0b4a99]/10">
        <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          "The only limit is the one you set yourself."
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-400 mb-6">Start your financial journey today. Every hero started somewhere.</p>
        <div className="pt-6 mt-2 border-t border-primary/20 flex flex-col items-center gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2">
             <span className="text-xs text-gray-600 dark:text-gray-400 font-medium tracking-wider uppercase">Created & Engineered By</span>
             <span className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 bg-[length:200%_auto] animate-gradient">Utkarsh Raj</span>
          </div>
          
          <div className="text-center space-y-1.5">
             <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-500/20">
               Full Stack Web Developer
             </span>
             <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed pt-1">
               A student at Lovely Professional University, Punjab, passionate about building scalable, high-performance web applications.
             </p>
          </div>

          <div className="mt-2 text-[10px] text-gray-500 dark:text-gray-500 font-medium tracking-widest uppercase">
             &copy; {new Date().getFullYear()} Utkarsh Raj. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
