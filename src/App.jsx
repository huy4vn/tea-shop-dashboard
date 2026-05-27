import React, { useState, useEffect } from 'react';
import { Users, Clock, MapPin, Store, Building2, ChevronRight, User, Sun, Moon } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './index.css';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const team = [
    { name: 'Chị Trân', role: 'Người đứng ra mở', investment: 250 },
    { name: 'Phúc & Huy', role: 'Em gái & chồng của Phúc', investment: 100 },
    { name: 'Phạm Quang (Sa)', role: 'Em của Mi', investment: 100 },
    { name: 'Chị Mi', role: 'Quản lý 1', investment: 50 },
    { name: 'Chị Phương', role: 'Quản lý 2', investment: 0 },
  ];

  const totalInvestment = team.reduce((sum, member) => sum + member.investment, 0);

  const chartData = team
    .filter(member => member.investment > 0)
    .map(member => ({
      name: member.name,
      value: member.investment
    }));

  const COLORS = ['#0056b3', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'];

  const steps = [
    {
      title: 'Chốt Khu Vực',
      desc: 'Đã tạm chốt khu vực với phía phát triển thị trường, nhằm mục đích khoanh vùng không cho người khác mở và tuyển dụng 2 nhân viên để đi học.',
      icon: <MapPin size={24} />
    },
    {
      title: 'Ký Hợp Đồng & Thanh Toán',
      desc: 'Sau khi đủ 4 người, gồm 2 quản lý và 2 nhân viên sẽ lên hợp đồng với công ty, thanh toán đợt 1 cho công ty (số tiền báo sau).',
      icon: <Store size={24} />
    },
    {
      title: 'Học Việc Chi Nhánh',
      desc: 'Chị Phương sẽ học tại chi nhánh Quận 5, và 3 người còn lại sẽ học tại chi nhánh Bến Lức.',
      icon: <Users size={24} />
    },
    {
      title: 'Thời Gian Học',
      desc: 'Dự kiến học trong khoảng từ 10 - 15 ngày (thời gian này sẽ có tính lương cho nhân viên và quản lý, tính như thế nào thì sẽ báo sau).',
      icon: <Clock size={24} />
    },
    {
      title: 'Setup & Bán Thử',
      desc: 'Sau khi 4 bạn tốt nghiệp và tìm được mặt bằng sẽ setup và bán thử.',
      icon: <ChevronRight size={24} />
    }
  ];

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

      {/* Decorative Circles */}
      <div className="bg-circle bg-circle-1"></div>
      <div className="bg-circle bg-circle-2"></div>

      {/* Header Section */}
      <section className="hero-section animate-fade-in">
        <img src="/logo.jpeg" alt="Hồng Trà Ngô Gia Logo" className="hero-logo" onError={(e) => e.target.style.display = 'none'} />
        <h1 className="section-title text-gradient" style={{ fontSize: '3.5rem', marginBottom: '1rem', marginTop: '1rem' }}>
          Tiệm Hồng Trà Ngô Gia
        </h1>
        <p className="hero-subtitle">
          Nơi cập nhật thông tin, tiến độ và chi phí nội bộ cho các cổ đông và thành viên mới.
        </p>
      </section>

      {/* Team Section */}
      <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="section-title">Thành Viên <span className="text-gradient">& Cổ Đông</span></h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Chart Card */}
          <div className="glass-card" style={{ height: '400px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.2rem' }}>Tỉ Lệ Cổ Phần Đầu Tư</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  labelLine={true}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}tr`, 'Góp vốn']} 
                  contentStyle={{ borderRadius: '8px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }} 
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="team-grid" style={{ marginTop: '0' }}>
          {team.map((member, idx) => (
            <div key={idx} className="glass-card team-card">
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
          ))}
        </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="section-title">Lịch Trình <span className="text-gradient">Dự Kiến</span></h2>
        <div className="timeline-container">
          {steps.map((step, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="glass-card timeline-content">
                <h3 className="timeline-title">{step.title}</h3>
                <p className="timeline-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Location Section */}
      <section className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <h2 className="section-title">Khảo Sát <span className="text-gradient">Mặt Bằng</span></h2>
        
        <div className="location-grid">
          <div className="location-info">
            <div className="glass-card info-item">
              <MapPin className="info-icon" size={28} />
              <div className="info-text">
                <h4>Vị trí khoanh vùng</h4>
                <p>Ngay Chợ Thuận Đạo, đối diện có khu CN Thuận Đạo và ChingLuh.</p>
              </div>
            </div>

            <div className="glass-card info-item">
              <Users className="info-icon" size={28} />
              <div className="info-text">
                <h4>Khu dân cư đông đúc</h4>
                <p>Khu vực dân cư tập trung đông, chợ kéo dài từ sáng tới đêm khuya.</p>
              </div>
            </div>

            <div className="glass-card info-item">
              <Building2 className="info-icon" size={28} />
              <div className="info-text">
                <h4>Khảo sát thực tế</h4>
                <p>Đã đi khảo sát lúc 19g và 21g. Sẽ tiếp tục đi khảo sát thêm ban ngày để có đánh giá chính xác nhất.</p>
              </div>
            </div>
          </div>

          <div className="glass-card map-container">
            <iframe 
              src="https://maps.google.com/maps?q=Ch%E1%BB%A3%20Thu%E1%BA%ADn%20%C4%90%E1%BA%A1o,%20B%E1%BA%BFn%20L%E1%BB%A9c&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Chợ Thuận Đạo Map"
            ></iframe>
          </div>
        </div>
      </section>
      
      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
        <p>© 2026 Tiệm Hồng Trà Ngô Gia. Nội bộ.</p>
      </footer>
    </div>
  );
}

export default App;
