import express from 'express';
import { db } from '../data/db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/orders (Admin only)
router.get('/', requireAdmin, (req, res) => {
  try {
    const orders = db.getOrders(req.query);
    return res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});

// GET /api/orders/:id (Customer order tracking / admin)
router.get('/:id', (req, res) => {
  try {
    const order = db.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    return res.json({ success: true, data: order });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Error retrieving order' });
  }
});

// POST /api/orders (Customer creates order)
router.post('/', (req, res) => {
  try {
    const { customer, items, total } = req.body;
    if (!customer || !customer.name || !customer.phone || !customer.address) {
      return res.status(400).json({ success: false, message: 'Name, phone number, and delivery address are required' });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Your shopping cart is empty' });
    }

    const newOrder = db.createOrder(req.body);

    // Format WhatsApp message text so customer or website can generate 1-click WhatsApp message
    const settings = db.getSettings();
    const itemLines = newOrder.items
      .map(i => `• ${i.name} (${i.size}, ${i.color}) x${i.quantity} = ₹${i.subtotal}`)
      .join('\n');
    
    const waText = encodeURIComponent(
      `🛍️ *NEW ORDER - HARITHANJALI BOUTIQUE*\n` +
      `*Order ID:* ${newOrder.orderNumber}\n\n` +
      `*Customer Details:*\n` +
      `Name: ${customer.name}\n` +
      `Phone: ${customer.phone}\n` +
      `Delivery Address: ${customer.address}, ${customer.city || 'Salem'}, ${customer.pincode || ''}\n\n` +
      `*Items Ordered:*\n` +
      `${itemLines}\n\n` +
      `*Total Amount:* ₹${newOrder.total}\n` +
      `*Payment Method:* ${newOrder.paymentMethod}\n\n` +
      `Please confirm my order. Thank you!`
    );

    const waLink = `https://wa.me/${settings.whatsappNumber}?text=${waText}`;

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: newOrder,
      whatsappLink: waLink
    });
  } catch (err) {
    console.error('Order creation error:', err.message);
    return res.status(400).json({ success: false, message: err.message || 'Failed to place order' });
  }
});

// PATCH /api/orders/:id/status (Admin updates status)
router.patch('/:id/status', requireAdmin, (req, res) => {
  try {
    const { orderStatus, paymentStatus, trackingNumber } = req.body;
    const updated = db.updateOrderStatus(req.params.id, {
      orderStatus,
      paymentStatus,
      trackingNumber
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    return res.json({ success: true, message: 'Order status updated', data: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Failed to update order' });
  }
});

export default router;
