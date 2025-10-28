// Load book summary from details.html
document.querySelectorAll(".show-summary").forEach(button => {
  button.addEventListener("click", async () => {
    const card = button.closest(".book-card");
    const bookId = card.dataset.book;
    const summaryDiv = card.querySelector(".book-summary");

    if (summaryDiv.innerHTML.trim() === "") {
      const response = await fetch("details.html");
      const text = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      const bookSummary = doc.querySelector(`#${bookId}`);

      summaryDiv.innerHTML = bookSummary
        ? bookSummary.innerHTML
        : "<p>Summary not found.</p>";
      button.textContent = "Hide Book Summary";
    } else {
      summaryDiv.innerHTML = "";
      button.textContent = "Show Book Summary";
    }
  });
});

// 🔍 Search functionality
const searchBar = document.getElementById("searchBar");
const bookCards = document.querySelectorAll(".book-card");

if (searchBar) {
  searchBar.addEventListener("keyup", () => {
    const searchText = searchBar.value.toLowerCase();

    bookCards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      const author = card.querySelector("p strong")
        ? card.querySelector("p strong").textContent.toLowerCase()
        : "";

      if (title.includes(searchText) || author.includes(searchText)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}
