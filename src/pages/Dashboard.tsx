import { useState, useEffect, useMemo, useCallback } from 'react';
import { db, auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { collection, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MainDashboard from '../components/MainDashboard';
import type { EventData, AnnouncementData, HouseData, ShoutoutData, CampusEvent } from '../types';

const Dashboard = () => {
  const { user, userProfile, loading: authLoading } = useAuth();
  const [dataLoading, setDataLoading] = useState(true);
  const [events, setEvents] = useState<EventData[]>([]);
  const [campusEvents, setCampusEvents] = useState<CampusEvent[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
  const [houses, setHouses] = useState<HouseData[]>([]);
  const [shoutouts, setShoutouts] = useState<ShoutoutData[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login", { replace: true });
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const [evSnap, campEvSnap, annSnap, houseSnap, shoutSnap] = await Promise.all([
          getDocs(collection(db, "events")),
          getDocs(collection(db, "campus_events")),
          getDocs(collection(db, "announcements")),
          getDocs(collection(db, "houses")),
          getDocs(collection(db, "shoutouts"))
        ]);

        setEvents(evSnap.docs.map(d => ({ id: d.id, ...d.data() } as EventData)));
        setCampusEvents(campEvSnap.docs.map(d => ({ id: d.id, ...d.data() } as CampusEvent)));
        setAnnouncements(annSnap.docs.map(d => ({ id: d.id, ...d.data() } as AnnouncementData)));
        setHouses(houseSnap.docs.map(d => ({ id: d.id, ...d.data() } as HouseData)));
        setShoutouts(shoutSnap.docs.map(d => ({ id: d.id, ...d.data() } as ShoutoutData)));

      } catch (error) {
        console.error("Dashboard: Error fetching data", error);
      } finally {
        setDataLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Optimization: useMemo for expensive data operations (Advanced concepts)
  const sortedHouses = useMemo(() => {
    return [...houses].sort((a, b) => (b.points || 0) - (a.points || 0));
  }, [houses]);

  const maxPoints = useMemo(() => {
    return sortedHouses.length > 0 ? Math.max(...sortedHouses.map(h => h.points || 0)) : 1;
  }, [sortedHouses]);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }, [navigate]);

  // Interactive CRUD: Update a shoutout like count (Demonstrates atomic updates)
  const handleLikeShoutout = async (shoutoutId: string) => {
    try {
      const shoutRef = doc(db, "shoutouts", shoutoutId);
      await updateDoc(shoutRef, {
        likes: increment(1)
      });
      
      // Optimistic update
      setShoutouts(prev => prev.map(s => 
        s.id === shoutoutId ? { ...s, likes: (s.likes || 0) + 1 } : s
      ));
    } catch (error) {
      console.error("Error liking shoutout:", error);
    }
  };

  if (authLoading || dataLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050505' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="btn-neon" style={{ display: 'inline-block', width: '40px', height: '40px', borderRadius: '50%', marginBottom: '1rem', animation: 'pulse 1.5s infinite' }}></div>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <MainDashboard 
      user={userProfile}
      events={events}
      campusEvents={campusEvents}
      announcements={announcements}
      houses={sortedHouses}
      maxPoints={maxPoints}
      shoutouts={shoutouts}
      activeSection={activeSection}
      setActiveSection={setActiveSection}
      onLogout={handleLogout}
      onLikeShoutout={handleLikeShoutout}
    />
  );
};

export default Dashboard;
