import React, { useEffect, useState } from 'react';
import { api, useStore } from '../store';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Wallet, TrendingDown, HandCoins, ArrowRightLeft, Sparkles, SmartphoneNfc, Edit3, Check, X, IndianRupee, Bell, CheckCircle2, Mail, Phone } from 'lucide-react';

const COLORS = ['#e62429', '#0b4a99', '#fbc02d', '#512da8', '#00796b'];

export default function Dashboard() {
  const user = useStore(state => state.user);
  const [data, setData] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState('');
  const [budgetError, setBudgetError] = useState('');
  const [notifyState, setNotifyState] = useState('idle');
  const [contactInfo, setContactInfo] = useState('');

  const maskEmail = (email) => {
    if (!email) return '';
    const [local, domain] = email.split('@');
    const masked = local.slice(0, 2) + '*'.repeat(Math.max(local.length - 2, 3));
    return `${masked}@${domain}`;
  };

  const handleNotifyClick = () => {
    if (!user?.isGuest) {
      setNotifyState('success');
    } else {
      setNotifyState('input');
    }
  };

  const handleNotifySubmit = () => {
    if (contactInfo.trim()) {
      setNotifyState('success');
    }
  };

  const fetchData = () => {
    api.get('/dashboard').then(res => {
      setData(res.data);
      setBudgetInput(res.data.monthlyBudget?.toString() || '25000');
    }).catch(console.error);
    api.get('/expenses').then(res => setExpenses(res.data)).catch(console.error);
  };

  useEffect(() => { fetchData(); }, []);

  const saveBudget = async () => {
    const val = parseFloat(budgetInput);
    if (isNaN(val) || val < 5 || val > 50000) {
      setBudgetError('Must be ₹5 – ₹50,000');
      return;
    }
    try {
      await api.put('/user/budget', { monthlyBudget: val });
      setBudgetError('');
      setEditingBudget(false);
      fetchData();
    } catch (err) {
      setBudgetError(err.response?.data?.error || 'Failed to save');
    }
  };

  if (!data) return <div className="p-10 text-gray-400">Loading Dashboard...</div>;

  const expenseCategoryData = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const pieData = Object.keys(expenseCategoryData).map((cat) => ({
    name: cat,
    value: expenseCategoryData[cat]
  }));

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto z-10 relative">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Overview</h1>
        <p className="text-gray-400 text-sm md:text-base">Welcome back, Hero. Here is your financial summary.</p>
      </header>

      {/* Monthly Budget Editor */}
      <div className="mb-6 glass-panel p-5 md:p-6 border-l-4 border-l-[#fbc02d]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#fbc02d]/20 flex items-center justify-center shrink-0">
              <IndianRupee size={24} className="text-[#fbc02d]" />
            </div>
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider font-semibold">Monthly Budget</p>
              {!editingBudget ? (
                <p className="text-2xl md:text-3xl font-black text-white">
                  ₹{Number(data.monthlyBudget || 25000).toLocaleString()}
                </p>
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₹</span>
                    <input
                      type="number"
                      min="5"
                      max="50000"
                      value={budgetInput}
                      onChange={(e) => { setBudgetInput(e.target.value); setBudgetError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && saveBudget()}
                      className="bg-gray-800 border border-gray-600 rounded-lg pl-7 pr-3 py-2 text-white text-lg font-bold w-36 outline-none focus:border-[#fbc02d] transition-colors"
                      autoFocus
                    />
                  </div>
                  <button onClick={saveBudget} className="w-9 h-9 rounded-lg bg-[#fbc02d]/20 text-[#fbc02d] flex items-center justify-center hover:bg-[#fbc02d]/30 transition-colors">
                    <Check size={18} />
                  </button>
                  <button onClick={() => { setEditingBudget(false); setBudgetError(''); setBudgetInput(data.monthlyBudget?.toString()); }} className="w-9 h-9 rounded-lg bg-gray-800 text-gray-400 flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <X size={18} />
                  </button>
                </div>
              )}
              {budgetError && <p className="text-xs text-red-400 mt-1">{budgetError}</p>}
            </div>
          </div>
          {!editingBudget && (
            <button
              onClick={() => setEditingBudget(true)}
              className="flex items-center gap-2 text-sm text-[#fbc02d] border border-[#fbc02d]/30 px-4 py-2 rounded-xl hover:bg-[#fbc02d]/10 transition-colors self-start sm:self-center"
            >
              <Edit3 size={14} /> Edit Budget
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-3">Set your monthly pocket money or income. Min ₹5 — Max ₹50,000</p>
      </div>

      {/* Coming Soon UPI Banner */}
      <div className="mb-8 bg-gradient-to-r from-[#e62429]/20 to-[#0b4a99]/20 border border-primary/30 rounded-2xl p-5 md:p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#0b4a99]/10 rounded-full blur-[30px] pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#fbc02d] flex items-center justify-center shadow-[0_0_20px_rgba(230,36,41,0.4)] shrink-0">
            <SmartphoneNfc size={32} className="text-white" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              Coming Soon: UPI Pay & Rewards <Sparkles className="text-[#fbc02d]" size={18} />
            </h3>
            <p className="text-gray-300 mt-1 text-sm">
              Save money using real-time UPI and earn exclusive rewards for your heroic financial discipline!
            </p>
          </div>
          <div className="flex-shrink-0 mt-4 md:mt-0 flex flex-col items-center">
            {notifyState === 'idle' && (
              <button
                onClick={handleNotifyClick}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all whitespace-nowrap text-sm shadow-[0_0_12px_rgba(230,36,41,0.2)] hover:shadow-[0_0_20px_rgba(230,36,41,0.4)]"
              >
                <Bell size={15} />
                Notify Me
              </button>
            )}
            {notifyState === 'input' && (
              <div className="flex flex-col gap-2 animate-fade-in w-full sm:w-auto">
                <p className="text-xs text-gray-400 text-center">Enter your email or phone to get notified</p>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Email or Phone"
                      className="bg-gray-800 border border-gray-600 rounded-lg pl-8 pr-3 py-1.5 text-white text-sm outline-none focus:border-primary w-full sm:w-48 transition-colors"
                      value={contactInfo}
                      onChange={e => setContactInfo(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleNotifySubmit()}
                      autoFocus
                    />
                  </div>
                  <button
                    onClick={handleNotifySubmit}
                    className="px-4 py-1.5 rounded-lg bg-primary text-white font-bold hover:bg-primary-dark transition-colors text-sm whitespace-nowrap"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
            {notifyState === 'success' && (
              <div className="flex flex-col items-center gap-2 animate-fade-in bg-green-500/10 border border-green-500/30 rounded-2xl px-5 py-4 text-center">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 size={22} className="text-green-400" />
                </div>
                <p className="text-green-400 font-bold text-sm">You're on the list! 🎉</p>
                <p className="text-gray-300 text-xs leading-relaxed">
                  We'll notify you at{' '}
                  <span className="font-bold text-white bg-gray-800 px-2 py-0.5 rounded-md font-mono">
                    {user?.isGuest
                      ? (contactInfo.includes('@') ? maskEmail(contactInfo) : contactInfo)
                      : maskEmail(user?.email)}
                  </span>
                  {' '}when UPI Pay goes live.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8">
        <StatCard title="Total Balance" amount={data.totalBalance} color="text-white" icon={<Wallet size={24} className="text-[#10b981]" />} bgIcon="bg-[#10b981]/20" />
        <StatCard title="Total Expenses" amount={data.totalExpenses} color="text-primary" icon={<TrendingDown size={24} className="text-primary" />} bgIcon="bg-primary/20" />
        <StatCard title="Lent (Pending)" amount={data.lent} color="text-[#0b4a99]" icon={<HandCoins size={24} className="text-[#0b4a99]" />} bgIcon="bg-[#0b4a99]/20" />
        <StatCard title="You Owe" amount={data.borrowed} color="text-[#fbc02d]" icon={<ArrowRightLeft size={24} className="text-[#fbc02d]" />} bgIcon="bg-[#fbc02d]/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20 md:mb-0">
        <div className="glass-panel p-5 md:p-6 border-t-4 border-t-primary">
          <h3 className="text-lg md:text-xl font-bold mb-6">Expense Breakdown</h3>
          <div className="h-56 md:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#12141f', borderColor: '#374151', borderRadius: '10px' }} itemStyle={{ color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-5 md:p-6 border-t-4 border-t-[#0b4a99]">
          <h3 className="text-lg md:text-xl font-bold mb-6">Recent Expenses</h3>
          <div className="space-y-3">
            {expenses.slice(0, 5).map(exp => (
              <div key={exp.id} className="flex justify-between items-center py-3 border-b border-gray-800 last:border-0 group hover:bg-gray-800/30 px-2 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gray-800 flex items-center justify-center border border-gray-700">
                    <TrendingDown size={14} className="text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-200 text-sm md:text-base">{exp.note || exp.category}</p>
                    <p className="text-xs text-gray-500">{new Date(exp.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className="font-bold text-primary text-sm md:text-base">-₹{exp.amount}</p>
              </div>
            ))}
            {expenses.length === 0 && <p className="text-center text-gray-500 py-4">No expenses yet. Start tracking!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, amount, color, icon, bgIcon }) {
  return (
    <div className="glass-panel p-4 md:p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform hero-card-glow">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-4 shadow-lg ${bgIcon}`}>
        {icon}
      </div>
      <h3 className="text-gray-400 text-[10px] md:text-sm font-medium mb-1 truncate">{title}</h3>
      <p className={`text-lg md:text-3xl font-bold ${color}`}>₹{amount.toLocaleString()}</p>
    </div>
  );
}
