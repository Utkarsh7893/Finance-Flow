import React, { useState, useEffect } from 'react';
import { api } from '../store';
import { Target, Plus } from 'lucide-react';
import SpinWheel from '../components/SpinWheel';

export default function Savings() {
  const [goals, setGoals] = useState([]);
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [showWheel, setShowWheel] = useState(false);

  const fetchGoals = async () => {
    const { data } = await api.get('/savings');
    setGoals(data);
  };

  useEffect(() => { fetchGoals(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/savings', { name, targetAmount, deadline, savedAmount: 0 });
    setName(''); setTargetAmount(''); setDeadline('');
    fetchGoals();
  };

  const addFunds = async (id, currentAmount) => {
    const amount = prompt('Enter amount to add:');
    if (amount && !isNaN(amount)) {
      await api.put(`/savings/${id}/add`, { amount });
      fetchGoals();
      setShowWheel(true);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto z-10 relative">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3"><Target className="text-primary"/> Savings Goals</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-panel p-6 lg:col-span-1 h-fit">
          <h2 className="text-xl font-bold mb-6 text-primary dark:text-[#fbc02d]">Create New Goal</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-400 mb-1">Goal Name</label>
              <input type="text" required className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-400 mb-1">Target Amount (₹)</label>
              <input type="number" required className="input-field" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-400 mb-1">Deadline</label>
              <input type="date" required className="input-field" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </div>
            <button type="submit" className="btn-primary w-full mt-4">Start Saving</button>
          </form>
        </div>

        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:col-span-2 auto-rows-max">
          {goals.map(goal => {
            const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
            return (
              <div key={goal.id} className="glass-panel p-6 flex flex-col justify-between group hover:border-primary/50 transition-colors">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{goal.name}</h3>
                    <span className="text-xs bg-slate-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-700 dark:text-gray-400 border border-gray-300 dark:border-gray-700">{new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-primary font-bold text-lg">₹{goal.savedAmount}</span>
                    <span className="text-gray-700 dark:text-gray-400">of ₹{goal.targetAmount}</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-gray-800 rounded-full h-3 mb-6 overflow-hidden border border-gray-300 dark:border-gray-700">
                    <div className="bg-gradient-to-r from-primary to-[#4f46e5] dark:from-[#fbc02d] dark:to-primary h-3 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(230,36,41,0.5)]" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
                <button onClick={() => addFunds(goal.id, goal.savedAmount)} className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-slate-800 dark:text-white border border-slate-200 dark:border-transparent rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95">
                  <Plus size={18} className="text-primary" /> Add Funds
                </button>
              </div>
            );
          })}
          {goals.length === 0 && <div className="p-8 text-center text-gray-700 dark:text-gray-400 col-span-full border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-slate-50 dark:bg-gray-900/50">No savings goals set. Time to assemble your wealth!</div>}
        </div>
      </div>
      {showWheel && <SpinWheel onClose={() => setShowWheel(false)} />}
    </div>
  );
}
