import express from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../data/db.js';
import { generateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const envEmail = (process.env.ADMIN_EMAIL || 'admin@harithanjali.com').trim().toLowerCase();
    const envPassword = (process.env.ADMIN_PASSWORD || 'admin123').trim();
    const envName = process.env.ADMIN_NAME || 'Harithanjali Admin';

    const inputEmail = email.trim().toLowerCase();
    let isMatch = false;
    let user = db.getUserByEmail(inputEmail);

    // Check against .env credentials
    if (inputEmail === envEmail && password === envPassword) {
      isMatch = true;
      if (!user) {
        user = {
          id: 'usr_admin_1',
          name: envName,
          email: envEmail,
          role: 'admin'
        };
      }
    } else if (user && user.passwordHash) {
      // Check against stored password hash
      isMatch = bcrypt.compareSync(password, user.passwordHash);
    }

    if (!isMatch || !user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user);

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name || envName,
        email: user.email,
        role: user.role || 'admin'
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Server error during login' });
  }
});

// GET /api/auth/me
router.get('/me', requireAdmin, (req, res) => {
  return res.json({
    success: true,
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});

export default router;
