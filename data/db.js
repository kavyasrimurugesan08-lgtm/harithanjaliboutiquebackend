import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.json');

// Ensure data folder exists
if (!fs.existsSync(__dirname)) {
  fs.mkdirSync(__dirname, { recursive: true });
}

// Initial seed data generator with 100% unique, distinct images
function getInitialData() {
  const salt = bcrypt.genSaltSync(10);
  const adminPasswordHash = bcrypt.hashSync('admin123', salt);

  return {
    users: [
      {
        id: 'usr_admin_1',
        email: 'admin@harithanjali.com',
        name: 'Harithanjali Admin',
        role: 'admin',
        passwordHash: adminPasswordHash,
        createdAt: new Date().toISOString()
      }
    ],
    settings: {
      storeName: 'Harithanjali Boutique',
      tagline: 'Trendy Collections for Every You.',
      currency: '₹',
      currencyCode: 'INR',
      shippingCharge: 100,
      freeShippingThreshold: 1999,
      taxRate: 0,
      phone: '8144052522',
      email: 'contact@harithanjaliboutique.com',
      address: '2/32 Perumal Kovil Medu, Main Road, Seelanaickanpatti, Salem – 636201.',
      workingHours: 'Mon - Sat: 10:00 AM - 9:00 PM | Sunday: 11:00 AM - 8:00 PM',
      whatsappNumber: '918144052522',
      instagramHandle: '@_harithanjali_boutique',
      instagramUrl: 'https://instagram.com/_harithanjali_boutique',
      youtubeName: 'Harithanjali Boutique',
      facebookName: 'Harithanjali Boutique',
      allowOnlinePayment: false,
      allowWhatsAppOrders: true,
      allowCodOrders: true
    },
    content: {
      announcement: {
        enabled: true,
        text: '✨ Grand Festive Collection Now Live! Free Shipping on orders above ₹1999 | Direct WhatsApp Orders Available!'
      },
      hero: {
        badge: 'ROYAL HERITAGE & MODERN LUXURY',
        title: 'Trendy Collections for Every You',
        subtitle: 'Experience Salem’s finest destination for handcrafted sarees, royal anarkalis, designer kurtis, and contemporary ethnic fusion.',
        ctaText: 'Explore Collection',
        ctaLink: '/shop',
        secondaryCtaText: 'New Arrivals',
        secondaryCtaLink: '/shop?new=true',
        imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=80'
      },
      promoBanner: {
        tag: 'EXCLUSIVE SALEM BOUTIQUE OFFER',
        title: 'Celebrations In Regal Purple & Gold',
        subtitle: 'Indulge in pure mulberry silks, intricate zardozi embroidery, and handcrafted designer co-ords tailored to your perfection.',
        discountCode: 'HARITHA10',
        discountText: 'Use code HARITHA10 for 10% off your first festive purchase',
        imageUrl: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=80'
      },
      about: {
        title: 'Crafted with Passion, Rooted in Salem',
        lead: 'Harithanjali Boutique is more than just a fashion destination; it is a celebration of womanhood, style, and bespoke craftsmanship.',
        story: 'Founded with a vision to bring high-fashion ethnic aesthetics and contemporary trendy silhouettes under one roof in Salem, Harithanjali Boutique curates exclusive collections that empower women to embrace their unique elegance. From festive weddings to chic daily wear, each garment is handpicked for exceptional fabric quality, intricate needlework, and flattering cuts.',
        highlights: [
          'Handpicked Pure Silk & Artisanal Weaves',
          'Custom Sizing & Tailoring Support on WhatsApp',
          'Exclusive Limited-Edition Seasonal Releases',
          'Fast & Insured Pan-India Express Delivery'
        ],
        imageUrl: 'https://assets.myntassets.com/h_1440,q_75,w_1080/v1/assets/images/2026/JULY/18/Mgulr2uY_5c6ac82c469d4fe1a6796a62ae2c2b81.jpg'
      }
    },
    categories: [
      {
        id: 'cat_sarees',
        name: 'Festive & Silk Sarees',
        slug: 'sarees',
        description: 'Traditional Kanjivaram, Banarasi, and contemporary designer drape sarees with rich borders.',
        imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
        featured: true
      },
      {
        id: 'cat_anarkalis',
        name: 'Royal Anarkalis & Gowns',
        slug: 'anarkalis',
        description: 'Floor-length flared silhouettes with delicate zardozi, mirrorwork, and georgette flare.',
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
        featured: true
      },
      {
        id: 'cat_kurtis',
        name: 'Designer Kurtis & Tunics',
        slug: 'kurtis',
        description: 'Everyday chic and office-ready handcrafted cotton, chanderi, and silk kurtis.',
        imageUrl: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=600&q=80',
        featured: true
      },
      {
        id: 'cat_coords',
        name: 'Trendy Co-ord Sets',
        slug: 'coord-sets',
        description: 'Modern fusion silhouettes featuring chic jacket sets, crop tops, and palazzo pairings.',
        imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80',
        featured: true
      },
      {
        id: 'cat_lehengas',
        name: 'Bridal & Party Lehengas',
        slug: 'lehengas',
        description: 'Heavily embroidered royal skirts paired with designer blouses and organza dupattas.',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        featured: true
      },
      {
        id: 'cat_dupattas',
        name: 'Handcrafted Dupattas',
        slug: 'dupattas',
        description: 'Statement banarasi, kalamkari, and phulkari dupattas to elevate any ensemble.',
        imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
        featured: false
      }
    ],
    products: [
      /* ==================== SAREES ONLY (Totally Unique, Distinct High-Resolution Saree Images) ==================== */
      {
        id: 'prod_1',
        name: 'Royal Amethyst Kanjivaram Pure Silk Saree',
        slug: 'royal-amethyst-kanjivaram-silk-saree',
        sku: 'HB-SAR-001',
        category: 'sarees',
        price: 8999,
        salePrice: 6999,
        stock: 8,
        description: 'An ethereal deep purple Kanjivaram pure silk saree woven with radiant golden zari floral jaal and contrasting temple border. Accompanied by a matching unstitched designer blouse piece.',
        fabric: 'Pure Mulberry Silk with Tested Zari',
        careInstructions: 'Dry Clean Only. Store in breathable muslin cloth.',
        images: [
          'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['Free Size (Includes Blouse)'],
        colors: ['Deep Purple', 'Burgundy Wine', 'Royal Violet'],
        isFeatured: true,
        isNewArrival: true,
        status: 'published',
        rating: 4.9,
        reviewsCount: 24,
        createdAt: '2026-10-25T10:00:00.000Z'
      },
      {
        id: 'prod_2',
        name: 'Crimson Scarlet Banarasi Brocade Bridal Saree',
        slug: 'crimson-scarlet-banarasi-brocade-saree',
        sku: 'HB-SAR-002',
        category: 'sarees',
        price: 11999,
        salePrice: 8999,
        stock: 6,
        description: 'Spectacular vermilion scarlet red Banarasi bridal saree adorned with intricate gold kadhwa floral weaving, scalloped zari pallu, and heavy brocade designer blouse piece.',
        fabric: 'Pure Banarasi Katan Silk',
        careInstructions: 'Dry Clean Recommended. Do not spray perfume directly on zari.',
        images: [
          'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['Free Size (Includes Blouse)'],
        colors: ['Crimson Red', 'Sindoor Scarlet', 'Maroon'],
        isFeatured: true,
        isNewArrival: true,
        status: 'published',
        rating: 5.0,
        reviewsCount: 18,
        createdAt: '2026-10-24T14:00:00.000Z'
      },
      {
        id: 'prod_3',
        name: 'Golden Ochre Chanderi Tissue Festive Saree',
        slug: 'golden-ochre-chanderi-tissue-saree',
        sku: 'HB-SAR-003',
        category: 'sarees',
        price: 6499,
        salePrice: 4799,
        stock: 10,
        description: 'Lustrous festive saree woven in golden ochre tissue silk, enriched with fine meenakari floral buttas, heritage border, and light tasseled pallu for celebratory perfection.',
        fabric: 'Handwoven Chanderi Tissue Silk',
        careInstructions: 'Dry clean only.',
        images: [
          'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['Free Size (Includes Blouse)'],
        colors: ['Golden Ochre', 'Mustard Yellow', 'Honey Gold'],
        isFeatured: true,
        isNewArrival: true,
        status: 'published',
        rating: 4.8,
        reviewsCount: 15,
        createdAt: '2026-10-23T11:00:00.000Z'
      },
      {
        id: 'prod_4',
        name: 'Peacock Royal Blue Temple Border Kanchipuram Saree',
        slug: 'peacock-royal-blue-kanchipuram-saree',
        sku: 'HB-SAR-004',
        category: 'sarees',
        price: 9499,
        salePrice: 7499,
        stock: 5,
        description: 'Regal peacock royal blue pure silk saree with traditional Korvai temple spires woven along the broad zari border and an elaborate grand pallu. Salem boutique favorite.',
        fabric: 'Pure Kanchipuram Silk with Gold Zari',
        careInstructions: 'Dry Clean Only.',
        images: [
          'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['Free Size (Includes Blouse)'],
        colors: ['Royal Cobalt Blue', 'Peacock Teal', 'Indigo'],
        isFeatured: true,
        isNewArrival: true,
        status: 'published',
        rating: 4.9,
        reviewsCount: 22,
        createdAt: '2026-10-22T09:30:00.000Z'
      },
      {
        id: 'prod_5',
        name: 'Ivory Pearl Embroidered Organza Saree',
        slug: 'ivory-pearl-embroidered-organza-saree',
        sku: 'HB-SAR-005',
        category: 'sarees',
        price: 6499,
        salePrice: 4999,
        stock: 7,
        description: 'Delicate sheer ivory organza saree with hand-stitched faux pearl borders, cutwork pallu, and subtle pastel floral threadwork. Comes with raw silk unstitched blouse fabric.',
        fabric: 'Pure Sheer Organza Silk',
        careInstructions: 'Dry Clean Only.',
        images: [
          'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['Free Size (Includes Blouse)'],
        colors: ['Ivory White', 'Off White', 'Champagne Pearl'],
        isFeatured: true,
        isNewArrival: true,
        status: 'published',
        rating: 4.9,
        reviewsCount: 16,
        createdAt: '2026-10-21T15:20:00.000Z'
      },
      {
        id: 'prod_6',
        name: 'Emerald Green Zari Butta Paithani Silk Saree',
        slug: 'emerald-green-zari-butta-paithani-saree',
        sku: 'HB-SAR-006',
        category: 'sarees',
        price: 8499,
        salePrice: 6299,
        stock: 6,
        description: 'Deep royal emerald green silk saree highlighted with shimmering zari peacock buttas, classic kaleidoscopic muniya border, and rich pallu. Ideal for weddings and temple festivals.',
        fabric: 'Artisanal Paithani Pure Silk',
        careInstructions: 'Dry clean only.',
        images: [
          'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['Free Size (Includes Blouse)'],
        colors: ['Emerald Green', 'Forest Green', 'Bottle Green'],
        isFeatured: false,
        isNewArrival: true,
        status: 'published',
        rating: 4.8,
        reviewsCount: 11,
        createdAt: '2026-10-20T12:00:00.000Z'
      },
      {
        id: 'prod_7',
        name: 'Pastel Lilac Embroidered Net & Satin Saree',
        slug: 'pastel-lilac-embroidered-saree',
        sku: 'HB-SAR-007',
        category: 'sarees',
        price: 5499,
        salePrice: 3999,
        stock: 9,
        description: 'Modern cocktail drape in graceful pastel lilac soft net paired with satin borders, micro-sequins, and a pre-draped contemporary lookbook appeal.',
        fabric: 'Soft Net & Satin Blend',
        careInstructions: 'Dry Clean Only.',
        images: [
          'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['Free Size (Includes Blouse)'],
        colors: ['Pastel Lilac', 'Soft Lavender', 'Mauve'],
        isFeatured: false,
        isNewArrival: false,
        status: 'published',
        rating: 4.7,
        reviewsCount: 9,
        createdAt: '2026-10-19T08:30:00.000Z'
      },
      {
        id: 'prod_8',
        name: 'Blush Rose Gold Shimmer Draped Party Saree',
        slug: 'blush-rose-gold-shimmer-saree',
        sku: 'HB-SAR-008',
        category: 'sarees',
        price: 6999,
        salePrice: 5199,
        stock: 7,
        description: 'Ethereal rose gold metallic thread saree with feather-light fall, shimmering drape, and modern designer blouse piece. Handcrafted for evening galas and sangeet.',
        fabric: 'Metallic Shimmer Tissue Georgette',
        careInstructions: 'Dry clean only.',
        images: [
          'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['Free Size (Includes Blouse)'],
        colors: ['Rose Gold', 'Blush Pink', 'Champagne'],
        isFeatured: false,
        isNewArrival: false,
        status: 'published',
        rating: 4.9,
        reviewsCount: 14,
        createdAt: '2026-10-18T14:10:00.000Z'
      },

      /* ==================== OTHER ETHNIC WEAR PIECES (Each with Totally Unique Images) ==================== */
      {
        id: 'prod_9',
        name: 'Lavender Bloom Embroidered Georgette Anarkali',
        slug: 'lavender-bloom-georgette-anarkali',
        sku: 'HB-ANA-009',
        category: 'anarkalis',
        price: 4599,
        salePrice: 3499,
        stock: 12,
        description: 'Stunning pastel lavender floor-length anarkali suit set with delicate tonal sequin embroidery, pearl work on the neckline, matching pants, and a scalloped organza dupatta.',
        fabric: 'Pure Micro Georgette & Shantoon Lining',
        careInstructions: 'Dry Clean Only.',
        images: [
          'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Soft Lavender', 'Lilac Frost', 'Powder Pink'],
        isFeatured: true,
        isNewArrival: true,
        status: 'published',
        rating: 4.8,
        reviewsCount: 19,
        createdAt: '2026-10-25T11:30:00.000Z'
      },
      {
        id: 'prod_10',
        name: 'Sunlit Ochre Yellow Chanderi Silk Kurti Set',
        slug: 'sunlit-ochre-yellow-chanderi-kurti-set',
        sku: 'HB-KUR-010',
        category: 'kurtis',
        price: 2899,
        salePrice: 2199,
        stock: 15,
        description: 'Vibrant mustard yellow straight-fit kurti crafted from lustrous Chanderi silk with gota patti detailing around the yoke. Paired with comfortable cigarette trousers and dupatta.',
        fabric: 'Chanderi Silk with Cotton Voile Lining',
        careInstructions: 'Hand wash separately with mild liquid detergent or Dry Clean.',
        images: [
          'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Mustard Yellow', 'Marigold', 'Sunshine Gold'],
        isFeatured: true,
        isNewArrival: true,
        status: 'published',
        rating: 4.7,
        reviewsCount: 31,
        createdAt: '2026-10-24T09:15:00.000Z'
      },
      {
        id: 'prod_11',
        name: 'Midnight Cobalt Silk Fusion Co-ord Set',
        slug: 'midnight-cobalt-silk-fusion-coord-set',
        sku: 'HB-CRD-011',
        category: 'coord-sets',
        price: 3899,
        salePrice: 2999,
        stock: 9,
        description: 'A striking modern ethnic 2-piece ensemble featuring an asymmetrical high-low tunic with zari sleeve cuffs, paired with tailored flared palazzo pants.',
        fabric: 'Raw Silk Blend',
        careInstructions: 'Gentle dry clean recommended.',
        images: [
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: ['Royal Cobalt Blue', 'Sapphire', 'Indigo'],
        isFeatured: true,
        isNewArrival: true,
        status: 'published',
        rating: 4.9,
        reviewsCount: 14,
        createdAt: '2026-10-23T14:40:00.000Z'
      },
      {
        id: 'prod_12',
        name: 'Crimson Velvet Heritage Bridal Lehenga',
        slug: 'crimson-velvet-heritage-bridal-lehenga',
        sku: 'HB-LEH-012',
        category: 'lehengas',
        price: 18999,
        salePrice: 14999,
        stock: 4,
        description: 'A showstopper bridal lehenga in deep crimson royal micro-velvet, embellished with golden zardozi, hand-cut dabka, and shimmering sequins with dual dupattas.',
        fabric: 'Heavy Micro Velvet with Canvas & Can-can',
        careInstructions: 'Specialist Dry Clean Only.',
        images: [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['Semi-Stitched (Fits XS to XXL)'],
        colors: ['Crimson Red', 'Royal Maroon', 'Ruby Red'],
        isFeatured: true,
        isNewArrival: true,
        status: 'published',
        rating: 5.0,
        reviewsCount: 11,
        createdAt: '2026-10-22T08:00:00.000Z'
      },
      {
        id: 'prod_13',
        name: 'Sunset Tangerine Handloom Chanderi Dupatta',
        slug: 'sunset-tangerine-handloom-chanderi-dupatta',
        sku: 'HB-DUP-013',
        category: 'dupattas',
        price: 1599,
        salePrice: 1199,
        stock: 20,
        description: 'Exquisite lightweight Chanderi dupatta highlighted with shimmering gold zari borders and hand-tied tassels. Transforms any plain kurti or suit into an enchanting festive look.',
        fabric: 'Handloom Chanderi Cotton Silk (2.5 meters)',
        careInstructions: 'Dry Clean or Gentle Cold Water Wash.',
        images: [
          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['Free Size (2.5m)'],
        colors: ['Tangerine Orange', 'Flame Coral', 'Amber'],
        isFeatured: false,
        isNewArrival: true,
        status: 'published',
        rating: 4.6,
        reviewsCount: 8,
        createdAt: '2026-10-21T16:00:00.000Z'
      },
      {
        id: 'prod_14',
        name: 'Plum Purple Peplum Chinon Sharara Ensemble',
        slug: 'plum-purple-peplum-sharara-ensemble',
        sku: 'HB-SHA-014',
        category: 'anarkalis',
        price: 5299,
        salePrice: 3999,
        stock: 7,
        description: 'Flattering short peplum top adorned with mirrorwork along the neckline, paired with voluminous multi-tiered flared sharara pants and a net dupatta with mirror lace.',
        fabric: 'Heavy Chinon Silk',
        careInstructions: 'Dry clean only.',
        images: [
          'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Plum Purple', 'Mulberry', 'Wine'],
        isFeatured: false,
        isNewArrival: true,
        status: 'published',
        rating: 4.8,
        reviewsCount: 12,
        createdAt: '2026-10-20T10:00:00.000Z'
      }
    ],
    orders: []
  };
}

class Database {
  constructor() {
    this.data = null;
    this.init();
  }

  init() {
    try {
      if (!fs.existsSync(DB_FILE)) {
        const initial = getInitialData();
        fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
        this.data = initial;
      } else {
        const content = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(content);
      }
    } catch (err) {
      console.error('Error initializing database:', err);
      this.data = getInitialData();
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('Failed to persist database:', err);
      return false;
    }
  }

  resetWithNewImages() {
    const initial = getInitialData();
    this.data = initial;
    this.save();
    return this.data;
  }

  // Users
  getUserByEmail(email) {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id) {
    return this.data.users.find(u => u.id === id);
  }

  // Products
  getProducts(filters = {}) {
    let list = [...this.data.products];

    if (filters.category && filters.category !== 'all') {
      list = list.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q))
      );
    }

    if (filters.minPrice !== undefined && !isNaN(Number(filters.minPrice))) {
      list = list.filter(p => (p.salePrice || p.price) >= Number(filters.minPrice));
    }

    if (filters.maxPrice !== undefined && !isNaN(Number(filters.maxPrice))) {
      list = list.filter(p => (p.salePrice || p.price) <= Number(filters.maxPrice));
    }

    if (filters.size) {
      list = list.filter(p => p.sizes && p.sizes.includes(filters.size));
    }

    if (filters.color) {
      list = list.filter(p => p.colors && p.colors.some(c => c.toLowerCase().includes(filters.color.toLowerCase())));
    }

    if (filters.featured === 'true' || filters.featured === true) {
      list = list.filter(p => p.isFeatured);
    }

    if (filters.newArrival === 'true' || filters.newArrival === true) {
      list = list.filter(p => p.isNewArrival);
    }

    if (filters.inStock === 'true' || filters.inStock === true) {
      list = list.filter(p => p.stock > 0);
    }

    if (filters.status) {
      list = list.filter(p => p.status === filters.status);
    }

    // Sorting
    if (filters.sort === 'price-low') {
      list.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (filters.sort === 'price-high') {
      list.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (filters.sort === 'newest') {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sort === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }

  getProductById(id) {
    return this.data.products.find(p => p.id === id || p.slug === id);
  }

  createProduct(productData) {
    const id = 'prod_' + Date.now();
    const slug = (productData.name || 'product')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newProduct = {
      id,
      slug: productData.slug || slug,
      name: productData.name,
      sku: productData.sku || `HB-${Math.floor(1000 + Math.random() * 9000)}`,
      category: productData.category || 'sarees',
      price: Number(productData.price) || 0,
      salePrice: productData.salePrice ? Number(productData.salePrice) : null,
      stock: Number(productData.stock) || 0,
      description: productData.description || '',
      fabric: productData.fabric || 'Premium Quality',
      careInstructions: productData.careInstructions || 'Dry Clean Recommended',
      images: Array.isArray(productData.images) && productData.images.length > 0
        ? productData.images
        : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'],
      sizes: Array.isArray(productData.sizes) ? productData.sizes : ['Free Size'],
      colors: Array.isArray(productData.colors) ? productData.colors : ['Purple'],
      isFeatured: !!productData.isFeatured,
      isNewArrival: !!productData.isNewArrival,
      status: productData.status || 'published',
      rating: 5.0,
      reviewsCount: 1,
      createdAt: new Date().toISOString()
    };

    this.data.products.unshift(newProduct);
    this.save();
    return newProduct;
  }

  updateProduct(id, updateData) {
    const index = this.data.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const existing = this.data.products[index];
    const updated = {
      ...existing,
      ...updateData,
      id: existing.id,
      price: updateData.price !== undefined ? Number(updateData.price) : existing.price,
      salePrice: updateData.salePrice !== undefined 
        ? (updateData.salePrice ? Number(updateData.salePrice) : null)
        : existing.salePrice,
      stock: updateData.stock !== undefined ? Number(updateData.stock) : existing.stock,
      updatedAt: new Date().toISOString()
    };

    this.data.products[index] = updated;
    this.save();
    return updated;
  }

  deleteProduct(id) {
    const index = this.data.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.data.products.splice(index, 1);
    this.save();
    return true;
  }

  // Categories
  getCategories() {
    return this.data.categories.map(cat => {
      const count = this.data.products.filter(p => p.category.toLowerCase() === cat.slug.toLowerCase()).length;
      return { ...cat, itemCount: count };
    });
  }

  createCategory(categoryData) {
    const id = 'cat_' + Date.now();
    const slug = (categoryData.name || 'category')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newCategory = {
      id,
      name: categoryData.name,
      slug: categoryData.slug || slug,
      description: categoryData.description || '',
      imageUrl: categoryData.imageUrl || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      featured: !!categoryData.featured
    };

    this.data.categories.push(newCategory);
    this.save();
    return newCategory;
  }

  updateCategory(id, updateData) {
    const index = this.data.categories.findIndex(c => c.id === id);
    if (index === -1) return null;
    this.data.categories[index] = { ...this.data.categories[index], ...updateData };
    this.save();
    return this.data.categories[index];
  }

  deleteCategory(id) {
    const index = this.data.categories.findIndex(c => c.id === id);
    if (index === -1) return false;
    this.data.categories.splice(index, 1);
    this.save();
    return true;
  }

  // Orders
  getOrders(filters = {}) {
    let list = [...this.data.orders];
    if (filters.status && filters.status !== 'all') {
      list = list.filter(o => o.orderStatus.toLowerCase() === filters.status.toLowerCase());
    }
    list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return list;
  }

  getOrderById(id) {
    return this.data.orders.find(o => o.id === id || o.orderNumber === id);
  }

  createOrder(orderData) {
    const items = orderData.items || [];
    if (items.length === 0) {
      throw new Error('Order items cannot be empty');
    }

    for (const item of items) {
      const prod = this.data.products.find(p => p.id === item.productId);
      if (!prod) {
        throw new Error(`Product not found: ${item.name || item.productId}`);
      }
      if (prod.stock < item.quantity) {
        throw new Error(`Insufficient stock for "${prod.name}". Available: ${prod.stock}`);
      }
    }

    for (const item of items) {
      const prod = this.data.products.find(p => p.id === item.productId);
      if (prod) {
        prod.stock -= item.quantity;
      }
    }

    const nextOrderNum = 'HB-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: 'ord_' + Date.now(),
      orderNumber: nextOrderNum,
      customer: orderData.customer || {},
      items: items.map(item => ({
        productId: item.productId,
        name: item.name,
        image: item.image,
        size: item.size || 'Standard',
        color: item.color || 'Standard',
        price: Number(item.price),
        quantity: Number(item.quantity),
        subtotal: Number(item.price) * Number(item.quantity)
      })),
      subtotal: Number(orderData.subtotal) || 0,
      shippingFee: Number(orderData.shippingFee) || 0,
      discount: Number(orderData.discount) || 0,
      total: Number(orderData.total) || 0,
      paymentMethod: orderData.paymentMethod || 'WhatsApp Direct Confirmation',
      paymentStatus: orderData.paymentStatus || 'Pending',
      orderStatus: 'Pending',
      trackingNumber: '',
      notes: orderData.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.data.orders.unshift(newOrder);
    this.save();
    return newOrder;
  }

  updateOrderStatus(id, { orderStatus, paymentStatus, trackingNumber }) {
    const order = this.data.orders.find(o => o.id === id || o.orderNumber === id);
    if (!order) return null;

    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (trackingNumber !== undefined) order.trackingNumber = trackingNumber;
    order.updatedAt = new Date().toISOString();

    this.save();
    return order;
  }

  // Content (CMS)
  getContent() {
    return this.data.content;
  }

  updateContent(updatedContent) {
    this.data.content = {
      ...this.data.content,
      ...updatedContent
    };
    this.save();
    return this.data.content;
  }

  // Settings
  getSettings() {
    return this.data.settings;
  }

  updateSettings(newSettings) {
    this.data.settings = {
      ...this.data.settings,
      ...newSettings
    };
    this.save();
    return this.data.settings;
  }

  // Dashboard Stats
  getDashboardStats() {
    const totalOrders = this.data.orders.length;
    const totalRevenue = this.data.orders
      .filter(o => o.paymentStatus === 'Paid' || o.orderStatus === 'Delivered')
      .reduce((sum, o) => sum + (o.total || 0), 0);

    const pendingOrders = this.data.orders.filter(o => o.orderStatus === 'Pending').length;
    const totalProducts = this.data.products.length;
    const lowStockCount = this.data.products.filter(p => p.stock <= 5).length;
    const recentOrders = this.data.orders.slice(0, 5);

    return {
      totalOrders,
      totalRevenue,
      pendingOrders,
      totalProducts,
      lowStockCount,
      recentOrders
    };
  }
}

export const db = new Database();



