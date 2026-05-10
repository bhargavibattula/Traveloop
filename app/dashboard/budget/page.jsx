"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PieChart, Sparkles, DollarSign, ArrowUpRight, ArrowDownRight, 
  Plane, Hotel, Utensils, Activity, Plus,
  CreditCard, Wallet, TrendingUp, Compass, X, Trash2
} from 'lucide-react';
import Link from 'next/link';

const T = {
  cream: '#fffcf9',
  peach: '#fff0e6',
  coral: '#ff6b6b',
  navy: '#2b2d42',
  muted: '#8d99ae',
  border: '#f1f3f5',
};

const CATEGORIES = {
  transport: { label: "Flights & Transport", icon: <Plane size={18} />, color: "#4cc9f0" },
  stay: { label: "Luxury Stay", icon: <Hotel size={18} />, color: "#4895ef" },
  dining: { label: "Dining & Gourmet", icon: <Utensils size={18} />, color: "#4361ee" },
  activities: { label: "Activities & Tours", icon: <Activity size={18} />, color: "#3f37c9" },
};

export default function TripBudget() {
  const [expenses, setExpenses] = useState([
    { id: 1, label: "Air France Tickets", amount: 4200, category: "transport", date: "2026-05-10" },
    { id: 2, label: "Ritz Paris Deposit", amount: 2800, category: "stay", date: "2026-05-09" },
    { id: 3, label: "Le Jules Verne Dinner", amount: 1400, category: "dining", date: "2026-05-08" },
    { id: 4, label: "Private Louvre Tour", amount: 950, category: "activities", date: "2026-05-07" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newExpense, setNewExpense] = useState({ label: '', amount: '', category: 'transport' });

  const totalBudget = 15000;
  
  const totalSpent = useMemo(() => 
    expenses.reduce((sum, exp) => sum + Number(exp.amount), 0), 
  [expenses]);

  const remaining = totalBudget - totalSpent;

  const allocation = useMemo(() => {
    const totals = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
      return acc;
    }, {});

    return Object.keys(CATEGORIES).map(catKey => ({
      ...CATEGORIES[catKey],
      amount: totals[catKey] || 0,
      pct: totalSpent > 0 ? Math.round(((totals[catKey] || 0) / totalSpent) * 100) : 0
    }));
  }, [expenses, totalSpent]);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.label || !newExpense.amount) return;

    setExpenses([
      {
        id: Date.now(),
        ...newExpense,
        amount: Number(newExpense.amount),
        date: new Date().toISOString().split('T')[0]
      },
      ...expenses
    ]);

    setNewExpense({ label: '', amount: '', category: 'transport' });
    setShowAddModal(false);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  return (
    <div className="budget-root">
      <style dangerouslySetInnerHTML={{ __html: `
        .budget-root {
          min-height: 100vh;
          background: ${T.cream};
          padding: 40px 60px;
          font-family: 'Outfit', sans-serif;
          color: ${T.navy};
        }

        .budget-container { max-width: 1100px; margin: 0 auto; }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          background: white;
          border-radius: 16px;
          font-weight: 700;
          color: ${T.navy};
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          margin-bottom: 40px;
          transition: all 0.2s;
        }
        .back-btn:hover { background: ${T.navy}; color: white; transform: translateX(-4px); }

        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 48px;
        }
        .header-row h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .top-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }
        .stat-card {
          background: white;
          padding: 32px;
          border-radius: 32px;
          border: 1px solid ${T.border};
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }
        .stat-label {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: ${T.muted};
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .stat-val { font-size: 36px; font-weight: 700; font-family: 'Cormorant Garamond', serif; }
        .stat-diff {
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 12px;
        }
        .stat-diff.pos { color: #0ca678; }
        .stat-diff.neg { color: ${T.coral}; }

        .content-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 32px;
        }

        .list-card {
          background: white;
          padding: 40px;
          border-radius: 32px;
          border: 1px solid ${T.border};
        }
        .list-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .expense-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 0;
          border-bottom: 1px solid ${T.border};
          transition: background 0.2s;
        }
        .expense-row:hover { background: #fcfcfc; }
        .icon-circle {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .expense-info { flex: 1; }
        .expense-name { font-weight: 700; font-size: 15px; margin-bottom: 2px; }
        .expense-meta { font-size: 12px; color: ${T.muted}; font-weight: 600; }
        .expense-amount { font-weight: 800; font-size: 15px; text-align: right; }
        .delete-btn { color: ${T.muted}; cursor: pointer; transition: color 0.2s; padding: 4px; }
        .delete-btn:hover { color: ${T.coral}; }

        .breakdown-card {
          background: ${T.navy};
          color: white;
          padding: 40px;
          border-radius: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .breakdown-item { display: flex; flex-direction: column; gap: 12px; }
        .break-top { display: flex; justify-content: space-between; font-weight: 700; font-size: 14px; }
        .progress-bg { height: 8px; background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 10px; }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(43, 45, 66, 0.4);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 40px;
          border-radius: 32px;
          width: 100%;
          max-width: 480px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }
        .modal-title { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 700; }
        .input-group { margin-bottom: 24px; }
        .input-label { display: block; font-size: 13px; font-weight: 700; margin-bottom: 8px; color: ${T.muted}; text-transform: uppercase; letter-spacing: 1px; }
        .input-field {
          width: 100%;
          padding: 16px;
          border: 1px solid ${T.border};
          border-radius: 16px;
          font-family: inherit;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field:focus { border-color: ${T.coral}; }
        .submit-btn {
          width: 100%;
          padding: 16px;
          background: ${T.navy};
          color: white;
          border: none;
          border-radius: 16px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          margin-top: 12px;
          transition: all 0.2s;
        }
        .submit-btn:hover { background: #3a3d58; transform: translateY(-2px); }
      `}} />

      <div className="budget-container">
        <Link href="/dashboard" className="back-btn">
          <Compass size={20} /> Dashboard
        </Link>

        <div className="header-row">
          <div>
            <h1 style={{ color: T.navy }}>Financial Planner</h1>
            <p style={{ color: T.muted, fontWeight: 600 }}>Tracking your travel investments for Paris Getaway.</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            style={{ 
              background: T.navy, color: 'white', border: 'none', 
              padding: '14px 28px', borderRadius: '16px', fontWeight: 700,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10
            }}
          >
            <Plus size={20} /> Add Expense
          </button>
        </div>

        <div className="top-stats">
          <div className="stat-card">
            <div className="stat-label"><Wallet size={14} /> Total Budget</div>
            <div className="stat-val">${totalBudget.toLocaleString()}</div>
            <div className="stat-diff pos"><TrendingUp size={14} /> On Track</div>
          </div>
          <div className="stat-card">
            <div className="stat-label"><CreditCard size={14} /> Total Spent</div>
            <div className="stat-val">${totalSpent.toLocaleString()}</div>
            <div className="stat-diff neg"><ArrowUpRight size={14} /> 12% vs last trip</div>
          </div>
          <div className="stat-card">
            <div className="stat-label"><DollarSign size={14} /> Remaining</div>
            <div className="stat-val">${remaining.toLocaleString()}</div>
            <div className="stat-diff pos"><ArrowDownRight size={14} /> Savings Potential</div>
          </div>
        </div>

        <div className="content-grid">
          <div className="list-card">
            <div className="list-title">
              Recent Transactions
              <span style={{ fontSize: '13px', color: T.coral, cursor: 'pointer' }}>View All</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <AnimatePresence mode='popLayout'>
                {expenses.map((item) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="expense-row"
                  >
                    <div className="icon-circle" style={{ background: T.peach, color: T.coral }}>
                      {CATEGORIES[item.category]?.icon || <DollarSign size={18} />}
                    </div>
                    <div className="expense-info">
                      <div className="expense-name">{item.label}</div>
                      <div className="expense-meta">{item.date} • Card •••• 4242</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div className="expense-amount">-${item.amount.toLocaleString()}</div>
                      <div className="delete-btn" onClick={() => deleteExpense(item.id)}>
                        <Trash2 size={16} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {expenses.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px', color: T.muted }}>
                  No transactions yet. Add your first expense above!
                </div>
              )}
            </div>
          </div>

          <div className="breakdown-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <PieChart size={24} color={T.coral} />
              <h3 style={{ fontSize: '20px', fontWeight: 700 }}>Allocation</h3>
            </div>
            {allocation.map((item, i) => (
              <div key={i} className="breakdown-item">
                <div className="break-top">
                  <span>{item.label}</span>
                  <span style={{ color: item.color }}>{item.pct}%</span>
                </div>
                <div className="progress-bg">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="progress-fill" 
                    style={{ background: item.color }} 
                  />
                </div>
              </div>
            ))}
            <div style={{ 
              marginTop: 'auto', padding: '24px', background: 'rgba(255,255,255,0.05)', 
              borderRadius: '20px', fontSize: '13px', lineHeight: 1.6, opacity: 0.8 
            }}>
              <Sparkles size={16} style={{ marginBottom: 8, color: T.coral }} />
              <br />
              <b>AI Insight:</b> {totalSpent > totalBudget ? "You've exceeded your budget. Review your luxury stay costs." : "You've saved 15% on accommodation by booking early. Consider allocating this to your Dining budget."}
            </div>
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="modal-content"
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2 className="modal-title">Add Expense</h2>
                <X 
                  size={24} 
                  style={{ cursor: 'pointer', color: T.muted }} 
                  onClick={() => setShowAddModal(false)} 
                />
              </div>

              <form onSubmit={handleAddExpense}>
                <div className="input-group">
                  <label className="input-label">Description</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="e.g. Flight to Paris"
                    value={newExpense.label}
                    onChange={e => setNewExpense({...newExpense, label: e.target.value})}
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Amount ($)</label>
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={e => setNewExpense({...newExpense, amount: e.target.value})}
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Category</label>
                  <select 
                    className="input-field"
                    value={newExpense.category}
                    onChange={e => setNewExpense({...newExpense, category: e.target.value})}
                  >
                    {Object.keys(CATEGORIES).map(catKey => (
                      <option key={catKey} value={catKey}>{CATEGORIES[catKey].label}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="submit-btn">
                  Record Expense
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
