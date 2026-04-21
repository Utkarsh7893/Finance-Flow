# 💰 Student Finance Tracker

A simple, privacy-friendly financial management web app designed specifically for college students. This app helps users track daily expenses, manage savings goals, and monitor borrowed or lent money — all in one clean and intuitive interface.

---

## 🚀 Problem Statement

College students often struggle to:

* Track daily expenses
* Manage borrowed/lent money
* Stay consistent with savings goals

Most existing finance apps are:

* Too complex
* Not tailored to student needs
* Overwhelming in UI/UX

This project aims to solve these issues with a **minimal, student-first financial tracking solution**.

---

## 🎯 Target Users

* Students aged **18–25**
* Monthly income under **₹25,000**

  * Stipends
  * Part-time jobs
  * Allowances
* Prefer **simple UI**
* Value **privacy (guest mode support)**

---

## ✨ Core Features

### 🔐 Authentication

* Login / Signup
* Guest Mode (no data persistence required)

---

### 💸 Expense Management

* Add Expense:

  * Amount
  * Category (Food, Travel, Rent, Study, Fun)
  * Date
  * Notes
* Edit / Delete Expenses
* View:

  * Weekly totals
  * Monthly summaries

---

### 🎯 Savings Tracker

* Create Savings Goals:

  * Goal Name
  * Target Amount
  * Current Savings
  * Deadline
* Add money to goals
* Visual **progress bar** for motivation

---

### 🤝 Borrowed / Lent Money

* Record transactions:

  * Borrowed or Lent
  * Person Name
  * Amount
  * Due Date
* Status Tracking:

  * Pending / Paid
* Auto-reflect in dashboard balance

---

### 📊 Dashboard (Central Hub)

* Total Balance Overview
* Monthly Expense Summary
* Savings Progress
* Borrowed vs Lent Overview

---

## 🖥️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* State Management:

  * Context API or Redux Toolkit
* Charts:

  * Chart.js or Recharts

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL

---

## 🧱 Project Structure

### 📁 Frontend Pages

* Login / Guest Page
* Dashboard
* Expenses Page
* Savings Page
* Borrowed Money Page

---

### ⚙️ Backend API Endpoints

#### Authentication

```
POST /auth/login
POST /auth/register
```

#### Expenses

```
GET    /expenses
POST   /expenses
PUT    /expenses/:id
DELETE /expenses/:id
```

#### Savings

```
GET  /savings
POST /savings
PUT  /savings/:id
```

#### Borrowed / Lent

```
GET  /borrow
POST /borrow
PUT  /borrow/:id
```

---

## 🎨 UI/UX Principles

* Minimal & clean design
* Mobile-friendly layout
* Easy navigation
* Focus on **clarity over complexity**
* Visual elements (charts, progress bars) for better understanding

---

## 🔒 Privacy Focus

* Guest mode available (no login required)
* Minimal data collection
* Secure authentication for registered users

---

## 📈 Future Enhancements

* Notifications for due dates
* Expense category insights (AI-based suggestions)
* Export reports (PDF/CSV)
* Dark mode
* Budget planning feature

---

## 🛠️ Setup Instructions

### Prerequisites

* Node.js
* PostgreSQL
* npm / yarn

### Backend Setup

```
cd backend
npm install
npm run dev
```

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

## 🤝 Contribution

Contributions are welcome! Feel free to:

* Fork the repo
* Create a feature branch
* Submit a pull request

---

## 📌 Conclusion

This project focuses on **simplicity, usability, and student-centric design**, helping young users build better financial habits without overwhelming them.

---

💡 *Built with the goal of making financial awareness simple and accessible for students.*
