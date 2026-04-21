import React, { useState, useEffect } from 'react';
import { api } from '../store';
import { Plus, Trash2 } from 'lucide-react';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');

  const fetchExpenses = async () => {
    const { data } = await api.get('/expenses');
    setExpenses(data);
  };

  useEffect(() => { fetchExpenses(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/expenses', { amount, category, date, note });
    setAmount(''); setNote('');
    fetchExpenses();
  };

  const handleDelete = async (id) => {
    await api.delete(`/expenses/${id}`);
    fetchExpenses();
  };

  const categories = ['Food', 'Travel', 'Rent', 'Study', 'Fun'];

  return (
    <div className="p-8 max-w-7xl mx-auto z-10 relative">
      <h1 className="text-4xl font-bold mb-8">Expenses</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-panel p-6 lg:col-span-1 h-fit">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Plus size={20} className="text-primary"/> Add Expense</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Amount</label>
              <input type="number" required className="input-field" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Category</label>
              <select className="input-field" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Date</label>
              <input type="date" required className="input-field" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Note (Important!)</label>
              <textarea rows="3" className="input-field" value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
            <button type="submit" className="btn-primary w-full">Save Expense</button>
          </form>
        </div>

        <div className="glass-panel p-6 lg:col-span-2">
          <h2 className="text-xl font-bold mb-6">Recent Records</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-700 text-gray-400">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Note</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(exp => (
                  <tr key={exp.id} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 text-gray-300">{new Date(exp.date).toLocaleDateString()}</td>
                    <td className="py-4 px-4"><span className="px-3 py-1 bg-gray-800 rounded-full text-xs font-semibold">{exp.category}</span></td>
                    <td className="py-4 px-4 text-gray-300">{exp.note || '-'}</td>
                    <td className="py-4 px-4 font-bold text-red-400">₹{exp.amount}</td>
                    <td className="py-4 px-4 text-right">
                      <button onClick={() => handleDelete(exp.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {expenses.length === 0 && <div className="p-8 text-center text-gray-500">No expenses recorded yet.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
