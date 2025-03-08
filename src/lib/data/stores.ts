/**
 * @file: stores.ts
 * @description: Contains sample data for stores and products
 * 
 * @dependencies: None
 * 
 * @inputs: None
 * @outputs: Store and product data for the application
 * 
 * @side_effects: None
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  address: string;
  category: string;
  rating: number;
  image: string;
  latitude: number;
  longitude: number;
  products: Product[];
}

// Sample store data with different categories
export const stores: Store[] = [
  {
    id: "1",
    name: "Fresh Bazaar",
    description: "Your local grocery store with fresh produce and daily essentials from across India.",
    address: "45 Gandhi Road, Mumbai, Maharashtra, India",
    category: "Grocery",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1588246832100-2d849fb3d8c6?q=80&w=800&auto=format&fit=crop",
    latitude: 19.0760,
    longitude: 72.8777,
    products: [
      {
        id: "101",
        name: "Organic Alphonso Mangoes",
        description: "Fresh organic Alphonso mangoes from Ratnagiri farms.",
        price: 450,
        image: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=800&auto=format&fit=crop",
        category: "Produce"
      },
      {
        id: "102",
        name: "Whole Wheat Roti",
        description: "Freshly made whole wheat rotis, pack of 5.",
        price: 60,
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop",
        category: "Bakery"
      },
      {
        id: "103",
        name: "Farm Fresh Eggs",
        description: "Dozen free-range eggs from local farms.",
        price: 120,
        image: "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?q=80&w=800&auto=format&fit=crop",
        category: "Dairy"
      },
      {
        id: "104",
        name: "Amul Full Cream Milk",
        description: "Fresh full cream milk from Amul, 1 liter.",
        price: 68,
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=800&auto=format&fit=crop",
        category: "Dairy"
      },
      {
        id: "105",
        name: "Fresh Methi (Fenugreek)",
        description: "Fresh organic methi leaves, 250g bundle.",
        price: 40,
        image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=800&auto=format&fit=crop",
        category: "Produce"
      }
    ]
  },
  {
    id: "2",
    name: "Tech Bharat",
    description: "The latest electronics and gadgets for tech enthusiasts at competitive prices.",
    address: "120 Cyber City, Gurugram, Haryana, India",
    category: "Electronics",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800&auto=format&fit=crop",
    latitude: 28.4595,
    longitude: 77.0266,
    products: [
      {
        id: "201",
        name: "OnePlus 11 5G",
        description: "Latest OnePlus smartphone with Snapdragon processor and 12GB RAM.",
        price: 54999,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop",
        category: "Smartphones"
      },
      {
        id: "202",
        name: "boAt Rockerz 550",
        description: "Wireless over-ear headphones with 20-hour battery life.",
        price: 1999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
        category: "Audio"
      },
      {
        id: "203",
        name: "Mi Power Bank 20000mAh",
        description: "Fast charging power bank with dual USB output.",
        price: 1499,
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=800&auto=format&fit=crop",
        category: "Accessories"
      },
      {
        id: "204",
        name: "Samsung 43\" Crystal 4K TV",
        description: "Ultra HD smart TV with built-in voice assistant.",
        price: 36990,
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800&auto=format&fit=crop",
        category: "Televisions"
      },
      {
        id: "205",
        name: "HP Pavilion Laptop",
        description: "15.6\" FHD laptop with 11th Gen Intel Core i5 processor.",
        price: 62990,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop",
        category: "Computers"
      }
    ]
  },
  {
    id: "3",
    name: "Desi Fashion House",
    description: "Traditional and contemporary Indian clothing, accessories, and jewelry.",
    address: "78 Commercial Street, Bangalore, Karnataka, India",
    category: "Clothing",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1610189844804-9b1a7a9a0d1a?q=80&w=800&auto=format&fit=crop",
    latitude: 12.9716,
    longitude: 77.5946,
    products: [
      {
        id: "301",
        name: "Women's Silk Saree",
        description: "Handwoven pure silk saree with traditional designs.",
        price: 5500,
        image: "https://images.unsplash.com/photo-1610508500445-a4592435e27e?q=80&w=800&auto=format&fit=crop",
        category: "Women's Clothing"
      },
      {
        id: "302",
        name: "Men's Kurta Pajama Set",
        description: "Cotton kurta with matching pajama for festivals and special occasions.",
        price: 1800,
        image: "https://images.unsplash.com/photo-1597983073453-ef06cfc2240e?q=80&w=800&auto=format&fit=crop",
        category: "Men's Clothing"
      },
      {
        id: "303",
        name: "Silver Anklet Pair",
        description: "Traditional silver anklets with intricate design and small bells.",
        price: 1200,
        image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=800&auto=format&fit=crop",
        category: "Jewelry"
      },
      {
        id: "304",
        name: "Embroidered Dupatta",
        description: "Colorful dupatta with mirror work and traditional embroidery.",
        price: 750,
        image: "https://images.unsplash.com/photo-1612722432474-b971cdcea546?q=80&w=800&auto=format&fit=crop",
        category: "Accessories"
      },
      {
        id: "305",
        name: "Kids' Lehenga Choli",
        description: "Festive wear for little girls with embellishments and bright colors.",
        price: 1500,
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop",
        category: "Children's Clothing"
      }
    ]
  },
  {
    id: "4",
    name: "Spice Bazaar",
    description: "Authentic Indian spices, lentils, rice, and traditional grocery items.",
    address: "23 Spice Market, Delhi, India",
    category: "Indian Grocery",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop",
    latitude: 28.6139,
    longitude: 77.2090,
    products: [
      {
        id: "401",
        name: "Basmati Rice (5kg)",
        description: "Premium long-grain aromatic basmati rice.",
        price: 550,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?q=80&w=800&auto=format&fit=crop",
        category: "Grains"
      },
      {
        id: "402",
        name: "Garam Masala",
        description: "Authentic blend of ground spices used in Indian cuisine.",
        price: 120,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop",
        category: "Spices"
      },
      {
        id: "403",
        name: "Toor Dal (2kg)",
        description: "Split pigeon peas, a staple in Indian households.",
        price: 220,
        image: "https://images.unsplash.com/photo-1612257999691-cf0c2717c6d0?q=80&w=800&auto=format&fit=crop",
        category: "Lentils"
      },
      {
        id: "404",
        name: "Ghee (1L)",
        description: "Pure clarified butter used in Indian cooking and rituals.",
        price: 650,
        image: "https://images.unsplash.com/photo-1631237858799-29e2a095ef18?q=80&w=800&auto=format&fit=crop",
        category: "Dairy"
      },
      {
        id: "405",
        name: "Chai Masala",
        description: "Special blend of spices for making authentic Indian chai.",
        price: 85,
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?q=80&w=800&auto=format&fit=crop",
        category: "Tea"
      }
    ]
  },
  {
    id: "5",
    name: "Ayurvedic Wellness Center",
    description: "Traditional Ayurvedic products, herbs, and natural remedies for holistic health.",
    address: "34 Herbal Lane, Kochi, Kerala, India",
    category: "Health & Wellness",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1546552768-9e3a5e56d607?q=80&w=800&auto=format&fit=crop",
    latitude: 9.9312,
    longitude: 76.2673,
    products: [
      {
        id: "501",
        name: "Ashwagandha Powder (250g)",
        description: "Organic ashwagandha root powder for stress relief and immunity.",
        price: 350,
        image: "https://images.unsplash.com/photo-1617638924751-adb6c4499361?q=80&w=800&auto=format&fit=crop",
        category: "Herbs"
      },
      {
        id: "502",
        name: "Chyawanprash (500g)",
        description: "Traditional Ayurvedic health supplement with multiple herbs.",
        price: 450,
        image: "https://images.unsplash.com/photo-1617638923605-0c2c7c819b26?q=80&w=800&auto=format&fit=crop",
        category: "Supplements"
      },
      {
        id: "503",
        name: "Neem & Tulsi Face Wash",
        description: "Natural face cleanser with antibacterial properties.",
        price: 180,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop",
        category: "Skincare"
      },
      {
        id: "504",
        name: "Ayurvedic Hair Oil",
        description: "Blend of herbs in sesame oil base for hair growth and strength.",
        price: 280,
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop",
        category: "Hair Care"
      },
      {
        id: "505",
        name: "Triphala Tablets",
        description: "Herbal supplement for digestive health and detoxification.",
        price: 220,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
        category: "Supplements"
      }
    ]
  },
  {
    id: "6",
    name: "Swadeshi Handicrafts",
    description: "Authentic Indian handicrafts, home decor, and artisanal products from across India.",
    address: "56 Crafts Colony, Jaipur, Rajasthan, India",
    category: "Home & Decor",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1582582484783-b28df7980e66?q=80&w=800&auto=format&fit=crop",
    latitude: 26.9124,
    longitude: 75.7873,
    products: [
      {
        id: "601",
        name: "Blue Pottery Vase",
        description: "Handcrafted Jaipur blue pottery vase with traditional designs.",
        price: 1200,
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop",
        category: "Pottery"
      },
      {
        id: "602",
        name: "Rajasthani Wall Hanging",
        description: "Colorful patchwork wall hanging with mirror work and embroidery.",
        price: 850,
        image: "https://images.unsplash.com/photo-1580380853934-834251ec5818?q=80&w=800&auto=format&fit=crop",
        category: "Wall Decor"
      },
      {
        id: "603",
        name: "Brass Diya Set",
        description: "Set of 5 traditional brass oil lamps for festivals and decoration.",
        price: 750,
        image: "https://images.unsplash.com/photo-1604423031905-1fed6a5c0499?q=80&w=800&auto=format&fit=crop",
        category: "Religious Items"
      },
      {
        id: "604",
        name: "Madhubani Painting",
        description: "Hand-painted Madhubani art on handmade paper from Bihar.",
        price: 1800,
        image: "https://images.unsplash.com/photo-1582582484783-b28df7980e66?q=80&w=800&auto=format&fit=crop",
        category: "Art"
      },
      {
        id: "605",
        name: "Wooden Elephant Statue",
        description: "Hand-carved rosewood elephant figurine with intricate details.",
        price: 1500,
        image: "https://images.unsplash.com/photo-1589912187341-5c2e16af4a6b?q=80&w=800&auto=format&fit=crop",
        category: "Sculptures"
      }
    ]
  },
  {
    id: "7",
    name: "Desi Delights",
    description: "Authentic Indian restaurant serving delicious North and South Indian cuisine.",
    address: "88 Food Street, Chennai, Tamil Nadu, India",
    category: "Restaurant",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    latitude: 13.0827,
    longitude: 80.2707,
    products: [
      {
        id: "701",
        name: "Butter Chicken",
        description: "Creamy tomato-based curry with tender chicken pieces.",
        price: 320,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop",
        category: "Main Course"
      },
      {
        id: "702",
        name: "Masala Dosa",
        description: "Crispy rice crepe filled with spiced potato filling, served with sambar and chutney.",
        price: 150,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop",
        category: "Breakfast"
      },
      {
        id: "703",
        name: "Paneer Tikka",
        description: "Marinated and grilled cottage cheese with vegetables.",
        price: 280,
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop",
        category: "Appetizers"
      },
      {
        id: "704",
        name: "Hyderabadi Biryani",
        description: "Fragrant basmati rice cooked with spices and meat or vegetables.",
        price: 350,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop",
        category: "Rice"
      },
      {
        id: "705",
        name: "Gulab Jamun",
        description: "Sweet milk solids dumplings soaked in sugar syrup.",
        price: 120,
        image: "https://images.unsplash.com/photo-1601303516532-a56b0f0d2c82?q=80&w=800&auto=format&fit=crop",
        category: "Desserts"
      }
    ]
  },
  {
    id: "8",
    name: "Himalayan Bookstore",
    description: "Wide collection of books including Indian literature, academic texts, and international bestsellers.",
    address: "42 Literary Lane, Kolkata, West Bengal, India",
    category: "Books & Stationery",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1526243741027-444d633d7365?q=80&w=800&auto=format&fit=crop",
    latitude: 22.5726,
    longitude: 88.3639,
    products: [
      {
        id: "801",
        name: "The White Tiger by Aravind Adiga",
        description: "Man Booker Prize-winning novel about a village boy's journey in modern India.",
        price: 399,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
        category: "Fiction"
      },
      {
        id: "802",
        name: "India After Gandhi by Ramachandra Guha",
        description: "Comprehensive history of modern India since independence.",
        price: 799,
        image: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=800&auto=format&fit=crop",
        category: "Non-Fiction"
      },
      {
        id: "803",
        name: "Premium Notebook Set",
        description: "Set of 3 hardcover notebooks with acid-free paper.",
        price: 450,
        image: "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?q=80&w=800&auto=format&fit=crop",
        category: "Stationery"
      },
      {
        id: "804",
        name: "Fountain Pen",
        description: "Classic fountain pen with smooth writing experience.",
        price: 850,
        image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800&auto=format&fit=crop",
        category: "Writing Instruments"
      },
      {
        id: "805",
        name: "Indian Mythology Collection",
        description: "Box set of books on Indian mythology and folklore.",
        price: 1200,
        image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=800&auto=format&fit=crop",
        category: "Mythology"
      }
    ]
  },
  {
    id: "9",
    name: "Bollywood Music House",
    description: "Music store specializing in Indian classical, Bollywood, and regional music instruments.",
    address: "15 Melody Street, Pune, Maharashtra, India",
    category: "Music",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=800&auto=format&fit=crop",
    latitude: 18.5204,
    longitude: 73.8567,
    products: [
      {
        id: "901",
        name: "Professional Tabla Set",
        description: "Handcrafted professional tabla set with carrying case.",
        price: 8500,
        image: "https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?q=80&w=800&auto=format&fit=crop",
        category: "Percussion Instruments"
      },
      {
        id: "902",
        name: "Bamboo Flute",
        description: "Traditional bamboo flute tuned to E natural.",
        price: 1200,
        image: "https://images.unsplash.com/photo-1605020420620-20c943cc4669?q=80&w=800&auto=format&fit=crop",
        category: "Wind Instruments"
      },
      {
        id: "903",
        name: "Electric Sitar",
        description: "Modern electric sitar with pickup and amplifier connection.",
        price: 15000,
        image: "https://images.unsplash.com/photo-1643123545941-3667ee4dc229?q=80&w=800&auto=format&fit=crop",
        category: "String Instruments"
      },
      {
        id: "904",
        name: "Bollywood Hits Collection",
        description: "Digital collection of 100 Bollywood hit songs from the last decade.",
        price: 599,
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
        category: "Music Collections"
      },
      {
        id: "905",
        name: "Professional Harmonium",
        description: "3¼ octave professional harmonium with coupler and scale changer.",
        price: 12000,
        image: "https://images.unsplash.com/photo-1545293527-e26058c5b48b?q=80&w=800&auto=format&fit=crop",
        category: "Keyboard Instruments"
      }
    ]
  },
  {
    id: "10",
    name: "Desi Sports Hub",
    description: "Sports equipment store specializing in cricket, badminton, and other popular Indian sports.",
    address: "77 Stadium Road, Ahmedabad, Gujarat, India",
    category: "Sports",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?q=80&w=800&auto=format&fit=crop",
    latitude: 23.0225,
    longitude: 72.5714,
    products: [
      {
        id: "1001",
        name: "MRF Cricket Bat",
        description: "Professional grade Kashmir willow cricket bat.",
        price: 3500,
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=800&auto=format&fit=crop",
        category: "Cricket"
      },
      {
        id: "1002",
        name: "Yonex Badminton Racket",
        description: "Professional badminton racket with carrying case.",
        price: 2200,
        image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=800&auto=format&fit=crop",
        category: "Badminton"
      },
      {
        id: "1003",
        name: "Indian Cricket Team Jersey",
        description: "Official Indian cricket team jersey, current season.",
        price: 1800,
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800&auto=format&fit=crop",
        category: "Apparel"
      },
      {
        id: "1004",
        name: "Kho-Kho Equipment Set",
        description: "Complete set for traditional Indian sport Kho-Kho.",
        price: 4500,
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
        category: "Traditional Sports"
      },
      {
        id: "1005",
        name: "Kabaddi Training Kit",
        description: "Professional training kit for Kabaddi players.",
        price: 2800,
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
        category: "Traditional Sports"
      }
    ]
  }
];

// Helper function to get a store by ID
export function getStoreById(id: string): Store | undefined {
  return stores.find(store => store.id === id);
}

// Helper function to get stores by category
export function getStoresByCategory(category: string): Store[] {
  return stores.filter(store => store.category.toLowerCase() === category.toLowerCase());
}

// Helper function to search stores by name or category
export function searchStores(query: string): Store[] {
  const lowercaseQuery = query.toLowerCase();
  return stores.filter(store => 
    store.name.toLowerCase().includes(lowercaseQuery) || 
    store.category.toLowerCase().includes(lowercaseQuery) ||
    store.description.toLowerCase().includes(lowercaseQuery)
  );
}

// Get all unique categories
export function getAllCategories(): string[] {
  const categories = new Set(stores.map(store => store.category));
  return Array.from(categories);
} 