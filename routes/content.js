import express from 'express';
import { db } from '../data/db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/content
router.get('/', (req, res) => {
  try {
    const content = db.getContent();
    return res.json({ success: true, data: content });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch content' });
  }
});

// PUT /api/content (Admin only)
router.put('/', requireAdmin, (req, res) => {
  try {
    const updated = db.updateContent(req.body);
    return res.json({ success: true, message: 'Content updated successfully', data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update content' });
  }
});

export default router;
