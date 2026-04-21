import React, { useEffect, useState } from 'react';
import { api } from '../store';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    api.get('/dashboard').then(res => setData(res.data)).catch(console.error);
    api.get('/expenses').then(res => setExpenses(res.data)).catch(console.error);
  }, []);

  if (!data) return <div className="p-10 text-gray-400 animated pulse">Loading Dashboard...</div>;

  const expenseCategoryData = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const pieData = Object.keys(expenseCategoryData).map((cat) => ({
    name: cat,
    value: expenseCategoryData[cat]
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto z-10 relative">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Overview</h1>
        <p className="text-gray-400">Welcome back. Here is your financial summary.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Balance" amount={data.totalBalance} color="text-primary" />
        <StatCard title="Total Expenses" amount={data.totalExpenses} color="text-red-400" />
        <StatCard title="Borrowed from You (Pending)" amount={data.lent} color="text-emerald-400" />
        <StatCard title="You Owe (Pending)" amount={data.borrowed} color="text-orange-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel p-6">
          <h3 className="text-xl font-bold mb-6">Expense Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#151a2a', borderColor: '#374151' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-xl font-bold mb-6">Recent Expenses</h3>
          <div className="space-y-4">
            {expenses.slice(0, 5).map(exp => (
              <div key={exp.id} className="flex justify-between items-center py-3 border-b border-gray-800 last:border-0">
                <div>
                  <p className="font-semibold text-gray-200">{exp.note || exp.category}</p>
                  <p className="text-xs text-gray-500">{new Date(exp.date).toLocaleDateString()}</p>
                </div>
                <p className="font-bold text-red-400">-₹{exp.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, amount, color }) {
  return (
    <div className="glass-panel p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
      <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
      <p className={`text-3xl font-bold ${color}`}>₹{amount.toLocaleString()}</p>
    </div>
  );
}
