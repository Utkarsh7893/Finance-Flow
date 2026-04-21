import React, { useState, useEffect } from 'react';
import { api } from '../store';
import { Handshake, CheckCircle } from 'lucide-react';

export default function Borrowed() {
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState('BORROWED');
  const [person, setPerson] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const fetchTx = async () => {
    const { data } = await api.get('/transactions');
    setTransactions(data);
  };

  useEffect(() => { fetchTx(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/transactions', { type, person, amount, dueDate });
    setPerson(''); setAmount(''); setDueDate('');
    fetchTx();
  };

  const markPaid = async (id) => {
    await api.put(`/transactions/${id}/status`, { status: 'PAID' });
    fetchTx();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto z-10 relative">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3"><Handshake className="text-primary"/> Borrowed & Lent</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-panel p-6 lg:col-span-1 h-fit">
          <h2 className="text-xl font-bold mb-6 text-orange-400">Record Transaction</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4 mb-4 transform scale-95 origin-left">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={type === 'BORROWED'} onChange={() => setType('BORROWED')} className="accent-orange-500" />
                <span className={type === 'BORROWED' ? 'text-orange-400 font-bold' : 'text-gray-400'}>I Borrowed</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={type === 'LENT'} onChange={() => setType('LENT')} className="accent-emerald-500" />
                <span className={type === 'LENT' ? 'text-emerald-400 font-bold' : 'text-gray-400'}>I Lent</span>
              </label>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Person Name</label>
              <input type="text" required className="input-field" value={person} onChange={(e) => setPerson(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Amount (₹)</label>
              <input type="number" required className="input-field" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Due Date</label>
              <input type="date" required className="input-field" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <button type="submit" className="btn-primary w-full mt-4 !bg-orange-500 hover:!bg-orange-600">Save Record</button>
          </form>
        </div>

        <div className="glass-panel p-6 lg:col-span-2">
          <h2 className="text-xl font-bold mb-6">Pending Debts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transactions.map(tx => (
              <div key={tx.id} className={`p-4 rounded-xl border ${tx.status === 'PAID' ? 'border-gray-800 bg-gray-900/50 opacity-60' : tx.type === 'BORROWED' ? 'border-orange-500/30 bg-orange-500/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded mb-2 inline-block ${tx.type === 'BORROWED' ? 'bg-orange-500/20 text-orange-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {tx.type === 'BORROWED' ? 'YOU OWE' : 'YOU ARE OWED'}
                  </span>
                  {tx.status === 'PAID' && <span className="text-xs bg-green-900 text-green-300 px-2 rounded-full hidden">Paid</span>}
                </div>
                <h3 className="font-bold text-lg capitalize">{tx.person}</h3>
                <p className="text-2xl font-bold mb-4">₹{tx.amount}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Due: {new Date(tx.dueDate).toLocaleDateString()}</span>
                  {tx.status === 'PENDING' ? (
                    <button onClick={() => markPaid(tx.id)} className="flex items-center gap-1 text-primary hover:text-emerald-300 transition-colors bg-primary/10 px-3 py-1 rounded-full">
                      <CheckCircle size={16} /> Mark Paid
                    </button>
                  ) : (
                    <span className="font-bold text-gray-500">Settled</span>
                  )}
                </div>
              </div>
            ))}
            {transactions.length === 0 && <div className="p-8 text-center text-gray-500 col-span-full">No active borrowing or lending records.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
