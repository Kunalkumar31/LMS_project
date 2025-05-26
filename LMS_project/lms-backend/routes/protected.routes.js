const express = require('express');
const router = express.Router();
const { verifyJWT, requireRole } = require("../middlewares/authMiddleware");


// General protected route (any authenticated user)
router.get('/protected', verifyJWT, (req, res) => {
  res.json({ message: 'This is protected content', user: req.user });
});

// Role-based protected routes
router.get('/admin-only', verifyJWT, requireRole('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

router.get('/instructor-only', verifyJWT, requireRole('instructor'), (req, res) => {
  res.json({ message: 'Welcome Instructor!' });
});

router.get('/student-only', verifyJWT, requireRole('student'), (req, res) => {
  res.json({ message: 'Welcome Student!' });
});

module.exports = router;
