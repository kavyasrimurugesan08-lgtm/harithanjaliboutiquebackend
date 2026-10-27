import express from 'express';
import { db } from '../data/db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/categories
router.get('/', (req, res) => {
  try {
    const categories = db.getCategories();
    return res.json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch categories' });
  }
});

// POST /api/categories (Admin only)
router.post('/', requireAdmin, (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Category name is required' });
    }
    const newCat = db.createCategory(req.body);
    return res.status(201).json({ success: true, message: 'Category created', data: newCat });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to create category' });
  }
});

// PUT /api/categories/:id (Admin only)
router.put('/:id', requireAdmin, (req, res) => {
  try {
    const updated = db.updateCategory(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    return res.json({ success: true, message: 'Category updated', data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update category' });
  }
});

// DELETE /api/categories/:id (Admin only)
router.delete('/:id', requireAdmin, (req, res) => {
  try {
    const deleted = db.deleteCategory(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    return res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
});

export default router;
