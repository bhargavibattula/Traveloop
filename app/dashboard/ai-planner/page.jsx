"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Loader2, Stars, ArrowLeft, Bot, Wand2, Compass, Luggage, CheckCircle2, DollarSign } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ProductionPlanner = dynamic(() => import('@/app/components/ProductionPlanner'), { 
  ssr: false,
  loading: () => (
    <div className="h-screen w-screen flex items-center justify-center bg-[#fffcf9] fixed inset-0 z-[2000]">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <Loader2 className="animate-spin text-[#ff6b6b]" size={64} strokeWidth={1} />
          <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#ff6b6b]" size={24} />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-serif font-bold text-[#2b2d42] mb-2">Architecting Your Journey</h3>
          <p className="text-[#8d99ae] text-sm font-medium">Synchronizing logistics and map data...</p>
        </div>
      </div>
    </div>
  )
});

export default function AIPlannerPage() {
  const [view, setView] = useState('chat'); // 'chat' or 'planner'
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Welcome to the Production-Grade Travel Concierge. I'm ready to architect your next optimized journey. What destination are we exploring?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [itineraryData, setItineraryData] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/ai/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: userMessage,
          history: messages.slice(-5)
        }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Exquisite. I have architected a logistics masterpiece for "${data.tripName}". Manifesting your interactive workspace now...` 
      }]);

      setTimeout(() => {
        setItineraryData(data);
        setView('planner');
      }, 1500);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I apologize, but I encountered a logistical error. Shall we try again?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="planner-root">
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --bg-cream: #fffcf9;
          --bg-peach: #fff0e6;
          --text-dark: #2b2d42;
          --text-muted: #8d99ae;
          --primary: #ff6b6b;
          --border: #f1f3f5;
          --radius-lg: 24px;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .planner-root {
          font-family: 'Outfit', sans-serif;
          color: var(--text-dark);
          background: var(--bg-cream);
          height: 100vh;
          width: 100vw;
          display: flex;
          overflow: hidden;
        }

        /* Sidebar Styles */
        .sidebar {
          width: 280px;
          background: white;
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 40px 24px;
          flex-shrink: 0;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 60px;
          text-decoration: none;
          color: var(--text-dark);
        }

        .logo-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 700;
        }

        .nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          border-radius: 16px;
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .nav-item:hover {
          background: var(--bg-peach);
          color: var(--primary);
        }

        .nav-item.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 10px 25px rgba(255, 107, 107, 0.2);
        }

        /* Main Area */
        .main {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          background: var(--bg-cream);
        }

        .chat-container {
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 60px 40px;
        }

        .header {
          margin-bottom: 48px;
        }

        .header h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 56px;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 12px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-peach);
          color: var(--primary);
          padding: 6px 16px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .feed {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding-right: 12px;
          margin-bottom: 40px;
        }

        .bubble {
          max-width: 80%;
          padding: 24px 32px;
          border-radius: 32px;
          font-size: 16px;
          line-height: 1.6;
        }

        .bubble.ai {
          background: white;
          color: var(--text-dark);
          border-bottom-left-radius: 4px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.02);
        }

        .bubble.user {
          background: var(--primary);
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 4px;
          box-shadow: 0 10px 30px rgba(255, 107, 107, 0.15);
        }

        /* Input Area Fix */
        .input-form {
          position: relative;
          background: white;
          border-radius: 32px;
          padding: 8px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.05);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .input-box {
          flex: 1;
          border: none;
          outline: none;
          padding: 16px 24px;
          font-family: inherit;
          font-size: 17px;
          resize: none;
          background: transparent;
          color: var(--text-dark);
          min-height: 56px;
          line-height: 1.4;
        }

        .send-btn {
          background: var(--primary);
          color: white;
          border: none;
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
          z-index: 10;
        }

        .send-btn:hover:not(:disabled) {
          background: #fa5252;
          transform: scale(1.05);
        }

        .send-btn:disabled {
          background: var(--bg-peach);
          color: var(--text-muted);
          cursor: not-allowed;
          opacity: 0.5;
        }

        /* Planner Specific */
        .planner-fullscreen {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          z-index: 1000;
          background: white;
          display: flex;
          flex-direction: column;
        }

        .top-bar {
          height: 72px;
          background: white;
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-muted);
          font-weight: 700;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
          background: none;
          border: none;
          cursor: pointer;
        }
        .back-btn:hover { color: var(--primary); }

      `}} />

      {view === 'planner' && itineraryData ? (
        <div className="planner-fullscreen">
          <div className="top-bar">
            <button onClick={() => setView('chat')} className="back-btn">
              <ArrowLeft size={18} /> BACK TO DESIGN LAB
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Optimized by</div>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>Llama 3.3 Travel Engine</div>
              </div>
              <div style={{ width: 44, height: 44, background: 'var(--bg-peach)', borderRadius: 12, display: 'flex', alignItems: 'center', justify: 'center' }}>
                <Bot className="text-[#ff6b6b]" size={24} />
              </div>
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <ProductionPlanner data={itineraryData} onRegenerate={() => setView('chat')} />
          </div>
        </div>
      ) : (
        <>
          <aside className="sidebar">
            <Link href="/" className="logo">
              <Stars className="text-[#ff6b6b]" size={36} />
              <span className="logo-text">Traveloop</span>
            </Link>
            <nav className="nav">
              <Link href="/dashboard" className="nav-item">
                <Compass size={20} /> Dashboard
              </Link>
               <Link href="/dashboard/ai-features" className="nav-item">
                <Sparkles size={20} /> AI Features
              </Link>
              <Link href="/dashboard/ai-planner" className="nav-item active">
                <Wand2 size={20} /> AI Planner
              </Link>
              <Link href="/trips" className="nav-item">
                <Luggage size={20} /> My Trips
              </Link>
              <Link href="/dashboard/checklist" className="nav-item">
                <CheckCircle2 size={20} /> Checklist
              </Link>
              <Link href="/dashboard/budget" className="nav-item">
                <DollarSign size={20} /> Budgets
              </Link>
            </nav>
          </aside>

          <main className="main">
            <div className="chat-container">
              <header className="header">
                <div className="badge">
                  <Wand2 size={14} /> Production Lab
                </div>
                <h1>Architect your <br />Next Journey</h1>
              </header>

              <div className="feed" ref={scrollRef}>
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bubble ${msg.role === 'user' ? 'user' : 'ai'}`}
                    >
                      {msg.content}
                    </motion.div>
                  ))}
                  {loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bubble ai" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <Loader2 className="animate-spin text-[#ff6b6b]" size={20} />
                      <span style={{ fontWeight: 700 }}>AI is optimizing logistics and crowd patterns...</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <form onSubmit={handleSubmit} className="input-form">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="I want to explore the hidden gems of Tuscany for 10 days..."
                  className="input-box"
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <button 
                  type="submit" 
                  disabled={loading || !input.trim()} 
                  className="send-btn"
                >
                  <Send size={24} />
                </button>
              </form>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
