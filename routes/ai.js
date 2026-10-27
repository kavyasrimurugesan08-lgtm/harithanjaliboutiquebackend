import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

// Fallback intelligent boutique fashion stylist engine
function getRuleBasedResponse(message, products, categories, settings) {
  const query = (message || '').toLowerCase();
  let reply = '';
  let matchedProducts = [];
  let suggestions = [];

  // Occasion & Saree matching
  if (query.includes('reception') || query.includes('wedding') || query.includes('bridal') || query.includes('muhurtham')) {
    matchedProducts = products.filter(p => 
      p.category === 'sarees' || 
      p.category === 'lehengas' || 
      (p.name && (p.name.toLowerCase().includes('silk') || p.name.toLowerCase().includes('bridal') || p.name.toLowerCase().includes('kanjivaram')))
    ).slice(0, 3);

    reply = `For weddings and receptions, nothing compares to the majesty of authentic Kanjivaram and Banarasi pure silks! Our Salem boutique specializes in handpicked mulberry silks with tested gold zari borders. Pair them with rich contrast zardozi embroidery blouses for an unforgettable bridal look.`;
    suggestions = ['Matching blouse ideas', 'Designs under ₹10,000', 'Visit Salem Store', 'Order on WhatsApp'];
  }
  // Saree specific
  else if (query.includes('saree') || query.includes('silk') || query.includes('kanjivaram') || query.includes('banarasi')) {
    matchedProducts = products.filter(p => p.category === 'sarees').slice(0, 3);
    reply = `Our saree collection features handcrafted Kanjivaram silks, Banarasi brocades, and modern soft drape sarees sourced directly from master artisanal clusters. Each piece includes an unstitched blouse piece and comes with fabric purity assurance.`;
    suggestions = ['Bridal Sarees', 'Under ₹5,000', 'Custom Blouse Stitching', 'WhatsApp Video Shopping'];
  }
  // Kurtis & Tunics
  else if (query.includes('kurti') || query.includes('tunic') || query.includes('office') || query.includes('daily')) {
    matchedProducts = products.filter(p => p.category === 'kurtis').slice(0, 3);
    reply = `Looking for chic elegance? Our designer kurtis and tunics are tailored in premium chanderi, fine mulmul cotton, and silk blends. Perfect for office celebrations, festive pujas, and smart everyday wear.`;
    suggestions = ['Festive Kurtis', 'Co-ord Sets', 'Size Guide', 'Under ₹3,000'];
  }
  // Co-ords & Fusion
  else if (query.includes('co-ord') || query.includes('coord') || query.includes('fusion') || query.includes('western') || query.includes('jacket')) {
    matchedProducts = products.filter(p => p.category === 'coord-sets' || (p.name && p.name.toLowerCase().includes('co-ord'))).slice(0, 3);
    reply = `Co-ord sets are currently the hottest fashion trend in Salem! Our contemporary jacket sets and crop top palazzo ensembles blend traditional handlooms with modern tailored cuts.`;
    suggestions = ['View All Co-ords', 'Party Wear Lehengas', 'Check Sizes Available'];
  }
  // Lehengas
  else if (query.includes('lehenga') || query.includes('skirt') || query.includes('sangeet') || query.includes('engagement')) {
    matchedProducts = products.filter(p => p.category === 'lehengas').slice(0, 3);
    reply = `For Sangeet nights and grand receptions, our lehengas boast layered can-can flair, intricate thread embroidery, and ethereal organza dupattas. Custom fitting and blouse stitching can be tailored to your exact measurements!`;
    suggestions = ['Bridal Lehengas', 'WhatsApp Consultation', 'Salem Boutique Visit'];
  }
  // Budget / Price searches
  else if (query.includes('under') || query.includes('price') || query.includes('cheap') || query.includes('budget') || query.includes('cost') || query.includes('5000') || query.includes('3000')) {
    const maxBudget = query.includes('3000') ? 3000 : (query.includes('5000') ? 5000 : 8000);
    matchedProducts = products.filter(p => (p.salePrice || p.price) <= maxBudget).slice(0, 3);
    reply = `Here are our top-rated luxury designs within your budget. At Harithanjali, luxury and artisanal craftsmanship are always priced honestly without compromising on weave quality!`;
    suggestions = ['View Festive Sale', 'Designs under ₹3,000', 'New Arrivals'];
  }
  // Salem Store Location & Visiting
  else if (query.includes('store') || query.includes('salem') || query.includes('address') || query.includes('location') || query.includes('timing') || query.includes('visit') || query.includes('where')) {
    reply = `You are warmly welcome to visit our boutique store in Salem!\n\n📍 **Store Address:**\n${settings?.address || '2/32 Perumal Kovil Medu, Main Road, Seelanaickanpatti, Salem – 636201.'}\n\n⏰ **Timings:**\n${settings?.workingHours || 'Mon - Sat: 10:00 AM - 9:00 PM | Sun: 11:00 AM - 8:00 PM'}\n\n📞 **Phone:** ${settings?.phone || '8144052522'}`;
    suggestions = ['Directions to Store', 'WhatsApp Video Call', 'Explore Collections'];
  }
  // WhatsApp Orders & Custom Stitching
  else if (query.includes('whatsapp') || query.includes('contact') || query.includes('call') || query.includes('stitch') || query.includes('custom') || query.includes('tailor') || query.includes('blouse')) {
    reply = `We provide dedicated 1-on-1 styling and live WhatsApp video shopping! Our Salem master tailors also offer custom blouse stitching and size alterations before dispatch.\n\n📱 **WhatsApp Styling Desk:** +${settings?.whatsappNumber || '918144052522'}`;
    suggestions = ['Open WhatsApp Chat', 'Store Location', 'Browse Sarees'];
  }
  // Shipping, Delivery & Return
  else if (query.includes('shipping') || query.includes('delivery') || query.includes('cod') || query.includes('return') || query.includes('refund')) {
    reply = `✨ **Harithanjali Shipping & Delivery Guarantee:**\n\n• **Free Shipping:** On all pan-India orders above ₹${settings?.freeShippingThreshold || 1999} (flat ₹${settings?.shippingCharge || 100} for orders below).\n• **Dispatch Time:** Dispatched within 24–48 hours via insured express air couriers.\n• **Cash on Delivery (COD):** Available across India.\n• **Hassle-Free Returns:** 7-day exchange support for damaged or incorrect items.`;
    suggestions = ['Shop Now', 'WhatsApp Support', 'Store Location'];
  }
  // General greetings & Fallback
  else {
    matchedProducts = products.filter(p => p.isFeatured || p.isNewArrival).slice(0, 3);
    reply = `Vanakkam and welcome to Harithanjali Boutique, Salem! ✨ I'm Haritha, your personal AI fashion stylist. Whether you're looking for bridal Kanjivarams, festive kurtis, chic co-ord sets, or custom blouse guidance, I'm here to help you find your dream outfit.`;
    suggestions = ['Festive Silk Sarees', 'Designer Kurtis & Tunics', 'Salem Store Address', 'Designs under ₹5,000'];
  }

  return {
    reply,
    products: matchedProducts,
    suggestions
  };
}

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const products = (db.getProducts ? db.getProducts() : (db.getAllProducts ? db.getAllProducts() : [])) || [];
    const categories = (db.getCategories ? db.getCategories() : (db.getAllCategories ? db.getAllCategories() : [])) || [];
    const settings = (db.getSettings ? db.getSettings() : {}) || {};

    // Check if GEMINI_API_KEY is available
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (apiKey) {
      try {
        const productSummary = products.slice(0, 20).map(p => 
          `• ID: ${p.id}, Name: "${p.name}", Category: ${p.category}, Price: ₹${p.salePrice || p.price}, Fabric: ${p.fabric || 'Premium'}`
        ).join('\n');

        const systemInstruction = `You are "Haritha AI", the royal fashion stylist and personal shopping assistant for Harithanjali Boutique located in Seelanaickanpatti, Salem, Tamil Nadu.
Store information:
- Address: 2/32 Perumal Kovil Medu, Main Road, Seelanaickanpatti, Salem – 636201.
- Phone/WhatsApp: +91 8144052522
- Working Hours: Mon - Sat: 10:00 AM - 9:00 PM | Sunday: 11:00 AM - 8:00 PM
- Free Pan-India express shipping on orders over ₹1999.
- Specialties: Handcrafted Kanjivaram & Banarasi pure silk sarees, designer anarkalis, luxury kurtis, and contemporary trendy co-ord sets with custom blouse tailoring support.

Available Featured Products:
${productSummary}

Rules:
- Be warm, welcoming, polite, and deeply knowledgeable about Indian ethnic fashion, silk fabrics, color matching, and festival occasions.
- When recommending items, mention specific product names from the list above.
- Offer styling tips (e.g. contrast blouse combinations, jewelry pairings).
- Keep answers engaging, elegant, and concise.`;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const payload = {
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemInstruction}\n\nCustomer Message: "${message}"` }]
            }
          ]
        };

        const response = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const data = await response.json();
          const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            // Find products matching the query or keywords
            const q = message.toLowerCase();
            const matchedProducts = products.filter(p => 
              q.includes(p.category) || 
              p.name.toLowerCase().split(' ').some(w => w.length > 3 && q.includes(w))
            ).slice(0, 3);

            return res.json({
              success: true,
              reply: candidateText,
              products: matchedProducts.length > 0 ? matchedProducts : products.slice(0, 2),
              suggestions: ['Explore Sarees', 'Salem Store Address', 'Chat on WhatsApp', 'Designs under ₹5,000']
            });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling back to rule engine:', geminiErr.message);
      }
    }

    // Default intelligent rule-based stylist engine
    const result = getRuleBasedResponse(message, products, categories, settings);
    return res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('AI chat endpoint error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process AI chat message.',
      reply: 'I am temporarily experiencing a moment of quiet. Please feel free to reach out directly to our Salem boutique desk via WhatsApp at +91 8144052522!'
    });
  }
});

export default router;
