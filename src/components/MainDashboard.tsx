import React, { useState } from 'react';
import { LogOut, Calendar, Megaphone, Trophy, Star, ChevronLeft, ExternalLink, Medal, Award, ChevronRight, Play, LayoutGrid, Heart } from 'lucide-react';
import Card from './Card';
import { motion, AnimatePresence } from 'framer-motion';
import type { UserData, EventData, AnnouncementData, HouseData, ShoutoutData, CampusEvent } from '../types';

interface MainDashboardProps {
  user: UserData | null;
  events: EventData[];
  campusEvents: CampusEvent[];
  announcements: AnnouncementData[];
  houses: HouseData[];
  maxPoints: number;
  shoutouts: ShoutoutData[];
  activeSection: string | null;
  setActiveSection: (section: string | null) => void;
  onLogout: () => void;
  onLikeShoutout: (id: string) => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({ 
  user, events, campusEvents, announcements, houses, maxPoints, shoutouts, activeSection, setActiveSection, onLogout, onLikeShoutout 
}) => {

  const [selectedHouse, setSelectedHouse] = useState<HouseData | null>(null);
  const [eventFilter, setEventFilter] = useState<'live' | 'upcoming' | 'past'>('live');

  const renderCircularMeter = (points: number, max: number, isTop: boolean) => {
    const percentage = max > 0 ? (points / max) * 100 : 0;
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div style={{ position: 'relative', width: '90px', height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="90" height="90">
          <circle cx="45" cy="45" r={radius} fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <motion.circle 
            cx="45" cy="45" r={radius} fill="transparent" 
            stroke={isTop ? 'var(--accent-neon)' : 'rgba(255,255,255,0.3)'} strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        </svg>
        <div style={{ position: 'absolute', fontSize: '0.9rem', fontWeight: 'bold' }}>{Math.round(percentage)}%</div>
      </div>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'events':
        return (
          <div className="fade-in">
            <h2 className="text-2xl mb-6 flex items-center gap-2">
              <Calendar className="text-neon" /> Open Applications
            </h2>
            <div className="grid-dashboard">
              {events.map((event, i) => (
                <Card 
                  key={i}
                  title={event.title || "No Title"}
                  icon={<Calendar size={24} />}
                  description={`Organized by: ${event.club || "Unknown Club"}`}
                >
                  <div style={{ marginTop: '1rem', width: '100%' }}>
                    <p className="text-xs mb-3" style={{ color: 'var(--text-secondary)' }}>Deadline: {event.deadline || "TBA"}</p>
                    <a href={event.formLink} target="_blank" rel="noreferrer" className="btn-neon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textDecoration: 'none', width: '100%', fontSize: '0.9rem' }}>
                      Apply Now <ExternalLink size={14} />
                    </a>
                  </div>
                </Card>
              ))}
              {events.length === 0 && <p>No applications found.</p>}
            </div>
          </div>
        );

      case 'campus-events':
        const filteredCampusEvents = campusEvents.filter(e => e.status === eventFilter);
        return (
          <div className="fade-in">
            <h2 className="text-2xl mb-6 flex items-center gap-2">
              <LayoutGrid className="text-neon" /> Campus Events
            </h2>
            
            <div className="flex gap-4 mb-8">
              {(['live', 'upcoming', 'past'] as const).map((status) => (
                <button 
                  key={status}
                  onClick={() => setEventFilter(status)}
                  className={`btn-outline flex items-center gap-2 ${eventFilter === status ? 'border-neon text-neon' : ''}`}
                  style={{ 
                    borderColor: eventFilter === status ? 'var(--accent-neon)' : 'var(--card-border)',
                    color: eventFilter === status ? 'var(--accent-neon)' : 'var(--text-secondary)',
                    textTransform: 'capitalize'
                  }}
                >
                   {status}
                </button>
              ))}
            </div>

            <div className="grid-dashboard">
              {filteredCampusEvents.map((event, i) => (
                <Card 
                  key={i}
                  title={event.title}
                  icon={event.status === 'live' ? <Play className="text-neon" size={24} /> : <Calendar size={24} />}
                  description={event.club}
                >
                   <div style={{ marginTop: '1rem', width: '100%', textAlign: 'left' }}>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Date: {event.date}</p>
                      {event.location && <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Location: {event.location}</p>}
                      <p className="text-xs mt-3 italic" style={{ color: 'rgba(255,255,255,0.5)' }}>{event.description}</p>
                      {event.winner && (
                        <div className="mt-4 p-3 glass" style={{ borderColor: 'var(--accent-neon)', borderStyle: 'solid', borderWidth: '1px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Medal size={16} className="text-neon" />
                          <div style={{ fontSize: '0.8rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Winner: </span>
                            <span style={{ color: 'var(--accent-neon)', fontWeight: 'bold' }}>{event.winner}</span>
                          </div>
                        </div>
                      )}
                   </div>
                </Card>
              ))}
              {filteredCampusEvents.length === 0 && <p style={{ color: 'var(--text-secondary)' }}>No {eventFilter} events found.</p>}
            </div>
          </div>
        );

      case 'announcements':
        return (
          <div className="fade-in">
            <h2 className="text-2xl mb-6 flex items-center gap-2">
              <Megaphone className="text-neon" /> Announcements
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {announcements.map((ann, i) => (
                <Card 
                   key={i} title={ann.title} icon={<Megaphone size={24} />} description={ann.content} 
                   style={{ textAlign: 'left', alignItems: 'flex-start' }}
                />
              ))}
            </div>
          </div>
        );

      case 'houses':
        if (selectedHouse) {
          const appVictories = events.filter(e => e.winnerHouse === selectedHouse.name);
          const campusVictories = campusEvents.filter(e => e.winner === selectedHouse.name);
          return (
            <div className="fade-in">
              <button onClick={() => setSelectedHouse(null)} className="btn-outline mb-6 flex items-center gap-2">
                <ChevronLeft size={18} /> Back to Leaderboard
              </button>
              <div className="glass p-8 mb-8 flex items-center gap-8">
                {renderCircularMeter(selectedHouse.points || 0, maxPoints, true)}
                <div>
                  <h2 className="text-3xl mb-2">{selectedHouse.name} House</h2>
                  <p style={{ color: 'var(--accent-neon)', fontSize: '1.2rem', fontWeight: 'bold' }}>{selectedHouse.points || 0} Total Points</p>
                </div>
              </div>
              <h3 className="text-xl mb-4 flex items-center gap-2"><Trophy size={20} className="text-neon" /> House Victories</h3>
              <div className="grid-dashboard">
                {appVictories.map((event, i) => (
                  <Card key={`app-${i}`} title={event.title} icon={<Award size={24} />} description="Application-based Win" />
                ))}
                {campusVictories.map((event, i) => (
                  <Card key={`camp-${i}`} title={event.title} icon={<Medal size={24} />} description={`Campus Event: ${event.club}`} />
                ))}
              </div>
            </div>
          );
        }

        return (
          <div className="fade-in">
            <h2 className="text-2xl mb-6 flex items-center gap-2"><Trophy className="text-neon" /> House Competitions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {houses.map((house, i) => {
                const isTop = i === 0;
                return (
                  <div key={i} className="glass p-4 cursor-pointer glass-hover flex items-center justify-between" onClick={() => setSelectedHouse(house)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: isTop ? 'var(--gradient-neon)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: isTop ? 'white' : 'var(--text-secondary)' }}>
                        {isTop ? <Medal size={24} /> : i + 1}
                      </div>
                      <h3 className="text-xl">{house.name}</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                      {renderCircularMeter(house.points || 0, maxPoints, isTop)}
                      <ChevronRight size={20} style={{ color: 'rgba(255,255,255,0.2)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'shoutouts':
        return (
          <div className="fade-in">
            <h2 className="text-2xl mb-6 flex items-center gap-2"><Star className="text-neon" /> Student Shoutouts</h2>
            <div className="grid-dashboard">
              {shoutouts.map((shout, i) => (
                <Card 
                  key={i} 
                  title={shout.student} 
                  icon={<Star size={24} />} 
                  description={`In: ${shout.event}`}
                >
                  <p className="italic text-sm mt-3" style={{ color: 'var(--text-secondary)' }}>"{shout.message}"</p>
                  <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{shout.likes || 0} Reactions</div>
                    <button 
                      onClick={() => shout.id && onLikeShoutout(shout.id)}
                      className="btn-outline" 
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <Heart size={12} className={shout.likes ? "text-neon" : ""} /> React
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="grid-dashboard">
            <Card title="Applications" icon={<Calendar size={32} />} count={events.length} description="Join activities" onClick={() => setActiveSection('events')} />
            <Card title="Events" icon={<LayoutGrid size={32} />} count={campusEvents.length} description="Live tracking" onClick={() => setActiveSection('campus-events')} />
            <Card title="Announcements" icon={<Megaphone size={32} />} count={announcements.length} description="Latest updates" onClick={() => setActiveSection('announcements')} />
            <Card title="Leaderboard" icon={<Trophy size={32} />} count={houses.length} description="House stats" onClick={() => setActiveSection('houses')} />
            <Card title="Shoutouts" icon={<Star size={32} />} count={shoutouts.length} description="Top achievers" onClick={() => setActiveSection('shoutouts')} />
          </div>
        );
    }
  };

  return (
    <div className="container">
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div onClick={() => setActiveSection(null)} style={{ cursor: 'pointer' }}>
          <h1 className="text-3xl">Campus <span style={{ color: 'var(--accent-neon)' }}>Pulse</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Welcome, {user?.name || "Student"}</p>
        </div>
        <button onClick={onLogout} className="btn-outline flex items-center gap-2">
          <LogOut size={18} /> Logout
        </button>
      </nav>
      <AnimatePresence mode="wait">
        <motion.div key={activeSection || 'dashboard'} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
          {activeSection && (
             <button onClick={() => { setActiveSection(null); setSelectedHouse(null); }} className="btn-outline mb-6 flex items-center gap-2">
                <ChevronLeft size={18} /> Back
             </button>
          )}
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MainDashboard;
