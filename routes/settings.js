import express from 'express';
import { db } from '../data/db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/settings
router.get('/', (req, res) => {
  try {
    const settings = db.getSettings();
    return res.json({ success: true, data: settings });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch settings' });
  }
});

// PUT /api/settings (Admin only)
router.put('/', requireAdmin, (req, res) => {
  try {
    const updated = db.updateSettings(req.body);
    return res.json({ success: true, message: 'Settings updated successfully', data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
});

// GET /api/settings/stats (Admin Dashboard stats)
router.get('/stats', requireAdmin, (req, res) => {
  try {
    const stats = db.getDashboardStats();
    return res.json({ success: true, data: stats });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
});

export default router;
