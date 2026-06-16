import React, { useState, useEffect } from 'react';
import { Users, Clock, MapPin, Store, Building2, ChevronRight, User, Sun, Moon, Smile, Briefcase } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { configs } from './data.js';
import './index.css';
import './App.css';

function App() {
  const { width, height } = useWindowSize();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [isFunMode, setIsFunMode] = useState(false);
  const toggleFunMode = () => setIsFunMode(!isFunMode);

  
  const audioRef = React.useRef(null);
  const kachingRef = React.useRef(null);
  const cricketRef = React.useRef(null);
  useEffect(() => {
    audioRef.current = new Audio('/fun_audio.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    kachingRef.current = new Audio('https://www.myinstants.com/media/sounds/cash-register-kaching.mp3');
    cricketRef.current = new Audio('https://www.myinstants.com/media/sounds/crickets.mp3');
  }, []);
  
  const playKaching = () => { if (isFunMode && kachingRef.current) { kachingRef.current.currentTime = 0; kachingRef.current.play(); } };
  const playCricket = () => { if (isFunMode && cricketRef.current) { cricketRef.current.currentTime = 0; cricketRef.current.play(); } };


  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isFunMode) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log('Audio error:', e));
    } else {
      audioRef.current.pause();
    }
  }, [isFunMode]);

  useEffect(() => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (isFunMode) {
      document.body.classList.add('fun-mode');
      if (favicon) favicon.href = "/logo_baothu.png";
      document.title = "Tiệm của các con báo";
    } else {
      document.body.classList.remove('fun-mode');
      if (favicon) favicon.href = "/logo.png";
      document.title = "Tiệm Hồng Trà Ngô Gia";
    }
  }, [isFunMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const currentConfig = isFunMode ? configs.fun : configs.serious;
  const team = currentConfig.team;

  const drawKite = (ctx) => {
    ctx.scale(1.2, 1.2);
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(8, 0);
    ctx.lineTo(0, 15);
    ctx.lineTo(-8, 0);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(0, 15);
    ctx.moveTo(-8, 0);
    ctx.lineTo(8, 0);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 15);
    ctx.lineTo(4, 22);
    ctx.lineTo(-4, 27);
    ctx.lineTo(2, 32);
    ctx.strokeStyle = ctx.fillStyle; 
    ctx.lineWidth = 1.5;
    ctx.stroke();
  };

  const totalInvestment = team.reduce((sum, member) => sum + member.investment, 0);

  const chartData = team
    .filter(member => member.investment > 0)
    .map(member => ({
      name: member.name,
      value: member.investment,
      role: member.role
    }));

  const COLORS = ['#0056b3', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percent = (data.value / totalInvestment * 100).toFixed(1);
      
      return (

        <div style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', color: 'var(--text-primary)', boxShadow: 'var(--glass-shadow-default)' }}>
          <p style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.25rem', color: 'var(--primary)' }}>{data.name}</p>
          <p style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>{data.role}</p>
          <p style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Cổ phần: {percent}%</p>
        </div>
      );
    }
    return null;
  };

  const stepIcons = [<MapPin size={24} />, <Store size={24} />, <Users size={24} />, <Clock size={24} />, <ChevronRight size={24} />];
  const locationIcons = [<MapPin className="info-icon" size={28} />, <Users className="info-icon" size={28} />, <Building2 className="info-icon" size={28} />];

  const drawMoney = (ctx) => {
    ctx.font = '24px serif';
    ctx.fillText('💸', 0, 0);
  };

  return (
    <div className="app-container">
      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-primary)',
          zIndex: 100,
          backdropFilter: 'var(--glass-blur)'
        }}
        title="Toggle Theme"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Fun Mode Toggle */}
      <button 
        onClick={toggleFunMode}
        style={{
          position: 'absolute',
          top: '20px',
          right: '75px',
          background: isFunMode ? 'var(--primary)' : 'var(--glass-bg)',
          border: '1px solid var(--glass-border)',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: isFunMode ? '#fff' : 'var(--text-primary)',
          zIndex: 100,
          backdropFilter: 'var(--glass-blur)',
          transition: 'all 0.3s ease'
        }}
        title="Toggle Fun Mode"
      >
        {isFunMode ? <Smile size={20} /> : <Briefcase size={20} />}
      </button>

      {/* Decorative Circles */}
      <div className="bg-circle bg-circle-1"></div>
      <div className="bg-circle bg-circle-2"></div>

      {/* Spectacular Confetti Effect */}
      {isFunMode && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 9999 }}>
          {isFunMode && <Confetti width={width} height={height} numberOfPieces={80} gravity={0.15} drawShape={drawMoney} recycle={true} />}
        </div>
      )}

      {/* Header Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
      >
        <img src={isFunMode ? "/logo_baothu.png" : "/logo.png"} alt="Logo" className="hero-logo" onError={(e) => e.target.style.display = 'none'} />
        <h1 className="section-title text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem', marginTop: '1rem' }}>
          {currentConfig.siteTitle}
        </h1>
        <p className="hero-subtitle">
          {currentConfig.subtitle}
        </p>
      </motion.section>

      {/* Team Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">{currentConfig.sectionTeam} <span className="text-gradient">{currentConfig.sectionTeamHighlight}</span></h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Chart Card */}
          <motion.div>
            <div className="glass-card chart-card" style={{ height: '400px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{currentConfig.chartTitle}</p>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                    isAnimationActive={true}
                    animationBegin={200}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ outline: 'none' }} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '20px' }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="team-grid" style={{ marginTop: '0' }}>
          {team.map((member, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
            >
              <div className="glass-card team-card" onClick={() => member.investment === 0 ? playCricket() : playKaching()} title={isFunMode ? member.funQuote : ''} style={{ cursor: isFunMode ? 'pointer' : 'default' }}>
                <div className="avatar-wrapper">
                  <User size={30} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  {member.investment > 0 ? (
                    <p style={{ marginTop: '0.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                      Cổ phần: {Number((member.investment / totalInvestment * 100).toFixed(1))}%
                    </p>
                  ) : (
                    <p style={{ marginTop: '0.5rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>
                      Không hùn vốn
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </motion.section>

      {/* Budget Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">{currentConfig.sectionBudget} <span className="text-gradient">{currentConfig.sectionBudgetHighlight}</span></h2>
        
        <div className="glass-card">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: 'var(--text-primary)' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--glass-border)' }}>
                  <th style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 'bold' }}>Hạng Mục</th>
                  <th style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 'bold', textAlign: 'right' }}>Số Tiền (VNĐ)</th>
                  <th style={{ padding: '1rem', color: 'var(--primary)', fontWeight: 'bold' }}>Ghi Chú</th>
                </tr>
              </thead>
              <tbody>
                {currentConfig.budgetItems.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '1rem' }}>{item.name}</td>
                    <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '500' }}>{item.amount.toLocaleString('vi-VN')}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.note}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th style={{ padding: '1rem', fontSize: '1.2rem', color: 'var(--primary)', fontWeight: 'bold' }}>Tổng Cộng</th>
                  <th style={{ padding: '1rem', fontSize: '1.2rem', color: 'var(--secondary)', fontWeight: 'bold', textAlign: 'right' }}>{currentConfig.budgetTotal.toLocaleString('vi-VN')}</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">{currentConfig.sectionTimeline} <span className="text-gradient">{currentConfig.sectionTimelineHighlight}</span></h2>
        <div className="timeline-container">
          {currentConfig.steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.5, type: 'spring' }}
            >
              <div className="timeline-dot"></div>
              <div className="glass-card timeline-content">
                <h3 className="timeline-title">{step.title}</h3>
                <p className="timeline-desc">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Location Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">{currentConfig.sectionLocation} <span className="text-gradient">{currentConfig.sectionLocationHighlight}</span></h2>
        
        <div className="location-grid">
          <div className="location-info">
            {currentConfig.locationItems.map((item, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
              >
                <div className="glass-card info-item">
                  {locationIcons[idx]}
                  <div className="info-text">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card map-container">
              <iframe 
                src="https://maps.google.com/maps?q=Ch%E1%BB%A3%20Thu%E1%BA%ADn%20%C4%90%E1%BA%A1o,%20B%E1%BA%BFn%20L%E1%BB%A9c&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Chợ Thuận Đạo Map"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </motion.section>
      
      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
        <p>{currentConfig.footerText}</p>
      </footer>
    </div>
  );
}

export default App;
