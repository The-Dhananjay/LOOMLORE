export type Culture =
  | 'North India'
  | 'South India'
  | 'East India'
  | 'West India'
  | 'Pan-India'
  | 'Indo-Fusion';

export type Gender = 'Women' | 'Men' | 'Unisex';

export type GarmentType =
  | 'Saree'
  | 'Lehenga'
  | 'Salwar Kameez'
  | 'Anarkali'
  | 'Sharara'
  | 'Dhoti'
  | 'Kurta'
  | 'Sherwani'
  | 'Bandhgala'
  | 'Pattu Pavadai'
  | 'Mekhela Chador'
  | 'Pashmina Shawl'
  | 'Paithani'
  | 'Bandhani'
  | 'Pheran'
  | 'Mundu'
  | 'Veshti'
  | 'Shawl'
  | 'Gown'
  | 'Coat';

export type Occasion =
  | 'Wedding'
  | 'Diwali'
  | 'Holi'
  | 'Eid'
  | 'Navratri'
  | 'Raksha Bandhan'
  | 'Onam'
  | 'Pongal'
  | 'Baisakhi'
  | 'Bihu'
  | 'Durga Puja'
  | 'Temple'
  | 'Teej'
  | 'Ganesh Chaturthi'
  | 'Vishu'
  | 'Garia Puja'
  | 'Losoong'
  | 'Festive'
  | 'Festival'
  | 'Casual'
  | 'Daily';

export type Fabric =
  | 'Banarasi Silk'
  | 'Kanjeevaram Silk'
  | 'Chanderi Cotton'
  | 'Mulmul Cotton'
  | 'Linen'
  | 'Brocade'
  | 'Chiffon'
  | 'Velvet'
  | 'Tussar'
  | 'Khadi'
  | 'Pashmina'
  | 'Paithani Silk'
  | 'Wool'
  | 'Muga Silk';

export type Product = {
  id: string;
  slug: string;
  name: string;
  gender: Gender;
  garment: GarmentType;
  culture: Culture;
  region: string;
  state: string;
  occasion: Occasion;
  fabric: Fabric;
  colors: string[];
  sizes: string[];
  bustCm?: number;
  waistCm?: number;
  lengthCm?: number;
  priceINR: number;
  originalPriceINR?: number;
  gstPct: number;
  hsnCode: string;
  story: string;
  highlights: string[];
  artisan: string;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  swatch: string;
  shipsFromCity: string;
};

export const cultures: { name: Culture; motif: string; tagline: string; accent: string }[] = [
  { name: 'North India', motif: 'Mogra & paisley', tagline: 'Banarasi silk, chikankari, phulkari and sherwanis.', accent: 'from-saffron-deep to-maroon-deep' },
  { name: 'South India', motif: 'Temple border & peacock', tagline: 'Kanjeevaram sarees, silk veshtis and kasavu mundus.', accent: 'from-saffron-light to-gold-foil' },
  { name: 'East India', motif: 'Jamdani & lotus', tagline: 'Tussar, tant, mekhela chador and panjabi dhuti sets.', accent: 'from-maroon-light to-saffron-light' },
  { name: 'West India', motif: 'Bandhani & mirror work', tagline: 'Bandhej sarees, Patola ikat and royal Bandhgala suits.', accent: 'from-gold-foil to-maroon-deep' },
  { name: 'Pan-India', motif: 'Tricolour & khadi', tagline: 'Hand-spun khadi kurtas and universal heirloom drapes.', accent: 'from-parchment-200 to-earth-500' },
  { name: 'Indo-Fusion', motif: 'Contemporary drape', tagline: 'Tailored drapes pairing heritage weaves with modern cuts.', accent: 'from-indigo-loom to-gold-foil' }
];

export const products: Product[] = [
  {
    "id": "raj-w-01",
    "slug": "bandhani-rai-bandhej-georgette-saree",
    "name": "Bandhani Rai Bandhej Georgette Saree",
    "gender": "Women",
    "garment": "Bandhani",
    "culture": "West India",
    "region": "Jaipur, Rajasthan",
    "state": "Rajasthan",
    "occasion": "Diwali",
    "fabric": "Chiffon",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 8999,
    "originalPriceINR": 11999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Jaipur, Rajasthan using authentic traditional Chiffon weaving techniques.",
    "highlights": [
      "Authentic Rajasthan weave",
      "100% Chiffon",
      "Artisan certified"
    ],
    "artisan": "Jaipur Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/bandhani-saree.jpg",
    "badge": "Women Festive",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Jaipur"
  },
  {
    "id": "raj-w-02",
    "slug": "mothda-leheriya-silk-saree",
    "name": "Mothda Leheriya Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "West India",
    "region": "Jaipur, Rajasthan",
    "state": "Rajasthan",
    "occasion": "Teej",
    "fabric": "Chiffon",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 7499,
    "originalPriceINR": 9999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Jaipur, Rajasthan using authentic traditional Chiffon weaving techniques.",
    "highlights": [
      "Authentic Rajasthan weave",
      "100% Chiffon",
      "Artisan certified"
    ],
    "artisan": "Jaipur Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/leheriya-saree.jpg",
    "badge": "Women Teej Special",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Jaipur"
  },
  {
    "id": "raj-w-03",
    "slug": "kota-doria-real-gold-zari-saree",
    "name": "Kota Doria Real Gold Zari Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "West India",
    "region": "Jaipur, Rajasthan",
    "state": "Rajasthan",
    "occasion": "Casual",
    "fabric": "Chanderi Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 6999,
    "originalPriceINR": 8999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Jaipur, Rajasthan using authentic traditional Chanderi Cotton weaving techniques.",
    "highlights": [
      "Authentic Rajasthan weave",
      "100% Chanderi Cotton",
      "Artisan certified"
    ],
    "artisan": "Jaipur Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/phulkari-salwar.jpg",
    "badge": "Women Summer Craft",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Jaipur"
  },
  {
    "id": "raj-m-04",
    "slug": "royal-jodhpuri-bandhgala-groom-suit",
    "name": "Royal Jodhpuri Bandhgala Groom Suit",
    "gender": "Men",
    "garment": "Bandhgala",
    "culture": "West India",
    "region": "Jaipur, Rajasthan",
    "state": "Rajasthan",
    "occasion": "Wedding",
    "fabric": "Velvet",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 34999,
    "originalPriceINR": 43749,
    "gstPct": 12,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Jaipur, Rajasthan using authentic traditional Velvet weaving techniques.",
    "highlights": [
      "Authentic Rajasthan weave",
      "100% Velvet",
      "Artisan certified"
    ],
    "artisan": "Jaipur Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/bandhgala-jodhpuri-men.jpg",
    "badge": "Men Royal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Jaipur"
  },
  {
    "id": "raj-m-05",
    "slug": "royal-achkan-kurta-and-bandhej-safa-set",
    "name": "Royal Achkan Kurta & Bandhej Safa Set",
    "gender": "Men",
    "garment": "Sherwani",
    "culture": "West India",
    "region": "Jaipur, Rajasthan",
    "state": "Rajasthan",
    "occasion": "Wedding",
    "fabric": "Brocade",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 22999,
    "originalPriceINR": 28749,
    "gstPct": 12,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Jaipur, Rajasthan using authentic traditional Brocade weaving techniques.",
    "highlights": [
      "Authentic Rajasthan weave",
      "100% Brocade",
      "Artisan certified"
    ],
    "artisan": "Jaipur Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/mughal-sherwani.jpg",
    "badge": "Men Groom",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Jaipur"
  },
  {
    "id": "guj-w-01",
    "slug": "patan-patola-double-ikat-silk-saree",
    "name": "Patan Patola Double-Ikat Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "West India",
    "region": "Ahmedabad, Gujarat",
    "state": "Gujarat",
    "occasion": "Wedding",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 48999,
    "originalPriceINR": 59999,
    "gstPct": 12,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Ahmedabad, Gujarat using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic Gujarat weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Ahmedabad Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/pochampally-ikat.jpg",
    "badge": "Women Masterpiece",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Ahmedabad"
  },
  {
    "id": "guj-w-02",
    "slug": "navratri-mirror-work-chaniya-choli",
    "name": "Navratri Mirror-Work Chaniya Choli",
    "gender": "Women",
    "garment": "Lehenga",
    "culture": "West India",
    "region": "Ahmedabad, Gujarat",
    "state": "Gujarat",
    "occasion": "Navratri",
    "fabric": "Chiffon",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 7999,
    "originalPriceINR": 9999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Ahmedabad, Gujarat using authentic traditional Chiffon weaving techniques.",
    "highlights": [
      "Authentic Gujarat weave",
      "100% Chiffon",
      "Artisan certified"
    ],
    "artisan": "Ahmedabad Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/navratri-lehenga.webp",
    "badge": "Women Garba",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Ahmedabad"
  },
  {
    "id": "guj-m-03",
    "slug": "navratri-garba-kediyu-and-dhoti-set",
    "name": "Navratri Garba Kediyu & Dhoti Set",
    "gender": "Men",
    "garment": "Dhoti",
    "culture": "West India",
    "region": "Ahmedabad, Gujarat",
    "state": "Gujarat",
    "occasion": "Navratri",
    "fabric": "Khadi",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 8499,
    "originalPriceINR": 10624,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Ahmedabad, Gujarat using authentic traditional Khadi weaving techniques.",
    "highlights": [
      "Authentic Gujarat weave",
      "100% Khadi",
      "Artisan certified"
    ],
    "artisan": "Ahmedabad Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/navratri-kediyu-dhoti.jpg",
    "badge": "Men Festive",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Ahmedabad"
  },
  {
    "id": "guj-m-04",
    "slug": "kutchi-ajrakh-hand-blockprint-kurta",
    "name": "Kutchi Ajrakh Hand-Blockprint Kurta",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "West India",
    "region": "Ahmedabad, Gujarat",
    "state": "Gujarat",
    "occasion": "Daily",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 4999,
    "originalPriceINR": 6499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Ahmedabad, Gujarat using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Gujarat weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Ahmedabad Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Blockprint",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Ahmedabad"
  },
  {
    "id": "guj-w-05",
    "slug": "kutchi-mirror-embroidered-velvet-shawl",
    "name": "Kutchi Mirror Embroidered Velvet Shawl",
    "gender": "Women",
    "garment": "Shawl",
    "culture": "West India",
    "region": "Ahmedabad, Gujarat",
    "state": "Gujarat",
    "occasion": "Diwali",
    "fabric": "Velvet",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 8999,
    "originalPriceINR": 11499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Ahmedabad, Gujarat using authentic traditional Velvet weaving techniques.",
    "highlights": [
      "Authentic Gujarat weave",
      "100% Velvet",
      "Artisan certified"
    ],
    "artisan": "Ahmedabad Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Women Royal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Ahmedabad"
  },
  {
    "id": "pun-w-01",
    "slug": "phulkari-bagh-embroidered-salwar-set",
    "name": "Phulkari Bagh Embroidered Salwar Set",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "North India",
    "region": "Amritsar, Punjab",
    "state": "Punjab",
    "occasion": "Raksha Bandhan",
    "fabric": "Chanderi Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 6499,
    "originalPriceINR": 8499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Amritsar, Punjab using authentic traditional Chanderi Cotton weaving techniques.",
    "highlights": [
      "Authentic Punjab weave",
      "100% Chanderi Cotton",
      "Artisan certified"
    ],
    "artisan": "Amritsar Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/phulkari-salwar.jpg",
    "badge": "Women Festive",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Amritsar"
  },
  {
    "id": "pun-w-02",
    "slug": "royal-patiala-shahi-salwar-suit",
    "name": "Royal Patiala Shahi Salwar Suit",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "North India",
    "region": "Amritsar, Punjab",
    "state": "Punjab",
    "occasion": "Baisakhi",
    "fabric": "Chiffon",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 5999,
    "originalPriceINR": 7999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Amritsar, Punjab using authentic traditional Chiffon weaving techniques.",
    "highlights": [
      "Authentic Punjab weave",
      "100% Chiffon",
      "Artisan certified"
    ],
    "artisan": "Amritsar Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/phulkari-salwar.jpg",
    "badge": "Women Patiala",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Amritsar"
  },
  {
    "id": "pun-m-03",
    "slug": "muktsari-silk-kurta-and-phulkari-stole",
    "name": "Muktsari Silk Kurta & Phulkari Stole",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "North India",
    "region": "Amritsar, Punjab",
    "state": "Punjab",
    "occasion": "Baisakhi",
    "fabric": "Khadi",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 7999,
    "originalPriceINR": 9999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Amritsar, Punjab using authentic traditional Khadi weaving techniques.",
    "highlights": [
      "Authentic Punjab weave",
      "100% Khadi",
      "Artisan certified"
    ],
    "artisan": "Amritsar Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Baisakhi",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Amritsar"
  },
  {
    "id": "pun-m-04",
    "slug": "traditional-punjabi-tehmat-kurta-set",
    "name": "Traditional Punjabi Tehmat Kurta Set",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "North India",
    "region": "Amritsar, Punjab",
    "state": "Punjab",
    "occasion": "Daily",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 4999,
    "originalPriceINR": 6499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Amritsar, Punjab using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Punjab weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Amritsar Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Heritage",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Amritsar"
  },
  {
    "id": "pun-u-05",
    "slug": "amritsar-pashmina-phulkari-embroidered-stole",
    "name": "Amritsar Pashmina Phulkari Embroidered Stole",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "North India",
    "region": "Amritsar, Punjab",
    "state": "Punjab",
    "occasion": "Wedding",
    "fabric": "Pashmina",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 9499,
    "originalPriceINR": 12499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Amritsar, Punjab using authentic traditional Pashmina weaving techniques.",
    "highlights": [
      "Authentic Punjab weave",
      "100% Pashmina",
      "Artisan certified"
    ],
    "artisan": "Amritsar Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Craft",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Amritsar"
  },
  {
    "id": "har-w-01",
    "slug": "handloom-cotton-damaan-choli-set",
    "name": "Handloom Cotton Damaan Choli Set",
    "gender": "Women",
    "garment": "Lehenga",
    "culture": "North India",
    "region": "Panipat, Haryana",
    "state": "Haryana",
    "occasion": "Daily",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 5499,
    "originalPriceINR": 6999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Panipat, Haryana using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Haryana weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Panipat Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/phulkari-salwar.jpg",
    "badge": "Women Heritage",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Panipat"
  },
  {
    "id": "har-m-02",
    "slug": "panipat-handloom-kurta-dhoti-set",
    "name": "Panipat Handloom Kurta Dhoti Set",
    "gender": "Men",
    "garment": "Dhoti",
    "culture": "North India",
    "region": "Panipat, Haryana",
    "state": "Haryana",
    "occasion": "Daily",
    "fabric": "Khadi",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 4999,
    "originalPriceINR": 6499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Panipat, Haryana using authentic traditional Khadi weaving techniques.",
    "highlights": [
      "Authentic Haryana weave",
      "100% Khadi",
      "Artisan certified"
    ],
    "artisan": "Panipat Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Handloom",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Panipat"
  },
  {
    "id": "har-w-03",
    "slug": "haryanvi-printed-choli-kurti-set",
    "name": "Haryanvi Printed Choli Kurti Set",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "North India",
    "region": "Panipat, Haryana",
    "state": "Haryana",
    "occasion": "Casual",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 4499,
    "originalPriceINR": 5999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Panipat, Haryana using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Haryana weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Panipat Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/phulkari-salwar.jpg",
    "badge": "Women Daily",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Panipat"
  },
  {
    "id": "har-m-04",
    "slug": "rewari-royal-silk-groom-sherwani",
    "name": "Rewari Royal Silk Groom Sherwani",
    "gender": "Men",
    "garment": "Sherwani",
    "culture": "North India",
    "region": "Panipat, Haryana",
    "state": "Haryana",
    "occasion": "Wedding",
    "fabric": "Brocade",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 18999,
    "originalPriceINR": 23999,
    "gstPct": 12,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Panipat, Haryana using authentic traditional Brocade weaving techniques.",
    "highlights": [
      "Authentic Haryana weave",
      "100% Brocade",
      "Artisan certified"
    ],
    "artisan": "Panipat Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/mughal-sherwani.jpg",
    "badge": "Men Groom",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Panipat"
  },
  {
    "id": "har-w-05",
    "slug": "rohtak-khadi-handloom-cotton-saree",
    "name": "Rohtak Khadi Handloom Cotton Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "North India",
    "region": "Panipat, Haryana",
    "state": "Haryana",
    "occasion": "Casual",
    "fabric": "Khadi",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 3999,
    "originalPriceINR": 4999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Panipat, Haryana using authentic traditional Khadi weaving techniques.",
    "highlights": [
      "Authentic Haryana weave",
      "100% Khadi",
      "Artisan certified"
    ],
    "artisan": "Panipat Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/bandhani-saree.jpg",
    "badge": "Women Khadi",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Panipat"
  },
  {
    "id": "utt-w-01",
    "slug": "banarasi-zardozi-silk-saree",
    "name": "Banarasi Zardozi Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "North India",
    "region": "Varanasi, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "occasion": "Wedding",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 32499,
    "originalPriceINR": 41999,
    "gstPct": 12,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Varanasi, Uttar Pradesh using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic Uttar Pradesh weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Varanasi Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/banarasi-zardozi.webp",
    "badge": "Women Heirloom",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Varanasi"
  },
  {
    "id": "utt-w-02",
    "slug": "lucknowi-chikankari-hand-embroidered-anarkali",
    "name": "Lucknowi Chikankari Hand-Embroidered Anarkali",
    "gender": "Women",
    "garment": "Anarkali",
    "culture": "North India",
    "region": "Varanasi, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "occasion": "Eid",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 11499,
    "originalPriceINR": 14999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Varanasi, Uttar Pradesh using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Uttar Pradesh weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Varanasi Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/chikankari-anarkali.webp",
    "badge": "Women Royal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Varanasi"
  },
  {
    "id": "utt-m-03",
    "slug": "lucknowi-chikankari-silk-kurta-set",
    "name": "Lucknowi Chikankari Silk Kurta Set",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "North India",
    "region": "Varanasi, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "occasion": "Eid",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 12999,
    "originalPriceINR": 16999,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Varanasi, Uttar Pradesh using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic Uttar Pradesh weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Varanasi Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Heritage",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Varanasi"
  },
  {
    "id": "utt-m-04",
    "slug": "banarasi-silk-brocade-groom-sherwani",
    "name": "Banarasi Silk Brocade Groom Sherwani",
    "gender": "Men",
    "garment": "Sherwani",
    "culture": "North India",
    "region": "Varanasi, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "occasion": "Wedding",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 39999,
    "originalPriceINR": 49999,
    "gstPct": 12,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Varanasi, Uttar Pradesh using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic Uttar Pradesh weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Varanasi Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/mughal-sherwani.jpg",
    "badge": "Men Royal Groom",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Varanasi"
  },
  {
    "id": "utt-w-05",
    "slug": "gorakhpur-handloom-weave-cotton-suit",
    "name": "Gorakhpur Handloom Weave Cotton Suit",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "North India",
    "region": "Varanasi, Uttar Pradesh",
    "state": "Uttar Pradesh",
    "occasion": "Casual",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 4999,
    "originalPriceINR": 6499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Varanasi, Uttar Pradesh using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Uttar Pradesh weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Varanasi Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/phulkari-salwar.jpg",
    "badge": "Women Daily",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Varanasi"
  },
  {
    "id": "mad-w-01",
    "slug": "chanderi-tussar-tissue-silk-saree",
    "name": "Chanderi Tussar Tissue Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "North India",
    "region": "Bhopal, Madhya Pradesh",
    "state": "Madhya Pradesh",
    "occasion": "Diwali",
    "fabric": "Chanderi Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 14499,
    "originalPriceINR": 18999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Bhopal, Madhya Pradesh using authentic traditional Chanderi Cotton weaving techniques.",
    "highlights": [
      "Authentic Madhya Pradesh weave",
      "100% Chanderi Cotton",
      "Artisan certified"
    ],
    "artisan": "Bhopal Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/banarasi-zardozi.webp",
    "badge": "Women Festive",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Bhopal"
  },
  {
    "id": "mad-w-02",
    "slug": "maheshwari-fort-wall-zari-silk-saree",
    "name": "Maheshwari Fort Wall Zari Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "North India",
    "region": "Bhopal, Madhya Pradesh",
    "state": "Madhya Pradesh",
    "occasion": "Casual",
    "fabric": "Chanderi Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 9999,
    "originalPriceINR": 12999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Bhopal, Madhya Pradesh using authentic traditional Chanderi Cotton weaving techniques.",
    "highlights": [
      "Authentic Madhya Pradesh weave",
      "100% Chanderi Cotton",
      "Artisan certified"
    ],
    "artisan": "Bhopal Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/banarasi-zardozi.webp",
    "badge": "Women Heritage",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Bhopal"
  },
  {
    "id": "mad-m-03",
    "slug": "maheshwari-handloom-silk-kurta-set",
    "name": "Maheshwari Handloom Silk Kurta Set",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "North India",
    "region": "Bhopal, Madhya Pradesh",
    "state": "Madhya Pradesh",
    "occasion": "Daily",
    "fabric": "Linen",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 8999,
    "originalPriceINR": 11499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Bhopal, Madhya Pradesh using authentic traditional Linen weaving techniques.",
    "highlights": [
      "Authentic Madhya Pradesh weave",
      "100% Linen",
      "Artisan certified"
    ],
    "artisan": "Bhopal Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Artisan",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Bhopal"
  },
  {
    "id": "mad-w-04",
    "slug": "bagh-hand-blockprint-cotton-salwar-suit",
    "name": "Bagh Hand-Blockprint Cotton Salwar Suit",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "North India",
    "region": "Bhopal, Madhya Pradesh",
    "state": "Madhya Pradesh",
    "occasion": "Casual",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 5499,
    "originalPriceINR": 6999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Bhopal, Madhya Pradesh using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Madhya Pradesh weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Bhopal Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/phulkari-salwar.jpg",
    "badge": "Women Blockprint",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Bhopal"
  },
  {
    "id": "mad-m-05",
    "slug": "chanderi-brocade-groom-sherwani",
    "name": "Chanderi Brocade Groom Sherwani",
    "gender": "Men",
    "garment": "Sherwani",
    "culture": "North India",
    "region": "Bhopal, Madhya Pradesh",
    "state": "Madhya Pradesh",
    "occasion": "Wedding",
    "fabric": "Brocade",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 24999,
    "originalPriceINR": 31999,
    "gstPct": 12,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Bhopal, Madhya Pradesh using authentic traditional Brocade weaving techniques.",
    "highlights": [
      "Authentic Madhya Pradesh weave",
      "100% Brocade",
      "Artisan certified"
    ],
    "artisan": "Bhopal Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/mughal-sherwani.jpg",
    "badge": "Men Royal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Bhopal"
  },
  {
    "id": "mah-w-01",
    "slug": "yeola-paithani-7-lotus-silk-saree",
    "name": "Yeola Paithani 7-Lotus Silk Saree",
    "gender": "Women",
    "garment": "Paithani",
    "culture": "West India",
    "region": "Mumbai, Maharashtra",
    "state": "Maharashtra",
    "occasion": "Wedding",
    "fabric": "Paithani Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 38999,
    "originalPriceINR": 48999,
    "gstPct": 12,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Mumbai, Maharashtra using authentic traditional Paithani Silk weaving techniques.",
    "highlights": [
      "Authentic Maharashtra weave",
      "100% Paithani Silk",
      "Artisan certified"
    ],
    "artisan": "Mumbai Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/paithani-saree.jpg",
    "badge": "Women Classic",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Mumbai"
  },
  {
    "id": "mah-w-02",
    "slug": "9-yard-nauvari-kashta-paithani-saree",
    "name": "9-Yard Nauvari Kashta Paithani Saree",
    "gender": "Women",
    "garment": "Paithani",
    "culture": "West India",
    "region": "Mumbai, Maharashtra",
    "state": "Maharashtra",
    "occasion": "Ganesh Chaturthi",
    "fabric": "Paithani Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 42999,
    "originalPriceINR": 53999,
    "gstPct": 12,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Mumbai, Maharashtra using authentic traditional Paithani Silk weaving techniques.",
    "highlights": [
      "Authentic Maharashtra weave",
      "100% Paithani Silk",
      "Artisan certified"
    ],
    "artisan": "Mumbai Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/paithani-saree.jpg",
    "badge": "Women 9-Yard Royal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Mumbai"
  },
  {
    "id": "mah-m-03",
    "slug": "peshwai-silk-dhoti-and-shahi-pheta-set",
    "name": "Peshwai Silk Dhoti & Shahi Pheta Set",
    "gender": "Men",
    "garment": "Dhoti",
    "culture": "West India",
    "region": "Mumbai, Maharashtra",
    "state": "Maharashtra",
    "occasion": "Wedding",
    "fabric": "Paithani Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 15999,
    "originalPriceINR": 19999,
    "gstPct": 12,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Mumbai, Maharashtra using authentic traditional Paithani Silk weaving techniques.",
    "highlights": [
      "Authentic Maharashtra weave",
      "100% Paithani Silk",
      "Artisan certified"
    ],
    "artisan": "Mumbai Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/bandhgala-jodhpuri-men.jpg",
    "badge": "Men Royal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Mumbai"
  },
  {
    "id": "mah-w-04",
    "slug": "himroo-brocade-silk-tapestry-shawl",
    "name": "Himroo Brocade Silk Tapestry Shawl",
    "gender": "Women",
    "garment": "Shawl",
    "culture": "West India",
    "region": "Mumbai, Maharashtra",
    "state": "Maharashtra",
    "occasion": "Diwali",
    "fabric": "Brocade",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 11999,
    "originalPriceINR": 14999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Mumbai, Maharashtra using authentic traditional Brocade weaving techniques.",
    "highlights": [
      "Authentic Maharashtra weave",
      "100% Brocade",
      "Artisan certified"
    ],
    "artisan": "Mumbai Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Women Heritage",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Mumbai"
  },
  {
    "id": "mah-m-05",
    "slug": "solapur-cotton-handloom-jacquard-kurta",
    "name": "Solapur Cotton Handloom Jacquard Kurta",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "West India",
    "region": "Mumbai, Maharashtra",
    "state": "Maharashtra",
    "occasion": "Casual",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 4499,
    "originalPriceINR": 5999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Mumbai, Maharashtra using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Maharashtra weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Mumbai Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Daily",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Mumbai"
  },
  {
    "id": "goa-w-01",
    "slug": "red-kunbi-check-handloom-saree",
    "name": "Red Kunbi Check Handloom Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "West India",
    "region": "Panaji, Goa",
    "state": "Goa",
    "occasion": "Casual",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 4299,
    "originalPriceINR": 5499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Panaji, Goa using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Goa weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Panaji Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/bandhani-saree.jpg",
    "badge": "Women Heritage",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Panaji"
  },
  {
    "id": "goa-m-02",
    "slug": "goan-handloom-cotton-kashti-shirt-set",
    "name": "Goan Handloom Cotton Kashti Shirt Set",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "West India",
    "region": "Panaji, Goa",
    "state": "Goa",
    "occasion": "Casual",
    "fabric": "Linen",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 3999,
    "originalPriceINR": 4999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Panaji, Goa using authentic traditional Linen weaving techniques.",
    "highlights": [
      "Authentic Goa weave",
      "100% Linen",
      "Artisan certified"
    ],
    "artisan": "Panaji Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/kerala-mundu-men.jpg",
    "badge": "Men Casual",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Panaji"
  },
  {
    "id": "goa-w-03",
    "slug": "goan-eyelet-lace-hand-embroidered-kurti",
    "name": "Goan Eyelet Lace Hand-Embroidered Kurti",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "West India",
    "region": "Panaji, Goa",
    "state": "Goa",
    "occasion": "Casual",
    "fabric": "Linen",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 4999,
    "originalPriceINR": 6499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Panaji, Goa using authentic traditional Linen weaving techniques.",
    "highlights": [
      "Authentic Goa weave",
      "100% Linen",
      "Artisan certified"
    ],
    "artisan": "Panaji Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/phulkari-salwar.jpg",
    "badge": "Women Coastal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Panaji"
  },
  {
    "id": "goa-m-04",
    "slug": "panaji-handloom-white-silk-dhoti",
    "name": "Panaji Handloom White Silk Dhoti",
    "gender": "Men",
    "garment": "Dhoti",
    "culture": "West India",
    "region": "Panaji, Goa",
    "state": "Goa",
    "occasion": "Temple",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 5999,
    "originalPriceINR": 7499,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Panaji, Goa using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic Goa weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Panaji Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/kanjeevaram-veshti-men.jpg",
    "badge": "Men Classic",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Panaji"
  },
  {
    "id": "goa-u-05",
    "slug": "mandovi-coastal-cotton-stole",
    "name": "Mandovi Coastal Cotton Stole",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "West India",
    "region": "Panaji, Goa",
    "state": "Goa",
    "occasion": "Daily",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 2999,
    "originalPriceINR": 3999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Panaji, Goa using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Goa weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Panaji Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Beach",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Panaji"
  },
  {
    "id": "kar-w-01",
    "slug": "pure-mysore-gold-zari-silk-saree",
    "name": "Pure Mysore Gold Zari Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "South India",
    "region": "Bengaluru, Karnataka",
    "state": "Karnataka",
    "occasion": "Temple",
    "fabric": "Kanjeevaram Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 21999,
    "originalPriceINR": 27999,
    "gstPct": 12,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Bengaluru, Karnataka using authentic traditional Kanjeevaram Silk weaving techniques.",
    "highlights": [
      "Authentic Karnataka weave",
      "100% Kanjeevaram Silk",
      "Artisan certified"
    ],
    "artisan": "Bengaluru Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/kanjeevaram-bridal.jpg",
    "badge": "Women Temple",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Bengaluru"
  },
  {
    "id": "kar-w-02",
    "slug": "ilkal-topeni-silk-border-cotton-saree",
    "name": "Ilkal Topeni Silk Border Cotton Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "South India",
    "region": "Bengaluru, Karnataka",
    "state": "Karnataka",
    "occasion": "Daily",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 6499,
    "originalPriceINR": 8499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Bengaluru, Karnataka using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Karnataka weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Bengaluru Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/kanjeevaram-bridal.jpg",
    "badge": "Women Heritage",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Bengaluru"
  },
  {
    "id": "kar-m-03",
    "slug": "mulberry-silk-jubba-and-mysore-peta-set",
    "name": "Mulberry Silk Jubba & Mysore Peta Set",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "South India",
    "region": "Bengaluru, Karnataka",
    "state": "Karnataka",
    "occasion": "Wedding",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 11999,
    "originalPriceINR": 14999,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Bengaluru, Karnataka using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic Karnataka weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Bengaluru Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/kanjeevaram-veshti-men.jpg",
    "badge": "Men Royal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Bengaluru"
  },
  {
    "id": "kar-w-04",
    "slug": "guledgudd-khana-blouse-silk-saree",
    "name": "Guledgudd Khana Blouse Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "South India",
    "region": "Bengaluru, Karnataka",
    "state": "Karnataka",
    "occasion": "Festive",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 8999,
    "originalPriceINR": 11499,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Bengaluru, Karnataka using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic Karnataka weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Bengaluru Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/kanjeevaram-bridal.jpg",
    "badge": "Women Craft",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Bengaluru"
  },
  {
    "id": "kar-m-05",
    "slug": "udupi-handloom-pure-cotton-veshti",
    "name": "Udupi Handloom Pure Cotton Veshti",
    "gender": "Men",
    "garment": "Veshti",
    "culture": "South India",
    "region": "Bengaluru, Karnataka",
    "state": "Karnataka",
    "occasion": "Daily",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 3499,
    "originalPriceINR": 4499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Bengaluru, Karnataka using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Karnataka weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Bengaluru Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/kanjeevaram-veshti-men.jpg",
    "badge": "Men Daily",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Bengaluru"
  },
  {
    "id": "ker-w-01",
    "slug": "balaramapuram-kasavu-gold-saree",
    "name": "Balaramapuram Kasavu Gold Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "South India",
    "region": "Thiruvananthapuram, Kerala",
    "state": "Kerala",
    "occasion": "Onam",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 7499,
    "originalPriceINR": 9499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Thiruvananthapuram, Kerala using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Kerala weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Thiruvananthapuram Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/kerala-kasavu.jpg",
    "badge": "Women Onam",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Thiruvananthapuram"
  },
  {
    "id": "ker-w-02",
    "slug": "traditional-kasavu-set-mundu-drape",
    "name": "Traditional Kasavu Set-Mundu Drape",
    "gender": "Women",
    "garment": "Mundu",
    "culture": "South India",
    "region": "Thiruvananthapuram, Kerala",
    "state": "Kerala",
    "occasion": "Vishu",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 5999,
    "originalPriceINR": 7499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Thiruvananthapuram, Kerala using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Kerala weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Thiruvananthapuram Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/kerala-kasavu.jpg",
    "badge": "Women Heritage",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Thiruvananthapuram"
  },
  {
    "id": "ker-m-03",
    "slug": "kasavu-handloom-mundu-and-silk-shirt",
    "name": "Kasavu Handloom Mundu & Silk Shirt",
    "gender": "Men",
    "garment": "Mundu",
    "culture": "South India",
    "region": "Thiruvananthapuram, Kerala",
    "state": "Kerala",
    "occasion": "Onam",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 6999,
    "originalPriceINR": 8999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Thiruvananthapuram, Kerala using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Kerala weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Thiruvananthapuram Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/kerala-mundu-men.jpg",
    "badge": "Men Onam",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Thiruvananthapuram"
  },
  {
    "id": "ker-w-04",
    "slug": "kerala-tissue-gold-neriyathu-drape",
    "name": "Kerala Tissue Gold Neriyathu Drape",
    "gender": "Women",
    "garment": "Mundu",
    "culture": "South India",
    "region": "Thiruvananthapuram, Kerala",
    "state": "Kerala",
    "occasion": "Wedding",
    "fabric": "Kanjeevaram Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 8999,
    "originalPriceINR": 11499,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Thiruvananthapuram, Kerala using authentic traditional Kanjeevaram Silk weaving techniques.",
    "highlights": [
      "Authentic Kerala weave",
      "100% Kanjeevaram Silk",
      "Artisan certified"
    ],
    "artisan": "Thiruvananthapuram Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/kerala-kasavu.jpg",
    "badge": "Women Festive",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Thiruvananthapuram"
  },
  {
    "id": "ker-m-05",
    "slug": "kannur-handloom-cotton-jubba-set",
    "name": "Kannur Handloom Cotton Jubba Set",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "South India",
    "region": "Thiruvananthapuram, Kerala",
    "state": "Kerala",
    "occasion": "Casual",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 4499,
    "originalPriceINR": 5999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Thiruvananthapuram, Kerala using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Kerala weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Thiruvananthapuram Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/kerala-mundu-men.jpg",
    "badge": "Men Daily",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Thiruvananthapuram"
  },
  {
    "id": "tam-w-01",
    "slug": "kanjeevaram-korvai-bridal-silk-saree",
    "name": "Kanjeevaram Korvai Bridal Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "South India",
    "region": "Chennai, Tamil Nadu",
    "state": "Tamil Nadu",
    "occasion": "Wedding",
    "fabric": "Kanjeevaram Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 58999,
    "originalPriceINR": 73999,
    "gstPct": 12,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Chennai, Tamil Nadu using authentic traditional Kanjeevaram Silk weaving techniques.",
    "highlights": [
      "Authentic Tamil Nadu weave",
      "100% Kanjeevaram Silk",
      "Artisan certified"
    ],
    "artisan": "Chennai Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/kanjeevaram-bridal.jpg",
    "badge": "Women Bridal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Chennai"
  },
  {
    "id": "tam-w-02",
    "slug": "madurai-sungudi-tie-dye-cotton-saree",
    "name": "Madurai Sungudi Tie-Dye Cotton Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "South India",
    "region": "Chennai, Tamil Nadu",
    "state": "Tamil Nadu",
    "occasion": "Daily",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 4999,
    "originalPriceINR": 6499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Chennai, Tamil Nadu using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Tamil Nadu weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Chennai Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/kanjeevaram-bridal.jpg",
    "badge": "Women Temple City",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Chennai"
  },
  {
    "id": "tam-m-03",
    "slug": "pure-mulberry-silk-veshti-and-angavastram",
    "name": "Pure Mulberry Silk Veshti & Angavastram",
    "gender": "Men",
    "garment": "Veshti",
    "culture": "South India",
    "region": "Chennai, Tamil Nadu",
    "state": "Tamil Nadu",
    "occasion": "Wedding",
    "fabric": "Kanjeevaram Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 14999,
    "originalPriceINR": 18999,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Chennai, Tamil Nadu using authentic traditional Kanjeevaram Silk weaving techniques.",
    "highlights": [
      "Authentic Tamil Nadu weave",
      "100% Kanjeevaram Silk",
      "Artisan certified"
    ],
    "artisan": "Chennai Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/kanjeevaram-veshti-men.jpg",
    "badge": "Men Wedding",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Chennai"
  },
  {
    "id": "tam-w-04",
    "slug": "chettinad-handloom-cotton-saree",
    "name": "Chettinad Handloom Cotton Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "South India",
    "region": "Chennai, Tamil Nadu",
    "state": "Tamil Nadu",
    "occasion": "Casual",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 5499,
    "originalPriceINR": 6999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Chennai, Tamil Nadu using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Tamil Nadu weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Chennai Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/kanjeevaram-bridal.jpg",
    "badge": "Women Heritage",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Chennai"
  },
  {
    "id": "tam-m-05",
    "slug": "coimbatore-coral-silk-kurta-pajama",
    "name": "Coimbatore Coral Silk Kurta Pajama",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "South India",
    "region": "Chennai, Tamil Nadu",
    "state": "Tamil Nadu",
    "occasion": "Pongal",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 8999,
    "originalPriceINR": 11499,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Chennai, Tamil Nadu using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic Tamil Nadu weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Chennai Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/kanjeevaram-veshti-men.jpg",
    "badge": "Men Festive",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Chennai"
  },
  {
    "id": "and-w-01",
    "slug": "uppada-jamdani-tissue-silk-saree",
    "name": "Uppada Jamdani Tissue Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "South India",
    "region": "Amaravati, Andhra Pradesh",
    "state": "Andhra Pradesh",
    "occasion": "Wedding",
    "fabric": "Kanjeevaram Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 18999,
    "originalPriceINR": 23999,
    "gstPct": 12,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Amaravati, Andhra Pradesh using authentic traditional Kanjeevaram Silk weaving techniques.",
    "highlights": [
      "Authentic Andhra Pradesh weave",
      "100% Kanjeevaram Silk",
      "Artisan certified"
    ],
    "artisan": "Amaravati Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/kanjeevaram-bridal.jpg",
    "badge": "Women Artisan",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Amaravati"
  },
  {
    "id": "and-m-02",
    "slug": "mangalagiri-handloom-cotton-kurta-set",
    "name": "Mangalagiri Handloom Cotton Kurta Set",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "South India",
    "region": "Amaravati, Andhra Pradesh",
    "state": "Andhra Pradesh",
    "occasion": "Daily",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 5999,
    "originalPriceINR": 7499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Amaravati, Andhra Pradesh using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Andhra Pradesh weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Amaravati Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Handloom",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Amaravati"
  },
  {
    "id": "and-w-03",
    "slug": "venkatagiri-real-zari-cotton-saree",
    "name": "Venkatagiri Real Zari Cotton Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "South India",
    "region": "Amaravati, Andhra Pradesh",
    "state": "Andhra Pradesh",
    "occasion": "Temple",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 8499,
    "originalPriceINR": 10624,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Amaravati, Andhra Pradesh using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Andhra Pradesh weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Amaravati Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/kanjeevaram-bridal.jpg",
    "badge": "Women Royal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Amaravati"
  },
  {
    "id": "and-w-04",
    "slug": "dharmavaram-heavy-bridal-brocade-saree",
    "name": "Dharmavaram Heavy Bridal Brocade Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "South India",
    "region": "Amaravati, Andhra Pradesh",
    "state": "Andhra Pradesh",
    "occasion": "Wedding",
    "fabric": "Kanjeevaram Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 28999,
    "originalPriceINR": 36249,
    "gstPct": 12,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Amaravati, Andhra Pradesh using authentic traditional Kanjeevaram Silk weaving techniques.",
    "highlights": [
      "Authentic Andhra Pradesh weave",
      "100% Kanjeevaram Silk",
      "Artisan certified"
    ],
    "artisan": "Amaravati Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/kanjeevaram-bridal.jpg",
    "badge": "Women Bridal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Amaravati"
  },
  {
    "id": "and-m-05",
    "slug": "ponduru-fine-khadi-cotton-dhoti-set",
    "name": "Ponduru Fine Khadi Cotton Dhoti Set",
    "gender": "Men",
    "garment": "Dhoti",
    "culture": "South India",
    "region": "Amaravati, Andhra Pradesh",
    "state": "Andhra Pradesh",
    "occasion": "Casual",
    "fabric": "Khadi",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 4999,
    "originalPriceINR": 6499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Amaravati, Andhra Pradesh using authentic traditional Khadi weaving techniques.",
    "highlights": [
      "Authentic Andhra Pradesh weave",
      "100% Khadi",
      "Artisan certified"
    ],
    "artisan": "Amaravati Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/kanjeevaram-veshti-men.jpg",
    "badge": "Men Khadi",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Amaravati"
  },
  {
    "id": "tel-w-01",
    "slug": "pochampally-double-ikat-silk-saree",
    "name": "Pochampally Double-Ikat Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "South India",
    "region": "Hyderabad, Telangana",
    "state": "Telangana",
    "occasion": "Diwali",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 12999,
    "originalPriceINR": 16999,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Hyderabad, Telangana using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic Telangana weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Hyderabad Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/pochampally-ikat.jpg",
    "badge": "Women GI Tagged",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Hyderabad"
  },
  {
    "id": "tel-m-02",
    "slug": "pochampally-double-ikat-silk-kurta",
    "name": "Pochampally Double-Ikat Silk Kurta",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "South India",
    "region": "Hyderabad, Telangana",
    "state": "Telangana",
    "occasion": "Festive",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 8499,
    "originalPriceINR": 10624,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Hyderabad, Telangana using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic Telangana weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Hyderabad Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Artisan",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Hyderabad"
  },
  {
    "id": "tel-w-03",
    "slug": "gadwal-zari-temple-border-saree",
    "name": "Gadwal Zari Temple Border Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "South India",
    "region": "Hyderabad, Telangana",
    "state": "Telangana",
    "occasion": "Temple",
    "fabric": "Kanjeevaram Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 14999,
    "originalPriceINR": 18999,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Hyderabad, Telangana using authentic traditional Kanjeevaram Silk weaving techniques.",
    "highlights": [
      "Authentic Telangana weave",
      "100% Kanjeevaram Silk",
      "Artisan certified"
    ],
    "artisan": "Hyderabad Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/pochampally-ikat.jpg",
    "badge": "Women Temple",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Hyderabad"
  },
  {
    "id": "tel-w-04",
    "slug": "narayanpet-silk-border-cotton-saree",
    "name": "Narayanpet Silk Border Cotton Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "South India",
    "region": "Hyderabad, Telangana",
    "state": "Telangana",
    "occasion": "Casual",
    "fabric": "Chanderi Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 6999,
    "originalPriceINR": 8999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Hyderabad, Telangana using authentic traditional Chanderi Cotton weaving techniques.",
    "highlights": [
      "Authentic Telangana weave",
      "100% Chanderi Cotton",
      "Artisan certified"
    ],
    "artisan": "Hyderabad Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/pochampally-ikat.jpg",
    "badge": "Women Handloom",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Hyderabad"
  },
  {
    "id": "tel-m-05",
    "slug": "hyderabadi-zardozi-velvet-sherwani",
    "name": "Hyderabadi Zardozi Velvet Sherwani",
    "gender": "Men",
    "garment": "Sherwani",
    "culture": "South India",
    "region": "Hyderabad, Telangana",
    "state": "Telangana",
    "occasion": "Wedding",
    "fabric": "Velvet",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 36999,
    "originalPriceINR": 46249,
    "gstPct": 12,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Hyderabad, Telangana using authentic traditional Velvet weaving techniques.",
    "highlights": [
      "Authentic Telangana weave",
      "100% Velvet",
      "Artisan certified"
    ],
    "artisan": "Hyderabad Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/mughal-sherwani.jpg",
    "badge": "Men Royal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Hyderabad"
  },
  {
    "id": "odi-w-01",
    "slug": "sambalpuri-bandha-ikat-silk-saree",
    "name": "Sambalpuri Bandha Ikat Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "East India",
    "region": "Bhubaneswar, Odisha",
    "state": "Odisha",
    "occasion": "Durga Puja",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 9999,
    "originalPriceINR": 12999,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Bhubaneswar, Odisha using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic Odisha weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Bhubaneswar Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/pochampally-ikat.jpg",
    "badge": "Women Iconic",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Bhubaneswar"
  },
  {
    "id": "odi-w-02",
    "slug": "bomkai-temple-border-silk-saree",
    "name": "Bomkai Temple Border Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "East India",
    "region": "Bhubaneswar, Odisha",
    "state": "Odisha",
    "occasion": "Durga Puja",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 11999,
    "originalPriceINR": 14999,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Bhubaneswar, Odisha using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic Odisha weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Bhubaneswar Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/pochampally-ikat.jpg",
    "badge": "Women Heritage",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Bhubaneswar"
  },
  {
    "id": "odi-w-03",
    "slug": "pasapalli-chessboard-pattern-ikat-saree",
    "name": "Pasapalli Chessboard Pattern Ikat Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "East India",
    "region": "Bhubaneswar, Odisha",
    "state": "Odisha",
    "occasion": "Festive",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 13499,
    "originalPriceINR": 16999,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Bhubaneswar, Odisha using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic Odisha weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Bhubaneswar Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/pochampally-ikat.jpg",
    "badge": "Women Classic",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Bhubaneswar"
  },
  {
    "id": "odi-m-04",
    "slug": "odisha-handloom-ikat-silk-kurta-set",
    "name": "Odisha Handloom Ikat Silk Kurta Set",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "East India",
    "region": "Bhubaneswar, Odisha",
    "state": "Odisha",
    "occasion": "Daily",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 5999,
    "originalPriceINR": 7499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Bhubaneswar, Odisha using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Odisha weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Bhubaneswar Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Artisan",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Bhubaneswar"
  },
  {
    "id": "odi-u-05",
    "slug": "kotpad-natural-organic-dye-cotton-shawl",
    "name": "Kotpad Natural Organic Dye Cotton Shawl",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "East India",
    "region": "Bhubaneswar, Odisha",
    "state": "Odisha",
    "occasion": "Casual",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 4499,
    "originalPriceINR": 5999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Bhubaneswar, Odisha using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Odisha weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Bhubaneswar Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Tribal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Bhubaneswar"
  },
  {
    "id": "wes-w-01",
    "slug": "baluchari-mythological-silk-saree",
    "name": "Baluchari Mythological Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "East India",
    "region": "Kolkata, West Bengal",
    "state": "West Bengal",
    "occasion": "Durga Puja",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 24999,
    "originalPriceINR": 31249,
    "gstPct": 12,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Kolkata, West Bengal using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic West Bengal weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Kolkata Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/banarasi-zardozi.webp",
    "badge": "Women Heritage",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Kolkata"
  },
  {
    "id": "wes-w-02",
    "slug": "jamdani-muslin-translucent-cotton-saree",
    "name": "Jamdani Muslin Translucent Cotton Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "East India",
    "region": "Kolkata, West Bengal",
    "state": "West Bengal",
    "occasion": "Casual",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 8999,
    "originalPriceINR": 11499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Kolkata, West Bengal using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic West Bengal weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Kolkata Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/banarasi-zardozi.webp",
    "badge": "Women Royal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Kolkata"
  },
  {
    "id": "wes-w-03",
    "slug": "kantha-stitch-hand-embroidered-tussar-saree",
    "name": "Kantha Stitch Hand-Embroidered Tussar Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "East India",
    "region": "Kolkata, West Bengal",
    "state": "West Bengal",
    "occasion": "Durga Puja",
    "fabric": "Tussar",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 14999,
    "originalPriceINR": 18999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Kolkata, West Bengal using authentic traditional Tussar weaving techniques.",
    "highlights": [
      "Authentic West Bengal weave",
      "100% Tussar",
      "Artisan certified"
    ],
    "artisan": "Kolkata Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/banarasi-zardozi.webp",
    "badge": "Women Kantha",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Kolkata"
  },
  {
    "id": "wes-w-04",
    "slug": "santipuri-tant-cotton-handloom-saree",
    "name": "Santipuri Tant Cotton Handloom Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "East India",
    "region": "Kolkata, West Bengal",
    "state": "West Bengal",
    "occasion": "Daily",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 3999,
    "originalPriceINR": 4999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Kolkata, West Bengal using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic West Bengal weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Kolkata Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/banarasi-zardozi.webp",
    "badge": "Women Daily",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Kolkata"
  },
  {
    "id": "wes-m-05",
    "slug": "dhakai-jamdani-tussar-panjabi-dhuti-set",
    "name": "Dhakai Jamdani Tussar Panjabi Dhuti Set",
    "gender": "Men",
    "garment": "Dhoti",
    "culture": "East India",
    "region": "Kolkata, West Bengal",
    "state": "West Bengal",
    "occasion": "Durga Puja",
    "fabric": "Tussar",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 9999,
    "originalPriceINR": 12999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Kolkata, West Bengal using authentic traditional Tussar weaving techniques.",
    "highlights": [
      "Authentic West Bengal weave",
      "100% Tussar",
      "Artisan certified"
    ],
    "artisan": "Kolkata Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Festive",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Kolkata"
  },
  {
    "id": "bih-w-01",
    "slug": "bhagalpuri-organic-tussar-silk-saree",
    "name": "Bhagalpuri Organic Tussar Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "East India",
    "region": "Patna, Bihar",
    "state": "Bihar",
    "occasion": "Casual",
    "fabric": "Tussar",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 9499,
    "originalPriceINR": 11999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Patna, Bihar using authentic traditional Tussar weaving techniques.",
    "highlights": [
      "Authentic Bihar weave",
      "100% Tussar",
      "Artisan certified"
    ],
    "artisan": "Patna Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/banarasi-zardozi.webp",
    "badge": "Women Organic",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Patna"
  },
  {
    "id": "bih-w-02",
    "slug": "madhubani-hand-painted-tussar-silk-saree",
    "name": "Madhubani Hand-Painted Tussar Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "East India",
    "region": "Patna, Bihar",
    "state": "Bihar",
    "occasion": "Diwali",
    "fabric": "Tussar",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 16999,
    "originalPriceINR": 21249,
    "gstPct": 12,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Patna, Bihar using authentic traditional Tussar weaving techniques.",
    "highlights": [
      "Authentic Bihar weave",
      "100% Tussar",
      "Artisan certified"
    ],
    "artisan": "Patna Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/banarasi-zardozi.webp",
    "badge": "Women Masterpiece",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Patna"
  },
  {
    "id": "bih-w-03",
    "slug": "sujani-embroidered-cotton-suit-set",
    "name": "Sujani Embroidered Cotton Suit Set",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "East India",
    "region": "Patna, Bihar",
    "state": "Bihar",
    "occasion": "Daily",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 5499,
    "originalPriceINR": 6999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Patna, Bihar using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Bihar weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Patna Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/phulkari-salwar.jpg",
    "badge": "Women Craft",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Patna"
  },
  {
    "id": "bih-m-04",
    "slug": "bhagalpur-pure-tussar-kurta-pajama",
    "name": "Bhagalpur Pure Tussar Kurta Pajama",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "East India",
    "region": "Patna, Bihar",
    "state": "Bihar",
    "occasion": "Festive",
    "fabric": "Tussar",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 7999,
    "originalPriceINR": 9999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Patna, Bihar using authentic traditional Tussar weaving techniques.",
    "highlights": [
      "Authentic Bihar weave",
      "100% Tussar",
      "Artisan certified"
    ],
    "artisan": "Patna Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Artisan",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Patna"
  },
  {
    "id": "bih-m-05",
    "slug": "buxar-cotton-handloom-dhoti-kurta",
    "name": "Buxar Cotton Handloom Dhoti Kurta",
    "gender": "Men",
    "garment": "Dhoti",
    "culture": "East India",
    "region": "Patna, Bihar",
    "state": "Bihar",
    "occasion": "Daily",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 4499,
    "originalPriceINR": 5999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Patna, Bihar using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Bihar weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Patna Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Daily",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Patna"
  },
  {
    "id": "jha-w-01",
    "slug": "jharkhand-wild-kosa-tussar-silk-saree",
    "name": "Jharkhand Wild Kosa Tussar Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "East India",
    "region": "Ranchi, Jharkhand",
    "state": "Jharkhand",
    "occasion": "Daily",
    "fabric": "Tussar",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 10999,
    "originalPriceINR": 13749,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Ranchi, Jharkhand using authentic traditional Tussar weaving techniques.",
    "highlights": [
      "Authentic Jharkhand weave",
      "100% Tussar",
      "Artisan certified"
    ],
    "artisan": "Ranchi Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/banarasi-zardozi.webp",
    "badge": "Women Tribal Silk",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Ranchi"
  },
  {
    "id": "jha-w-02",
    "slug": "kuchai-tribal-blockprint-cotton-kurti",
    "name": "Kuchai Tribal Blockprint Cotton Kurti",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "East India",
    "region": "Ranchi, Jharkhand",
    "state": "Jharkhand",
    "occasion": "Casual",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 4499,
    "originalPriceINR": 5999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Ranchi, Jharkhand using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Jharkhand weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Ranchi Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/phulkari-salwar.jpg",
    "badge": "Women Tribal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Ranchi"
  },
  {
    "id": "jha-u-03",
    "slug": "jharkhand-kantha-embroidered-tussar-stole",
    "name": "Jharkhand Kantha Embroidered Tussar Stole",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "East India",
    "region": "Ranchi, Jharkhand",
    "state": "Jharkhand",
    "occasion": "Casual",
    "fabric": "Tussar",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 4999,
    "originalPriceINR": 6499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Ranchi, Jharkhand using authentic traditional Tussar weaving techniques.",
    "highlights": [
      "Authentic Jharkhand weave",
      "100% Tussar",
      "Artisan certified"
    ],
    "artisan": "Ranchi Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Craft",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Ranchi"
  },
  {
    "id": "jha-m-04",
    "slug": "tribal-handloom-khadi-kurta-pajama",
    "name": "Tribal Handloom Khadi Kurta Pajama",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "East India",
    "region": "Ranchi, Jharkhand",
    "state": "Jharkhand",
    "occasion": "Daily",
    "fabric": "Khadi",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 5499,
    "originalPriceINR": 6999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Ranchi, Jharkhand using authentic traditional Khadi weaving techniques.",
    "highlights": [
      "Authentic Jharkhand weave",
      "100% Khadi",
      "Artisan certified"
    ],
    "artisan": "Ranchi Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Handloom",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Ranchi"
  },
  {
    "id": "jha-w-05",
    "slug": "kharsawan-raw-tussar-silk-dupatta",
    "name": "Kharsawan Raw Tussar Silk Dupatta",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "East India",
    "region": "Ranchi, Jharkhand",
    "state": "Jharkhand",
    "occasion": "Casual",
    "fabric": "Tussar",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 3999,
    "originalPriceINR": 4999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Ranchi, Jharkhand using authentic traditional Tussar weaving techniques.",
    "highlights": [
      "Authentic Jharkhand weave",
      "100% Tussar",
      "Artisan certified"
    ],
    "artisan": "Ranchi Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/phulkari-salwar.jpg",
    "badge": "Women Natural",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Ranchi"
  },
  {
    "id": "chh-w-01",
    "slug": "chhattisgarh-kosa-reeled-silk-saree",
    "name": "Chhattisgarh Kosa Reeled Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "East India",
    "region": "Raipur, Chhattisgarh",
    "state": "Chhattisgarh",
    "occasion": "Festive",
    "fabric": "Tussar",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 11999,
    "originalPriceINR": 14999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Raipur, Chhattisgarh using authentic traditional Tussar weaving techniques.",
    "highlights": [
      "Authentic Chhattisgarh weave",
      "100% Tussar",
      "Artisan certified"
    ],
    "artisan": "Raipur Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/banarasi-zardozi.webp",
    "badge": "Women Kosa",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Raipur"
  },
  {
    "id": "chh-w-02",
    "slug": "champa-silk-brocade-salwar-kameez",
    "name": "Champa Silk Brocade Salwar Kameez",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "East India",
    "region": "Raipur, Chhattisgarh",
    "state": "Chhattisgarh",
    "occasion": "Diwali",
    "fabric": "Brocade",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 8499,
    "originalPriceINR": 10624,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Raipur, Chhattisgarh using authentic traditional Brocade weaving techniques.",
    "highlights": [
      "Authentic Chhattisgarh weave",
      "100% Brocade",
      "Artisan certified"
    ],
    "artisan": "Raipur Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/phulkari-salwar.jpg",
    "badge": "Women Brocade",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Raipur"
  },
  {
    "id": "chh-m-03",
    "slug": "bastar-tribal-motif-blockprint-kurta",
    "name": "Bastar Tribal Motif Blockprint Kurta",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "East India",
    "region": "Raipur, Chhattisgarh",
    "state": "Chhattisgarh",
    "occasion": "Daily",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 4999,
    "originalPriceINR": 6499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Raipur, Chhattisgarh using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Chhattisgarh weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Raipur Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Tribal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Raipur"
  },
  {
    "id": "chh-m-04",
    "slug": "ghotul-handloom-khadi-dhoti-kurta",
    "name": "Ghotul Handloom Khadi Dhoti Kurta",
    "gender": "Men",
    "garment": "Dhoti",
    "culture": "East India",
    "region": "Raipur, Chhattisgarh",
    "state": "Chhattisgarh",
    "occasion": "Daily",
    "fabric": "Khadi",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 5499,
    "originalPriceINR": 6999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Raipur, Chhattisgarh using authentic traditional Khadi weaving techniques.",
    "highlights": [
      "Authentic Chhattisgarh weave",
      "100% Khadi",
      "Artisan certified"
    ],
    "artisan": "Raipur Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Heritage",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Raipur"
  },
  {
    "id": "chh-u-05",
    "slug": "raigarh-embroidered-tussar-silk-shawl",
    "name": "Raigarh Embroidered Tussar Silk Shawl",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "East India",
    "region": "Raipur, Chhattisgarh",
    "state": "Chhattisgarh",
    "occasion": "Casual",
    "fabric": "Tussar",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 5999,
    "originalPriceINR": 7499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Raipur, Chhattisgarh using authentic traditional Tussar weaving techniques.",
    "highlights": [
      "Authentic Chhattisgarh weave",
      "100% Tussar",
      "Artisan certified"
    ],
    "artisan": "Raipur Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Craft",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Raipur"
  },
  {
    "id": "ass-w-01",
    "slug": "assam-golden-muga-silk-saree",
    "name": "Assam Golden Muga Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "East India",
    "region": "Guwahati, Assam",
    "state": "Assam",
    "occasion": "Bihu",
    "fabric": "Muga Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 36999,
    "originalPriceINR": 46249,
    "gstPct": 12,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Guwahati, Assam using authentic traditional Muga Silk weaving techniques.",
    "highlights": [
      "Authentic Assam weave",
      "100% Muga Silk",
      "Artisan certified"
    ],
    "artisan": "Guwahati Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/mekhela-chador.jpg",
    "badge": "Women Golden Silk",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Guwahati"
  },
  {
    "id": "ass-w-02",
    "slug": "assam-traditional-muga-mekhela-chador",
    "name": "Assam Traditional Muga Mekhela Chador",
    "gender": "Women",
    "garment": "Mekhela Chador",
    "culture": "East India",
    "region": "Guwahati, Assam",
    "state": "Assam",
    "occasion": "Bihu",
    "fabric": "Muga Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 28999,
    "originalPriceINR": 36249,
    "gstPct": 12,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Guwahati, Assam using authentic traditional Muga Silk weaving techniques.",
    "highlights": [
      "Authentic Assam weave",
      "100% Muga Silk",
      "Artisan certified"
    ],
    "artisan": "Guwahati Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/mekhela-chador.jpg",
    "badge": "Women Heritage",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Guwahati"
  },
  {
    "id": "ass-u-03",
    "slug": "eri-non-violent-peace-silk-shawl",
    "name": "Eri Non-Violent Peace Silk Shawl",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "East India",
    "region": "Guwahati, Assam",
    "state": "Assam",
    "occasion": "Casual",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 7999,
    "originalPriceINR": 9999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Guwahati, Assam using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Assam weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Guwahati Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Eco-Silk",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Guwahati"
  },
  {
    "id": "ass-m-04",
    "slug": "assamese-gamosa-motif-silk-kurta",
    "name": "Assamese Gamosa Motif Silk Kurta",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "East India",
    "region": "Guwahati, Assam",
    "state": "Assam",
    "occasion": "Bihu",
    "fabric": "Muga Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 8499,
    "originalPriceINR": 10624,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Guwahati, Assam using authentic traditional Muga Silk weaving techniques.",
    "highlights": [
      "Authentic Assam weave",
      "100% Muga Silk",
      "Artisan certified"
    ],
    "artisan": "Guwahati Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Bihu",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Guwahati"
  },
  {
    "id": "ass-w-05",
    "slug": "paat-silk-royal-bridal-mekhela-drape",
    "name": "Paat Silk Royal Bridal Mekhela Drape",
    "gender": "Women",
    "garment": "Mekhela Chador",
    "culture": "East India",
    "region": "Guwahati, Assam",
    "state": "Assam",
    "occasion": "Wedding",
    "fabric": "Muga Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 42999,
    "originalPriceINR": 53999,
    "gstPct": 12,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Guwahati, Assam using authentic traditional Muga Silk weaving techniques.",
    "highlights": [
      "Authentic Assam weave",
      "100% Muga Silk",
      "Artisan certified"
    ],
    "artisan": "Guwahati Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/mekhela-chador.jpg",
    "badge": "Women Royal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Guwahati"
  },
  {
    "id": "meg-u-01",
    "slug": "meghalaya-hand-spun-eri-silk-shawl",
    "name": "Meghalaya Hand-Spun Eri Silk Shawl",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "East India",
    "region": "Shillong, Meghalaya",
    "state": "Meghalaya",
    "occasion": "Casual",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 8499,
    "originalPriceINR": 10624,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Shillong, Meghalaya using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Meghalaya weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Shillong Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Eco-Silk",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Shillong"
  },
  {
    "id": "meg-w-02",
    "slug": "khasi-jainsem-mulberry-silk-drape",
    "name": "Khasi Jainsem Mulberry Silk Drape",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "East India",
    "region": "Shillong, Meghalaya",
    "state": "Meghalaya",
    "occasion": "Festive",
    "fabric": "Muga Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 11999,
    "originalPriceINR": 14999,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Shillong, Meghalaya using authentic traditional Muga Silk weaving techniques.",
    "highlights": [
      "Authentic Meghalaya weave",
      "100% Muga Silk",
      "Artisan certified"
    ],
    "artisan": "Shillong Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/mekhela-chador.jpg",
    "badge": "Women Khasi",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Shillong"
  },
  {
    "id": "meg-w-03",
    "slug": "garo-dakmanda-traditional-wrap-set",
    "name": "Garo Dakmanda Traditional Wrap Set",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "East India",
    "region": "Shillong, Meghalaya",
    "state": "Meghalaya",
    "occasion": "Daily",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 6499,
    "originalPriceINR": 8499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Shillong, Meghalaya using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Meghalaya weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Shillong Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/mekhela-chador.jpg",
    "badge": "Women Garo",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Shillong"
  },
  {
    "id": "meg-u-04",
    "slug": "ri-bhoi-organic-dye-silk-stole",
    "name": "Ri-Bhoi Organic Dye Silk Stole",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "East India",
    "region": "Shillong, Meghalaya",
    "state": "Meghalaya",
    "occasion": "Casual",
    "fabric": "Khadi",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 4999,
    "originalPriceINR": 6499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Shillong, Meghalaya using authentic traditional Khadi weaving techniques.",
    "highlights": [
      "Authentic Meghalaya weave",
      "100% Khadi",
      "Artisan certified"
    ],
    "artisan": "Shillong Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Organic",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Shillong"
  },
  {
    "id": "meg-m-05",
    "slug": "meghalaya-linen-handloom-kurta-pajama",
    "name": "Meghalaya Linen Handloom Kurta Pajama",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "East India",
    "region": "Shillong, Meghalaya",
    "state": "Meghalaya",
    "occasion": "Daily",
    "fabric": "Linen",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 5999,
    "originalPriceINR": 7499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Shillong, Meghalaya using authentic traditional Linen weaving techniques.",
    "highlights": [
      "Authentic Meghalaya weave",
      "100% Linen",
      "Artisan certified"
    ],
    "artisan": "Shillong Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Daily",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Shillong"
  },
  {
    "id": "aru-w-01",
    "slug": "apatani-geometric-woven-jacket-set",
    "name": "Apatani Geometric Woven Jacket Set",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "North India",
    "region": "Itanagar, Arunachal Pradesh",
    "state": "Arunachal Pradesh",
    "occasion": "Festive",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 8999,
    "originalPriceINR": 11499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Itanagar, Arunachal Pradesh using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Arunachal Pradesh weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Itanagar Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/mekhela-chador.jpg",
    "badge": "Women Apatani",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Itanagar"
  },
  {
    "id": "aru-w-02",
    "slug": "adi-tribal-hand-woven-wrap-skirt",
    "name": "Adi Tribal Hand-Woven Wrap Skirt",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "North India",
    "region": "Itanagar, Arunachal Pradesh",
    "state": "Arunachal Pradesh",
    "occasion": "Casual",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 5999,
    "originalPriceINR": 7499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Itanagar, Arunachal Pradesh using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Arunachal Pradesh weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Itanagar Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/mekhela-chador.jpg",
    "badge": "Women Tribal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Itanagar"
  },
  {
    "id": "aru-u-03",
    "slug": "mishmi-handloom-tribal-cotton-shawl",
    "name": "Mishmi Handloom Tribal Cotton Shawl",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "North India",
    "region": "Itanagar, Arunachal Pradesh",
    "state": "Arunachal Pradesh",
    "occasion": "Casual",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 6499,
    "originalPriceINR": 8499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Itanagar, Arunachal Pradesh using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Arunachal Pradesh weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Itanagar Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Mishmi",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Itanagar"
  },
  {
    "id": "aru-m-04",
    "slug": "nyishi-traditional-festive-coat",
    "name": "Nyishi Traditional Festive Coat",
    "gender": "Men",
    "garment": "Coat",
    "culture": "North India",
    "region": "Itanagar, Arunachal Pradesh",
    "state": "Arunachal Pradesh",
    "occasion": "Festive",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 9999,
    "originalPriceINR": 12999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Itanagar, Arunachal Pradesh using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Arunachal Pradesh weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Itanagar Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/bandhgala-jodhpuri-men.jpg",
    "badge": "Men Nyishi",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Itanagar"
  },
  {
    "id": "aru-u-05",
    "slug": "arunachal-himalayan-wool-shoulder-stole",
    "name": "Arunachal Himalayan Wool Shoulder Stole",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "North India",
    "region": "Itanagar, Arunachal Pradesh",
    "state": "Arunachal Pradesh",
    "occasion": "Daily",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 4999,
    "originalPriceINR": 6499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Itanagar, Arunachal Pradesh using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Arunachal Pradesh weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Itanagar Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Warm",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Itanagar"
  },
  {
    "id": "nag-u-01",
    "slug": "naga-tribal-warrior-motif-shawl",
    "name": "Naga Tribal Warrior Motif Shawl",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "East India",
    "region": "Kohima, Nagaland",
    "state": "Nagaland",
    "occasion": "Festive",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 9499,
    "originalPriceINR": 11999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Kohima, Nagaland using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Nagaland weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Kohima Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Iconic",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Kohima"
  },
  {
    "id": "nag-w-02",
    "slug": "angami-handwoven-spear-jacket-set",
    "name": "Angami Handwoven Spear Jacket Set",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "East India",
    "region": "Kohima, Nagaland",
    "state": "Nagaland",
    "occasion": "Daily",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 8499,
    "originalPriceINR": 10624,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Kohima, Nagaland using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Nagaland weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Kohima Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/mekhela-chador.jpg",
    "badge": "Women Angami",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Kohima"
  },
  {
    "id": "nag-w-03",
    "slug": "ao-traditional-stripe-wrap-set",
    "name": "Ao Traditional Stripe Wrap Set",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "East India",
    "region": "Kohima, Nagaland",
    "state": "Nagaland",
    "occasion": "Casual",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 6999,
    "originalPriceINR": 8999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Kohima, Nagaland using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Nagaland weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Kohima Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/mekhela-chador.jpg",
    "badge": "Women Ao",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Kohima"
  },
  {
    "id": "nag-m-04",
    "slug": "nagaland-tribal-handloom-waistcoat",
    "name": "Nagaland Tribal Handloom Waistcoat",
    "gender": "Men",
    "garment": "Bandhgala",
    "culture": "East India",
    "region": "Kohima, Nagaland",
    "state": "Nagaland",
    "occasion": "Festive",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 7999,
    "originalPriceINR": 9999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Kohima, Nagaland using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Nagaland weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Kohima Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/bandhgala-jodhpuri-men.jpg",
    "badge": "Men Naga",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Kohima"
  },
  {
    "id": "nag-u-05",
    "slug": "naga-hornbill-festival-silk-stole",
    "name": "Naga Hornbill Festival Silk Stole",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "East India",
    "region": "Kohima, Nagaland",
    "state": "Nagaland",
    "occasion": "Festival",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 5499,
    "originalPriceINR": 6999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Kohima, Nagaland using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Nagaland weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Kohima Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Hornbill",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Kohima"
  },
  {
    "id": "man-w-01",
    "slug": "phanek-and-innaphi-silk-drape-set",
    "name": "Phanek & Innaphi Silk Drape Set",
    "gender": "Women",
    "garment": "Saree",
    "culture": "East India",
    "region": "Imphal, Manipur",
    "state": "Manipur",
    "occasion": "Festive",
    "fabric": "Muga Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 14999,
    "originalPriceINR": 18999,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Imphal, Manipur using authentic traditional Muga Silk weaving techniques.",
    "highlights": [
      "Authentic Manipur weave",
      "100% Muga Silk",
      "Artisan certified"
    ],
    "artisan": "Imphal Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/mekhela-chador.jpg",
    "badge": "Women Royal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Imphal"
  },
  {
    "id": "man-w-02",
    "slug": "moirang-phee-temple-motif-saree",
    "name": "Moirang Phee Temple Motif Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "East India",
    "region": "Imphal, Manipur",
    "state": "Manipur",
    "occasion": "Temple",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 8999,
    "originalPriceINR": 11499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Imphal, Manipur using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Manipur weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Imphal Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/mekhela-chador.jpg",
    "badge": "Women Moirang",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Imphal"
  },
  {
    "id": "man-u-03",
    "slug": "shaphee-lanphee-warrior-shawl",
    "name": "Shaphee Lanphee Warrior Shawl",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "East India",
    "region": "Imphal, Manipur",
    "state": "Manipur",
    "occasion": "Casual",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 7499,
    "originalPriceINR": 9499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Imphal, Manipur using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Manipur weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Imphal Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Craft",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Imphal"
  },
  {
    "id": "man-m-04",
    "slug": "manipuri-handloom-silk-kurta-pajama",
    "name": "Manipuri Handloom Silk Kurta Pajama",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "East India",
    "region": "Imphal, Manipur",
    "state": "Manipur",
    "occasion": "Daily",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 7999,
    "originalPriceINR": 9999,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Imphal, Manipur using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic Manipur weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Imphal Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Heritage",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Imphal"
  },
  {
    "id": "man-u-05",
    "slug": "leirum-lengyan-traditional-cotton-stole",
    "name": "Leirum Lengyan Traditional Cotton Stole",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "East India",
    "region": "Imphal, Manipur",
    "state": "Manipur",
    "occasion": "Casual",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 3999,
    "originalPriceINR": 4999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Imphal, Manipur using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Manipur weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Imphal Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Daily",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Imphal"
  },
  {
    "id": "miz-w-01",
    "slug": "puanchei-ceremonial-mizo-dress-set",
    "name": "Puanchei Ceremonial Mizo Dress Set",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "East India",
    "region": "Aizawl, Mizoram",
    "state": "Mizoram",
    "occasion": "Festive",
    "fabric": "Muga Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 12999,
    "originalPriceINR": 16999,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Aizawl, Mizoram using authentic traditional Muga Silk weaving techniques.",
    "highlights": [
      "Authentic Mizoram weave",
      "100% Muga Silk",
      "Artisan certified"
    ],
    "artisan": "Aizawl Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/mekhela-chador.jpg",
    "badge": "Women Ceremonial",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Aizawl"
  },
  {
    "id": "miz-w-02",
    "slug": "kawrchei-hand-woven-blouse-puan-drape",
    "name": "Kawrchei Hand-Woven Blouse Puan Drape",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "East India",
    "region": "Aizawl, Mizoram",
    "state": "Mizoram",
    "occasion": "Daily",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 7999,
    "originalPriceINR": 9999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Aizawl, Mizoram using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Mizoram weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Aizawl Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/mekhela-chador.jpg",
    "badge": "Women Mizo",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Aizawl"
  },
  {
    "id": "miz-u-03",
    "slug": "mizo-handloom-patterned-shoulder-wrap",
    "name": "Mizo Handloom Patterned Shoulder Wrap",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "East India",
    "region": "Aizawl, Mizoram",
    "state": "Mizoram",
    "occasion": "Casual",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 5999,
    "originalPriceINR": 7499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Aizawl, Mizoram using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Mizoram weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Aizawl Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Wrap",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Aizawl"
  },
  {
    "id": "miz-m-04",
    "slug": "mizoram-handloom-cotton-kurta-set",
    "name": "Mizoram Handloom Cotton Kurta Set",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "East India",
    "region": "Aizawl, Mizoram",
    "state": "Mizoram",
    "occasion": "Daily",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 5499,
    "originalPriceINR": 6999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Aizawl, Mizoram using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Mizoram weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Aizawl Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Handloom",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Aizawl"
  },
  {
    "id": "miz-w-05",
    "slug": "puan-white-gold-thread-silk-drape",
    "name": "Puan White Gold Thread Silk Drape",
    "gender": "Women",
    "garment": "Saree",
    "culture": "East India",
    "region": "Aizawl, Mizoram",
    "state": "Mizoram",
    "occasion": "Wedding",
    "fabric": "Muga Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 15999,
    "originalPriceINR": 19999,
    "gstPct": 12,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Aizawl, Mizoram using authentic traditional Muga Silk weaving techniques.",
    "highlights": [
      "Authentic Mizoram weave",
      "100% Muga Silk",
      "Artisan certified"
    ],
    "artisan": "Aizawl Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/mekhela-chador.jpg",
    "badge": "Women Royal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Aizawl"
  },
  {
    "id": "tri-w-01",
    "slug": "rignai-and-risa-tribal-drape-set",
    "name": "Rignai & Risa Tribal Drape Set",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "East India",
    "region": "Agartala, Tripura",
    "state": "Tripura",
    "occasion": "Garia Puja",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 7499,
    "originalPriceINR": 9499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Agartala, Tripura using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Tripura weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Agartala Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/mekhela-chador.jpg",
    "badge": "Women Tribal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Agartala"
  },
  {
    "id": "tri-w-02",
    "slug": "tripura-cane-pattern-handloom-silk-saree",
    "name": "Tripura Cane Pattern Handloom Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "East India",
    "region": "Agartala, Tripura",
    "state": "Tripura",
    "occasion": "Festive",
    "fabric": "Muga Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 11999,
    "originalPriceINR": 14999,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Agartala, Tripura using authentic traditional Muga Silk weaving techniques.",
    "highlights": [
      "Authentic Tripura weave",
      "100% Muga Silk",
      "Artisan certified"
    ],
    "artisan": "Agartala Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/mekhela-chador.jpg",
    "badge": "Women Heritage",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Agartala"
  },
  {
    "id": "tri-u-03",
    "slug": "handloom-cotton-risa-chest-stole",
    "name": "Handloom Cotton Risa Chest Stole",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "East India",
    "region": "Agartala, Tripura",
    "state": "Tripura",
    "occasion": "Casual",
    "fabric": "Mulmul Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 3499,
    "originalPriceINR": 4499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Agartala, Tripura using authentic traditional Mulmul Cotton weaving techniques.",
    "highlights": [
      "Authentic Tripura weave",
      "100% Mulmul Cotton",
      "Artisan certified"
    ],
    "artisan": "Agartala Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Risa",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Agartala"
  },
  {
    "id": "tri-m-04",
    "slug": "agartala-raw-silk-kurta-pajama",
    "name": "Agartala Raw Silk Kurta Pajama",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "East India",
    "region": "Agartala, Tripura",
    "state": "Tripura",
    "occasion": "Daily",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 6999,
    "originalPriceINR": 8999,
    "gstPct": 5,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Agartala, Tripura using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic Tripura weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Agartala Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Silk",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Agartala"
  },
  {
    "id": "tri-u-05",
    "slug": "tripura-tribal-geometric-wool-shawl",
    "name": "Tripura Tribal Geometric Wool Shawl",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "East India",
    "region": "Agartala, Tripura",
    "state": "Tripura",
    "occasion": "Casual",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 4999,
    "originalPriceINR": 6499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Agartala, Tripura using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Tripura weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Agartala Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Tribal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Agartala"
  },
  {
    "id": "sik-m-01",
    "slug": "lepcha-dumpra-handwoven-wool-coat",
    "name": "Lepcha Dumpra Handwoven Wool Coat",
    "gender": "Men",
    "garment": "Coat",
    "culture": "North India",
    "region": "Gangtok, Sikkim",
    "state": "Sikkim",
    "occasion": "Losoong",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 10999,
    "originalPriceINR": 13749,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Gangtok, Sikkim using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Sikkim weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Gangtok Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/bandhgala-jodhpuri-men.jpg",
    "badge": "Men Lepcha",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Gangtok"
  },
  {
    "id": "sik-w-02",
    "slug": "bhutia-bakhu-silk-traditional-gown",
    "name": "Bhutia Bakhu Silk Traditional Gown",
    "gender": "Women",
    "garment": "Gown",
    "culture": "North India",
    "region": "Gangtok, Sikkim",
    "state": "Sikkim",
    "occasion": "Losoong",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 16999,
    "originalPriceINR": 21249,
    "gstPct": 12,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Gangtok, Sikkim using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic Sikkim weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Gangtok Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/mekhela-chador.jpg",
    "badge": "Women Royal",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Gangtok"
  },
  {
    "id": "sik-u-03",
    "slug": "tashiding-handwoven-woollen-stole",
    "name": "Tashiding Handwoven Woollen Stole",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "North India",
    "region": "Gangtok, Sikkim",
    "state": "Sikkim",
    "occasion": "Casual",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 6499,
    "originalPriceINR": 8499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Gangtok, Sikkim using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Sikkim weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Gangtok Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Warm",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Gangtok"
  },
  {
    "id": "sik-m-04",
    "slug": "sikkimese-brocade-jacket-kurta-set",
    "name": "Sikkimese Brocade Jacket Kurta Set",
    "gender": "Men",
    "garment": "Bandhgala",
    "culture": "North India",
    "region": "Gangtok, Sikkim",
    "state": "Sikkim",
    "occasion": "Wedding",
    "fabric": "Brocade",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 12999,
    "originalPriceINR": 16999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Gangtok, Sikkim using authentic traditional Brocade weaving techniques.",
    "highlights": [
      "Authentic Sikkim weave",
      "100% Brocade",
      "Artisan certified"
    ],
    "artisan": "Gangtok Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/bandhgala-jodhpuri-men.jpg",
    "badge": "Men Brocade",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Gangtok"
  },
  {
    "id": "sik-u-05",
    "slug": "namchi-mountain-handloom-warm-shawl",
    "name": "Namchi Mountain Handloom Warm Shawl",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "North India",
    "region": "Gangtok, Sikkim",
    "state": "Sikkim",
    "occasion": "Casual",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 5499,
    "originalPriceINR": 6999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Gangtok, Sikkim using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Sikkim weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Gangtok Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Himalayan",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Gangtok"
  },
  {
    "id": "utt-w-01",
    "slug": "kumaoni-pichora-bridal-polka-drape",
    "name": "Kumaoni Pichora Bridal Polka Drape",
    "gender": "Women",
    "garment": "Salwar Kameez",
    "culture": "North India",
    "region": "Dehradun, Uttarakhand",
    "state": "Uttarakhand",
    "occasion": "Wedding",
    "fabric": "Chanderi Cotton",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 8999,
    "originalPriceINR": 11499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Dehradun, Uttarakhand using authentic traditional Chanderi Cotton weaving techniques.",
    "highlights": [
      "Authentic Uttarakhand weave",
      "100% Chanderi Cotton",
      "Artisan certified"
    ],
    "artisan": "Dehradun Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/phulkari-salwar.jpg",
    "badge": "Women Kumaon",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Dehradun"
  },
  {
    "id": "utt-m-02",
    "slug": "garhwali-handloom-wool-tweed-coat",
    "name": "Garhwali Handloom Wool Tweed Coat",
    "gender": "Men",
    "garment": "Coat",
    "culture": "North India",
    "region": "Dehradun, Uttarakhand",
    "state": "Uttarakhand",
    "occasion": "Daily",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 7999,
    "originalPriceINR": 9999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Dehradun, Uttarakhand using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Uttarakhand weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Dehradun Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/bandhgala-jodhpuri-men.jpg",
    "badge": "Men Tweed",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Dehradun"
  },
  {
    "id": "utt-u-03",
    "slug": "uttarakhand-ringal-bamboo-wool-shawl",
    "name": "Uttarakhand Ringal Bamboo Wool Shawl",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "North India",
    "region": "Dehradun, Uttarakhand",
    "state": "Uttarakhand",
    "occasion": "Casual",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 5999,
    "originalPriceINR": 7499,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Dehradun, Uttarakhand using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Uttarakhand weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Dehradun Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Natural",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Dehradun"
  },
  {
    "id": "utt-m-04",
    "slug": "almora-tussar-silk-kurta-set",
    "name": "Almora Tussar Silk Kurta Set",
    "gender": "Men",
    "garment": "Kurta",
    "culture": "North India",
    "region": "Dehradun, Uttarakhand",
    "state": "Uttarakhand",
    "occasion": "Daily",
    "fabric": "Tussar",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 6999,
    "originalPriceINR": 8999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Dehradun, Uttarakhand using authentic traditional Tussar weaving techniques.",
    "highlights": [
      "Authentic Uttarakhand weave",
      "100% Tussar",
      "Artisan certified"
    ],
    "artisan": "Dehradun Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/chikankari-kurta-men.jpg",
    "badge": "Men Handloom",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Dehradun"
  },
  {
    "id": "utt-u-05",
    "slug": "himalayan-hand-loomed-wool-stole",
    "name": "Himalayan Hand-Loomed Wool Stole",
    "gender": "Unisex",
    "garment": "Shawl",
    "culture": "North India",
    "region": "Dehradun, Uttarakhand",
    "state": "Uttarakhand",
    "occasion": "Casual",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 4499,
    "originalPriceINR": 5999,
    "gstPct": 5,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Dehradun, Uttarakhand using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Uttarakhand weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Dehradun Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Unisex Wool",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Dehradun"
  },
  {
    "id": "jam-w-01",
    "slug": "kashmir-sozni-pashmina-cashmere-shawl",
    "name": "Kashmir Sozni Pashmina Cashmere Shawl",
    "gender": "Women",
    "garment": "Pashmina Shawl",
    "culture": "North India",
    "region": "Srinagar, Jammu & Kashmir",
    "state": "Jammu & Kashmir",
    "occasion": "Wedding",
    "fabric": "Pashmina",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 54999,
    "originalPriceINR": 68749,
    "gstPct": 12,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Srinagar, Jammu & Kashmir using authentic traditional Pashmina weaving techniques.",
    "highlights": [
      "Authentic Jammu & Kashmir weave",
      "100% Pashmina",
      "Artisan certified"
    ],
    "artisan": "Srinagar Handloom Guild",
    "rating": 4.7,
    "reviewCount": 48,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Masterpiece",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Srinagar"
  },
  {
    "id": "jam-w-02",
    "slug": "tilla-embroidered-silk-pheran",
    "name": "Tilla Embroidered Silk Pheran",
    "gender": "Women",
    "garment": "Pheran",
    "culture": "North India",
    "region": "Srinagar, Jammu & Kashmir",
    "state": "Jammu & Kashmir",
    "occasion": "Festive",
    "fabric": "Banarasi Silk",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "priceINR": 19999,
    "originalPriceINR": 24999,
    "gstPct": 12,
    "hsnCode": "5007",
    "story": "Handcrafted by master artisans in Srinagar, Jammu & Kashmir using authentic traditional Banarasi Silk weaving techniques.",
    "highlights": [
      "Authentic Jammu & Kashmir weave",
      "100% Banarasi Silk",
      "Artisan certified"
    ],
    "artisan": "Srinagar Handloom Guild",
    "rating": 4.8,
    "reviewCount": 61,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Women Royal Pheran",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Srinagar"
  },
  {
    "id": "jam-m-03",
    "slug": "tilla-embroidered-wool-pheran-coat",
    "name": "Tilla Embroidered Wool Pheran Coat",
    "gender": "Men",
    "garment": "Pheran",
    "culture": "North India",
    "region": "Srinagar, Jammu & Kashmir",
    "state": "Jammu & Kashmir",
    "occasion": "Wedding",
    "fabric": "Wool",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 22999,
    "originalPriceINR": 28749,
    "gstPct": 12,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Srinagar, Jammu & Kashmir using authentic traditional Wool weaving techniques.",
    "highlights": [
      "Authentic Jammu & Kashmir weave",
      "100% Wool",
      "Artisan certified"
    ],
    "artisan": "Srinagar Handloom Guild",
    "rating": 4.9,
    "reviewCount": 74,
    "image": "/products/mughal-sherwani.jpg",
    "badge": "Men Heritage",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Srinagar"
  },
  {
    "id": "jam-w-04",
    "slug": "kani-weave-pashmina-silk-saree",
    "name": "Kani Weave Pashmina Silk Saree",
    "gender": "Women",
    "garment": "Saree",
    "culture": "North India",
    "region": "Srinagar, Jammu & Kashmir",
    "state": "Jammu & Kashmir",
    "occasion": "Wedding",
    "fabric": "Pashmina",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "Free Size"
    ],
    "priceINR": 39999,
    "originalPriceINR": 49999,
    "gstPct": 12,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Srinagar, Jammu & Kashmir using authentic traditional Pashmina weaving techniques.",
    "highlights": [
      "Authentic Jammu & Kashmir weave",
      "100% Pashmina",
      "Artisan certified"
    ],
    "artisan": "Srinagar Handloom Guild",
    "rating": 4.6,
    "reviewCount": 87,
    "image": "/products/pashmina-shawl.jpg",
    "badge": "Women Kani Weave",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Srinagar"
  },
  {
    "id": "jam-m-05",
    "slug": "kashmiri-velvet-embroidered-sherwani",
    "name": "Kashmiri Velvet Embroidered Sherwani",
    "gender": "Men",
    "garment": "Sherwani",
    "culture": "North India",
    "region": "Srinagar, Jammu & Kashmir",
    "state": "Jammu & Kashmir",
    "occasion": "Wedding",
    "fabric": "Velvet",
    "colors": [
      "Heritage Weave",
      "Gold Accent"
    ],
    "sizes": [
      "38",
      "40",
      "42",
      "44"
    ],
    "priceINR": 34999,
    "originalPriceINR": 43749,
    "gstPct": 12,
    "hsnCode": "6205",
    "story": "Handcrafted by master artisans in Srinagar, Jammu & Kashmir using authentic traditional Velvet weaving techniques.",
    "highlights": [
      "Authentic Jammu & Kashmir weave",
      "100% Velvet",
      "Artisan certified"
    ],
    "artisan": "Srinagar Handloom Guild",
    "rating": 4.7,
    "reviewCount": 100,
    "image": "/products/mughal-sherwani.jpg",
    "badge": "Men Royal Velvet",
    "swatch": "#ff8ba7",
    "shipsFromCity": "Srinagar"
  }
];

export function findProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
