"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Sparkles, DollarSign, ArrowUpRight, ArrowDownRight, 
  Plane, Hotel, Utensils, Activity, Plus,
  CreditCard, Wallet, TrendingUp, Compass
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

const budgetSummary = [
  { label: "Flights & Transport", amount: 4200, icon: <Plane size={18} />, color: "#4cc9f0", pct: 45 },
  { label: "Luxury Stay", amount: 2800, icon: <Hotel size={18} />, color: "#4895ef", pct: 30 },
  { label: "Dining & Gourmet", amount: 1400, icon: <Utensils size={18} />, color: "#4361ee", pct: 15 },
  { label: "Activities & Tours", amount: 950, icon: <Activity size={18} />, color: "#3f37c9", pct: 10 },
];

export default function TripBudget() {
  const totalBudget = 12450;
  const totalSpent = 9350;
  const remaining = totalBudget - totalSpent;

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
        }
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
        .expense-amount { font-weight: 800; font-size: 15px; }

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
          <button style={{ 
            background: T.navy, color: 'white', border: 'none', 
            padding: '14px 28px', borderRadius: '16px', fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10
          }}>
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
            {budgetSummary.map((item, i) => (
              <div key={i} className="expense-row">
                <div className="icon-circle" style={{ background: T.peach, color: T.coral }}>
                  {item.icon}
                </div>
                <div className="expense-info">
                  <div className="expense-name">{item.label}</div>
                  <div className="expense-meta">Visa ending in •••• 4242</div>
                </div>
                <div className="expense-amount">-${item.amount.toLocaleString()}</div>
              </div>
            ))}
          </div>

          <div className="breakdown-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <PieChart size={24} color={T.coral} />
              <h3 style={{ fontSize: '20px', fontWeight: 700 }}>Allocation</h3>
            </div>
            {budgetSummary.map((item, i) => (
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
              <b>AI Insight:</b> You've saved 15% on accommodation by booking early. Consider allocating this to your Dining budget.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
