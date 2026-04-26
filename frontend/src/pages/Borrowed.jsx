import React, { useState, useEffect } from 'react';
import { api } from '../store';
import { Handshake, CheckCircle, Trash2 } from 'lucide-react';

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

  const deleteTx = async (id) => {
    if (window.confirm('Are you sure you want to delete this completed record?')) {
      await api.delete(`/transactions/${id}`);
      fetchTx();
    }
  };

  const pendingTx = transactions.filter(t => t.status === 'PENDING');
  const completedTx = transactions.filter(t => t.status === 'PAID');

  return (
    <div className="p-8 max-w-7xl mx-auto z-10 relative">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3"><Handshake className="text-primary"/> Borrowed & Lent</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-panel p-6 lg:col-span-1 h-fit">
          <h2 className="text-xl font-bold mb-6 text-primary dark:text-orange-400">Record Transaction</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4 mb-4 transform scale-95 origin-left">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={type === 'BORROWED'} onChange={() => setType('BORROWED')} className="accent-primary dark:accent-orange-500" />
                <span className={type === 'BORROWED' ? 'text-primary dark:text-orange-400 font-bold' : 'text-gray-700 dark:text-gray-400'}>I Borrowed</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={type === 'LENT'} onChange={() => setType('LENT')} className="accent-emerald-500" />
                <span className={type === 'LENT' ? 'text-emerald-400 font-bold' : 'text-gray-700 dark:text-gray-400'}>I Lent</span>
              </label>
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-400 mb-1">Person Name</label>
              <input type="text" required className="input-field" value={person} onChange={(e) => setPerson(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-400 mb-1">Amount (₹)</label>
              <input type="number" required className="input-field" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-400 mb-1">Due Date</label>
              <input type="date" required className="input-field" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
            <button type="submit" className="btn-primary w-full mt-4 dark:!bg-orange-500 dark:hover:!bg-orange-600">Save Record</button>
          </form>
        </div>

        <div className="glass-panel p-6 lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-6">Pending Debts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingTx.map(tx => (
                <div key={tx.id} className={`p-4 rounded-xl border ${tx.type === 'BORROWED' ? 'border-primary/30 bg-primary/5 dark:border-orange-500/30 dark:bg-orange-500/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded mb-2 inline-block ${tx.type === 'BORROWED' ? 'bg-primary/20 text-primary dark:bg-orange-500/20 dark:text-orange-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {tx.type === 'BORROWED' ? 'YOU OWE' : 'YOU ARE OWED'}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg capitalize">{tx.person}</h3>
                  <p className="text-2xl font-bold mb-4">₹{tx.amount}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-700 dark:text-gray-400">Due: {new Date(tx.dueDate).toLocaleDateString()}</span>
                    <button onClick={() => markPaid(tx.id)} className="flex items-center gap-1 text-primary hover:text-emerald-300 transition-colors bg-primary/10 px-3 py-1 rounded-full">
                      <CheckCircle size={16} /> Mark Paid
                    </button>
                  </div>
                </div>
              ))}
              {pendingTx.length === 0 && <div className="p-8 text-center text-gray-700 dark:text-gray-400 col-span-full">No active borrowing or lending records.</div>}
            </div>
          </div>

          {completedTx.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-6 text-slate-600 dark:text-gray-400">Completed Transactions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedTx.map(tx => (
                  <div key={tx.id} className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-50 dark:bg-gray-900/50 opacity-80 transition-opacity hover:opacity-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold px-2 py-1 rounded mb-2 inline-block bg-slate-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
                        {tx.type === 'BORROWED' ? 'BORROWED FROM' : 'LENT TO'}
                      </span>
                      <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-800 px-2 py-0.5 rounded-full">Settled</span>
                    </div>
                    <h3 className="font-bold text-lg capitalize text-slate-700 dark:text-gray-300">{tx.person}</h3>
                    <p className="text-2xl font-bold mb-4 text-slate-500 dark:text-gray-500 line-through decoration-slate-400 dark:decoration-gray-600">₹{tx.amount}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-600 dark:text-gray-400">Due was: {new Date(tx.dueDate).toLocaleDateString()}</span>
                      <button onClick={() => deleteTx(tx.id)} className="text-red-400 hover:text-red-300 bg-red-400/10 hover:bg-red-400/20 px-2 py-1.5 rounded-lg transition-colors" title="Delete record">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
