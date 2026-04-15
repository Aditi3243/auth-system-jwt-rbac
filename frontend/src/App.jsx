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
                <h2 style={styles.logo}>Auth System</h2>
                <ul style={styles.navLinks}>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    {user?.role === 'admin' && (
                        <li><Link to="/admin">Admin Panel</Link></li>
                    )}
                    {!user ? (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
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
        backgroundColor: '#333',
        color: 'white',
        padding: '10px 0'
    },
    navContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px'
    },
    logo: {
        margin: 0
    },
    navLinks: {
        display: 'flex',
        listStyle: 'none',
        gap: '20px',
        alignItems: 'center'
    },
    logoutBtn: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default App;