import json

raw_catalog = [
    # 1. RAJASTHAN
    {
        "id": "raj-w-01", "slug": "bandhani-rai-bandhej-saree", "name": "Bandhani Rai Bandhej Georgette Saree",
        "gender": "Women", "garment": "Bandhani", "culture": "West India", "region": "Jodhpur, Rajasthan", "state": "Rajasthan",
        "occasion": "Diwali", "fabric": "Chiffon", "colors": ["Saffron", "Magenta"], "sizes": ["Free Size"], "lengthCm": 580,
        "priceINR": 8999, "originalPriceINR": 11999, "gstPct": 5, "hsnCode": "5007",
        "story": "Tied by women of the Bhopa community with over 12,000 micro-tied dots and natural katha dyes.",
        "highlights": ["Hand-tied bandhej", "Natural katha dyes", "Includes blouse piece"], "artisan": "Bhopa Cooperative",
        "rating": 4.7, "reviewCount": 142, "image": "/products/bandhani-saree.jpg", "badge": "Women Festive", "swatch": "#f43f5e", "shipsFromCity": "Jodhpur"
    },
    {
        "id": "raj-w-02", "slug": "rajasthani-leheriya-saree", "name": "Mothda Leheriya Silk Saree",
        "gender": "Women", "garment": "Saree", "culture": "West India", "region": "Jaipur, Rajasthan", "state": "Rajasthan",
        "occasion": "Teej", "fabric": "Chiffon", "colors": ["Pink", "Turquoise"], "sizes": ["Free Size"],
        "priceINR": 7499, "originalPriceINR": 9999, "gstPct": 5, "hsnCode": "5007",
        "story": "Authentic diagonal wave tie-dye (Leheriya) crafted in Jaipur for Teej and Gangaur festivals.",
        "highlights": ["Diagonal wave tie-dye", "Handwoven gota patti", "Lightweight silk"], "artisan": "Rangrez Guild Jaipur",
        "rating": 4.8, "reviewCount": 88, "image": "/products/leheriya-saree.jpg", "badge": "Women Teej Special", "swatch": "#ec4899", "shipsFromCity": "Jaipur"
    },
    {
        "id": "raj-w-03", "slug": "kota-doria-zari-saree", "name": "Kota Doria Real Gold Zari Saree",
        "gender": "Women", "garment": "Saree", "culture": "West India", "region": "Kota, Rajasthan", "state": "Rajasthan",
        "occasion": "Casual", "fabric": "Chanderi Cotton", "colors": ["Ivory", "Gold Zari Grid"], "sizes": ["Free Size"],
        "priceINR": 6999, "originalPriceINR": 8999, "gstPct": 5, "hsnCode": "5208",
        "story": "Woven with square grid khats in Kota; lightweight, translucent cotton-silk fabric.",
        "highlights": ["Traditional khat squares", "Real zari border", "Includes blouse piece"], "artisan": "Kota Weaver Samiti",
        "rating": 4.7, "reviewCount": 65, "image": "/products/phulkari-salwar.jpg", "badge": "Women Summer Craft", "swatch": "#fef08a", "shipsFromCity": "Kota"
    },
    {
        "id": "raj-m-01", "slug": "royal-jodhpuri-bandhgala-men", "name": "Royal Jodhpuri Bandhgala Groom Suit",
        "gender": "Men", "garment": "Bandhgala", "culture": "West India", "region": "Jaipur, Rajasthan", "state": "Rajasthan",
        "occasion": "Wedding", "fabric": "Velvet", "colors": ["Midnight Blue", "Antique Gold"], "sizes": ["38", "40", "42", "44"],
        "priceINR": 34999, "originalPriceINR": 43749, "gstPct": 12, "hsnCode": "6205",
        "story": "Royal Jodhpuri Bandhgala jacket with hand-carved brass crest buttons and ivory wool-blend trousers.",
        "highlights": ["Royal Jodhpuri cut", "Brass crest buttons", "Trousers included"], "artisan": "Jaipur Royal Tailors",
        "rating": 4.9, "reviewCount": 110, "image": "/products/bandhgala-jodhpuri-men.jpg", "badge": "Men Royal", "swatch": "#1e3a8a", "shipsFromCity": "Jaipur"
    },
    {
        "id": "raj-m-02", "slug": "rajasthani-achkan-safa-men", "name": "Royal Achkan Kurta & Bandhej Safa Set",
        "gender": "Men", "garment": "Sherwani", "culture": "West India", "region": "Udaipur, Rajasthan", "state": "Rajasthan",
        "occasion": "Wedding", "fabric": "Brocade", "colors": ["Maroon Gold", "Pink Safa"], "sizes": ["38", "40", "42", "44"],
        "priceINR": 22999, "originalPriceINR": 28749, "gstPct": 12, "hsnCode": "6205",
        "story": "Traditional Mewari royal Achkan jacket with hand-tied Bandhej turban (Safa) and silk churidar.",
        "highlights": ["Mewari royal achkan", "Hand-tied pink safa", "Churidar included"], "artisan": "Udaipur Craft Guild",
        "rating": 4.8, "reviewCount": 74, "image": "/products/mughal-sherwani.jpg", "badge": "Men Groom", "swatch": "#831843", "shipsFromCity": "Udaipur"
    },

    # 2. GUJARAT
    {
        "id": "guj-w-01", "slug": "patan-patola-double-ikat-saree", "name": "Patan Patola Double-Ikat Silk Saree",
        "gender": "Women", "garment": "Saree", "culture": "West India", "region": "Patan, Gujarat", "state": "Gujarat",
        "occasion": "Wedding", "fabric": "Banarasi Silk", "colors": ["Crimson Red", "Parrot Green"], "sizes": ["Free Size"],
        "priceINR": 48999, "originalPriceINR": 59999, "gstPct": 5, "hsnCode": "5007",
        "story": "Woven by Salvi weavers in Patan using double-ikat technique where warp and weft are both pre-dyed.",
        "highlights": ["Double-ikat Salvi weave", "Pure silk yarns", "Takes 6 months"], "artisan": "Patan Salvi Atelier",
        "rating": 5.0, "reviewCount": 92, "image": "/products/pochampally-ikat.jpg", "badge": "Women Masterpiece", "swatch": "#991b1b", "shipsFromCity": "Patan"
    },
    {
        "id": "guj-w-02", "slug": "navratri-chaniya-choli", "name": "Navratri Mirror-Work Chaniya Choli",
        "gender": "Women", "garment": "Lehenga", "culture": "West India", "region": "Ahmedabad, Gujarat", "state": "Gujarat",
        "occasion": "Navratri", "fabric": "Chiffon", "colors": ["Emerald", "Royal Blue", "Saffron"], "sizes": ["S", "M", "L", "XL"],
        "priceINR": 7999, "originalPriceINR": 9999, "gstPct": 5, "hsnCode": "6204",
        "story": "Built for garba nights with 800 hand-stitched mirrors, high flare ghagra, and gota patti dupatta.",
        "highlights": ["Hand-stitched mirrors", "Gota patti border", "Includes dupatta"], "artisan": "Surat Mirror Atelier",
        "rating": 4.9, "reviewCount": 121, "image": "/products/navratri-lehenga.webp", "badge": "Women Garba", "swatch": "#059669", "shipsFromCity": "Ahmedabad"
    },
    {
        "id": "guj-m-01", "slug": "gujarat-kediyu-dhoti-men", "name": "Navratri Garba Kediyu & Dhoti Set",
        "gender": "Men", "garment": "Dhoti", "culture": "West India", "region": "Kutch, Gujarat", "state": "Gujarat",
        "occasion": "Navratri", "fabric": "Khadi", "colors": ["Multi-Color", "Crimson"], "sizes": ["M", "L", "XL"],
        "priceINR": 8499, "originalPriceINR": 10624, "gstPct": 5, "hsnCode": "6205",
        "story": "Authentic Kutchi pleated Kediyu jacket with mirror work embroidery and comfortable tulsi dhoti.",
        "highlights": ["Authentic Kutchi mirrors", "Pleated kediyu jacket", "Dhoti included"], "artisan": "Kutch Craft Guild",
        "rating": 4.8, "reviewCount": 64, "image": "/products/navratri-kediyu-dhoti.jpg", "badge": "Men Festive", "swatch": "#f43f5e", "shipsFromCity": "Bhuj"
    },
    {
        "id": "guj-m-02", "slug": "ajrakh-blockprint-kurta-men", "name": "Kutchi Ajrakh Hand-Blockprint Kurta",
        "gender": "Men", "garment": "Kurta", "culture": "West India", "region": "Dhamadka, Gujarat", "state": "Gujarat",
        "occasion": "Daily", "fabric": "Mulmul Cotton", "colors": ["Indigo", "Madder Red"], "sizes": ["38", "40", "42", "44"],
        "priceINR": 4999, "originalPriceINR": 6499, "gstPct": 5, "hsnCode": "6205",
        "story": "16-step natural dye Ajrakh blockprint kurta crafted along the riverbeds of Kutch.",
        "highlights": ["16-step Ajrakh blockprint", "Natural indigo dye", "Pajama included"], "artisan": "Dhamadka Artisans",
        "rating": 4.7, "reviewCount": 51, "image": "/products/chikankari-kurta-men.jpg", "badge": "Men Blockprint", "swatch": "#1e3a8a", "shipsFromCity": "Bhuj"
    },
    {
        "id": "guj-w-03", "slug": "kutch-embroidery-velvet-shawl", "name": "Kutchi Mirror Embroidered Velvet Shawl",
        "gender": "Women", "garment": "Shawl", "culture": "West India", "region": "Bhuj, Gujarat", "state": "Gujarat",
        "occasion": "Diwali", "fabric": "Velvet", "colors": ["Maroon", "Gold Thread"], "sizes": ["Free Size"],
        "priceINR": 8999, "originalPriceINR": 11499, "gstPct": 5, "hsnCode": "6214",
        "story": "Rich velvet shawl featuring intricate Rabari mirrorwork embroidery from Kutch.",
        "highlights": ["Rabari mirrorwork", "Pure velvet base", "Tassel borders"], "artisan": "Bhuj Rabari Collective",
        "rating": 4.8, "reviewCount": 45, "image": "/products/pashmina-shawl.jpg", "badge": "Women Royal", "swatch": "#831843", "shipsFromCity": "Bhuj"
    }
]

print(f"Base catalog initialized with {len(raw_catalog)} products.")
