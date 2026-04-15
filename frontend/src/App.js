import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';

const Navigation = () => {
    const { user, logout } = useAuth();

    return (
        <nav style={styles.nav}>
            <div style={styles.navContainer}>
                <div style={styles.logo}>
                    <span style={styles.logoIcon}>🔐</span>
                    <h2 style={styles.logoText}>Auth<span style={styles.logoHighlight}>System</span></h2>
                </div>
                <ul style={styles.navLinks}>
                    <li><Link to="/dashboard" style={styles.navLink}>Dashboard</Link></li>
                    {user?.role === 'admin' && (
                        <li><Link to="/admin" style={styles.navLink}>Admin Panel</Link></li>
                    )}
                    {!user ? (
                        <>
                            <li><Link to="/login" style={styles.navLink}>Login</Link></li>
                            <li><Link to="/register" style={styles.navLink}>Register</Link></li>
                        </>
                    ) : (
                        <li><button onClick={logout} style={styles.logoutBtn}>Logout</button></li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

function AppContent() {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <ProtectedRoute requiredRole="admin">
                        <AdminPanel />
                    </ProtectedRoute>
                } />
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

const styles = {
    nav: {
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: 'white',
        padding: '15px 0',
        boxShadow: '0 2px 20px rgba(0,0,0,0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    navContainer: {
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 30px',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    logoIcon: {
        fontSize: '28px',
    },
    logoText: {
        margin: 0,
        fontSize: '24px',
        fontWeight: '700',
        color: 'white',
    },
    logoHighlight: {
        color: '#667eea',
    },
    navLinks: {
        display: 'flex',
        listStyle: 'none',
        gap: '25px',
        alignItems: 'center',
        margin: 0,
        padding: 0,
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: '500',
        padding: '8px 16px',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        display: 'inline-block',
    },
    logoutBtn: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '8px 20px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
};

// Add hover effects
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    a:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
    }
    
    button:hover {
        background: #c82333 !important;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(styleSheet);

export default App;