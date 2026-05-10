"use client";

import React, { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, MapPin, Clock, Navigation,
  RotateCcw, Zap, Info, Compass,
  ChevronDown, ChevronRight, Utensils, Camera, Bus, Luggage
} from 'lucide-react';
import PlannerMap from './PlannerMap';

const T = {
  cream: '#fffcf9',
  peach: '#fff0e6',
  coral: '#ff6b6b',
  navy: '#2b2d42',
  muted: '#8d99ae',
  border: '#f1f3f5',
};

const typeIcon = (type) => {
  switch (type) {
    case 'meal':    return <Utensils size={16} color={T.coral} />;
    case 'travel':  return <Bus size={16} color={T.muted} />;
    default:        return <Camera size={16} color={T.coral} />;
  }
};

export default function ProductionPlanner({ data, onRegenerate }) {
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline' or 'kit'
  
  const itinerary = useMemo(() => data?.itinerary || [], [data]);

  const [expandedDays, setExpandedDays] = useState(() => {
    const days = [...new Set(itinerary.map(i => i.day))];
    return Object.fromEntries(days.map(d => [d, true]));
  });

  const handleSelect = (item) => {
    setSelectedId(item?.id || null);
    setActiveTab('timeline');
  };

  const toggleDay = (day) => setExpandedDays(prev => ({ ...prev, [day]: !prev[day] }));

  const grouped = useMemo(() => {
    const map = {};
    itinerary.forEach(item => {
      if (!map[item.day]) map[item.day] = [];
      map[item.day].push(item);
    });
    return Object.entries(map).sort(([a], [b]) => Number(a) - Number(b));
  }, [itinerary]);

  const selectedItem = useMemo(() => itinerary.find(i => i.id === selectedId), [itinerary, selectedId]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .prod-root {
          display: flex;
          width: 100%;
          height: 100%;
          font-family: 'Outfit', sans-serif;
          color: ${T.navy};
          overflow: hidden;
        }

        /* Tabs UI */
        .tab-switcher {
          display: flex;
          background: ${T.cream};
          padding: 4px;
          border-radius: 12px;
          margin-top: 16px;
          border: 1px solid ${T.border};
        }
        .tab-btn {
          flex: 1;
          padding: 8px;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: ${T.muted};
          background: transparent;
        }
        .tab-btn.active {
          background: white;
          color: ${T.coral};
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        /* Kit View */
        .kit-view {
          padding: 32px;
          flex: 1;
          overflow-y: auto;
        }
        .kit-section { margin-bottom: 40px; }
        .kit-section h4 { 
          font-size: 11px; 
          font-weight: 900; 
          text-transform: uppercase; 
          letter-spacing: 1.5px; 
          color: ${T.coral};
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .kit-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .kit-card {
          background: ${T.cream};
          padding: 16px;
          border-radius: 16px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid transparent;
          transition: all 0.2s;
        }
        .kit-card:hover {
          border-color: ${T.peach};
          transform: translateY(-2px);
        }
        .kit-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${T.coral};
        }

        .suggestion-box {
          background: white;
          border: 1px solid ${T.border};
          padding: 20px;
          border-radius: 20px;
          margin-bottom: 12px;
          font-size: 14px;
          line-height: 1.6;
          display: flex;
          gap: 12px;
        }

        .tl-pane {
          width: 440px;
          flex-shrink: 0;
          background: white;
          border-right: 1px solid ${T.border};
          display: flex;
          flex-direction: column;
          z-index: 10;
          box-shadow: 8px 0 30px rgba(0,0,0,.04);
        }
        .tl-header {
          padding: 32px 32px 20px;
          border-bottom: 1px solid ${T.border};
        }
        .tl-header h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 4px;
        }
        .tl-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: ${T.coral};
        }
        .tl-actions { display: flex; gap: 10px; margin-top: 16px; }
        .tl-btn {
          padding: 10px 20px;
          border-radius: 14px;
          border: none;
          font-family: inherit;
          font-weight: 700;
          font-size: 12px;
          cursor: pointer;
          transition: all .2s;
        }
        .tl-btn-primary { background: ${T.navy}; color: white; }
        .tl-btn-primary:hover { background: #1a1c2c; }
        .tl-btn-ghost { background: ${T.cream}; border: 1px solid ${T.border}; color: ${T.coral}; display:flex;align-items:center;gap:6px; }
        .tl-btn-ghost:hover { background: ${T.peach}; }
        .tl-feed {
          flex: 1;
          overflow-y: auto;
          padding: 0;
        }
        .tl-feed::-webkit-scrollbar { width: 4px; }
        .tl-feed::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
        .day-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 32px;
          background: ${T.cream};
          border-bottom: 1px solid ${T.border};
          cursor: pointer;
          user-select: none;
          position: sticky;
          top: 0;
          z-index: 5;
        }
        .day-header:hover { background: ${T.peach}; }
        .day-label {
          font-weight: 800; font-size: 11px;
          text-transform: uppercase; letter-spacing: 1.5px; color: ${T.coral};
        }
        .day-city {
          font-size: 11px; color: ${T.muted}; font-weight: 600;
          margin-left: auto; display: flex; align-items: center; gap: 4px;
        }
        .act-card {
          display: flex; gap: 16px; padding: 20px 32px;
          border-bottom: 1px solid ${T.border}; cursor: pointer;
          transition: background .15s; position: relative;
        }
        .act-card:hover { background: ${T.cream}; }
        .act-card.selected { background: ${T.peach}; border-left: 4px solid ${T.coral}; }
        .act-time-col { width: 52px; flex-shrink: 0; text-align: right; padding-top: 2px; }
        .act-time { font-size: 13px; font-weight: 800; color: ${T.navy}; }
        .act-dur { font-size: 10px; color: ${T.muted}; font-weight: 600; }
        .act-line { width: 2px; background: ${T.peach}; position: relative; flex-shrink: 0; }
        .act-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: ${T.coral}; border: 2px solid white;
          position: absolute; top: 4px; left: -4px;
          box-shadow: 0 0 0 3px ${T.peach};
        }
        .act-body { flex: 1; min-width: 0; }
        .act-title { font-weight: 700; font-size: 15px; margin-bottom: 2px; display: flex; align-items: center; gap: 8px; }
        .act-loc { font-size: 12px; color: ${T.muted}; display: flex; align-items: center; gap: 4px; }
        .act-cost {
          font-size: 11px; font-weight: 800; color: ${T.coral};
          background: ${T.peach}; padding: 3px 10px; border-radius: 8px;
          align-self: flex-start; flex-shrink: 0;
        }
        .travel-gap {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 32px 8px 116px; font-size: 10px; font-weight: 700;
          color: ${T.muted}; background: ${T.cream}; border-bottom: 1px solid ${T.border};
        }
        .detail-drawer { padding: 32px; background: ${T.cream}; border-top: 1px solid ${T.border}; }
        .detail-title { font-size: 20px; font-weight: 700; margin-bottom: 4px; }
        .detail-loc { font-size: 13px; color: ${T.muted}; display:flex;align-items:center;gap:6px; margin-bottom: 20px; }
        .ai-box {
          background: white; border: 1px solid ${T.border};
          border-radius: 20px; padding: 24px; margin-bottom: 16px;
        }
        .ai-label {
          font-size: 10px; font-weight: 800; color: ${T.coral};
          text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;
          display: flex; align-items: center; gap: 6px;
        }
        .ai-text { font-size: 14px; line-height: 1.65; color: ${T.navy}; }
        .metric-row { display: flex; gap: 12px; }
        .metric-chip { flex:1; padding:14px; border-radius:14px; display:flex; align-items:center; gap:10px; }
        .metric-chip.peach { background: ${T.peach}; }
        .metric-chip.white { background: white; border: 1px solid ${T.border}; }
        .metric-label { font-size: 9px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; }
        .metric-value { font-weight: 700; font-size: 14px; }
        .map-pane { flex: 1; position: relative; background: ${T.cream}; }
        .detail-empty {
          padding: 32px; text-align: center; color: ${T.muted}; font-size: 13px;
          border-top: 1px solid ${T.border};
        }
      `}} />

      <div className="prod-root">
        {/* LEFT: Timeline & Kit */}
        <section className="tl-pane">
          <header className="tl-header">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2>{data.tripName}</h2>
              <div className="act-cost">{data.budget}</div>
            </div>
            <div className="tl-badge"><Zap size={12} /> AI-Optimized Route</div>
            
            <div className="tab-switcher">
              <button 
                className={`tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
                onClick={() => setActiveTab('timeline')}
              >
                <Clock size={14} /> Timeline
              </button>
              <button 
                className={`tab-btn ${activeTab === 'kit' ? 'active' : ''}`}
                onClick={() => setActiveTab('kit')}
              >
                <Luggage size={14} /> Trip Kit
              </button>
            </div>
          </header>

          <div className="tl-feed">
            {activeTab === 'timeline' ? (
              grouped.map(([day, activities]) => (
                <div key={day}>
                  <div className="day-header" onClick={() => toggleDay(Number(day))}>
                    {expandedDays[Number(day)] ? <ChevronDown size={16} color={T.coral} /> : <ChevronRight size={16} color={T.coral} />}
                    <span className="day-label">Day {day}</span>
                    <span className="day-city"><MapPin size={12} /> {activities[0]?.location?.name?.split(',').pop()?.trim()}</span>
                  </div>

                  {expandedDays[Number(day)] && activities.map((act, idx) => (
                    <React.Fragment key={act.id}>
                      <div
                        className={`act-card ${selectedId === act.id ? 'selected' : ''}`}
                        onClick={() => handleSelect(act)}
                      >
                        <div className="act-time-col">
                          <div className="act-time">{dayjs(act.startTime).format('HH:mm')}</div>
                          <div className="act-dur">{act.duration}m</div>
                        </div>
                        <div className="act-line"><div className="act-dot" /></div>
                        <div className="act-body">
                          <div className="act-title">{typeIcon(act.type)} {act.title}</div>
                          <div className="act-loc"><MapPin size={12} /> {act.location.name}</div>
                        </div>
                        <div className="act-cost">{act.cost}</div>
                      </div>

                      {act.travelTimeToNext > 0 && idx < activities.length - 1 && (
                        <div className="travel-gap">
                          <Navigation size={12} color={T.coral} />
                          {act.travelTimeToNext} min · {act.distanceToNext}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ))
            ) : (
              <div className="kit-view">
                <div className="kit-section">
                  <h4><Sparkles size={14} /> AI Smart Suggestions</h4>
                  {data.suggestions?.map((s, i) => (
                    <div key={i} className="suggestion-box">
                      <div style={{ marginTop: 4 }}><Zap size={16} color={T.coral} /></div>
                      <div>{s}</div>
                    </div>
                  ))}
                </div>

                <div className="kit-section">
                  <h4><Luggage size={14} /> Recommended Packing List</h4>
                  <div className="kit-grid">
                    {data.packingList?.map((item, i) => (
                      <div key={i} className="kit-card">
                        <div className="kit-dot" /> {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="kit-section">
                  <h4><Compass size={14} /> Cinematic Story</h4>
                  <div className="ai-box" style={{ background: T.peach, border: 'none' }}>
                    <div className="ai-text" style={{ fontStyle: 'italic' }}>{data.story}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Detail Drawer (Only in Timeline Tab) */}
          <AnimatePresence mode="wait">
            {activeTab === 'timeline' && (
              selectedItem ? (
                <motion.div
                  key={selectedItem.id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="detail-drawer"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                    <div>
                      <div className="detail-title">{selectedItem.title}</div>
                      <div className="detail-loc"><MapPin size={14} color={T.coral} /> {selectedItem.location.name}</div>
                    </div>
                    <div className="act-cost" style={{ fontSize: '13px', padding: '8px 16px' }}>{selectedItem.cost}</div>
                  </div>
                  <div className="ai-box">
                    <div className="ai-label"><Sparkles size={12} /> Why This Order?</div>
                    <div className="ai-text">{selectedItem.aiReason}</div>
                  </div>
                  {selectedItem.travelTimeToNext > 0 && (
                    <div className="metric-row">
                      <div className="metric-chip peach">
                        <Navigation size={18} color={T.coral} />
                        <div>
                          <div className="metric-label" style={{ color: T.coral }}>Travel Time</div>
                          <div className="metric-value">{selectedItem.travelTimeToNext} min</div>
                        </div>
                      </div>
                      <div className="metric-chip white">
                        <Compass size={18} color={T.muted} />
                        <div>
                          <div className="metric-label" style={{ color: T.muted }}>Distance</div>
                          <div className="metric-value">{selectedItem.distanceToNext}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="detail-empty">
                  <Info size={20} style={{ marginBottom: 8, opacity: 0.4 }} />
                  <p>Select an activity above to view<br />AI optimization reasoning.</p>
                </div>
              )
            )}
          </AnimatePresence>
        </section>

        {/* RIGHT: Map */}
        <section className="map-pane">
          <PlannerMap
            itinerary={itinerary}
            center={data.center}
            selectedId={selectedId}
            onSelect={handleSelect}
          />
        </section>
      </div>
    </>
  );
}
