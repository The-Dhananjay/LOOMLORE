import os

header_code = """export type Culture =
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

"""

# 28 States definition with exactly 5 products each
states_data = [
    # 1. RAJASTHAN
    ("Rajasthan", "West India", "Jaipur", [
        ("Bandhani Rai Bandhej Georgette Saree", "Women", "Bandhani", "Chiffon", 8999, 11999, "Diwali", "/products/bandhani-saree.jpg", "Women Festive"),
        ("Mothda Leheriya Silk Saree", "Women", "Saree", "Chiffon", 7499, 9999, "Teej", "/products/leheriya-saree.jpg", "Women Teej Special"),
        ("Kota Doria Real Gold Zari Saree", "Women", "Saree", "Chanderi Cotton", 6999, 8999, "Casual", "/products/phulkari-salwar.jpg", "Women Summer Craft"),
        ("Royal Jodhpuri Bandhgala Groom Suit", "Men", "Bandhgala", "Velvet", 34999, 43749, "Wedding", "/products/bandhgala-jodhpuri-men.jpg", "Men Royal"),
        ("Royal Achkan Kurta & Bandhej Safa Set", "Men", "Sherwani", "Brocade", 22999, 28749, "Wedding", "/products/mughal-sherwani.jpg", "Men Groom"),
    ]),
    # 2. GUJARAT
    ("Gujarat", "West India", "Ahmedabad", [
        ("Patan Patola Double-Ikat Silk Saree", "Women", "Saree", "Banarasi Silk", 48999, 59999, "Wedding", "/products/pochampally-ikat.jpg", "Women Masterpiece"),
        ("Navratri Mirror-Work Chaniya Choli", "Women", "Lehenga", "Chiffon", 7999, 9999, "Navratri", "/products/navratri-lehenga.webp", "Women Garba"),
        ("Navratri Garba Kediyu & Dhoti Set", "Men", "Dhoti", "Khadi", 8499, 10624, "Navratri", "/products/navratri-kediyu-dhoti.jpg", "Men Festive"),
        ("Kutchi Ajrakh Hand-Blockprint Kurta", "Men", "Kurta", "Mulmul Cotton", 4999, 6499, "Daily", "/products/chikankari-kurta-men.jpg", "Men Blockprint"),
        ("Kutchi Mirror Embroidered Velvet Shawl", "Women", "Shawl", "Velvet", 8999, 11499, "Diwali", "/products/pashmina-shawl.jpg", "Women Royal"),
    ]),
    # 3. PUNJAB
    ("Punjab", "North India", "Amritsar", [
        ("Phulkari Bagh Embroidered Salwar Set", "Women", "Salwar Kameez", "Chanderi Cotton", 6499, 8499, "Raksha Bandhan", "/products/phulkari-salwar.jpg", "Women Festive"),
        ("Royal Patiala Shahi Salwar Suit", "Women", "Salwar Kameez", "Chiffon", 5999, 7999, "Baisakhi", "/products/phulkari-salwar.jpg", "Women Patiala"),
        ("Muktsari Silk Kurta & Phulkari Stole", "Men", "Kurta", "Khadi", 7999, 9999, "Baisakhi", "/products/chikankari-kurta-men.jpg", "Men Baisakhi"),
        ("Traditional Punjabi Tehmat Kurta Set", "Men", "Kurta", "Mulmul Cotton", 4999, 6499, "Daily", "/products/chikankari-kurta-men.jpg", "Men Heritage"),
        ("Amritsar Pashmina Phulkari Embroidered Stole", "Unisex", "Shawl", "Pashmina", 9499, 12499, "Wedding", "/products/pashmina-shawl.jpg", "Unisex Craft"),
    ]),
    # 4. HARYANA
    ("Haryana", "North India", "Panipat", [
        ("Handloom Cotton Damaan Choli Set", "Women", "Lehenga", "Mulmul Cotton", 5499, 6999, "Daily", "/products/phulkari-salwar.jpg", "Women Heritage"),
        ("Panipat Handloom Kurta Dhoti Set", "Men", "Dhoti", "Khadi", 4999, 6499, "Daily", "/products/chikankari-kurta-men.jpg", "Men Handloom"),
        ("Haryanvi Printed Choli Kurti Set", "Women", "Salwar Kameez", "Mulmul Cotton", 4499, 5999, "Casual", "/products/phulkari-salwar.jpg", "Women Daily"),
        ("Rewari Royal Silk Groom Sherwani", "Men", "Sherwani", "Brocade", 18999, 23999, "Wedding", "/products/mughal-sherwani.jpg", "Men Groom"),
        ("Rohtak Khadi Handloom Cotton Saree", "Women", "Saree", "Khadi", 3999, 4999, "Casual", "/products/bandhani-saree.jpg", "Women Khadi"),
    ]),
    # 5. UTTAR PRADESH
    ("Uttar Pradesh", "North India", "Varanasi", [
        ("Banarasi Zardozi Silk Saree", "Women", "Saree", "Banarasi Silk", 32499, 41999, "Wedding", "/products/banarasi-zardozi.webp", "Women Heirloom"),
        ("Lucknowi Chikankari Hand-Embroidered Anarkali", "Women", "Anarkali", "Mulmul Cotton", 11499, 14999, "Eid", "/products/chikankari-anarkali.webp", "Women Royal"),
        ("Lucknowi Chikankari Silk Kurta Set", "Men", "Kurta", "Banarasi Silk", 12999, 16999, "Eid", "/products/chikankari-kurta-men.jpg", "Men Heritage"),
        ("Banarasi Silk Brocade Groom Sherwani", "Men", "Sherwani", "Banarasi Silk", 39999, 49999, "Wedding", "/products/mughal-sherwani.jpg", "Men Royal Groom"),
        ("Gorakhpur Handloom Weave Cotton Suit", "Women", "Salwar Kameez", "Mulmul Cotton", 4999, 6499, "Casual", "/products/phulkari-salwar.jpg", "Women Daily"),
    ]),
    # 6. MADHYA PRADESH
    ("Madhya Pradesh", "North India", "Bhopal", [
        ("Chanderi Tussar Tissue Silk Saree", "Women", "Saree", "Chanderi Cotton", 14499, 18999, "Diwali", "/products/banarasi-zardozi.webp", "Women Festive"),
        ("Maheshwari Fort Wall Zari Silk Saree", "Women", "Saree", "Chanderi Cotton", 9999, 12999, "Casual", "/products/banarasi-zardozi.webp", "Women Heritage"),
        ("Maheshwari Handloom Silk Kurta Set", "Men", "Kurta", "Linen", 8999, 11499, "Daily", "/products/chikankari-kurta-men.jpg", "Men Artisan"),
        ("Bagh Hand-Blockprint Cotton Salwar Suit", "Women", "Salwar Kameez", "Mulmul Cotton", 5499, 6999, "Casual", "/products/phulkari-salwar.jpg", "Women Blockprint"),
        ("Chanderi Brocade Groom Sherwani", "Men", "Sherwani", "Brocade", 24999, 31999, "Wedding", "/products/mughal-sherwani.jpg", "Men Royal"),
    ]),
    # 7. MAHARASHTRA
    ("Maharashtra", "West India", "Mumbai", [
        ("Yeola Paithani 7-Lotus Silk Saree", "Women", "Paithani", "Paithani Silk", 38999, 48999, "Wedding", "/products/paithani-saree.jpg", "Women Classic"),
        ("9-Yard Nauvari Kashta Paithani Saree", "Women", "Paithani", "Paithani Silk", 42999, 53999, "Ganesh Chaturthi", "/products/paithani-saree.jpg", "Women 9-Yard Royal"),
        ("Peshwai Silk Dhoti & Shahi Pheta Set", "Men", "Dhoti", "Paithani Silk", 15999, 19999, "Wedding", "/products/bandhgala-jodhpuri-men.jpg", "Men Royal"),
        ("Himroo Brocade Silk Tapestry Shawl", "Women", "Shawl", "Brocade", 11999, 14999, "Diwali", "/products/pashmina-shawl.jpg", "Women Heritage"),
        ("Solapur Cotton Handloom Jacquard Kurta", "Men", "Kurta", "Mulmul Cotton", 4499, 5999, "Casual", "/products/chikankari-kurta-men.jpg", "Men Daily"),
    ]),
    # 8. GOA
    ("Goa", "West India", "Panaji", [
        ("Red Kunbi Check Handloom Saree", "Women", "Saree", "Mulmul Cotton", 4299, 5499, "Casual", "/products/bandhani-saree.jpg", "Women Heritage"),
        ("Goan Handloom Cotton Kashti Shirt Set", "Men", "Kurta", "Linen", 3999, 4999, "Casual", "/products/kerala-mundu-men.jpg", "Men Casual"),
        ("Goan Eyelet Lace Hand-Embroidered Kurti", "Women", "Salwar Kameez", "Linen", 4999, 6499, "Casual", "/products/phulkari-salwar.jpg", "Women Coastal"),
        ("Panaji Handloom White Silk Dhoti", "Men", "Dhoti", "Banarasi Silk", 5999, 7499, "Temple", "/products/kanjeevaram-veshti-men.jpg", "Men Classic"),
        ("Mandovi Coastal Cotton Stole", "Unisex", "Shawl", "Mulmul Cotton", 2999, 3999, "Daily", "/products/pashmina-shawl.jpg", "Unisex Beach"),
    ]),
    # 9. KARNATAKA
    ("Karnataka", "South India", "Bengaluru", [
        ("Pure Mysore Gold Zari Silk Saree", "Women", "Saree", "Kanjeevaram Silk", 21999, 27999, "Temple", "/products/kanjeevaram-bridal.jpg", "Women Temple"),
        ("Ilkal Topeni Silk Border Cotton Saree", "Women", "Saree", "Mulmul Cotton", 6499, 8499, "Daily", "/products/kanjeevaram-bridal.jpg", "Women Heritage"),
        ("Mulberry Silk Jubba & Mysore Peta Set", "Men", "Kurta", "Banarasi Silk", 11999, 14999, "Wedding", "/products/kanjeevaram-veshti-men.jpg", "Men Royal"),
        ("Guledgudd Khana Blouse Silk Saree", "Women", "Saree", "Banarasi Silk", 8999, 11499, "Festive", "/products/kanjeevaram-bridal.jpg", "Women Craft"),
        ("Udupi Handloom Pure Cotton Veshti", "Men", "Veshti", "Mulmul Cotton", 3499, 4499, "Daily", "/products/kanjeevaram-veshti-men.jpg", "Men Daily"),
    ]),
    # 10. KERALA
    ("Kerala", "South India", "Thiruvananthapuram", [
        ("Balaramapuram Kasavu Gold Saree", "Women", "Saree", "Mulmul Cotton", 7499, 9499, "Onam", "/products/kerala-kasavu.jpg", "Women Onam"),
        ("Traditional Kasavu Set-Mundu Drape", "Women", "Mundu", "Mulmul Cotton", 5999, 7499, "Vishu", "/products/kerala-kasavu.jpg", "Women Heritage"),
        ("Kasavu Handloom Mundu & Silk Shirt", "Men", "Mundu", "Mulmul Cotton", 6999, 8999, "Onam", "/products/kerala-mundu-men.jpg", "Men Onam"),
        ("Kerala Tissue Gold Neriyathu Drape", "Women", "Mundu", "Kanjeevaram Silk", 8999, 11499, "Wedding", "/products/kerala-kasavu.jpg", "Women Festive"),
        ("Kannur Handloom Cotton Jubba Set", "Men", "Kurta", "Mulmul Cotton", 4499, 5999, "Casual", "/products/kerala-mundu-men.jpg", "Men Daily"),
    ]),
    # 11. TAMIL NADU
    ("Tamil Nadu", "South India", "Chennai", [
        ("Kanjeevaram Korvai Bridal Silk Saree", "Women", "Saree", "Kanjeevaram Silk", 58999, 73999, "Wedding", "/products/kanjeevaram-bridal.jpg", "Women Bridal"),
        ("Madurai Sungudi Tie-Dye Cotton Saree", "Women", "Saree", "Mulmul Cotton", 4999, 6499, "Daily", "/products/kanjeevaram-bridal.jpg", "Women Temple City"),
        ("Pure Mulberry Silk Veshti & Angavastram", "Men", "Veshti", "Kanjeevaram Silk", 14999, 18999, "Wedding", "/products/kanjeevaram-veshti-men.jpg", "Men Wedding"),
        ("Chettinad Handloom Cotton Saree", "Women", "Saree", "Mulmul Cotton", 5499, 6999, "Casual", "/products/kanjeevaram-bridal.jpg", "Women Heritage"),
        ("Coimbatore Coral Silk Kurta Pajama", "Men", "Kurta", "Banarasi Silk", 8999, 11499, "Pongal", "/products/kanjeevaram-veshti-men.jpg", "Men Festive"),
    ]),
    # 12. ANDHRA PRADESH
    ("Andhra Pradesh", "South India", "Amaravati", [
        ("Uppada Jamdani Tissue Silk Saree", "Women", "Saree", "Kanjeevaram Silk", 18999, 23999, "Wedding", "/products/kanjeevaram-bridal.jpg", "Women Artisan"),
        ("Mangalagiri Handloom Cotton Kurta Set", "Men", "Kurta", "Mulmul Cotton", 5999, 7499, "Daily", "/products/chikankari-kurta-men.jpg", "Men Handloom"),
        ("Venkatagiri Real Zari Cotton Saree", "Women", "Saree", "Mulmul Cotton", 8499, 10624, "Temple", "/products/kanjeevaram-bridal.jpg", "Women Royal"),
        ("Dharmavaram Heavy Bridal Brocade Saree", "Women", "Saree", "Kanjeevaram Silk", 28999, 36249, "Wedding", "/products/kanjeevaram-bridal.jpg", "Women Bridal"),
        ("Ponduru Fine Khadi Cotton Dhoti Set", "Men", "Dhoti", "Khadi", 4999, 6499, "Casual", "/products/kanjeevaram-veshti-men.jpg", "Men Khadi"),
    ]),
    # 13. TELANGANA
    ("Telangana", "South India", "Hyderabad", [
        ("Pochampally Double-Ikat Silk Saree", "Women", "Saree", "Banarasi Silk", 12999, 16999, "Diwali", "/products/pochampally-ikat.jpg", "Women GI Tagged"),
        ("Pochampally Double-Ikat Silk Kurta", "Men", "Kurta", "Banarasi Silk", 8499, 10624, "Festive", "/products/chikankari-kurta-men.jpg", "Men Artisan"),
        ("Gadwal Zari Temple Border Saree", "Women", "Saree", "Kanjeevaram Silk", 14999, 18999, "Temple", "/products/pochampally-ikat.jpg", "Women Temple"),
        ("Narayanpet Silk Border Cotton Saree", "Women", "Saree", "Chanderi Cotton", 6999, 8999, "Casual", "/products/pochampally-ikat.jpg", "Women Handloom"),
        ("Hyderabadi Zardozi Velvet Sherwani", "Men", "Sherwani", "Velvet", 36999, 46249, "Wedding", "/products/mughal-sherwani.jpg", "Men Royal"),
    ]),
    # 14. ODISHA
    ("Odisha", "East India", "Bhubaneswar", [
        ("Sambalpuri Bandha Ikat Silk Saree", "Women", "Saree", "Banarasi Silk", 9999, 12999, "Durga Puja", "/products/pochampally-ikat.jpg", "Women Iconic"),
        ("Bomkai Temple Border Silk Saree", "Women", "Saree", "Banarasi Silk", 11999, 14999, "Durga Puja", "/products/pochampally-ikat.jpg", "Women Heritage"),
        ("Pasapalli Chessboard Pattern Ikat Saree", "Women", "Saree", "Banarasi Silk", 13499, 16999, "Festive", "/products/pochampally-ikat.jpg", "Women Classic"),
        ("Odisha Handloom Ikat Silk Kurta Set", "Men", "Kurta", "Mulmul Cotton", 5999, 7499, "Daily", "/products/chikankari-kurta-men.jpg", "Men Artisan"),
        ("Kotpad Natural Organic Dye Cotton Shawl", "Unisex", "Shawl", "Mulmul Cotton", 4499, 5999, "Casual", "/products/pashmina-shawl.jpg", "Unisex Tribal"),
    ]),
    # 15. WEST BENGAL
    ("West Bengal", "East India", "Kolkata", [
        ("Baluchari Mythological Silk Saree", "Women", "Saree", "Banarasi Silk", 24999, 31249, "Durga Puja", "/products/banarasi-zardozi.webp", "Women Heritage"),
        ("Jamdani Muslin Translucent Cotton Saree", "Women", "Saree", "Mulmul Cotton", 8999, 11499, "Casual", "/products/banarasi-zardozi.webp", "Women Royal"),
        ("Kantha Stitch Hand-Embroidered Tussar Saree", "Women", "Saree", "Tussar", 14999, 18999, "Durga Puja", "/products/banarasi-zardozi.webp", "Women Kantha"),
        ("Santipuri Tant Cotton Handloom Saree", "Women", "Saree", "Mulmul Cotton", 3999, 4999, "Daily", "/products/banarasi-zardozi.webp", "Women Daily"),
        ("Dhakai Jamdani Tussar Panjabi Dhuti Set", "Men", "Dhoti", "Tussar", 9999, 12999, "Durga Puja", "/products/chikankari-kurta-men.jpg", "Men Festive"),
    ]),
    # 16. BIHAR
    ("Bihar", "East India", "Patna", [
        ("Bhagalpuri Organic Tussar Silk Saree", "Women", "Saree", "Tussar", 9499, 11999, "Casual", "/products/banarasi-zardozi.webp", "Women Organic"),
        ("Madhubani Hand-Painted Tussar Silk Saree", "Women", "Saree", "Tussar", 16999, 21249, "Diwali", "/products/banarasi-zardozi.webp", "Women Masterpiece"),
        ("Sujani Embroidered Cotton Suit Set", "Women", "Salwar Kameez", "Mulmul Cotton", 5499, 6999, "Daily", "/products/phulkari-salwar.jpg", "Women Craft"),
        ("Bhagalpur Pure Tussar Kurta Pajama", "Men", "Kurta", "Tussar", 7999, 9999, "Festive", "/products/chikankari-kurta-men.jpg", "Men Artisan"),
        ("Buxar Cotton Handloom Dhoti Kurta", "Men", "Dhoti", "Mulmul Cotton", 4499, 5999, "Daily", "/products/chikankari-kurta-men.jpg", "Men Daily"),
    ]),
    # 17. JHARKHAND
    ("Jharkhand", "East India", "Ranchi", [
        ("Jharkhand Wild Kosa Tussar Silk Saree", "Women", "Saree", "Tussar", 10999, 13749, "Daily", "/products/banarasi-zardozi.webp", "Women Tribal Silk"),
        ("Kuchai Tribal Blockprint Cotton Kurti", "Women", "Salwar Kameez", "Mulmul Cotton", 4499, 5999, "Casual", "/products/phulkari-salwar.jpg", "Women Tribal"),
        ("Jharkhand Kantha Embroidered Tussar Stole", "Unisex", "Shawl", "Tussar", 4999, 6499, "Casual", "/products/pashmina-shawl.jpg", "Unisex Craft"),
        ("Tribal Handloom Khadi Kurta Pajama", "Men", "Kurta", "Khadi", 5499, 6999, "Daily", "/products/chikankari-kurta-men.jpg", "Men Handloom"),
        ("Kharsawan Raw Tussar Silk Dupatta", "Women", "Salwar Kameez", "Tussar", 3999, 4999, "Casual", "/products/phulkari-salwar.jpg", "Women Natural"),
    ]),
    # 18. CHHATTISGARH
    ("Chhattisgarh", "East India", "Raipur", [
        ("Chhattisgarh Kosa Reeled Silk Saree", "Women", "Saree", "Tussar", 11999, 14999, "Festive", "/products/banarasi-zardozi.webp", "Women Kosa"),
        ("Champa Silk Brocade Salwar Kameez", "Women", "Salwar Kameez", "Brocade", 8499, 10624, "Diwali", "/products/phulkari-salwar.jpg", "Women Brocade"),
        ("Bastar Tribal Motif Blockprint Kurta", "Men", "Kurta", "Mulmul Cotton", 4999, 6499, "Daily", "/products/chikankari-kurta-men.jpg", "Men Tribal"),
        ("Ghotul Handloom Khadi Dhoti Kurta", "Men", "Dhoti", "Khadi", 5499, 6999, "Daily", "/products/chikankari-kurta-men.jpg", "Men Heritage"),
        ("Raigarh Embroidered Tussar Silk Shawl", "Unisex", "Shawl", "Tussar", 5999, 7499, "Casual", "/products/pashmina-shawl.jpg", "Unisex Craft"),
    ]),
    # 19. ASSAM
    ("Assam", "East India", "Guwahati", [
        ("Assam Golden Muga Silk Saree", "Women", "Saree", "Muga Silk", 36999, 46249, "Bihu", "/products/mekhela-chador.jpg", "Women Golden Silk"),
        ("Assam Traditional Muga Mekhela Chador", "Women", "Mekhela Chador", "Muga Silk", 28999, 36249, "Bihu", "/products/mekhela-chador.jpg", "Women Heritage"),
        ("Eri Non-Violent Peace Silk Shawl", "Unisex", "Shawl", "Wool", 7999, 9999, "Casual", "/products/pashmina-shawl.jpg", "Unisex Eco-Silk"),
        ("Assamese Gamosa Motif Silk Kurta", "Men", "Kurta", "Muga Silk", 8499, 10624, "Bihu", "/products/chikankari-kurta-men.jpg", "Men Bihu"),
        ("Paat Silk Royal Bridal Mekhela Drape", "Women", "Mekhela Chador", "Muga Silk", 42999, 53999, "Wedding", "/products/mekhela-chador.jpg", "Women Royal"),
    ]),
    # 20. MEGHALAYA
    ("Meghalaya", "East India", "Shillong", [
        ("Meghalaya Hand-Spun Eri Silk Shawl", "Unisex", "Shawl", "Wool", 8499, 10624, "Casual", "/products/pashmina-shawl.jpg", "Unisex Eco-Silk"),
        ("Khasi Jainsem Mulberry Silk Drape", "Women", "Salwar Kameez", "Muga Silk", 11999, 14999, "Festive", "/products/mekhela-chador.jpg", "Women Khasi"),
        ("Garo Dakmanda Traditional Wrap Set", "Women", "Salwar Kameez", "Mulmul Cotton", 6499, 8499, "Daily", "/products/mekhela-chador.jpg", "Women Garo"),
        ("Ri-Bhoi Organic Dye Silk Stole", "Unisex", "Shawl", "Khadi", 4999, 6499, "Casual", "/products/pashmina-shawl.jpg", "Unisex Organic"),
        ("Meghalaya Linen Handloom Kurta Pajama", "Men", "Kurta", "Linen", 5999, 7499, "Daily", "/products/chikankari-kurta-men.jpg", "Men Daily"),
    ]),
    # 21. ARUNACHAL PRADESH
    ("Arunachal Pradesh", "North India", "Itanagar", [
        ("Apatani Geometric Woven Jacket Set", "Women", "Salwar Kameez", "Wool", 8999, 11499, "Festive", "/products/mekhela-chador.jpg", "Women Apatani"),
        ("Adi Tribal Hand-Woven Wrap Skirt", "Women", "Salwar Kameez", "Mulmul Cotton", 5999, 7499, "Casual", "/products/mekhela-chador.jpg", "Women Tribal"),
        ("Mishmi Handloom Tribal Cotton Shawl", "Unisex", "Shawl", "Wool", 6499, 8499, "Casual", "/products/pashmina-shawl.jpg", "Unisex Mishmi"),
        ("Nyishi Traditional Festive Coat", "Men", "Coat", "Wool", 9999, 12999, "Festive", "/products/bandhgala-jodhpuri-men.jpg", "Men Nyishi"),
        ("Arunachal Himalayan Wool Shoulder Stole", "Unisex", "Shawl", "Wool", 4999, 6499, "Daily", "/products/pashmina-shawl.jpg", "Unisex Warm"),
    ]),
    # 22. NAGALAND
    ("Nagaland", "East India", "Kohima", [
        ("Naga Tribal Warrior Motif Shawl", "Unisex", "Shawl", "Wool", 9499, 11999, "Festive", "/products/pashmina-shawl.jpg", "Unisex Iconic"),
        ("Angami Handwoven Spear Jacket Set", "Women", "Salwar Kameez", "Wool", 8499, 10624, "Daily", "/products/mekhela-chador.jpg", "Women Angami"),
        ("Ao Traditional Stripe Wrap Set", "Women", "Salwar Kameez", "Mulmul Cotton", 6999, 8999, "Casual", "/products/mekhela-chador.jpg", "Women Ao"),
        ("Nagaland Tribal Handloom Waistcoat", "Men", "Bandhgala", "Wool", 7999, 9999, "Festive", "/products/bandhgala-jodhpuri-men.jpg", "Men Naga"),
        ("Naga Hornbill Festival Silk Stole", "Unisex", "Shawl", "Wool", 5499, 6999, "Festival", "/products/pashmina-shawl.jpg", "Unisex Hornbill"),
    ]),
    # 23. MANIPUR
    ("Manipur", "East India", "Imphal", [
        ("Phanek & Innaphi Silk Drape Set", "Women", "Saree", "Muga Silk", 14999, 18999, "Festive", "/products/mekhela-chador.jpg", "Women Royal"),
        ("Moirang Phee Temple Motif Saree", "Women", "Saree", "Mulmul Cotton", 8999, 11499, "Temple", "/products/mekhela-chador.jpg", "Women Moirang"),
        ("Shaphee Lanphee Warrior Shawl", "Unisex", "Shawl", "Wool", 7499, 9499, "Casual", "/products/pashmina-shawl.jpg", "Unisex Craft"),
        ("Manipuri Handloom Silk Kurta Pajama", "Men", "Kurta", "Banarasi Silk", 7999, 9999, "Daily", "/products/chikankari-kurta-men.jpg", "Men Heritage"),
        ("Leirum Lengyan Traditional Cotton Stole", "Unisex", "Shawl", "Mulmul Cotton", 3999, 4999, "Casual", "/products/pashmina-shawl.jpg", "Unisex Daily"),
    ]),
    # 24. MIZORAM
    ("Mizoram", "East India", "Aizawl", [
        ("Puanchei Ceremonial Mizo Dress Set", "Women", "Salwar Kameez", "Muga Silk", 12999, 16999, "Festive", "/products/mekhela-chador.jpg", "Women Ceremonial"),
        ("Kawrchei Hand-Woven Blouse Puan Drape", "Women", "Salwar Kameez", "Mulmul Cotton", 7999, 9999, "Daily", "/products/mekhela-chador.jpg", "Women Mizo"),
        ("Mizo Handloom Patterned Shoulder Wrap", "Unisex", "Shawl", "Wool", 5999, 7499, "Casual", "/products/pashmina-shawl.jpg", "Unisex Wrap"),
        ("Mizoram Handloom Cotton Kurta Set", "Men", "Kurta", "Mulmul Cotton", 5499, 6999, "Daily", "/products/chikankari-kurta-men.jpg", "Men Handloom"),
        ("Puan White Gold Thread Silk Drape", "Women", "Saree", "Muga Silk", 15999, 19999, "Wedding", "/products/mekhela-chador.jpg", "Women Royal"),
    ]),
    # 25. TRIPURA
    ("Tripura", "East India", "Agartala", [
        ("Rignai & Risa Tribal Drape Set", "Women", "Salwar Kameez", "Mulmul Cotton", 7499, 9499, "Garia Puja", "/products/mekhela-chador.jpg", "Women Tribal"),
        ("Tripura Cane Pattern Handloom Silk Saree", "Women", "Saree", "Muga Silk", 11999, 14999, "Festive", "/products/mekhela-chador.jpg", "Women Heritage"),
        ("Handloom Cotton Risa Chest Stole", "Unisex", "Shawl", "Mulmul Cotton", 3499, 4499, "Casual", "/products/pashmina-shawl.jpg", "Unisex Risa"),
        ("Agartala Raw Silk Kurta Pajama", "Men", "Kurta", "Banarasi Silk", 6999, 8999, "Daily", "/products/chikankari-kurta-men.jpg", "Men Silk"),
        ("Tripura Tribal Geometric Wool Shawl", "Unisex", "Shawl", "Wool", 4999, 6499, "Casual", "/products/pashmina-shawl.jpg", "Unisex Tribal"),
    ]),
    # 26. SIKKIM
    ("Sikkim", "North India", "Gangtok", [
        ("Lepcha Dumpra Handwoven Wool Coat", "Men", "Coat", "Wool", 10999, 13749, "Losoong", "/products/bandhgala-jodhpuri-men.jpg", "Men Lepcha"),
        ("Bhutia Bakhu Silk Traditional Gown", "Women", "Gown", "Banarasi Silk", 16999, 21249, "Losoong", "/products/mekhela-chador.jpg", "Women Royal"),
        ("Tashiding Handwoven Woollen Stole", "Unisex", "Shawl", "Wool", 6499, 8499, "Casual", "/products/pashmina-shawl.jpg", "Unisex Warm"),
        ("Sikkimese Brocade Jacket Kurta Set", "Men", "Bandhgala", "Brocade", 12999, 16999, "Wedding", "/products/bandhgala-jodhpuri-men.jpg", "Men Brocade"),
        ("Namchi Mountain Handloom Warm Shawl", "Unisex", "Shawl", "Wool", 5499, 6999, "Casual", "/products/pashmina-shawl.jpg", "Unisex Himalayan"),
    ]),
    # 27. UTTARAKHAND
    ("Uttarakhand", "North India", "Dehradun", [
        ("Kumaoni Pichora Bridal Polka Drape", "Women", "Salwar Kameez", "Chanderi Cotton", 8999, 11499, "Wedding", "/products/phulkari-salwar.jpg", "Women Kumaon"),
        ("Garhwali Handloom Wool Tweed Coat", "Men", "Coat", "Wool", 7999, 9999, "Daily", "/products/bandhgala-jodhpuri-men.jpg", "Men Tweed"),
        ("Uttarakhand Ringal Bamboo Wool Shawl", "Unisex", "Shawl", "Wool", 5999, 7499, "Casual", "/products/pashmina-shawl.jpg", "Unisex Natural"),
        ("Almora Tussar Silk Kurta Set", "Men", "Kurta", "Tussar", 6999, 8999, "Daily", "/products/chikankari-kurta-men.jpg", "Men Handloom"),
        ("Himalayan Hand-Loomed Wool Stole", "Unisex", "Shawl", "Wool", 4499, 5999, "Casual", "/products/pashmina-shawl.jpg", "Unisex Wool"),
    ]),
    # 28. JAMMU & KASHMIR
    ("Jammu & Kashmir", "North India", "Srinagar", [
        ("Kashmir Sozni Pashmina Cashmere Shawl", "Women", "Pashmina Shawl", "Pashmina", 54999, 68749, "Wedding", "/products/pashmina-shawl.jpg", "Masterpiece"),
        ("Tilla Embroidered Silk Pheran", "Women", "Pheran", "Banarasi Silk", 19999, 24999, "Festive", "/products/pashmina-shawl.jpg", "Women Royal Pheran"),
        ("Tilla Embroidered Wool Pheran Coat", "Men", "Pheran", "Wool", 22999, 28749, "Wedding", "/products/mughal-sherwani.jpg", "Men Heritage"),
        ("Kani Weave Pashmina Silk Saree", "Women", "Saree", "Pashmina", 39999, 49999, "Wedding", "/products/pashmina-shawl.jpg", "Women Kani Weave"),
        ("Kashmiri Velvet Embroidered Sherwani", "Men", "Sherwani", "Velvet", 34999, 43749, "Wedding", "/products/mughal-sherwani.jpg", "Men Royal Velvet"),
    ])
]

# Generate product objects
all_products = []

for state_name, culture, city, items in states_data:
    st_prefix = state_name[:3].lower()
    for idx, (name, gender, garment, fabric, price, orig_price, occasion, img, badge) in enumerate(items, 1):
        g_code = "w" if gender == "Women" else ("m" if gender == "Men" else "u")
        p_id = f"{st_prefix}-{g_code}-{idx:02d}"
        
        # Generate slug cleanly
        slug = name.lower().replace(" ", "-").replace("&", "and").replace("'", "").replace(",", "").replace("-", "-")
        # Clean double hyphens
        while "--" in slug:
            slug = slug.replace("--", "-")
            
        story = f"Handcrafted by master artisans in {city}, {state_name} using authentic traditional {fabric} weaving techniques."
        
        prod = {
            "id": p_id,
            "slug": slug,
            "name": name,
            "gender": gender,
            "garment": garment,
            "culture": culture,
            "region": f"{city}, {state_name}",
            "state": state_name,
            "occasion": occasion,
            "fabric": fabric,
            "colors": ["Heritage Weave", "Gold Accent"],
            "sizes": ["Free Size"] if garment in ["Saree", "Pashmina Shawl", "Bandhani", "Paithani", "Shawl", "Mundu"] else ["S", "M", "L", "XL"] if gender == "Women" else ["38", "40", "42", "44"],
            "priceINR": price,
            "originalPriceINR": orig_price,
            "gstPct": 5 if price < 15000 else 12,
            "hsnCode": "5007" if "Silk" in fabric else "6205",
            "story": story,
            "highlights": [f"Authentic {state_name} weave", f"100% {fabric}", "Artisan certified"],
            "artisan": f"{city} Handloom Guild",
            "rating": round(4.6 + (idx * 0.1) % 0.4, 1),
            "reviewCount": 35 + (idx * 13) % 90,
            "image": img,
            "badge": badge,
            "swatch": "#ff8ba7",
            "shipsFromCity": city
        }
        all_products.append(prod)

import json
output_ts = header_code + "export const products: Product[] = " + json.dumps(all_products, indent=2) + ";\n\nexport function findProduct(slug: string) {\n  return products.find((p) => p.slug === slug);\n}\n"

with open("src/data/catalog.ts", "w", encoding="utf-8") as f:
    f.write(output_ts)

print(f"SUCCESS! Wrote {len(all_products)} products across 28 states into src/data/catalog.ts")
