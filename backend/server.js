require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient({});
const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_financial_app_key_123!';

// Middleware to protect routes
const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

// --- AUTH ROUTES ---
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return res.status(400).json({ error: 'User already exists' });
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, isGuest: false }
  });
  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.json({ token, user: { id: user.id, email: user.email, isGuest: user.isGuest, termsAccepted: user.termsAccepted } });
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.isGuest) return res.status(400).json({ error: 'Invalid credentials' });
  
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ error: 'Invalid credentials' });
  
  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.json({ token, user: { id: user.id, email: user.email, isGuest: user.isGuest, termsAccepted: user.termsAccepted } });
});

app.post('/api/auth/guest', async (req, res) => {
  const user = await prisma.user.create({
    data: { isGuest: true, termsAccepted: false }
  });
  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.json({ token, user: { id: user.id, isGuest: user.isGuest, termsAccepted: false } });
});

// Simulated Google Auth — creates or finds user by email
app.post('/api/auth/google', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required for Google sign-in' });
  
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: { email, isGuest: false, password: null }
    });
  }
  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.json({ token, user: { id: user.id, email: user.email, isGuest: user.isGuest, termsAccepted: user.termsAccepted } });
});

app.get('/api/auth/me', auth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  res.json({ id: user.id, email: user.email, isGuest: user.isGuest, monthlyBudget: user.monthlyBudget, termsAccepted: user.termsAccepted });
});

// --- USER BUDGET ---
app.put('/api/user/budget', auth, async (req, res) => {
  const { monthlyBudget } = req.body;
  const budget = parseFloat(monthlyBudget);
  if (isNaN(budget) || budget < 5 || budget > 50000) {
    return res.status(400).json({ error: 'Monthly budget must be between ₹5 and ₹50,000' });
  }
  const updated = await prisma.user.update({
    where: { id: req.user.id },
    data: { monthlyBudget: budget }
  });
  res.json({ monthlyBudget: updated.monthlyBudget });
});

// --- USER TERMS ACCEPTANCE ---
app.put('/api/user/accept-terms', auth, async (req, res) => {
  const updated = await prisma.user.update({
    where: { id: req.user.id },
    data: { termsAccepted: true }
  });
  res.json({ termsAccepted: updated.termsAccepted });
});

// --- EXPENSE ROUTES ---
app.get('/api/expenses', auth, async (req, res) => {
  const expenses = await prisma.expense.findMany({ where: { userId: req.user.id }, orderBy: { date: 'desc' } });
  res.json(expenses);
});

app.post('/api/expenses', auth, async (req, res) => {
  const { amount, category, date, note } = req.body;
  const expense = await prisma.expense.create({
    data: { amount: parseFloat(amount), category, date: new Date(date), note, userId: req.user.id }
  });
  res.json(expense);
});

app.delete('/api/expenses/:id', auth, async (req, res) => {
  await prisma.expense.deleteMany({ where: { id: req.params.id, userId: req.user.id } });
  res.json({ success: true });
});

// --- SAVINGS GOALS ROUTES ---
app.get('/api/savings', auth, async (req, res) => {
  const goals = await prisma.savingsGoal.findMany({ where: { userId: req.user.id }, orderBy: { createdAt: 'desc' } });
  res.json(goals);
});

app.post('/api/savings', auth, async (req, res) => {
  const { name, targetAmount, savedAmount, deadline } = req.body;
  const goal = await prisma.savingsGoal.create({
    data: { name, targetAmount: parseFloat(targetAmount), savedAmount: parseFloat(savedAmount || 0), deadline: new Date(deadline), userId: req.user.id }
  });
  res.json(goal);
});

app.put('/api/savings/:id/add', auth, async (req, res) => {
  const { amount } = req.body;
  const goal = await prisma.savingsGoal.findFirst({ where: { id: req.params.id, userId: req.user.id } });
  if (!goal) return res.status(404).send('Not found');
  const updated = await prisma.savingsGoal.update({
    where: { id: req.params.id },
    data: { savedAmount: goal.savedAmount + parseFloat(amount) }
  });
  res.json(updated);
});

// --- TRANSACTIONS (BORROW/LENT) ---
app.get('/api/transactions', auth, async (req, res) => {
  const tx = await prisma.transaction.findMany({ where: { userId: req.user.id }, orderBy: { dueDate: 'asc' } });
  res.json(tx);
});

app.post('/api/transactions', auth, async (req, res) => {
  const { type, person, amount, dueDate } = req.body;
  const tx = await prisma.transaction.create({
    data: { type, person, amount: parseFloat(amount), dueDate: new Date(dueDate), userId: req.user.id }
  });
  res.json(tx);
});

app.put('/api/transactions/:id/status', auth, async (req, res) => {
  const { status } = req.body;
  const updated = await prisma.transaction.updateMany({
    where: { id: req.params.id, userId: req.user.id },
    data: { status }
  });
  res.json({ success: true });
});

app.delete('/api/transactions/:id', auth, async (req, res) => {
  await prisma.transaction.deleteMany({ where: { id: req.params.id, userId: req.user.id } });
  res.json({ success: true });
});

// --- DASHBOARD ROUTE ---
app.get('/api/dashboard', auth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  const expenses = await prisma.expense.findMany({ where: { userId: req.user.id } });
  const tx = await prisma.transaction.findMany({ where: { userId: req.user.id } });
  
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const borrowed = tx.filter(t => t.type === 'BORROWED' && t.status === 'PENDING').reduce((sum, t) => sum + t.amount, 0);
  const lent = tx.filter(t => t.type === 'LENT' && t.status === 'PENDING').reduce((sum, t) => sum + t.amount, 0);
  
  const monthlyBudget = user.monthlyBudget || 25000;
  const totalBalance = monthlyBudget - totalExpenses + borrowed - lent;

  res.json({ totalBalance, totalExpenses, borrowed, lent, monthlyBudget });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
