"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Map, ListChecks, PieChart, 
  Zap, MessageSquare, ArrowRight, Compass 
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

const features = [
  {
    title: "AI Chat Trip Planner",
    desc: "Architect your journey through a high-end conversational concierge.",
    icon: <MessageSquare size={24} />,
    color: "#ff6b6b",
    bg: "#fff0e6",
    link: "/dashboard/ai-planner",
    wow: "INSANE"
  },
  {
    title: "Logistics Timeline",
    desc: "Interactive chronological schedules with smart travel gap detection.",
    icon: <Zap size={24} />,
    color: "#4cc9f0",
    bg: "#e0f7fa",
    link: "/dashboard/ai-planner",
    wow: "VERY HIGH"
  },
  {
    title: "Interactive Spatial Map",
    desc: "Numbered itinerary stops with synchronized route visualization.",
    icon: <Map size={24} />,
    color: "#4895ef",
    bg: "#e3f2fd",
    link: "/dashboard/ai-planner",
    wow: "HIGH"
  },
  {
    title: "Smart Packing List",
    desc: "AI-generated gear recommendations based on weather and activities.",
    icon: <ListChecks size={24} />,
    color: "#4361ee",
    bg: "#e8eaf6",
    link: "/dashboard/ai-planner",
    wow: "EASY WOW"
  },
  {
    title: "Budget Optimizer",
    desc: "Dynamic cost tracking and AI-driven expense predictions.",
    icon: <PieChart size={24} />,
    color: "#3f37c9",
    bg: "#ede7f6",
    link: "/dashboard/ai-planner",
    wow: "HIGH"
  },
  {
    title: "Intelligent Suggestions",
    desc: "Logic-driven reasoning for activity sequencing and meal timing.",
    icon: <Sparkles size={24} />,
    color: "#7209b7",
    bg: "#f3e5f5",
    link: "/dashboard/ai-planner",
    wow: "HUGE IMPACT"
  }
];

export default function AIFeaturesHub() {
  return (
    <div className="hub-root">
      <style dangerouslySetInnerHTML={{ __html: `
        .hub-root {
          min-height: 100vh;
          background: ${T.cream};
          padding: 60px 40px;
          font-family: 'Outfit', sans-serif;
          color: ${T.navy};
        }

        .hub-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .hub-header {
          margin-bottom: 60px;
          text-align: center;
        }

        .hub-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 800;
          color: ${T.coral};
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.03);
          margin-bottom: 24px;
        }

        .hub-header h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 56px;
          font-weight: 700;
          margin-bottom: 16px;
          color: ${T.navy};
        }

        .hub-header p {
          font-size: 18px;
          color: ${T.muted};
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 24px;
        }

        .feature-card {
          background: white;
          padding: 40px;
          border-radius: 32px;
          border: 1px solid ${T.border};
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          display: block;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.06);
          border-color: ${T.coral};
        }

        .icon-box {
          width: 60px;
          height: 60px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: all 0.3s;
        }

        .feature-card:hover .icon-box {
          transform: scale(1.1) rotate(-5deg);
        }

        .wow-badge {
          position: absolute;
          top: 32px;
          right: 32px;
          font-size: 10px;
          font-weight: 900;
          color: ${T.muted};
          letter-spacing: 1px;
          opacity: 0.5;
        }

        .feature-card h3 {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 12px;
          color: ${T.navy};
        }

        .feature-card p {
          font-size: 15px;
          color: ${T.muted};
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .action-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 14px;
          color: ${T.navy};
          transition: all 0.2s;
        }

        .feature-card:hover .action-link {
          gap: 12px;
          color: ${T.coral};
        }
      `}} />


      <div className="hub-container">
        <header className="hub-header">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hub-badge"
          >
            <Sparkles size={14} /> Intelligence Lab
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Architect your next <br /> Masterpiece.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Experience the future of travel planning with our suite of 
            logistics-optimized AI tools.
          </motion.p>
        </header>

        <div className="features-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <Link href={f.link} className="feature-card">
                <div className="wow-badge">{f.wow}</div>
                <div 
                  className="icon-box" 
                  style={{ background: f.bg, color: f.color }}
                >
                  {f.icon}
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="action-link">
                  Launch Feature <ArrowRight size={16} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
