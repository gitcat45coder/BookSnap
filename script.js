/* Shared data: books and series (dummy) */
const books = [
  { id: "b1", type: "book", title: "Tom Gates: Mega Make and Do and Stories Too!", author: "Liz Pichon", image: "images/tom-gates.png", description: "A fun mix of doodles, jokes, and stories about Tom’s creative adventures." },
  { id: "b2", type: "book", title: "Matilda", author: "Roald Dahl", image: "images/matilda.png", description: "A smart little girl who loves reading and stands up to others." },
  { id: "b3", type: "book", title: "Diary of a Wimpy Kid", author: "Jeff Kinney", image: "images/diary-of-a-wimpy-kid.png", description: "Greg Heffley’s diary about middle school chaos and humor." }
];

const series = [
  { id: "s1", type: "series", title: "Harry Potter Series", image: "images/harrypotter.png", description: "Magic, friendship and adventures at Hogwarts (dummy summary)." },
  { id: "s2", type: "series", title: "Diary of a Wimpy Kid Series", image: "images/wimpy.png", description: "The continuing diary stories of Greg Heffley (dummy summary)." },
  { id: "s3", type: "series", title: "Percy Jackson & the Olympians", image: "images/percyjackson.png", description: "Demigod Percy faces mythic monsters and quests (dummy summary)." }
];

/* ---------- UTILITIES ---------- */
function qs(selector){ return document.querySelector(selector); }
function qsa(selector){ return Array.from(document.querySelectorAll(selector)); }

/* safe localStorage helpers */
function getReads() {
  try { return JSON.parse(localStorage.getItem('reads') || '[]'); }
  catch(e){ return []; }
}
function saveReads(arr) { localStorage.setItem('reads', JSON.stringify(arr)); }

/* add an item (book/series) to reads if not already present */
function addRead(item) {
  const reads = getReads();
  const exists = reads.find(r => r.id === item.id && r.type === item.type);
  if (!exists) {
    reads.push({ id: item.id, type: item.type, title: item.title, image: item.image, timestamp: Date.now() });
    saveReads(reads);
  }
}

/* find item by type/id */
function findItem(type, id) {
  if (type === 'book') return books.find(b => b.id === id);
  if (type === 'series') return series.find(s => s.id === id);
  return null;
}

/* ---------- PAGE: book list (books.html) ---------- */
if (qs('#bookList')) {
  const container = qs('#bookList');
  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <img src="${book.image}" alt="${escapeHTML(book.title)}">
      <h3>${escapeHTML(book.title)}</h3>
      <p><strong>${escapeHTML(book.author)}</strong></p>
      <p>${escapeHTML(book.description)}</p>
      <button onclick="openDetails('book','${book.id}')">Show Book Summary</button>
    `;
    container.appendChild(card);
  });
}

/* ---------- PAGE: series list (series.html) ---------- */
if (qs('#seriesList')) {
  const container = qs('#seriesList');
  series.forEach(s => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <img src="${s.image}" alt="${escapeHTML(s.title)}">
      <h3>${escapeHTML(s.title)}</h3>
      <p>${escapeHTML(s.description)}</p>
      <button onclick="openDetails('series','${s.id}')">Show Series Summary</button>
    `;
    container.appendChild(card);
  });
}

/* ---------- OPEN DETAILS (navigates to details.html with params) ---------- */
function openDetails(type, id) {
  const url = `details.html?type=${encodeURIComponent(type)}&id=${encodeURIComponent(id)}`;
  window.location.href = url;
}

/* ---------- PAGE: details (details.html) ---------- */
if (qs('#detailsContent')) {
  // parse params
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type'); // 'book' or 'series'
  const id = params.get('id');
  const item = findItem(type, id);

  const container = qs('#detailsContent');

  if (!item) {
    container.innerHTML = `<h1>Not found</h1><p>Item not found. Go back to <a href="books.html">Book Summaries</a>.</p>`;
  } else {
    // render details
    const html = `
      <article>
        <h1>${escapeHTML(item.title)}</h1>
        <img src="${item.image}" alt="${escapeHTML(item.title)}">
        ${ item.author ? `<p><strong>Author:</strong> ${escapeHTML(item.author)}</p>` : '' }
        <p>${escapeHTML(item.description)}</p>
        <p><em>Full summary content goes here (dummy for now).</em></p>
      </article>
    `;
    container.innerHTML = html;

    // mark as read automatically (only when details page loads)
    addRead(item);
  }
}

/* ---------- PAGE: home (index.html) - show reads ---------- */
if (qs('#readBooksGrid')) {
  const grid = qs('#readBooksGrid');
  const reads = getReads();

  if (reads.length === 0) {
    grid.innerHTML = `<p style="color:#666">You haven’t read any books or series yet. Start exploring in Book Summaries!</p>`;
  } else {
    // sort by timestamp: newest first
    reads.sort((a,b) => b.timestamp - a.timestamp);
    reads.forEach(r => {
      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `
        <img src="${r.image}" alt="${escapeHTML(r.title)}">
        <h3>${escapeHTML(r.title)}</h3>
      `;
      grid.appendChild(card);
    });
  }
}

/* ---------- small helper: escape HTML to avoid injection in dummy content ---------- */
function escapeHTML(str) {
  if (!str && str !== '') return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
