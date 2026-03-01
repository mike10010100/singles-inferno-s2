import { useState, useEffect } from 'react';
import './App.css';
import { Flame, Palmtree, Lock, Info, RotateCcw, User, Heart } from 'lucide-react';

interface Contestant {
  id: number;
  name: string;
  gender: 'Male' | 'Female';
  imageUrl: string;
  status: 'Inferno' | 'Paradise';
  isLocked: boolean;
  notes: string;
}

const STORAGE_KEY = 'singles_inferno_s2_state';

const initialContestants: Contestant[] = [
  // Initial Women
  { id: 1, name: "Shin Seul-ki", gender: 'Female', imageUrl: "https://i.mydramalist.com/X2W6P_5f.jpg", status: 'Inferno', isLocked: false, notes: "" },
  { id: 2, name: "Park Se-jeong", gender: 'Female', imageUrl: "https://i.mydramalist.com/vB1kR_5f.jpg", status: 'Inferno', isLocked: false, notes: "" },
  { id: 3, name: "Lee Nadine", gender: 'Female', imageUrl: "https://i.mydramalist.com/pB2RE_5f.jpg", status: 'Inferno', isLocked: false, notes: "" },
  { id: 4, name: "Choi Seo-eun", gender: 'Female', imageUrl: "https://i.mydramalist.com/X2W4P_5f.jpg", status: 'Inferno', isLocked: false, notes: "" },
  { id: 5, name: "Lee So-e", gender: 'Female', imageUrl: "https://i.mydramalist.com/jBndV_5f.jpg", status: 'Inferno', isLocked: false, notes: "" },
  
  // Initial Men
  { id: 6, name: "Choi Jong-woo", gender: 'Male', imageUrl: "https://i.mydramalist.com/X2WxP_5f.jpg", status: 'Inferno', isLocked: false, notes: "" },
  { id: 7, name: "Jo Yoong-jae", gender: 'Male', imageUrl: "https://i.mydramalist.com/dBxR0_5f.jpg", status: 'Inferno', isLocked: false, notes: "" },
  { id: 8, name: "Kim Han-bin", gender: 'Male', imageUrl: "https://i.mydramalist.com/RB2RE_5f.jpg", status: 'Inferno', isLocked: false, notes: "" },
  { id: 9, name: "Shin Dong-woo", gender: 'Male', imageUrl: "https://i.mydramalist.com/qBndV_5f.jpg", status: 'Inferno', isLocked: false, notes: "" },

  // Late Comers (Locked)
  { id: 10, name: "??? (Male)", gender: 'Male', imageUrl: "https://placehold.co/400x600/1a1a1a/ffffff?text=LOCKED", status: 'Inferno', isLocked: true, notes: "Arrives later" },
  { id: 11, name: "??? (Female)", gender: 'Female', imageUrl: "https://placehold.co/400x600/1a1a1a/ffffff?text=LOCKED", status: 'Inferno', isLocked: true, notes: "Arrives later" },
  { id: 12, name: "??? (Male)", gender: 'Male', imageUrl: "https://placehold.co/400x600/1a1a1a/ffffff?text=LOCKED", status: 'Inferno', isLocked: true, notes: "Arrives later" },
];

function App() {
  const [contestants, setContestants] = useState<Contestant[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialContestants;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contestants));
  }, [contestants]);

  const toggleStatus = (id: number) => {
    setContestants(contestants.map(c => {
      if (c.id === id && !c.isLocked) {
        return { ...c, status: c.status === 'Inferno' ? 'Paradise' : 'Inferno' };
      }
      return c;
    }));
  };

  const updateNotes = (id: number, notes: string) => {
    setContestants(contestants.map(c => {
      if (c.id === id) return { ...c, notes };
      return c;
    }));
  };

  const resetAll = () => {
    if (window.confirm("Reset all statuses and notes?")) {
      setContestants(initialContestants);
    }
  };

  const inferno = contestants.filter(c => c.status === 'Inferno');
  const paradise = contestants.filter(c => c.status === 'Paradise');

  return (
    <div className="container">
      <header>
        <div className="title-group">
          <div className="eyebrow">Netflix Reality</div>
          <h1>Single's Inferno</h1>
          <div className="subtitle">Season 2 Tracker</div>
        </div>
        <div className="header-actions">
          <div className="stats">
            <div className="stat-pill inferno">
              <Flame size={16} /> {inferno.length}
            </div>
            <div className="stat-pill paradise">
              <Palmtree size={16} /> {paradise.length}
            </div>
          </div>
          <button className="reset-btn" onClick={resetAll} title="Reset Progress">
            <RotateCcw size={18} />
          </button>
        </div>
      </header>

      <div className="show-info">
        <Info size={16} />
        <p>Ages and occupations are hidden until contestants reach Paradise together.</p>
      </div>

      <main className="grid-container">
        <section className="location-section inferno-section">
          <h2 className="section-header">
            <Flame className="icon" /> Inferno <span>The Deserted Island</span>
          </h2>
          <div className="contestant-grid">
            {inferno.map(c => (
              <div key={c.id} className={`card ${c.isLocked ? 'locked' : ''} ${c.gender.toLowerCase()}`}>
                <div className="image-wrapper">
                  <img src={c.imageUrl} alt={c.name} />
                  {!c.isLocked && (
                    <button className="status-toggle" onClick={() => toggleStatus(c.id)}>
                      Go to Paradise <Palmtree size={14} />
                    </button>
                  )}
                  {c.isLocked && <div className="lock-overlay"><Lock size={32} /></div>}
                </div>
                <div className="card-content">
                  <div className="card-header">
                    <h3>{c.name}</h3>
                    {c.gender === 'Female' ? <Heart size={14} className="gender-icon female" /> : <User size={14} className="gender-icon male" />}
                  </div>
                  <textarea 
                    placeholder="Add notes..." 
                    value={c.notes}
                    onChange={(e) => updateNotes(c.id, e.target.value)}
                    disabled={c.isLocked}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="location-section paradise-section">
          <h2 className="section-header">
            <Palmtree className="icon" /> Paradise <span>The Luxury Hotel</span>
          </h2>
          {paradise.length === 0 ? (
            <div className="empty-state">No one is in Paradise yet.</div>
          ) : (
            <div className="contestant-grid">
              {paradise.map(c => (
                <div key={c.id} className={`card paradise-card ${c.gender.toLowerCase()}`}>
                  <div className="image-wrapper">
                    <img src={c.imageUrl} alt={c.name} />
                    <button className="status-toggle back" onClick={() => toggleStatus(c.id)}>
                      Back to Inferno <Flame size={14} />
                    </button>
                  </div>
                  <div className="card-content">
                    <div className="card-header">
                      <h3>{c.name}</h3>
                      {c.gender === 'Female' ? <Heart size={14} className="gender-icon female" /> : <User size={14} className="gender-icon male" />}
                    </div>
                    <textarea 
                      placeholder="Add notes (Age/Job/Feelings)..." 
                      value={c.notes}
                      onChange={(e) => updateNotes(c.id, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
