const router = require('express').Router();
const auth = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');

// Protected route - any authenticated user
router.get('/dashboard', auth, (req, res) => {
    res.json({ 
        message: 'Welcome to dashboard!',
        user: req.user
    });
});

// Admin only route
router.get('/admin', auth, checkRole('admin'), (req, res) => {
    res.json({ 
        message: 'Welcome Admin! You have full access.',
        adminData: {
            users: 42,
            posts: 128,
            reports: 7
        }
    });
});

// User profile route
router.get('/profile', auth, (req, res) => {
    res.json({
        message: 'Your profile data',
        user: req.user
    });
});

module.exports = router;