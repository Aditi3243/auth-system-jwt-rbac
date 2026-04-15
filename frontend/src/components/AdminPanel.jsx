import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
    const { user } = useAuth();
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/protected/admin');
            setAdminData(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Access denied');
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return (
            <div style={styles.errorContainer}>
                <div style={styles.errorCard}>
                    <span style={styles.errorIcon}>⚠️</span>
                    <h2>Access Denied</h2>
                    <p>{error}</p>
                    <p>You don't have permission to view this page.</p>
                    <a href="/dashboard" style={styles.backButton}>Back to Dashboard</a>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>
                    <span style={styles.titleIcon}>👑</span>
                    Admin Dashboard
                </h1>
                <p style={styles.subtitle}>Welcome back, {user?.name}! Here's your admin overview.</p>
            </div>

            {loading ? (
                <div style={styles.loading}>Loading admin data...</div>
            ) : (
                <>
                    <div style={styles.statsGrid}>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>👥</div>
                            <div>
                                <h3 style={styles.statNumber}>{adminData?.adminData?.users}</h3>
                                <p style={styles.statLabel}>Total Users</p>
                            </div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>📝</div>
                            <div>
                                <h3 style={styles.statNumber}>{adminData?.adminData?.posts}</h3>
                                <p style={styles.statLabel}>Total Posts</p>
                            </div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>📊</div>
                            <div>
                                <h3 style={styles.statNumber}>{adminData?.adminData?.reports}</h3>
                                <p style={styles.statLabel}>Active Reports</p>
                            </div>
                        </div>
                    </div>

                    <div style={styles.actionsGrid}>
                        <h3 style={styles.sectionTitle}>Admin Actions</h3>
                        <div style={styles.actionButtons}>
                            <button style={styles.actionBtn}>
                                <span>👥</span> Manage Users
                            </button>
                            <button style={styles.actionBtn}>
                                <span>📝</span> View All Posts
                            </button>
                            <button style={styles.actionBtn}>
                                <span>⚙️</span> System Settings
                            </button>
                            <button style={styles.actionBtn}>
                                <span>📈</span> Generate Report
                            </button>
                        </div>
                    </div>

                    <div style={styles.messageCard}>
                        <p style={styles.messageText}>
                            ✅ {adminData?.message}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
        color: 'white',
    },
    title: {
        fontSize: '36px',
        marginBottom: '10px',
    },
    titleIcon: {
        marginRight: '10px',
    },
    subtitle: {
        fontSize: '18px',
        opacity: 0.9,
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
    },
    statIcon: {
        fontSize: '48px',
    },
    statNumber: {
        fontSize: '32px',
        fontWeight: '700',
        color: '#667eea',
        marginBottom: '5px',
    },
    statLabel: {
        fontSize: '14px',
        color: '#666',
    },
    actionsGrid: {
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        padding: '25px',
        marginBottom: '40px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
    sectionTitle: {
        fontSize: '20px',
        marginBottom: '20px',
        color: '#333',
    },
    actionButtons: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '15px',
    },
    actionBtn: {
        padding: '12px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        border: 'none',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: 'center',
        transition: 'transform 0.2s ease',
    },
    messageCard: {
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    },
    messageText: {
        fontSize: '16px',
        color: '#28a745',
        fontWeight: '500',
    },
    errorContainer: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorCard: {
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '40px',
        textAlign: 'center',
        maxWidth: '400px',
    },
    errorIcon: {
        fontSize: '64px',
        display: 'block',
        marginBottom: '20px',
    },
    backButton: {
        display: 'inline-block',
        marginTop: '20px',
        padding: '10px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
    },
    loading: {
        textAlign: 'center',
        color: 'white',
        fontSize: '20px',
        padding: '50px',
    },
};

export default AdminPanel;