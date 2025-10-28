// Dummy book data
const books = [
  {
    id: 1,
    title: "Tom Gates: Mega Make and Do and Stories Too!",
    author: "Liz Pichon",
    image: "images/tom-gates.png",
    description: "A fun mix of doodles, jokes, and stories about Tom’s creative adventures."
  },
  {
    id: 2,
    title: "Matilda",
    author: "Roald Dahl",
    image: "images/matilda.png",
    description: "A smart little girl who loves reading and stands up to her mean parents and principal."
  },
  {
    id: 3,
    title: "Diary of a Wimpy Kid",
    author: "Jeff Kinney",
    image: "images/diary-of-a-wimpy-kid.png",
    description: "Greg Heffley’s hilarious middle school adventures told through his diary."
  }
];

// Load books on the book list page
if (document.getElementById('bookList')) {
  const container = document.getElementById('bookList');
  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p><strong>${book.author}</strong></p>
      <p>${book.description}</p>
      <button onclick="showBookDetails(${book.id})">Show Book Summary</button>
    `;
    container.appendChild(card);
  });
}

// When clicking “Show Book Summary”
function showBookDetails(bookId) {
  const selectedBook = books.find(b => b.id === bookId);
  localStorage.setItem('selectedBook', JSON.stringify(selectedBook));
  window.location.href = 'details.html';
}

// Show details on details.html
if (document.getElementById('bookDetails')) {
  const book = JSON.parse(localStorage.getItem('selectedBook'));
  if (book) {
    document.getElementById('bookDetails').innerHTML = `
      <h1>${book.title}</h1>
      <img src="${book.image}" alt="${book.title}" style="width:250px; border-radius:10px;">
      <p><strong>Author:</strong> ${book.author}</p>
      <p>${book.description}</p>
      <p><em>Summary coming soon!</em></p>
      <button onclick="markAsRead(${book.id})">Mark as Read ✅</button>
    `;
  }
}

// Save "read" books to localStorage
function markAsRead(bookId) {
  let readBooks = JSON.parse(localStorage.getItem('readBooks')) || [];
  if (!readBooks.includes(bookId)) {
    readBooks.push(bookId);
    localStorage.setItem('readBooks', JSON.stringify(readBooks));
    alert('Marked as read!');
  }
}

// Show read books on Home page
if (document.getElementById('readBooksGrid')) {
  const readBooks = JSON.parse(localStorage.getItem('readBooks')) || [];
  const container = document.getElementById('readBooksGrid');

  const readData = books.filter(b => readBooks.includes(b.id));
  readData.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h3>${book.title}</h3>
    `;
    container.appendChild(card);
  });
}
