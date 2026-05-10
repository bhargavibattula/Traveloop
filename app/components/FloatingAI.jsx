"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Stars, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Welcome to your Personal Travel Concierge. I'm here to help you design an unforgettable journey. What's on your mind today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
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
        body: JSON.stringify({ prompt: userMessage, history: messages.slice(-3) }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      if (data.tripName) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `I've meticulously crafted a plan for your "${data.tripName}" adventure. Would you like to view the full cinematic itinerary?` 
        }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply || "That sounds like a wonderful idea. I can certainly help you refine those details." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I seem to have lost connection. Shall we try again?" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .floating-widget-wrapper {
          position: fixed;
          bottom: 40px;
          right: 40px;
          z-index: 10000;
        }

        .concierge-trigger {
          width: 64px;
          height: 64px;
          background: #ff6b6b;
          border-radius: 50%;
          border: 4px solid white;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 15px 35px rgba(255, 107, 107, 0.25);
          transition: all 0.3s;
        }

        .concierge-trigger:hover { transform: translateY(-5px); box-shadow: 0 20px 45px rgba(255, 107, 107, 0.35); }

        .concierge-box {
          position: fixed;
          bottom: 120px;
          right: 40px;
          width: 400px;
          height: 550px;
          background: white;
          border-radius: 35px;
          box-shadow: 0 25px 70px rgba(0,0,0,0.15);
          border: 1px solid #fff0e6;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 10000;
          font-family: 'Outfit', sans-serif;
        }

        .box-header {
          padding: 30px 30px 20px;
          background: linear-gradient(135deg, #fffcf9 0%, #fff0e6 100%);
          border-bottom: 1px solid #fff0e6;
        }

        .box-chat {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: #fffcf9;
        }

        .box-bubble {
          max-width: 85%;
          padding: 14px 18px;
          border-radius: 20px;
          font-size: 14px;
          line-height: 1.5;
        }

        .box-bubble.ai { background: #fff0e6; color: #2b2d42; border-bottom-left-radius: 4px; }
        .box-bubble.user { background: #ff6b6b; color: white; align-self: flex-end; border-bottom-right-radius: 4px; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.1); }

        .box-input-area {
          padding: 20px 24px 24px;
          background: white;
          border-top: 1px solid #fff0e6;
        }

        .box-input-pill {
          background: #f8f9fa;
          border-radius: 100px;
          padding: 5px 5px 5px 15px;
          display: flex;
          align-items: center;
        }

        .box-input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-family: inherit;
          font-size: 14px;
          color: #2b2d42;
          padding: 8px 0;
        }

        .box-send-btn {
          background: #ff6b6b;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
        }

        .masterpiece-link {
          margin-top: 10px;
          width: 100%;
          padding: 10px;
          background: white;
          border: 1px solid #fff0e6;
          border-radius: 12px;
          color: #ff6b6b;
          font-weight: 700;
          font-size: 11px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
        }
      `}} />

      <div className="floating-widget-wrapper">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="concierge-trigger"
        >
          {isOpen ? <X size={24} /> : <Stars size={28} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            className="concierge-box"
          >
            <div className="box-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 40, height: 40, background: 'white', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                  <Sparkles className="text-[#ff6b6b]" size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: 'Cormorant Garamond', fontSize: 20, fontWeight: 700 }}>Concierge</div>
                  <div style={{ fontSize: 9, fontWeight: 800, color: '#8d99ae', textTransform: 'uppercase', letterSpacing: 1 }}>Bespoke Assistant</div>
                </div>
              </div>
            </div>

            <div className="box-chat" ref={scrollRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`box-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}>
                  {msg.content}
                  {msg.content.includes('cinematic itinerary') && (
                    <button 
                      onClick={() => {
                        setIsOpen(false);
                        router.push('/dashboard/ai-planner');
                      }}
                      className="masterpiece-link"
                    >
                      View Masterpiece <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              ))}
              {loading && (
                <div className="box-bubble ai" style={{ opacity: 0.6 }}>
                  Designing...
                </div>
              )}
            </div>

            <div className="box-input-area">
              <form onSubmit={handleSend} className="box-input-pill">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Where to next?"
                  className="box-input"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="box-send-btn"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
