import { HashRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import User from './pages/User';
import Post from './pages/Post';
import './App.css';

function App() {
  return (
    <HashRouter>
      <header className="app-header">
        <div className="header-container">
          <div className="brand">
            <span className="brand-logo">📊</span>
            <span className="brand-name">FX Portal</span>
          </div>
          <nav className="app-nav">
            <NavLink 
              to="/users" 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              Users
            </NavLink>
            <NavLink 
              to="/posts" 
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              Posts
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<User />} />
          <Route path="/posts" element={<Post />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>© 2026 FX Portal. Built with React & JSONPlaceholder.</p>
      </footer>
    </HashRouter>
  );
}

export default App;
