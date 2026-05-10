"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Circle, Plus, Trash2, 
  Briefcase, FileText, Smartphone, HeartPulse, 
  Search, ShieldCheck, Luggage, Compass
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

const initialItems = [
  { id: 1, text: "Renew Passport (if expiring)", category: "Documents", completed: true },
  { id: 2, text: "Book Flight Tickets", category: "Documents", completed: true },
  { id: 3, text: "International Data Roaming / eSIM", category: "Tech", completed: false },
  { id: 4, text: "Universal Travel Adapter", category: "Tech", completed: false },
  { id: 5, text: "First Aid Kit & Prescription Meds", category: "Health", completed: false },
  { id: 6, text: "Noise-Cancelling Headphones", category: "Gear", completed: false },
  { id: 7, text: "Travel Insurance Policy", category: "Documents", completed: false },
];

export default function TripChecklist() {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Documents", "Tech", "Health", "Gear"];

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    setItems([{
      id: Date.now(),
      text: newItem,
      category: activeCategory === "All" ? "General" : activeCategory,
      completed: false
    }, ...items]);
    setNewItem("");
  };

  const toggleItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const filteredItems = items.filter(item => 
    activeCategory === "All" || item.category === activeCategory
  );

  const completedCount = items.filter(i => i.completed).length;
  const progress = Math.round((completedCount / items.length) * 100);

  return (
    <div className="check-root">
      <style dangerouslySetInnerHTML={{ __html: `
        .check-root {
          min-height: 100vh;
          background: ${T.cream};
          padding: 40px 60px;
          font-family: 'Outfit', sans-serif;
          color: ${T.navy};
          display: flex;
          gap: 40px;
        }

        .check-sidebar {
          width: 280px;
          flex-shrink: 0;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          background: white;
          border-radius: 16px;
          font-weight: 700;
          color: ${T.navy};
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          margin-bottom: 32px;
          transition: all 0.2s;
        }
        .back-btn:hover { background: ${T.navy}; color: white; transform: translateX(-4px); }

        .cat-list { display: flex; flex-direction: column; gap: 8px; }
        .cat-btn {
          padding: 14px 20px;
          border-radius: 14px;
          border: none;
          background: transparent;
          color: ${T.muted};
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cat-btn:hover { background: ${T.peach}; color: ${T.coral}; }
        .cat-btn.active { background: ${T.coral}; color: white; box-shadow: 0 8px 20px rgba(255,107,107,0.25); }

        .check-main { flex: 1; max-width: 800px; }
        
        .progress-card {
          background: white;
          padding: 32px;
          border-radius: 32px;
          border: 1px solid ${T.border};
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .progress-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: ${T.peach};
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 20px;
          color: ${T.coral};
          border: 4px solid white;
          box-shadow: 0 4px 15px rgba(255,107,107,0.15);
        }

        .input-box {
          background: white;
          padding: 12px 12px 12px 24px;
          border-radius: 20px;
          border: 2px solid ${T.border};
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
          transition: border-color 0.2s;
        }
        .input-box:focus-within { border-color: ${T.coral}; }
        .input-box input {
          flex: 1;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 16px;
          font-weight: 600;
        }
        .add-btn {
          background: ${T.navy};
          color: white;
          border: none;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .add-btn:hover { transform: scale(1.05); }

        .todo-item {
          background: white;
          padding: 18px 24px;
          border-radius: 20px;
          border: 1px solid ${T.border};
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.2s;
          cursor: pointer;
        }
        .todo-item:hover { transform: translateY(-2px); border-color: ${T.coral}; }
        .todo-text { flex: 1; font-weight: 600; font-size: 15px; }
        .todo-text.done { color: ${T.muted}; text-decoration: line-through; opacity: 0.6; }
        .todo-cat {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          background: ${T.cream};
          padding: 4px 10px;
          border-radius: 6px;
          color: ${T.coral};
        }
        .del-btn { color: ${T.muted}; opacity: 0; transition: opacity 0.2s; }
        .todo-item:hover .del-btn { opacity: 1; }
        .del-btn:hover { color: #ff4757; }
      `}} />

      <aside className="check-sidebar">
        <Link href="/dashboard" className="back-btn">
          <Compass size={20} /> Dashboard
        </Link>
        <div className="cat-list">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "Documents" && <FileText size={18} />}
              {cat === "Tech" && <Smartphone size={18} />}
              {cat === "Health" && <HeartPulse size={18} />}
              {cat === "Gear" && <Briefcase size={18} />}
              {cat === "All" && <Luggage size={18} />}
              {cat}
            </button>
          ))}
        </div>
      </aside>

      <main className="check-main">
        <div className="progress-card">
          <div className="progress-circle">{progress}%</div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: 4 }}>Trip Readiness</h2>
            <p style={{ color: T.muted, fontSize: '14px' }}>
              {completedCount} of {items.length} essential tasks completed. You're getting there!
            </p>
          </div>
        </div>

        <form className="input-box" onSubmit={addItem}>
          <input 
            type="text" 
            placeholder="What else do you need to prepare?" 
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button type="submit" className="add-btn"><Plus size={20} /></button>
        </form>

        <div className="todo-list">
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="todo-item"
                onClick={() => toggleItem(item.id)}
              >
                {item.completed ? (
                  <CheckCircle2 size={22} color={T.coral} />
                ) : (
                  <Circle size={22} color={T.border} />
                )}
                <div className={`todo-text ${item.completed ? 'done' : ''}`}>
                  {item.text}
                </div>
                <div className="todo-cat">{item.category}</div>
                <button 
                  className="del-btn" 
                  onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }}
                >
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
