import express from 'express';
import { db } from '../data/db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/products
router.get('/', (req, res) => {
  try {
    const products = db.getProducts(req.query);
    return res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    console.error('Error fetching products:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  try {
    const product = db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.json({ success: true, data: product });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error retrieving product' });
  }
});

// POST /api/products (Admin only)
router.post('/', requireAdmin, (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ success: false, message: 'Name and price are required' });
    }

    const newProduct = db.createProduct(req.body);
    return res.status(201).json({ success: true, message: 'Product created successfully', data: newProduct });
  } catch (err) {
    console.error('Error creating product:', err);
    return res.status(500).json({ success: false, message: 'Failed to create product' });
  }
});

// PUT /api/products/:id (Admin only)
router.put('/:id', requireAdmin, (req, res) => {
  try {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.json({ success: true, message: 'Product updated successfully', data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update product' });
  }
});

// DELETE /api/products/:id (Admin only)
router.delete('/:id', requireAdmin, (req, res) => {
  try {
    const deleted = db.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.json({ success: true, message: 'Product deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to delete product' });
  }
});

// PATCH /api/products/:id/stock (Admin quick stock adjustment)
router.patch('/:id/stock', requireAdmin, (req, res) => {
  try {
    const { stock } = req.body;
    if (stock === undefined || isNaN(Number(stock))) {
      return res.status(400).json({ success: false, message: 'Valid stock number is required' });
    }

    const updated = db.updateProduct(req.params.id, { stock: Math.max(0, Number(stock)) });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    return res.json({ success: true, message: 'Stock updated', data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update stock' });
  }
});

export default router;
