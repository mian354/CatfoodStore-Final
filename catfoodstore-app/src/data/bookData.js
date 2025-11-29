// ข้อมูลหนังสือสำหรับร้านหนังสือ
export const booksData = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "classic",
    price: 350,
    originalPrice: 450,
    image: "/images/book-covers/to-kill-mockingbird.jpg",
    description: "นวนิยายคลาสสิกที่กล่าวถึงความยุติธรรมและอคติทางสังคมในอเมริกาใต้",
    publishYear: 1960,
    pages: 324,
    isbn: "978-0-06-112008-4",
    rating: 4.8,
    reviewCount: 1250,
    inStock: true,
    stockQuantity: 15,
    publisher: "J.B. Lippincott & Co.",
    tags: ["classic", "social-justice", "coming-of-age"],
    featured: true
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    category: "dystopian",
    price: 320,
    originalPrice: 400,
    image: "/images/book-covers/1984.jpg",
    description: "นวนิยายดิสโทเปียที่พรรณนาถึงสังคมเผด็จการและการควบคุมความคิด",
    publishYear: 1949,
    pages: 328,
    isbn: "978-0-452-28423-4",
    rating: 4.7,
    reviewCount: 2100,
    inStock: true,
    stockQuantity: 23,
    publisher: "Secker & Warburg",
    tags: ["dystopian", "political", "surveillance"],
    featured: true
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "classic",
    price: 290,
    originalPrice: 380,
    image: "/images/book-covers/great-gatsby.jpg",
    description: "เรื่องราวของความฝันอเมริกันในยุค Jazz Age",
    publishYear: 1925,
    pages: 180,
    isbn: "978-0-7432-7356-5",
    rating: 4.4,
    reviewCount: 1800,
    inStock: false,
    stockQuantity: 0,
    publisher: "Charles Scribner's Sons",
    tags: ["classic", "american-dream", "jazz-age"],
    featured: false
  }
  // ... เพิ่มหนังสือเล่มอื่นๆ
];

// ข้อมูลหมวดหมู่หนังสือ
export const categories = [
  { id: 'classic', name: 'วรรณกรรมคลาสสิก', description: 'หนังสือคลาสสิกที่เป็นมรดกทางวรรณกรรม' },
  { id: 'fantasy', name: 'แฟนตาซี', description: 'นวนิยายแฟนตาซีและเวทมนตร์' },
  { id: 'dystopian', name: 'ดิสโทเปีย', description: 'นิยายสังคมอนาคตที่มืดมน' },
  { id: 'mystery', name: 'นิยายสืบสวน', description: 'เรื่องลึกลับและการสืบสวน' },
  { id: 'romance', name: 'โรแมนติก', description: 'นิยายรักและความสัมพันธ์' }
];

// ฟังก์ชันช่วยในการจัดการข้อมูลหนังสือ
export const getBookById = (id) => {
  return booksData.find(book => book.id === parseInt(id));
};

export const getBooksByCategory = (categoryId) => {
  return booksData.filter(book => book.category === categoryId);
};

export const getFeaturedBooks = (count = 3) => {
  return booksData
    .filter(book => book.featured && book.inStock)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
};

export const searchBooks = (query) => {
  const searchQuery = query.toLowerCase();
  return booksData.filter(book => 
    book.title.toLowerCase().includes(searchQuery) ||
    book.author.toLowerCase().includes(searchQuery) ||
    book.description.toLowerCase().includes(searchQuery) ||
    book.tags.some(tag => tag.toLowerCase().includes(searchQuery))
  );
};