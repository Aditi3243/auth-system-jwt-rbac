import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/protected/dashboard');
            setDashboardData(res.data);
        } catch (err) {
            console.error('Error fetching dashboard:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <nav style={styles.navbar}>
                <div style={styles.navContent}>
                    <div style={styles.logo}>
                        <span style={styles.logoIcon}>🔐</span>
                        <span style={styles.logoText}>Auth<span style={styles.logoHighlight}>System</span></span>
                    </div>
                    
                    <div style={styles.navRight}>
                        <div style={styles.userInfo}>
                            <div style={styles.userAvatar} onClick={() => setShowDropdown(!showDropdown)}>
                                <span style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase()}</span>
                            </div>
                            <div style={styles.userDetails}>
                                <span style={styles.userName}>{user?.name}</span>
                                <span style={styles.userRole}>{user?.role === 'admin' ? 'Administrator' : 'Member'}</span>
                            </div>
                        </div>
                        
                        {showDropdown && (
                            <div style={styles.dropdown}>
                                <button onClick={handleLogout} style={styles.dropdownItem}>
                                    <span>🚪</span> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div style={styles.mainContent}>
                <div style={styles.welcomeSection}>
                    <h1 style={styles.welcomeTitle}>
                        Welcome back, <span style={styles.userHighlight}>{user?.name}</span>!
                    </h1>
                    <p style={styles.welcomeSubtitle}>
                        Here's what's happening with your account today.
                    </p>
                </div>

                {/* Stats Cards */}
                <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <div style={styles.statIcon}>📊</div>
                        <div style={styles.statInfo}>
                            <h3 style={styles.statValue}>1</h3>
                            <p style={styles.statLabel}>Active Session</p>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.statIcon}>🔑</div>
                        <div style={styles.statInfo}>
                            <h3 style={styles.statValue}>JWT</h3>
                            <p style={styles.statLabel}>Authenticated</p>
                        </div>
                    </div>
                    <div style={styles.statCard}>
                        <div style={styles.statIcon}>🛡️</div>
                        <div style={styles.statInfo}>
                            <h3 style={styles.statValue}>{user?.role === 'admin' ? 'Admin' : 'User'}</h3>
                            <p style={styles.statLabel}>Access Level</p>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div style={styles.twoColumn}>
                    {/* Profile Section */}
                    <div style={styles.profileCard}>
                        <div style={styles.cardHeader}>
                            <span style={styles.cardIcon}>👤</span>
                            <h3 style={styles.cardTitle}>Profile Information</h3>
                        </div>
                        <div style={styles.profileInfo}>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>Full Name:</span>
                                <span style={styles.infoValue}>{user?.name}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>Email Address:</span>
                                <span style={styles.infoValue}>{user?.email}</span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>Account Type:</span>
                                <span style={user?.role === 'admin' ? styles.adminBadge : styles.userBadge}>
                                    {user?.role === 'admin' ? 'Administrator' : 'Regular User'}
                                </span>
                            </div>
                            <div style={styles.infoRow}>
                                <span style={styles.infoLabel}>User ID:</span>
                                <span style={styles.infoValue}>{user?.id?.slice(-8)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Activity Section */}
                    <div style={styles.activityCard}>
                        <div style={styles.cardHeader}>
                            <span style={styles.cardIcon}>📈</span>
                            <h3 style={styles.cardTitle}>Recent Activity</h3>
                        </div>
                        <div style={styles.activityList}>
                            <div style={styles.activityItem}>
                                <div style={styles.activityIcon}>✅</div>
                                <div style={styles.activityContent}>
                                    <p style={styles.activityText}>Successfully logged in</p>
                                    <span style={styles.activityTime}>Just now</span>
                                </div>
                            </div>
                            <div style={styles.activityItem}>
                                <div style={styles.activityIcon}>🔐</div>
                                <div style={styles.activityContent}>
                                    <p style={styles.activityText}>JWT token verified</p>
                                    <span style={styles.activityTime}>Current session</span>
                                </div>
                            </div>
                            <div style={styles.activityItem}>
                                <div style={styles.activityIcon}>🛡️</div>
                                <div style={styles.activityContent}>
                                    <p style={styles.activityText}>Protected route accessed</p>
                                    <span style={styles.activityTime}>Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div style={styles.securityCard}>
                    <div style={styles.cardHeader}>
                        <span style={styles.cardIcon}>🔒</span>
                        <h3 style={styles.cardTitle}>Security Status</h3>
                    </div>
                    <div style={styles.securityGrid}>
                        <div style={styles.securityItem}>
                            <div style={styles.securityIcon}>✅</div>
                            <div>
                                <p style={styles.securityText}>Authentication Method</p>
                                <small style={styles.securitySubtext}>JWT Token Based</small>
                            </div>
                        </div>
                        <div style={styles.securityItem}>
                            <div style={styles.securityIcon}>🔐</div>
                            <div>
                                <p style={styles.securityText}>Encryption</p>
                                <small style={styles.securitySubtext}>BCrypt + JWT</small>
                            </div>
                        </div>
                        <div style={styles.securityItem}>
                            <div style={styles.securityIcon}>🛡️</div>
                            <div>
                                <p style={styles.securityText}>Session Type</p>
                                <small style={styles.securitySubtext}>Stateless</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* API Status */}
                {dashboardData && (
                    <div style={styles.apiCard}>
                        <div style={styles.cardHeader}>
                            <span style={styles.cardIcon}>🌐</span>
                            <h3 style={styles.cardTitle}>API Response</h3>
                        </div>
                        <pre style={styles.apiResponse}>
                            {JSON.stringify(dashboardData, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    navbar: {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    navContent: {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        fontSize: '24px',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    logoHighlight: {
        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    navRight: {
        position: 'relative',
    },
    userInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer',
    },
    userAvatar: {
        width: '45px',
        height: '45px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
    },
    avatarText: {
        color: 'white',
        fontSize: '20px',
        fontWeight: '600',
    },
    userDetails: {
        display: 'flex',
        flexDirection: 'column',
    },
    userName: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#333',
    },
    userRole: {
        fontSize: '12px',
        color: '#667eea',
        fontWeight: '500',
    },
    dropdown: {
        position: 'absolute',
        top: '60px',
        right: '0',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
        overflow: 'hidden',
        minWidth: '150px',
        animation: 'fadeIn 0.2s ease-out',
    },
    dropdownItem: {
        width: '100%',
        padding: '12px 20px',
        border: 'none',
        background: 'white',
        textAlign: 'left',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'background 0.2s ease',
    },
    mainContent: {
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 30px',
    },
    welcomeSection: {
        marginBottom: '40px',
        animation: 'fadeIn 0.5s ease-out',
    },
    welcomeTitle: {
        fontSize: '36px',
        color: 'white',
        marginBottom: '10px',
    },
    userHighlight: {
        background: 'rgba(255, 255, 255, 0.2)',
        padding: '5px 15px',
        borderRadius: '50px',
        display: 'inline-block',
    },
    welcomeSubtitle: {
        fontSize: '18px',
        color: 'rgba(255, 255, 255, 0.9)',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '25px',
        marginBottom: '40px',
    },
    statCard: {
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        padding: '25px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    statIcon: {
        fontSize: '48px',
    },
    statInfo: {
        flex: 1,
    },
    statValue: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#667eea',
        marginBottom: '5px',
    },
    statLabel: {
        fontSize: '14px',
        color: '#666',
    },
    twoColumn: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
        gap: '30px',
        marginBottom: '40px',
    },
    profileCard: {
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        padding: '25px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
    activityCard: {
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        padding: '25px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '20px',
        paddingBottom: '15px',
        borderBottom: '2px solid #f0f0f0',
    },
    cardIcon: {
        fontSize: '24px',
    },
    cardTitle: {
        fontSize: '20px',
        fontWeight: '600',
        color: '#333',
    },
    profileInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    infoRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        borderBottom: '1px solid #f0f0f0',
    },
    infoLabel: {
        fontSize: '14px',
        color: '#666',
        fontWeight: '500',
    },
    infoValue: {
        fontSize: '14px',
        color: '#333',
        fontWeight: '500',
    },
    adminBadge: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
    },
    userBadge: {
        background: '#e1e5e9',
        color: '#666',
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
    },
    activityList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    activityItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '10px',
        borderRadius: '12px',
        background: '#f8f9fa',
        transition: 'transform 0.2s ease',
    },
    activityIcon: {
        fontSize: '24px',
    },
    activityContent: {
        flex: 1,
    },
    activityText: {
        fontSize: '14px',
        color: '#333',
        marginBottom: '4px',
    },
    activityTime: {
        fontSize: '11px',
        color: '#999',
    },
    securityCard: {
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        padding: '25px',
        marginBottom: '40px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
    securityGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
    },
    securityItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        padding: '15px',
        borderRadius: '12px',
        background: '#f8f9fa',
    },
    securityIcon: {
        fontSize: '28px',
    },
    securityText: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '4px',
    },
    securitySubtext: {
        fontSize: '12px',
        color: '#999',
    },
    apiCard: {
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        padding: '25px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
    apiResponse: {
        background: '#2d3748',
        color: '#e2e8f0',
        padding: '20px',
        borderRadius: '12px',
        overflowX: 'auto',
        fontSize: '13px',
        fontFamily: 'monospace',
    },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .stat-card:hover, .profile-card:hover, .activity-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0,0,0,0.15);
    }
    
    button:hover {
        background: #f0f0f0;
    }
    
    .user-avatar:hover {
        transform: scale(1.05);
    }
    
    .activity-item:hover {
        transform: translateX(5px);
    }
`;
document.head.appendChild(styleSheet);

export default Dashboard;